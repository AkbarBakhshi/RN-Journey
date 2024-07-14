import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { sanityClient } from "../../sanity";
import dayjs from "dayjs";
import { ScrollView } from "react-native-gesture-handler";
import { SpeedDial } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import { BottomSheetBackdrop, BottomSheetBackgroundProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AddWod from "../../components/AddWod";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
  const [open, setOpen] = useState(false);
  const [closeSheet, setCloseSheet] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log("fetch");
      const data: Workout[] = await sanityClient.fetch(`
        *[_type == 'workout'] {
          _id,
          date,
          warmup,
          strength,
          workout,
          type,
        }
      `);

      data.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setWorkouts(data);
      setSelectedWorkout(data[0]);
    };

    fetchWorkouts();
  }, []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"close"}
      />
    ),
    []
  );
  
  return (
    <View className="flex flex-1">
      <FlatList
        horizontal
        data={workouts}
        renderItem={({ item }) => (
          <Pressable
            key={item._id}
            className="mx-2 mt-4"
            onPress={() => setSelectedWorkout(item)}
          >
            <Text className="text-4xl text-primary">
              {dayjs(item.date).format("ddd")}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
      />
      <ScrollView className="px-4">
        {selectedWorkout?.warmup && (
          <View className="border-2 border-primary rounded-xl p-5 w-full mb-2">
            <Text className="text-3xl mb-2 text-primary">Warmup</Text>
            <Text className="text-foreground">{selectedWorkout.warmup}</Text>
          </View>
        )}
        {selectedWorkout?.strength && (
          <View className="border-2 border-primary rounded-xl p-5 w-full mb-2">
            <Text className="text-3xl mb-2 text-primary">Strength</Text>
            <Text className="text-foreground">{selectedWorkout.strength}</Text>
          </View>
        )}
        {selectedWorkout?.workout && (
          <View className="border-2 border-primary rounded-xl p-5 w-full mb-2">
            <Text className="text-3xl mb-2 text-primary">
              Workout of the day
            </Text>
            <Text className="text-foreground">{selectedWorkout.workout}</Text>
          </View>
        )}
      </ScrollView>
      <SpeedDial
        color={colors.notification}
        isOpen={open}
        icon={{ name: "add", color: colors.text }}
        openIcon={{ name: "close", color: colors.text }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          color={colors.notification}
          icon={{ name: "directions-run", color: colors.text }}
          title="Add Wod"
          onPress={handlePresentModalPress}
        />
        <SpeedDial.Action
          color={colors.notification}
          icon={{ name: "fitness-center", color: colors.text }}
          title="Add Strength"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        keyboardBehavior={"extend"}
      >
        <BottomSheetView className="flex-1 items-center">
          <AddWod
            setCloseSheet={setCloseSheet}
            scoreType={selectedWorkout?.type}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

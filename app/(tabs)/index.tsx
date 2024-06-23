import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { sanityClient } from '../../sanity';
import dayjs from 'dayjs';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();

  useEffect(() => {
    const fetchWorkouts = async() => {
      console.log('fetch')
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
      setSelectedWorkout(data[0])
    }

    fetchWorkouts()
  }, [])
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
            <Text className="text-4xl text-primary">{dayjs(item.date).format("ddd")}</Text>
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
            <Text className="text-3xl mb-2 text-primary">Workout of the day</Text>
            <Text className="text-foreground">{selectedWorkout.workout}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
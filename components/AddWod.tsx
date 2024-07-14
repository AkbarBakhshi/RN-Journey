import { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimeWodScore from "./TimeWodScore";
import SetRepsWodScore from "./SetRepsWodScore";
import NumberWodScore from "./NumberWodScore";
import { Button } from "@rneui/themed";

type Props = {
  scoreType: "time" | "setReps" | "number" | undefined;
  setCloseSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddWod = ({scoreType, setCloseSheet} : Props) => {
  const [minute, setMinute] = useState(15);
  const [second, setSecond] = useState(0);

  const [set, setSet] = useState(0);
  const [rep, setRep] = useState(0);
  const [number, setNumber] = useState(0);

  const addWodResult = async () => {
    // Your logic to add the result to your db goes here

    // After adding the result, close the modal
    setCloseSheet(true)
  };

  return (
    <ScrollView
      className="flex-1 w-full"
      contentContainerStyle={{ alignItems: "center" }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="bg-primary p-3 my-11 rounded-lg">
        <Text className="text-xl text-white">Enter your result</Text>
      </View>
      <Text className="m-24">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod suscipit
        et quos! A ipsam fugit ducimus iure nemo quas praesentium sit sed
        ratione odio dignissimos, illo minima impedit sapiente corporis! Lorem
        ipsum dolor sit, amet consectetur adipisicing elit. Quia fuga, velit
        voluptatibus consectetur delectus quaerat necessitatibus corporis
        reprehenderit dignissimos repudiandae nisi voluptatum cupiditate
        accusamus quasi consequatur, ab maxime autem mollitia?
      </Text>
      {scoreType === "time" && (
        <TimeWodScore
          minute={minute}
          setMinute={setMinute}
          second={second}
          setSecond={setSecond}
        />
      )}
      {scoreType === "setReps" && (
        <SetRepsWodScore set={set} setSet={setSet} rep={rep} setRep={setRep} />
      )}
      {scoreType === "number" && (
        <NumberWodScore number={number} setNumber={setNumber} />
      )}

      <Button
        title="Submit"
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ color: "white", marginHorizontal: 20 }}
        onPress={addWodResult}
      />
    </ScrollView>
  );
};

export default AddWod;

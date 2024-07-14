import { View, Text } from "react-native";

import NumberWodScore from "./NumberWodScore";

type Props = {
  set: number;
  setSet: React.Dispatch<React.SetStateAction<number>>;
  rep: number;
  setRep: React.Dispatch<React.SetStateAction<number>>;
};

const SetRepsWodScore = ({ set, setSet, rep, setRep }: Props) => {
  return (
    <>
      <View
        className="flex-row space-x-10 items-center justify-evenly"
        style={{ width: 300 }}
      >
        <Text className="text-dark-red text-xl">Set</Text>
        <Text className="text-dark-red text-xl">Rep</Text>
      </View>
      <View
        className="flex-row space-x-5 items-center justify-evenly"
        style={{ width: 300 }}
      >
        <NumberWodScore
          number={set}
          setNumber={setSet}
          resultText="Enter Sets"
          isBottomSheet
        />
        <NumberWodScore
          number={rep}
          setNumber={setRep}
          resultText="Enter Reps"
          isBottomSheet
        />
      </View>
    </>
  );
};

export default SetRepsWodScore;

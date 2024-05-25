import { View, Text } from "react-native";

type Props = {
  timeCounter: number;
};

const TimerBox = ({ timeCounter }: Props) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View className="flex-row justify-center items-center w-full">
      <View className="p-2 border-dashed border-2 border-primary mr-2 w-48">
        <Text className="text-9xl text-red-500 text-center leading-tight">
          {formatTime(timeCounter).split(":")[0]}
        </Text>
      </View>
      <Text className="text-9xl text-red-500 mr-2">:</Text>
      <View className="p-2 border-dashed border-2 border-primary w-48">
        <Text className="text-9xl text-red-500 text-center leading-tight">
          {formatTime(timeCounter).split(":")[1]}
        </Text>
      </View>
    </View>
  );
};

export default TimerBox;
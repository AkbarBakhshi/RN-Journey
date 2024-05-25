import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomNumberInput from "../../../components/CustomNumberInput";
import { router } from "expo-router";

export default function Dashboard() {
  /**
   * State management
   */
  const [workIntervalInput, setWorkIntervalInput] = useState<number>(0);
  const [restIntervalInput, setRestIntervalInput] = useState<number>(0);
  const [setsInput, setSetsInput] = useState<number>(1);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [includePreCountdown, setIncludePreCountdown] = useState(true);

  /**
   * Very basic form validation
   */
  useEffect(() => {
    const workIntervalValid = workIntervalInput > 0;
    const setsValid = setsInput > 0;
    setIsStartButtonDisabled(!workIntervalValid || !setsValid);
  }, [workIntervalInput, restIntervalInput, setsInput]);
  // ================

  const handleStart = () => {
    router.push({
      pathname: "/IntervalTimerModal",
      params: {
        workIntervalInput,
        restIntervalInput,
        setsInput,
        includePreCountdown: includePreCountdown ? "true" : "false",
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      alwaysBounceVertical={false}
      className="flex-1 w-full"
    >
      <View className="flex flex-1 items-center justify-center p-6">
        <View className="w-full">
          <Text className="text-3xl text-primary mb-6">Configure Timer</Text>
          <CustomNumberInput
            label="Enter work interval"
            value={workIntervalInput}
            onChangeValue={setWorkIntervalInput}
          />
          <CustomNumberInput
            label="Enter rest interval"
            value={restIntervalInput}
            onChangeValue={setRestIntervalInput}
          />
          <CustomNumberInput
            label="Enter number of sets"
            value={setsInput}
            onChangeValue={setSetsInput}
          />
          <View className="flex w-full flex-row items-center justify-start mb-8">
            <Checkbox
              className="mr-2"
              value={includePreCountdown}
              onValueChange={setIncludePreCountdown}
            />
            <Text className="text-foreground">
              Include a 10-second countdown at the begining
            </Text>
          </View>
          <Pressable
            className="w-full items-center justify-center py-3 px-8 rounded-md bg-primary disabled:bg-gray-600 mb-6"
            onPress={handleStart}
            disabled={isStartButtonDisabled}
          >
            <Text className="text-white">Start Timer</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

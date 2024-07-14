import { useState } from "react";
import { View, Text } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

import { Icon } from "@rneui/themed";

type Props = {
  minute: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  second: number;
  setSecond: React.Dispatch<React.SetStateAction<number>>;
};

const TimeWodScore = ({ minute, setMinute, second, setSecond }: Props) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    let min = 0;
    if (hours && minutes) {
      min = hours * 60 + minutes;
    }
    setMinute(min);
    setSecond(seconds ?? 0);
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View className="flex flex-row justify-center items-center space-x-3">
        <Text style={{ color: "#202020", fontSize: 48 }}>
          {`${minute.toString().padStart(2, "0")} : ${second
            .toString()
            .padStart(2, "0")}`}
        </Text>
        <Icon
          onPress={() => setShowPicker(true)}
          name="edit"
          type="font-awesome-5"
          size={25}
        />
      </View>

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          formatTime(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Score"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        padWithNItems={1}
        hourLabel="hr"
        minuteLabel="min"
        secondLabel="sec"
        initialValue={{
          hours: Math.floor(minute / 60),
          minutes: minute,
          seconds: second,
        }}
        styles={{
          theme: "light",
          pickerItem: {
            fontSize: 22,
          },
          pickerLabel: {
            fontSize: 18,
            right: -30,
          },
          pickerLabelContainer: {
            width: 60,
          },
          pickerItemContainer: {
            width: 100,
          },
        }}
      />
    </View>
  );
};

export default TimeWodScore;
import { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Pressable, Alert } from "react-native";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

import { router, useLocalSearchParams } from "expo-router";
import TimerBox from "../../components/TimerBox";

export default function IntervalTimerModal() {
  const {
    includePreCountdown,
    restIntervalInput,
    setsInput,
    workIntervalInput,
  } = useLocalSearchParams();

  const restInterval = Number(restIntervalInput);
  const workInterval = Number(workIntervalInput);
  const sets = Number(setsInput);
  const includePre = includePreCountdown === "true";

  /**
   * State management
   */

  const [sound, setSound] = useState<Audio.Sound>();

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [workOrRest, setWorkOrRest] = useState<"work" | "rest">("work");
  const [preStartCountdown, setPreStartCountdown] = useState<number | null>(
    null
  );
  // ================

  /**
   * Ref management
   */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // ================

  /**
   * Sound and Vibrate management
   */
  type SoundFiles = {
    [key: string]: any; // Adjust the type based on the actual sound files if necessary
  };

  /**
   * If multiple sounds, you can add more to the @soundFiles object
   * The require function in JavaScript and React Native does not support dynamic file paths as arguments.
   * The path provided to require must be a static string known at compile time.
   */
  const soundFiles: SoundFiles = {
    beep: require("../../assets/beep.mp3"),
  };

  async function playSoundAndVibrate(soundFileKey: "beep") {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(soundFiles[soundFileKey]);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  // ================

  useEffect(() => {
    if (includePre) {
      startPreCountdown();
    } else {
      setTimerRunning(true);
      setTimeLeft(workInterval);
      setCurrentSet(1);
    }
  }, []);

  /**
   * Running timer
   */
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [timerRunning]);
  // ================

  /**
   * Timer logic
   */
  useEffect(() => {
    if (timeLeft === 0 && timerRunning) {
      playSoundAndVibrate("beep");
      if (restInterval === 0) {
        if (currentSet < sets) {
          setWorkOrRest("work");
          setTimeLeft(workInterval);
          setCurrentSet((prevSet) => prevSet + 1);
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            resetTimer();
          }
        }
      } else {
        if (workOrRest === "work") {
          if (currentSet <= sets) {
            setWorkOrRest("rest");
            setTimeLeft(restInterval);
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              resetTimer();
            }
          }
        } else if (workOrRest === "rest") {
          if (currentSet < sets) {
            setWorkOrRest("work");
            setTimeLeft(workInterval);
            setCurrentSet((prevSet) => prevSet + 1);
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              resetTimer();
            }
          }
        }
      }
    }
  }, [timeLeft]);
  // ================

  /**
   * Pre start countdown (10 to 0)
   */
  useEffect(() => {
    if (preStartCountdown !== null && preStartCountdown > 0) {
      const countdownInterval = setInterval(() => {
        setPreStartCountdown((prev) => (prev ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(countdownInterval);
    } else if (preStartCountdown === 0) {
      setPreStartCountdown(null);
      setTimerRunning(true);
      setTimeLeft(workInterval);
      setCurrentSet(1);
      setWorkOrRest("work");
    }
  }, [preStartCountdown]);

  const startPreCountdown = () => {
    setPreStartCountdown(10);
    const preCountdownInterval = setInterval(() => {
      setPreStartCountdown((prev) => {
        if (prev === 4 || prev === 3 || prev === 2) {
          playSoundAndVibrate("beep");
        }
        if (prev === 1) {
          clearInterval(preCountdownInterval);
          setPreStartCountdown(null);
          setTimerRunning(true);
          setTimeLeft(workInterval);
          setCurrentSet(1);
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);
  };
  // ================

  const goBack = () => {
    Alert.alert(
      "Are you sure you want to go back?",
      "This action will reset the timer.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            resetTimer();
          },
        },
      ]
    );
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setCurrentSet(1);
    setTimeLeft(0);
    setWorkOrRest("work");
    setPreStartCountdown(null);
    if (router.canGoBack()) {
      router.push("../");
    }
  };

  return (
    <SafeAreaView className="flex-1 w-full">
      <View className="flex-1 p-4 w-full">
        <Text className="w-full text-3xl text-foreground text-center">
          Interval Timer
        </Text>
        <View className="flex-1 justify-center items-center mt-8">
          {preStartCountdown !== null ? (
            <>
              <Text className="text-6xl text-red-500 mb-10 text-center">
                Starting in
              </Text>
              <TimerBox timeCounter={preStartCountdown} />
            </>
          ) : (
            <>
              <TimerBox timeCounter={timeLeft} />
              {currentSet <= sets && (
                <Text className="text-6xl text-primary mt-10">
                  Set: {currentSet} / {setsInput}
                </Text>
              )}
            </>
          )}
        </View>
        <Pressable
          className="w-full items-center justify-center py-3 px-8 rounded-md bg-primary mb-6"
          onPress={goBack}
        >
          <Text className="text-white">Cancel Timer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

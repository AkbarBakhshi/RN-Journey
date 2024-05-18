import {
  Pressable,
  TextInput,
  View,
  Animated,
  Keyboard,
  Easing,
  Platform,
} from "react-native";
import CustomText from "../../components/CustomText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useRef, useState } from "react";
import * as Linking from "expo-linking";

import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Chat() {
  const [chatText, setChatText] = useState("");
  const translateYRef = useRef(new Animated.Value(0)).current;
  const tabBarHeight = useBottomTabBarHeight();
  const [textInputHeight, setTextInputHeight] = useState(60);

  const handleSubmit = () => {
    console.log(chatText);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        const { height: newKeyboardHeight } = event.endCoordinates;
        Animated.timing(translateYRef, {
          toValue: tabBarHeight - newKeyboardHeight, // negative value of translateY means move up
          duration: event.duration,
          easing: Easing.bezier(0.33, 0.66, 0.66, 1),
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      (event) => {
        Animated.timing(translateYRef, {
          toValue: 0,
          duration: event.duration,
          easing: Easing.bezier(0.33, 0.66, 0.66, 1),
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleContentSizeChange = (event: {
    nativeEvent: { contentSize: { height: number } };
  }) => {
    setTextInputHeight(Math.max(event.nativeEvent.contentSize.height, 40));
  };

  return (
    <View className="flex-1 items-center justify-center">
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        className="flex-1 w-full"
      >
        <View className="flex-1 mt-3 mx-3 justify-center items-center">
          <Pressable
            onPress={() => {
              Linking.openURL("https://youtu.be/nt4UQ_mzDeI");
            }}
          >
            <CustomText className="text-3xl text-primary underline">
              AI Chatbot with Resposne Streaming
            </CustomText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <Animated.View
        style={{
          transform: [
            {
              translateY: Platform.OS === "ios" ? translateYRef : 0,
            },
          ],
        }}
        className="px-2 bg-white flex-row py-2 items-center"
      >
        <TextInput
          className="flex-1 border-2 rounded-xl border-gray-600 mr-4 px-3 max-h-20"
          multiline
          style={{ height: textInputHeight }}
          value={chatText}
          onChangeText={(text) => setChatText(text)}
          placeholder="Ask a question here"
          onContentSizeChange={handleContentSizeChange}
        />
        <Pressable
          className="items-center justify-center w-12 rounded-full p-2"
          onPress={handleSubmit}
        >
          <Feather name="send" size={20} color="blue" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

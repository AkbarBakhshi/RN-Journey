import { View, Text } from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import { useEffect, useState } from "react";

import { useColorScheme } from "nativewind";
import { MyLightTheme } from "../../../utilities/themeOptions";

import { useTheme } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { changeIcon } from 'react-native-change-icon';

export default function Profile() {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [selectedIndex, setSelectedIndex] = useState<ThemeOptions>("light");
  const toggleColorScheme = async (themeValue: ThemeOptions) => {
    setSelectedIndex(themeValue);
    setColorScheme(themeValue);
    await AsyncStorage.setItem("theme", themeValue);
    const icon = themeValue === "dark" ? "Dark" : themeValue === "light" ? "Light": "Default"
    changeIcon(icon)
  };

  useEffect(() => {
    const getTheme = async () => {
      try {
        const themeValue = (await AsyncStorage.getItem(
          "theme"
        )) as ThemeOptions;
        if (themeValue) {
          setSelectedIndex(themeValue);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTheme();
  }, []);

  const { colors } = useTheme();

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
  return (
    <View className="flex flex-1 items-center justify-center">
      <View className="flex-row mb-20">
        <CheckBox
          checked={selectedIndex === "light"}
          onPress={() => toggleColorScheme("light")}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Light"
          className="bg-background"
          checkedColor={MyLightTheme.colors.primary}
        />
        <CheckBox
          checked={selectedIndex === "dark"}
          onPress={() => toggleColorScheme("dark")}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Dark"
          checkedColor={colors.notification}
        />
        <CheckBox
          checked={selectedIndex === "system"}
          onPress={() => toggleColorScheme("system")}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="System"
          checkedColor={
            colorScheme == "dark"
              ? colors.notification
              : MyLightTheme.colors.primary
          }
        />
      </View>

      <Button
        loading={false}
        disabled={false}
        type="solid"
        title="Sign Out"
        color={colors.primary}
        onPress={handleSignOut}
        size="lg"
        radius="md"
      />
    </View>
  );
}

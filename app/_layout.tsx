import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

import "../global.css";
import { MyLightTheme } from "../utilities/themeOptions";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    const loadTheme = async () => {
      // await AsyncStorage.removeItem('theme');
      const stored = (await AsyncStorage.getItem("theme")) as ThemeOptions;
      if (stored) {
        setColorScheme(stored);
      } else {
        // Default to light if nothing or unexpected value is stored
        setColorScheme("light");
      }
    };

    loadTheme();
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : MyLightTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Drawer>
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: "Home",
                title: "",
              }}
            />
            <Drawer.Screen
              name="shop"
              options={{
                drawerLabel: "Shop",
                title: "Shop",
              }}
            />
            <Drawer.Screen
              name="settings"
              options={{
                drawerLabel: "Settings",
                title: "Settings",
              }}
            />
          </Drawer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

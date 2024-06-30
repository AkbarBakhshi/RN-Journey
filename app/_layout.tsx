import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  useFonts,
  Exo_400Regular,
  Exo_700Bold,
  Exo_900Black,
} from "@expo-google-fonts/exo";

import { Slot, SplashScreen } from "expo-router";

import "../global.css";
import { MyLightTheme } from "../utilities/themeOptions";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  const [fontsLoaded, fontError] = useFonts({
    Exo_400Regular,
    Exo_700Bold,
    Exo_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : MyLightTheme}>
      <Slot />
    </ThemeProvider>
  );
}

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SignIn from "../sign-in";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Alert } from "react-native";

export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setLoading(true);
    console.log("user: ", user);
    if (user) {
      auth()
        .currentUser?.reload()
        .then(() => {
          console.log("User reload:", user);
          setUser(user);
          setLoading(false);
        })
        .catch((e) => {
          // console.error(e);
          Alert.alert(
            "",
            "There is no user record corresponding to this identifier. The user may have been deleted."
          );
          setLoading(false);
        });
      // auth()
      //   .currentUser?.getIdTokenResult()
      //   .then((token) => {
      //     console.log("token:", token);
      //   });
    } else {
      setUser(null);
      setLoading(false);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (loading)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color="red" size="large" />
      </SafeAreaView>
    );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {user ? (
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
      ) : (
        <SignIn />
      )}
    </GestureHandlerRootView>
  );
}

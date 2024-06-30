import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function SignIn() {
  const { colors } = useTheme();

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then(() => {
        console.log("User account signed in!");
      })
      .catch((error) => {
        Alert.alert("Authentication failed", "Invalid Credentials entered. Please try again.")
        // console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 flex-col px-7 mt-44">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect
            keyboardType="email-address"
            onChangeText={setEnteredEmail}
            value={enteredEmail}
            // autoFocus
            blurOnSubmit
            placeholder="Enter email address"
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect
            keyboardType="default"
            secureTextEntry={true}
            value={enteredPassword}
            onChangeText={setEnteredPassword}
            blurOnSubmit
            placeholder="Enter password"
          />
          <Button
            loading={false}
            disabled={false}
            type="solid"
            title="Sign In"
            color={colors.primary}
            onPress={handleSignIn}
            size="lg"
            radius="md"
          />
          <Button
            type="clear"
            title="Forgot password?"
            titleStyle={{ color: colors.primary }}
            onPress={() => {
              router.push("/forgot-password");
            }}
          />
          <Button
            type="clear"
            title="Create an account"
            titleStyle={{ color: colors.primary }}
            onPress={() => {
              router.push("/sign-up");
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontFamily: "Exo_400Regular",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    flex: 1,
    marginBottom: 12,
  },
});

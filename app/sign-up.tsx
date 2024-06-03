import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function SignUp() {
  const { colors } = useTheme();

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
      .then(() => {
        console.log("User account created & signed in!");
        router.replace('/')
      })
      .catch((error) => {
        let errorText = '';
        if (error.code === "auth/email-already-in-use") {
          errorText = "That email address is already in use!";
        }

        if (error.code === "auth/invalid-email") {
          errorText = "That email address is invalid!";
        }
        Alert.alert("Account creation failed", errorText)
        
        console.error(error);
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
            title="Sign Up"
            color={colors.primary}
            onPress={handleSignUp}
            size="lg"
            radius="md"
          />
          <Button
            type="clear"
            title="Already have an account? Sign in here"
            titleStyle={{ color: colors.primary }}
            onPress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
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

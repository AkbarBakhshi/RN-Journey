import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function ForgotPassword() {
  const { colors } = useTheme();

  const [enteredEmail, setEnteredEmail] = useState("");

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(enteredEmail)
      .then(() => {
        Alert.alert("Email sent", "Please check your email for a link to reset your password.")
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
          <Button
            loading={false}
            disabled={false}
            type="solid"
            title="Submit"
            color={colors.primary}
            onPress={handleForgotPassword}
            size="lg"
            radius="md"
          />
          <Button
            type="clear"
            title="Back to login"
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

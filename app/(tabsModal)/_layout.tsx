import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IntervalTimerModal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "fullScreenModal",
          headerShown: false
        }}
      />
    </Stack>
  );
}
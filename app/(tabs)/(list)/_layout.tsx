import { Stack } from "expo-router";

export default function ListLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="listDetails" options={{ headerShown: false }} />
    </Stack>
  );
}

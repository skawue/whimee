import { Stack } from "expo-router";

export default function MapDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={({
          route,
        }: {
          route: { params?: { headerName?: string } };
        }) => ({ title: route.params?.headerName ?? "" })}
      />
    </Stack>
  );
}

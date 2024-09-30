import { Stack } from "expo-router";

export default function ListDetailsLayout() {
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

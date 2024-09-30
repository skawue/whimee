import { useAppSelector } from "@/state/hooks";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(map)/index",
};

export default function TabLayout() {
  const user = useAppSelector((state) => state.user);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(create)"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(list)"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(map)"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

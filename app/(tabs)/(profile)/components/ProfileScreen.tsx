import { StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import WhimeeButton from "@/components/common/WhimeeButton";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile: {user.name}</Text>
      <WhimeeButton
        text="Logout"
        onPress={() => {
          // dispatch(
          // logoutAction()
          // );
        }}
        disabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

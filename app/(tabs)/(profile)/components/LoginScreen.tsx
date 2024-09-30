import { StyleSheet, View, Text, TextInput } from "react-native";
import { useAppDispatch } from "@/state/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import WhimeeButton from "@/components/common/WhimeeButton";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [errorInForm, setErrorInForm] = useState(true);

  useEffect(() => {
    if (login.trim() === "") {
      setErrorInForm(true);

      return;
    }
    if (password.trim().length < 8) {
      setErrorInForm(true);

      return;
    }

    setErrorInForm(false);
  }, [login, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Join</Text>
      <TextInput
        style={{ fontSize: 18 }}
        placeholder="Login"
        value={login}
        onChangeText={(value) => setLogin(value)}
        autoCapitalize="none"
      />
      <View style={styles.searchSection}>
        {hidePass ? (
          <Ionicons name="eye" onPress={() => setHidePass(!hidePass)} />
        ) : (
          <Ionicons name="eye-off" onPress={() => setHidePass(!hidePass)} />
        )}
        <TextInput
          secureTextEntry={hidePass ? true : false}
          style={{ fontSize: 18 }}
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
        />
      </View>
      <WhimeeButton
        text="Join"
        disabled={errorInForm}
        onPress={() => {
          // dispatch(
          // loginAction({
          // login,
          // password,
          // })
          // );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import LoginScreen from "./components/LoginScreen";

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.user);

  return <>{user.name === "" ? <LoginScreen /> : <ProfileScreen />}</>;
}

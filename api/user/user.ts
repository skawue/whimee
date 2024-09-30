import { USER_ID } from "@/constants/userId";
import { axios } from "../axios";

export async function getUser() {
  const { data } = await axios.get("/user", {
    params: {
      userId: USER_ID,
    },
  });

  return data;
}

export async function updateUser(
  name: string,
  createdEvents: number[],
  favouriteEventIds: number[],
  selectedEventTypes: string[],
  selectedDistance: number
) {
  const { data } = await axios.put("/user/" + USER_ID, {
    name: name,
    createdEvents: createdEvents,
    favouriteEventIds: favouriteEventIds,
    selectedEventTypes: selectedEventTypes,
    selectedDistance: selectedDistance,
  });

  return data;
}

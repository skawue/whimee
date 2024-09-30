import { USER_ID } from "@/constants/userId";
import { axios } from "../axios";
import { LatLng } from "react-native-maps";
import { WhimeeEvent } from "@/state/events/WhimeeEvent";
import { WhimeeUser } from "@/state/user/WhimeeUser";

export async function getEvents(
  coords: LatLng,
  distance: number,
  types: string[],
  sortBy: string,
  onlyFavs: boolean
) {
  const { data } = await axios.get("/events", {
    params: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      distance: distance,
      types: types,
      sortBy: sortBy,
      onlyFavs: onlyFavs,
      userId: USER_ID,
    },
  });

  return data;
}

export async function getEvent(eventId: number) {
  const { data } = await axios.get("/event", {
    params: {
      eventId: eventId,
    },
  });

  return data;
}

export async function createEvent(event: WhimeeEvent, user: WhimeeUser) {
  const { data } = await axios.post("/event", {
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    locationlat: event.locationLat,
    locationlong: event.locationLong,
    type: event.type,
    user: user,
  });

  return data;
}

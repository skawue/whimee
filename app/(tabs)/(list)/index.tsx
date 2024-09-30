import { EventTypeFilters } from "@/components/common/EventTypeFilters";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { StyleSheet, Text } from "react-native";
import { getUser } from "@/state/user/userSlice";
import { getEventAction } from "@/state/events/eventsSlice";
import { useEffect } from "react";
import { useLocationCollection } from "@/hooks/useLocationCollection";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventFilters } from "@/components/common/EventFilters";
import EventsList from "./components/EventList";

export default function ListScreen() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const { selectedDistance, selectedEventTypes } = useAppSelector(
    (state) => state.user
  );
  const filter = useAppSelector((state) => state.filter);
  const { currentLocation, errorMsg } = useLocationCollection();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (currentLocation === null) return;

    dispatch(
      getEventAction(
        currentLocation,
        selectedDistance,
        selectedEventTypes,
        filter.sortBy,
        filter.onlyFavs
      )
    );
  }, [currentLocation, selectedEventTypes, filter, selectedDistance]);

  return (
    <SafeAreaView style={styles.container}>
      <EventFilters />

      {events.length > 0 && <EventsList />}
      {events.length === 0 && <Text>No events found</Text>}

      <EventTypeFilters />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

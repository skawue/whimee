import { StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getEventAction } from "@/state/events/eventsSlice";
import { getUser } from "@/state/user/userSlice";
import { WhimeeMap } from "./components/WhimeeMap";
import { EventTypeFilters } from "@/components/common/EventTypeFilters";
import { useLocationCollection } from "@/hooks/useLocationCollection";
import { EventFilters } from "@/components/common/EventFilters";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const dispatch = useAppDispatch();
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
  }, [currentLocation, selectedDistance, selectedEventTypes, filter]);

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {currentLocation && <WhimeeMap currentLocation={currentLocation} />}
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <EventFilters />
        </SafeAreaView>
      </View>

      {!currentLocation && errorMsg && <Text>errorMsg</Text>}

      <EventTypeFilters />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});

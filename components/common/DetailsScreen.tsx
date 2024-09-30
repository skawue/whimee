import { getFormattedTime, getReadableDateTime } from "@/constants/date";
import { getEvent } from "@/state/event/eventSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ALL_WHIMEE_TYPES, WhimeeIcon } from "../Icons";
import { WhimeeEventTypeColor } from "@/state/events/WhimeeEvent";

export default function ListDetailsScreen() {
  const dispatch = useAppDispatch();
  const event = useAppSelector((state) => state.event.event);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    dispatch(getEvent(Number(id)));
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: event.locationLat ?? 0,
          longitude: event.locationLong ?? 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: event.locationLat ?? 0,
            longitude: event.locationLong ?? 0,
          }}
        />
      </MapView>

      <View style={styles.eventNameContent}>
        <Text style={{ fontSize: 18 }}>{event.name}</Text>
      </View>
      <View>
        <View style={styles.startDateContent}>
          <Text>{getReadableDateTime(event.startDate)}</Text>
        </View>
        <View style={styles.startDateContent}>
          <Text>{getFormattedTime(event.startDate)}</Text>
        </View>
        <Text>-</Text>
        <View style={styles.endDateContent}>
          <Text>{getReadableDateTime(event.endDate)}</Text>
        </View>
        <View style={styles.startDateContent}>
          <Text>{getFormattedTime(event.endDate)}</Text>
        </View>
      </View>
      <View style={styles.eventDescriptionContainer}>
        <Text>{event.description}</Text>
      </View>

      {ALL_WHIMEE_TYPES.filter((type) => type === event.type).map((type) => (
        <WhimeeIcon
          key={type}
          type={type}
          size={48}
          color={WhimeeEventTypeColor[type]}
        />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  map: {
    position: "absolute",
    width: "100%",
    height: 300,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 20,
    bottom: 0,
  },
  eventNameContent: {
    flex: 1,
    minHeight: 60,
    margin: 16,
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
  },
  startDateContent: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  startTimeContent: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  endDateContent: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  endTimeContent: {
    margin: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  eventDescriptionContainer: {
    flex: 1,
    minHeight: 120,
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
  },
  eventTypeContainer: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

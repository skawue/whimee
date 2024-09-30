import { ALL_WHIMEE_TYPES, WhimeeIcon } from "@/components/Icons";
import {
  WhimeeEventType,
  WhimeeEventTypeColor,
} from "@/state/events/WhimeeEvent";
import { createRef, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createEvent } from "@/state/event/eventSlice";
import MapView, { LatLng, Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { UNSELECTED_COLOR } from "@/constants/color";
import { useLocationCollection } from "@/hooks/useLocationCollection";
import { Ionicons } from "@expo/vector-icons";
import WhimeeButton from "@/components/common/WhimeeButton";
import DateTime from "./components/DateTime";

export default function CreateScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const event = useAppSelector((state) => state.event.event);
  const mapRef = createRef<MapView>();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<WhimeeEventType>(
    WhimeeEventType.Sport
  );
  const [errorInForm, setErrorInForm] = useState(true);
  const { currentLocation, errorMsg } = useLocationCollection();
  const [eventLocation, setEventLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (currentLocation === null) return;
    if (eventLocation !== null) return;

    mapRef?.current?.animateCamera({
      center: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
    });

    setEventLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (name === "" || description === "") {
      setErrorInForm(true);

      return;
    }

    if (startDate <= endDate) {
      setErrorInForm(true);

      return;
    }

    setErrorInForm(false);
  }, [name, startDate, endDate, description]);

  useEffect(() => {
    if (event != null) {
      ToastAndroid.show("Event created!", ToastAndroid.SHORT);

      setName("");
      setStartDate(new Date());
      setEndDate(new Date());
      setDescription("");
      setSelectedEventType(WhimeeEventType.Sport);
    }
  }, [event]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          rotateEnabled={false}
          initialRegion={{
            latitude: eventLocation?.latitude ?? 0,
            longitude: eventLocation?.longitude ?? 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onPress={(event) => {
            setEventLocation(event.nativeEvent.coordinate);
          }}
          onMarkerPress={(event) => {
            setEventLocation(event.nativeEvent.coordinate);
          }}
          onPoiClick={(event) => {
            setEventLocation(event.nativeEvent.coordinate);
          }}
        >
          {eventLocation && (
            <Marker coordinate={eventLocation}>
              <Ionicons name="location-sharp" size={36} color={"#1a66ff"} />
            </Marker>
          )}
        </MapView>
        <LinearGradient
          colors={["transparent", "rgba(240, 240, 240, 1)"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.eventNameContent}>
          <TextInput
            style={{ fontSize: 18 }}
            placeholder="Type event name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <DateTime
          label="Start date"
          value={startDate}
          onDateTimeChange={(date) => setStartDate(date)}
        />
        <DateTime
          label="End date"
          value={endDate}
          onDateTimeChange={(date) => setEndDate(date)}
        />
        <View style={styles.eventDescriptionContainer}>
          <TextInput
            placeholder="Type event description"
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>
        <View style={styles.eventTypeContainer}>
          {ALL_WHIMEE_TYPES.map((type) => (
            <WhimeeIcon
              key={type}
              type={type}
              size={selectedEventType === type ? 48 : 32}
              color={
                selectedEventType === type
                  ? WhimeeEventTypeColor[type]
                  : UNSELECTED_COLOR
              }
              onPress={() => {
                setSelectedEventType(type);
              }}
            />
          ))}
        </View>
        <WhimeeButton
          text="Create event"
          disabled={errorInForm}
          onPress={() => {
            dispatch(
              createEvent({
                event: {
                  id: -1,
                  name: name,
                  type: selectedEventType,
                  description: description,
                  startDate: startDate.getMilliseconds(),
                  endDate: endDate.getMilliseconds(),
                  locationLat: 0.0,
                  locationLong: 0.0,
                },
                user: {
                  id: user.id,
                  name: user.name,
                  createdEvents: user.createdEvents,
                  favouriteEventIds: user.favouriteEventIds,
                  selectedEventTypes: user.selectedEventTypes,
                  selectedDistance: user.selectedDistance,
                },
              })
            );
          }}
        />
      </View>
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
    height: 200,
  },
  map: {
    position: "absolute",
    width: "100%",
    height: 200,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 10,
    bottom: 0,
  },
  eventNameContent: {
    minHeight: 60,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "white",
  },
  eventDescriptionContainer: {
    flex: 1,
    minHeight: 120,
    marginHorizontal: 16,
    marginVertical: 8,
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
  nowButton: {
    height: 24,
    width: 50,
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    height: "100%",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlignVertical: "center",
  },
});

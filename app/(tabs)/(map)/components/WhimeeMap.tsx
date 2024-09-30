import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import { WhimeeEvent, WhimeeEventTypeColor } from "@/state/events/WhimeeEvent";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/state/hooks";
import { distanceInLatLng as calculateDistanceInLatLng } from "@/constants/distance";
import { EventFilters } from "@/components/common/EventFilters";

type MapProps = {
  currentLocation: LatLng | null;
};

export const WhimeeMap = (props: MapProps) => {
  const events = useAppSelector((state) => state.events.events);
  const user = useAppSelector((state) => state.user);
  const { currentLocation } = props;
  const [distanceInLatLng, setDistanceInLatLng] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    setDistanceInLatLng(
      calculateDistanceInLatLng(
        currentLocation?.latitude ?? 0,
        user.selectedDistance
      )
    );
  }, [currentLocation, user.selectedDistance]);

  return (
    <MapView
      rotateEnabled={false}
      initialRegion={{
        latitude: currentLocation?.latitude ?? 0,
        longitude: currentLocation?.longitude ?? 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      minZoomLevel={8}
      maxZoomLevel={20}
      cameraZoomRange={{
        minCenterCoordinateDistance: 8,
        maxCenterCoordinateDistance: 20,
      }}
      style={styles.map}
    >
      {currentLocation && (
        <Marker coordinate={currentLocation}>
          <Ionicons name="location-sharp" size={36} color={"#1a66ff"} />
        </Marker>
      )}
      {currentLocation && (
        <Polygon
          coordinates={[
            {
              latitude: currentLocation.latitude + distanceInLatLng.latitude,
              longitude: currentLocation.longitude - distanceInLatLng.longitude,
            },
            {
              latitude: currentLocation.latitude + distanceInLatLng.latitude,
              longitude: currentLocation.longitude + distanceInLatLng.longitude,
            },
            {
              latitude: currentLocation.latitude - distanceInLatLng.latitude,
              longitude: currentLocation.longitude + distanceInLatLng.longitude,
            },
            {
              latitude: currentLocation.latitude - distanceInLatLng.latitude,
              longitude: currentLocation.longitude - distanceInLatLng.longitude,
            },
            {
              latitude: currentLocation.latitude + distanceInLatLng.latitude,
              longitude: currentLocation.longitude - distanceInLatLng.longitude,
            },
          ]}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      )}
      {events.length > 0 &&
        events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.locationLat,
              longitude: event.locationLong,
            }}
            onPress={() => {
              router.navigate({
                pathname: "/mapDetails/[id]",
                params: { id: event.id, headerName: event.name },
              });
            }}
          >
            {user.favouriteEventIds.includes(event.id) && (
              <MaterialCommunityIcons
                name="cards-heart"
                size={24}
                color={
                  WhimeeEventTypeColor[
                    event.type as keyof typeof WhimeeEventTypeColor
                  ]
                }
              />
            )}

            {!user.favouriteEventIds.includes(event.id) && (
              <Octicons
                name="dot-fill"
                size={36}
                color={
                  WhimeeEventTypeColor[
                    event.type as keyof typeof WhimeeEventTypeColor
                  ]
                }
              />
            )}
          </Marker>
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});

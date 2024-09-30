import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";

export function useLocationCollection() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync();
      let latLng = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setCurrentLocation(latLng);
    })();
  }, []);

  return {
    currentLocation,
    errorMsg,
  };
}

export function distanceInLatLng(latitude: number, distance: number) {
  const distanceLat = distance / 111320.0;
  const distanceLong = distanceLat / Math.cos(latitude * 0.01745);

  return { latitude: distanceLat, longitude: distanceLong };
}

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as EventsApi from "../../api/events/events";
import { LatLng } from "react-native-maps";
import { WhimeeEvent } from "./WhimeeEvent";

interface EventsState {
  events: WhimeeEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async ({
    locationCoords,
    distance,
    types,
    sortBy,
    onlyFavs,
  }: {
    locationCoords: LatLng;
    distance: number;
    types: string[];
    sortBy: string;
    onlyFavs: boolean;
  }) => {
    const data = EventsApi.getEvents(
      locationCoords,
      distance,
      types,
      sortBy,
      onlyFavs
    );

    return data;
  }
);

export function getEventAction(
  location: LatLng,
  distance: number,
  types: string[],
  sortBy: string,
  onlyFavs: boolean
) {
  return getEvents({
    locationCoords: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    distance: distance,
    types: types,
    sortBy: sortBy,
    onlyFavs: onlyFavs,
  });
}

export default eventsSlice.reducer;

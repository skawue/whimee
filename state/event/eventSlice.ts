import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as EventsApi from "../../api/events/events";
import { LocationObjectCoords } from "expo-location";
import { WhimeeEvent } from "../events/WhimeeEvent";
import { WhimeeUser } from "../user/WhimeeUser";

interface EventState {
  event: WhimeeEvent;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventState = {
  event: {} as WhimeeEvent,
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const getEvent = createAsyncThunk(
  "events/getEvent",
  async (eventId: number) => {
    const data = EventsApi.getEvent(eventId);

    return data;
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async ({ event, user }: { event: WhimeeEvent; user: WhimeeUser }) => {
    const data = EventsApi.createEvent(event, user);

    return data;
  }
);

export default eventSlice.reducer;

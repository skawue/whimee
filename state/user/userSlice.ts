import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "../../api/user/user";
import { RootState } from "../store";
import { WhimeeUser } from "./WhimeeUser";
import { USER_ID } from "@/constants/userId";

interface UserState {
  id: number;
  name: string;
  createdEvents: number[];
  favouriteEventIds: number[];
  selectedEventTypes: string[];
  selectedDistance: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  id: USER_ID,
  name: "",
  createdEvents: [],
  favouriteEventIds: [],
  selectedEventTypes: [],
  selectedDistance: 0,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.createdEvents = action.payload.createdEvents;
        state.favouriteEventIds = action.payload.favouriteEventIds;
        state.selectedEventTypes = action.payload.selectedEventTypes;
        state.selectedDistance = action.payload.selectedDistance;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(updateSelectedEventTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSelectedEventTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedEventTypes = action.payload.selectedEventTypes;
      })
      .addCase(updateSelectedEventTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(updateSelectedDistance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSelectedDistance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedDistance = action.payload.selectedDistance;
      })
      .addCase(updateSelectedDistance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(changeFavouriteEventId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeFavouriteEventId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favouriteEventIds = action.payload.favouriteEventIds;
      })
      .addCase(changeFavouriteEventId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  const data = UserApi.getUser();

  return data;
});

export const updateSelectedEventTypes = createAsyncThunk(
  "user/updateSelectedEventTypes",
  async (selectedEventTypes: string[], { getState }) => {
    const user = (getState() as RootState).user;

    const data = UserApi.updateUser(
      user.name,
      user.createdEvents,
      user.favouriteEventIds,
      selectedEventTypes,
      user.selectedDistance
    );

    return data;
  }
);

export const updateSelectedDistance = createAsyncThunk(
  "user/updateSelectedDistance",
  async (selectedDistance: number, { getState }) => {
    const user = (getState() as RootState).user;

    const data = UserApi.updateUser(
      user.name,
      user.createdEvents,
      user.favouriteEventIds,
      user.selectedEventTypes,
      selectedDistance
    );

    return data;
  }
);

export const changeFavouriteEventId = createAsyncThunk(
  "user/addFavouriteEventId",
  async (favouriteEventId: number, { getState }) => {
    const user = (getState() as RootState).user;

    let newFavouriteEventIds = user.favouriteEventIds.includes(favouriteEventId)
      ? user.favouriteEventIds.filter((id) => id !== favouriteEventId)
      : user.favouriteEventIds.concat(favouriteEventId);

    const data = UserApi.updateUser(
      user.name,
      user.createdEvents,
      newFavouriteEventIds,
      user.selectedEventTypes,
      user.selectedDistance
    );

    return data;
  }
);

export default userSlice.reducer;

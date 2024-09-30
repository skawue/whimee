import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  sortBy: "distance" | "time";
  onlyFavs: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FilterState = {
  sortBy: "distance",
  onlyFavs: false,
  status: "idle",
  error: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOnlyFavs: (state, action) => {
      state.onlyFavs = action.payload;
    },
  },
});

export const { setSortBy, setOnlyFavs } = filterSlice.actions;

export default filterSlice.reducer;

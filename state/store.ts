import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events/eventsSlice";
import eventReducer from "./event/eventSlice";
import userReducer from "./user/userSlice";
import filterReducer from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    event: eventReducer,
    user: userReducer,
    filter: filterReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

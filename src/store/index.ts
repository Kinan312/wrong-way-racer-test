import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./reducers/PlayersReducers";

const store = configureStore({
  reducer: {
    plReducer: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

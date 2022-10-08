import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  newEnemy: any[];
  players: any[];
  status: string;
  newChatJoin: any[];
  newChat: any[];
}

const initialState: PlayerState = {
  players: [],
  newEnemy: [],
  status: "",
  newChatJoin: [],
  newChat: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    getPlayersInfoSuccess(state, action: PayloadAction<string>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    getPlayersInfoFail(state, action) {
      return {
        ...state,
      };
    },
  },
});

export const { getPlayersInfoSuccess, getPlayersInfoFail } =
  playersSlice.actions;

export default playersSlice.reducer;

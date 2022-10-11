import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Paths } from "../../assets/Constants";

interface PlayerState {
  newEnemy: any[];
  players: any[];
  status: string;
  newChatJoin: any[];
  newChat: any[];
  prevPath: string;
}

let initialState: PlayerState = {
  players: [],
  newEnemy: [],
  status: "",
  newChatJoin: [],
  newChat: [],
  prevPath: Paths.CENTER,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    getPlayersInfoSuccess(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    getPlayersInfoFail(state, action) {
      return {
        ...state,
      };
    },
    changePathState: (state, action) => {
      return {
        ...state,
        prevPath: action.payload,
      };
    },
  },
});

export const { getPlayersInfoSuccess, getPlayersInfoFail, changePathState } =
  playersSlice.actions;

export default playersSlice.reducer;

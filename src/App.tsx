import { useState } from "react";

import "./styles/App.css";
import {
  Button,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import GameContainer from "./components/GameContainer";
import { socket } from "./socket-io/socket";
import { Constants } from "./assets/Constants";
import ChatContainer from "./components/ChatContainer";
import { PlayerModel } from "./interfaces/playersInterface";
import PlayersList from "./components/PlayersList";
import RatingContainer from "./components/RatingContainer";

let theme = createTheme({
  typography: {
    fontFamily: ["Saira"].join(","),
  },
});
theme = responsiveFontSizes(theme);
function App() {
  const [chatList, setChatList] = useState<any>([]);
  const [playersList, setPlayersList] = useState<PlayerModel[]>([]);
  const [newEnemy, setNewEnemy] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [isGameSarted, setIsGameStarted] = useState(false);

  const startPlaying = () => {
    socket.onAny((eventName, ...args) => {
      switch (eventName) {
        case Constants.PLAYERS_LIST:
          return setPlayersList(args[0]);
        case Constants.NEW_CHAT:
          return setChatList((prev: any[]) => [...prev, args[0]]);
        case Constants.NEW_CHAT_JOIN:
          return setChatList((prev: any[]) => [...prev, args[0]]);
        case Constants.NEW_ENEMY:
          return setNewEnemy(args[0]);

        default:
          break;
      }
    });

    return setIsGameStarted(true);
  };

  const handleMessage = (event: any) => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    socket.emit(Constants.NEW_CHAT, {
      text: message,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    return setMessage("");
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box className="gameContainer ">
          <GameContainer newEnemy={newEnemy} />
        </Box>
        <div className="infoContainer">
          <div className="container rating">
            <RatingContainer playersList={playersList} />
          </div>
          <div className="playersContainer">
            <ChatContainer chatList={chatList} />
            <Grid container spacing={1} className="input-container">
              <Grid item xs={8} className="text-input">
                <TextField
                  hiddenLabel
                  fullWidth
                  id="standard-basic"
                  className="text-input"
                  variant="standard"
                  value={message}
                  onChange={handleMessage}
                />
              </Grid>
              <Grid item xs={3} className="btnContainer">
                <Button
                  variant="contained"
                  className="sendBtn"
                  onClick={() => sendMessage()}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className="container players">
            <PlayersList playersList={playersList} />
          </div>
        </div>

        {!isGameSarted ? (
          <div className="startBtnContainer">
            <Button
              className="startBtn"
              onClick={() => startPlaying()}
              variant="contained"
            >
              Start
            </Button>
          </div>
        ) : null}
      </div>
    </ThemeProvider>
  );
}

export default App;

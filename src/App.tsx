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
  Tabs,
  Tab,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import GameContainer from "./components/GameContainer";
import { socket } from "./socket-io/socket";
import { Constants } from "./assets/Constants";
import ChatContainer from "./components/ChatContainer";
import { PlayerModel } from "./interfaces/playersInterface";
import PlayersList from "./components/PlayersList";
import RatingContainer from "./components/RatingContainer";
import { TabPanelProps } from "./interfaces/tabPanel";

let theme = createTheme({
  typography: {
    fontFamily: ["Saira"].join(","),
  },
  palette: {
    secondary: {
      main: "#FFFFFF",
    },
  },
});
theme = responsiveFontSizes(theme);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [chatList, setChatList] = useState<any>([]);
  const [playersList, setPlayersList] = useState<PlayerModel[]>([]);
  const [newEnemy, setNewEnemy] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [isGameSarted, setIsGameStarted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box className="gameContainer ">
          <GameContainer newEnemy={newEnemy} isMobile={isTabletOrMobile} />
        </Box>
        <div className="infoContainer">
          {isDesktopOrLaptop && (
            <>
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
                      <p className="textBtn">Send</p>
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className="container players">
                <PlayersList playersList={playersList} />
              </div>
            </>
          )}

          {isTabletOrMobile && (
            <Box sx={{ width: "100%" }} className="players tabContainer">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor={"secondary"}
                  aria-label="basic tabs example"
                >
                  <Tab label="Chat" {...a11yProps(0)} />
                  <Tab label="Players Lists" {...a11yProps(1)} />
                  <Tab label="Record" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <div className="smallPalyerContainer">
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
                        <p className="textBtn">Send</p>
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <div className="smallContainer players">
                  <PlayersList playersList={playersList} />
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <div className="smallContainer rating">
                  <RatingContainer
                    playersList={playersList}
                    isMobile={isTabletOrMobile}
                  />
                </div>
              </TabPanel>
            </Box>
          )}
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

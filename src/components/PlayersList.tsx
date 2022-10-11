import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Grid,
  Avatar,
} from "@mui/material";
import "../styles/PlayersList.css";
import { PlayerModel } from "../interfaces/playersInterface";
import SettingsDialog from "./SettingsDialog";

function PlayersList(props: any) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <div className="playersTitle">
        <Typography>Players</Typography>
        <Typography>{props.playersList.length}</Typography>
      </div>

      <Grid item xs={10} className="settingsBtnContainer">
        <Button
          variant="contained"
          className="sendBtn settingBtn"
          onClick={() => handleClickOpen()}
        >
          Settings
        </Button>
      </Grid>
      <List className="listItem">
        {props.playersList.length > 0
          ? props.playersList.map((item: PlayerModel, index: number) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={`${item.avatar}`}
                      srcSet={`${item.avatar}`}
                      loading="lazy"
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItem>
            ))
          : null}
      </List>
      <SettingsDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

export default PlayersList;

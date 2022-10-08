import { Box, ListItemText, List } from "@mui/material";

import "../styles/ChatContainer.css";
import { PlayerModel } from "../interfaces/playersInterface";

function ChatContainer(props: any) {
  console.log("itemitemitem", props.chatList);
  return (
    <Box className="innerContainer">
      <List className="listItem">
        {props.chatList.length > 0
          ? props.chatList.map((item: PlayerModel, index: number) =>
              item && item.name ? (
                <ListItemText
                  className="newJoined"
                  key={index}
                  primary={`${item.name} Has joined The Game`}
                />
              ) : (
                <ListItemText
                  className="newMessage"
                  key={index}
                  primary={`${item}`}
                />
              )
            )
          : null}
      </List>
    </Box>
  );
}

export default ChatContainer;

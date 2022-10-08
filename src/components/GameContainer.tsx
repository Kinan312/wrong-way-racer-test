import { CardMedia, Card } from "@mui/material";
import "../styles/GameContainer.css";
import skyImg from "../assets/sky.png";
import landImg from "../assets/road.png";

function GameContainer(props: any) {
  return (
    <Card sx={{ maxWidth: "90%", width: "90%", borderRadius: "12px" }}>
      <CardMedia
        className="skyImg"
        height={"200"}
        component="img"
        image={skyImg}
        alt="sky"
      />

      <CardMedia
        className="roadImg"
        height={"50%"}
        component="img"
        image={landImg}
        alt="road"
      />
      <div className="mountain"></div>
      <div className="mountainLeft"></div>

      <div className="mountainRight"></div>

      <div className="planetLeft"></div>

      <div className="planetRight"></div>

      <div className="carCenter"></div>
    </Card>
  );
}

export default GameContainer;

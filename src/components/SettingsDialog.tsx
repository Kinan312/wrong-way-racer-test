import {
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Typography,
  Button,
  Slider,
  Switch,
} from "@mui/material";

import "../styles/SettingsDialog.css";
import CloseIcon from "@mui/icons-material/Close";

function SettingsDialog(props: any) {
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
  ];
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle marginBottom={5}>
        <Button onClick={props.handleClose}>
          <CloseIcon className="closeIcon" />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div className="inlineField">
          <Typography color={"#fff"}>Enter Your Name</Typography>
          <TextField autoFocus id="name" type="text" variant="standard" />
        </div>

        <div className="inlineField">
          <Typography color={"#fff"}>Speed Of The Game</Typography>
          <Slider
            className="slider"
            aria-label="Temperature"
            defaultValue={2}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={1}
            max={6}
          />
        </div>

        <div className="inlineField toggle">
          <Typography color={"#fff"} marginRight={10}>
            Your ID Show Public
          </Typography>
          <Switch defaultChecked color="warning" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;

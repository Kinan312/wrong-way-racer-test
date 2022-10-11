import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import "../styles/RatingContainer.css";

function RatingContainer(props: any) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#9747FF",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor: "#180C3C",
      color: "#FFFFFF",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader={props.isMobile ? false : true}
        sx={{ minWidth: 360 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell
              className={`${props.isMobile ? "smContainer" : ""}`}
            >
              <div className="tableHead">
                <Typography
                  fontSize={40}
                  fontWeight={900}
                  lineHeight={1}
                  className="textShadow"
                >
                  5:44
                </Typography>
                <Typography fontSize={15}>Your Last Record</Typography>
              </div>
            </StyledTableCell>
            <StyledTableCell
              align="right"
              colSpan={9}
              className={`${props.isMobile ? "smContainer start" : ""}`}
            >
              <div
                className={`tableHead ${
                  props.isMobile ? "smCircleContainer" : "circleContainer"
                }`}
              >
                <Typography
                  fontSize={props.isMobile ? 12 : 18}
                  fontWeight={900}
                >
                  # 144
                </Typography>
                <Typography fontSize={9}>From 15K</Typography>
              </div>
            </StyledTableCell>
            {props.isMobile && (
              <StyledTableCell align="right"></StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.playersList.map((item: any) => (
            <StyledTableRow>
              <StyledTableCell component="th" className="shadow" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="tableHead recordCell">
                  <Typography
                    fontSize={14}
                    color={"#8375AD"}
                    className="textShadow"
                  >
                    Record
                  </Typography>
                  <Typography fontSize={28} color={"#fff"} fontWeight={900}>
                    {item.record}
                  </Typography>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right" width={"6vw"}>
                <div className="tableHead">
                  <Typography
                    fontSize={14}
                    color={"#8375AD"}
                    className="textShadow"
                  >
                    Rank
                  </Typography>
                  <Typography color={"#fff"} fontSize={28} fontWeight={900}>
                    {item.rank}
                  </Typography>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(RatingContainer);

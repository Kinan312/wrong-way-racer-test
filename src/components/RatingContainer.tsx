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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

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
      <Table sx={{ minWidth: 360 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div className="tableHead">
                <Typography
                  fontSize={40}
                  fontWeight={900}
                  className="textShadow"
                >
                  5:44
                </Typography>
                <Typography fontSize={15}>Your Last Record</Typography>
              </div>
            </StyledTableCell>
            <StyledTableCell align="right" width={1}></StyledTableCell>
            <StyledTableCell align="right">
              <div className="tableHead circleContainer">
                <Typography fontSize={14} fontWeight={900}>
                  # 144
                </Typography>
                <Typography fontSize={9}>From 15K</Typography>
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.playersList.map((item: any) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" className="shadow" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="tableHead">
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
              <StyledTableCell align="right">
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

export default RatingContainer;

import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  ButtonBase,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:   "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 0,
  boxShadow: 0,
  height: 60,
  color: theme.palette.text.secondary,
}));

export const LayoutItem = ({ columns ,handle }) => {

  return (
    <Grid
      container
      xs={12}
      spacing={1}
      sx={{
        margin: 1,
        width: 140,
        p:1,
        ":hover": {
            boxShadow: 1,
            bgcolor: "#1A2027",
            color: "#1A2027",
            borderRadius: 1,
          },
      }}
      onClick={()=>handle(columns)}
    >
      {columns.map((column, index) => {
        return (
          <Grid
            item
            xs={column}
          >
            <Item></Item>
          </Grid>
        );
      })}
    </Grid>
  );
};
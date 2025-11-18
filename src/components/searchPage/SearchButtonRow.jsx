import SubmitButton from "../SubmitButton";
import { Grid } from "@mui/material";

export default function SearchButtonRow() {
  return (
    <Grid container justifyContent="center" sx={{ mt: 2 }}>
      <SubmitButton>🔍 Search Flights</SubmitButton>
    </Grid>
  );
}

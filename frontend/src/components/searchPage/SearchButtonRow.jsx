import { Grid } from "@mui/material";

import SubmitButton from "../genericComponents/SubmitButton";

export default function SearchButtonRow() {
  return (
    <Grid container justifyContent="center" sx={{ mt: 2 }}>
      <SubmitButton>🔍 Search Flights</SubmitButton>
    </Grid>
  );
}

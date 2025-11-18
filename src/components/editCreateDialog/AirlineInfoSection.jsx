import { Grid, TextField } from "@mui/material";
import SelectField from "../genericComponents/SelectField.jsx";

export default function AirlineInfoSection({
  formData,
  handleChange,
  airlines,
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3.5 }}>
        <SelectField
          name="airline"
          label="Airline"
          value={formData.airline || ""}
          options={airlines}
          onChange={handleChange}
          autoFocus
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <TextField
          label="Flight Number"
          name="flightNumber"
          value={formData.flightNumber || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

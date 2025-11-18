import { Grid } from "@mui/material";
import SelectField from "../genericComponents/SelectField";

export default function RouteSection({
  formData,
  handleChange,
  airports,
  originAirport,
  destinationAirport,
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3.5 }}>
        <SelectField
          name="origin"
          options={airports}
          label="Origin"
          value={originAirport?.code || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectField
          name="destination"
          options={airports}
          label="Destination"
          value={destinationAirport?.code || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

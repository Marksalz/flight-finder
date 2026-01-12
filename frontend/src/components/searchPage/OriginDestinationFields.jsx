import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import { Grid } from "@mui/material";

import SelectField from "../genericComponents/SelectField";

export default function OriginDestinationFields({
  airports,
  formData,
  setFormData,
}) {
  return (
    <Grid container spacing={3} justifyContent="center">
      <SelectField
        label="From"
        value={formData.origin}
        onChange={({ target: { value } }) =>
          setFormData((prev) => ({ ...prev, origin: value }))
        }
        options={airports}
        icon={<FlightTakeoff color="primary" />}
        tooltip="Select your departure airport"
        required
        helperText="Where are you flying from?"
      />
      <SelectField
        label="To"
        value={formData.destination}
        onChange={({ target: { value } }) =>
          setFormData((prev) => ({ ...prev, destination: value }))
        }
        options={airports}
        icon={<FlightLand color="primary" />}
        tooltip="Select your destination airport"
        required
        helperText="Where are you flying to?"
      />
    </Grid>
  );
}

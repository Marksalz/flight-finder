import SelectField from "../SelectField";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Grid } from "@mui/material";

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
        icon={<FlightTakeoffIcon color="primary" />}
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
        icon={<FlightLandIcon color="primary" />}
        tooltip="Select your destination airport"
        required
        helperText="Where are you flying to?"
      />
    </Grid>
  );
}

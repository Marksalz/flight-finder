import { Grid, TextField } from "@mui/material";

import { toLocalInputValue } from "../../utils/helpFunctions";

export default function TimingSection({ formData, setFormData, handleChange }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <TextField
          label="Departure Time"
          name="departureTime"
          type="datetime-local"
          value={toLocalInputValue(formData.departureTime)}
          onChange={({ target: { value } }) =>
            setFormData((prev) => ({ ...prev, departureTime: value }))
          }
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <TextField
          label="Arrival Time"
          name="arrivalTime"
          type="datetime-local"
          value={toLocalInputValue(formData.arrivalTime)}
          onChange={({ target: { value } }) =>
            setFormData((prev) => ({ ...prev, arrivalTime: value }))
          }
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <TextField
          label="Duration (minutes)"
          name="durationMinutes"
          type="number"
          value={formData.durationMinutes || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

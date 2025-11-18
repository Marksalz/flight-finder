import DateField from "../generic components/DateField";
import { Grid } from "@mui/material";

export default function DateFields({ formData, setFormData }) {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 0 }}>
      <DateField
        label="Departure Date"
        value={formData.depDate}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, depDate: newValue }))
        }
        required
      />
      <DateField
        label="Return Date"
        value={formData.retDate}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, retDate: newValue }))
        }
        minDate={formData.depDate}
      />
    </Grid>
  );
}

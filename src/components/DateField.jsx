import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DateField({ label, value, onChange, required }) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      format="DD/MM/YYYY"
      slotProps={{
        textField: {
          required,
          fullWidth: true,
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon color="action" />
              </InputAdornment>
            ),
          },
        },
      }}
      sx={{
        maxWidth: "180px",
      }}
    />
  );
}

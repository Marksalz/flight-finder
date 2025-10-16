import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DateField({
  label,
  value,
  onChange,
  required,
  minDate,
}) {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      minDate={minDate}
      format="DD/MM/YYYY"
      slotProps={{
        textField: {
          required,
          fullWidth: true,
          sx: { maxWidth: "200px" },
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon color="action" />
              </InputAdornment>
            ),
          },
        },
      }}
    />
  );
}

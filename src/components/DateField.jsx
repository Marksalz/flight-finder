import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";

export default function DateField({
  label,
  value,
  onChange,
  required,
  minDate,
}) {
  const DATE_FORMAT = "DD/MM/YYYY";

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      minDate={minDate}
      format={DATE_FORMAT}
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

import { TextField, MenuItem, Tooltip, InputAdornment } from "@mui/material";

export default function SelectField({
  label,
  value,
  onChange,
  options,
  icon,
  tooltip,
  required = false,
  helperText = "",
}) {
  return (
    <Tooltip title={tooltip} arrow>
      <TextField
        select
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        required={required}
        slotProps={{
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null,
            sx: { fontSize: 16 },
          },
          select: { renderValue: (selected) => selected },
        }}
        helperText={helperText}
        sx={{ mb: 0, width: { xs: "50vw", md: "25vw" }, maxWidth: 200 }}
      >
        {options.map((opt) =>
          opt.code && opt.name ? (
            <MenuItem key={opt.code} value={opt.code} sx={{ width: "100%" }}>
              {`${opt.name} (${opt.code})`}
            </MenuItem>
          ) : (
            <MenuItem key={opt} value={opt} sx={{ width: "100%" }}>
              {`${opt}`}
            </MenuItem>
          )
        )}
      </TextField>
    </Tooltip>
  );
}

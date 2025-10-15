import React from "react";
import { TextField, MenuItem, Tooltip, InputAdornment } from "@mui/material";

export default function GenericSelectField({
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
          },
        }}
        helperText={helperText}
        sx={{ mb: 0 }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value || opt.code} value={opt.value || opt.code}>
            {opt.label || opt.name}
          </MenuItem>
        ))}
      </TextField>
    </Tooltip>
  );
}

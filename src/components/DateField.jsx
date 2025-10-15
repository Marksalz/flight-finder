import React from "react";
import { TextField, Tooltip, InputAdornment } from "@mui/material";

export default function GenericDateField({
  label,
  value,
  onChange,
  icon,
  tooltip,
  required = false,
  helperText = "",
}) {
  return (
    <Tooltip title={tooltip} arrow>
      <TextField
        label={label}
        type="date"
        value={value}
        onChange={onChange}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null,
          },
        }}
        fullWidth
        required={required}
        helperText={helperText}
        sx={{ mb: 0 }}
      />
    </Tooltip>
  );
}

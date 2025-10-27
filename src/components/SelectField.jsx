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
        sx={{ mb: 0, width: 200 }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.code} value={opt.code} sx={{ width: "100%" }}>
            {`${opt.name} (${opt.code})`}
          </MenuItem>
        ))}
      </TextField>
    </Tooltip>
  );
}

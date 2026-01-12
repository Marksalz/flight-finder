import { Typography, Box, Divider } from "@mui/material";

export default function Section({ title, children }) {
  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2, opacity: 0.5 }} />
      {children}
    </Box>
  );
}

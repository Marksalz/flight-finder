import { Typography } from "@mui/material";

export default function SearchPageHeader() {
  return (
    <>
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: 18, md: 36 },
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        ✈️ Find Your Perfect Flight
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "#555", mb: 2 }}
      >
        Search and compare flights
      </Typography>
    </>
  );
}

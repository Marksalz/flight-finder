import { Box } from "@mui/material";

export default function FlightCardImage({ airlineCode }) {
  return (
    <Box
      component="img"
      src={`/images/${airlineCode}.png`}
      alt={`${airlineCode} logo`}
      sx={{
        width: { xs: 80, sm: "10%" },
        maxWidth: 80,
        alignSelf: { xs: "center", sm: "auto" },
        objectFit: "contain",
      }}
    />
  );
}

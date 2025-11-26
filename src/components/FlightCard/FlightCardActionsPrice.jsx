import { Box, Typography } from "@mui/material";

import FlightActions from "../flightDetailsPage/FlightActions";

export default function FlightCardActionsPrice({
  isAdmin,
  onEdit,
  onDelete,
  onClick,
  price,
}) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "auto" },
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: { xs: "flex-end", sm: "flex-start" },
        alignItems: "center",
        mt: { xs: 1, sm: 0 },
      }}
    >
      {isAdmin && (
        <FlightActions onEdit={onEdit} onDelete={onDelete} onClick={onClick} />
      )}
      <Typography variant="body1" sx={{ color: "#4caf50", fontWeight: 800 }}>
        {price}
      </Typography>
    </Box>
  );
}

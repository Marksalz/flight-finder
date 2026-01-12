import { Box, Typography } from "@mui/material";
import LongArrow from "../genericComponents/LongArrow";

export default function TimelineArrow({ duration, date, isClickable }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: {
          xs: "4vh",
          sm: isClickable ? "4.5vh" : "10vh",
          md: isClickable ? "8vh" : "4.5vh",
          lg: "8vh",
        },
      }}
    >
      <LongArrow />
      <Box
        sx={{
          width: "100px",
          position: "absolute",
          top: { xs: "20%", sm: "0%", md: "30%" },
          ...(!isClickable && {
            top: { xs: "20%", sm: "30%", md: "20%", lg: "30%" },
          }),
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "transparent",
          px: 1,
          py: 0.25,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#8f8f8fff", fontWeight: 600 }}
        >
          {duration}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "90%", sm: "100%", md: "75%" },
          ...(!isClickable && {
            top: { xs: "90%", sm: "75%", md: "90%", lg: "75%" },
          }),
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "transparent",
          px: 1,
          py: 0.25,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#8f8f8fff", fontWeight: 600 }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
}

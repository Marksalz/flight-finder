import { Card, Container, Typography, Box } from "@mui/material";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function SearchSummaryBar({ from, to, date }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
        backgroundColor: "#cfdef3",
        width: "100%",
        borderRadius: 0,
        border: 0,
        boxShadow: "none",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#9dc2f4ff",
          borderRadius: 4,
          padding: 2,
          minWidth: { xs: "100%", sm: "80%" },
          margin: "auto",
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
          >
            Flight Route:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {from} &rarr; {to}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
          >
            Date:
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {formatDate(date)}
          </Typography>
        </Box>
      </Card>
    </Card>
  );
}

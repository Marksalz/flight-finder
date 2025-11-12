import { Card, Typography, Box } from "@mui/material";

export default function SearchSummaryBar({ from, to, date }) {
  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        bgcolor: "#cfdef3",
        display: "flex",
        justifyContent: "center",
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
          width: "100%",
          maxWidth: "900px",
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
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
            alignItems: "center",
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
    </Box>
  );
}

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

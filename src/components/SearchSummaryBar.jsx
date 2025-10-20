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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#9dc2f4ff",
          borderRadius: 4,
          padding: 2,
          minWidth: "80%",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="div">
            Flight Route:
          </Typography>
          <Typography variant="h5" component="div">
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
          <Typography variant="h4" component="div">
            Date:
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {formatDate(date)}
          </Typography>
        </Box>
      </Card>
    </Card>
  );
}

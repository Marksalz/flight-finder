import { Card, Container, Typography, Box } from "@mui/material";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function SearchSummaryBar({ from, to, date }) {
  return (
    <>
      <Card
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          backgroundColor: "lightblue",
          width: "100%",
          borderRadius: 0,
        }}
      >
        <Typography variant="h6" component="div">
          {from} &rarr; {to}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(date)}
        </Typography>
      </Card>
    </>
  );
}

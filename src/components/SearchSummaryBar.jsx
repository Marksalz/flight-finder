import { Card, Container, Typography, Box } from "@mui/material";

export default function SearchSummaryBar({ from, to, date }) {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Card
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              {from} &rarr; {to}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date ? new Date(date).toLocaleDateString() : "Select a date"}
            </Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
}

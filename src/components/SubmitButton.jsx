import { Box, Button } from "@mui/material";

export default function GenericSubmitButton({ children }) {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          px: { xs: 2.5, sm: 4, md: 5 },
          py: { xs: 1, sm: 1.25, md: 1.5 },
          fontWeight: 600,
          fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
          borderRadius: 3,
          background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
          boxShadow: "0 4px 16px 0 rgba(33, 203, 243, 0.15)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 24px 0 rgba(33, 203, 243, 0.25)",
            background: "linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)",
          },
        }}
      >
        {children}
      </Button>
    </Box>
  );
}

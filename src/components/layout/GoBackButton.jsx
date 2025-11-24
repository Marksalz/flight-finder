import { useLocation, useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function GoBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <IconButton
          aria-label="Go back"
          onClick={() => navigate(-1)}
          sx={{
            color: "white",
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
          <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
        </IconButton>
      )}
    </>
  );
}

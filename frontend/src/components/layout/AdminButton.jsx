import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { clearFlights } from "../../features/flights/flightsSlice";

export default function AdminButton({ show, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    show && (
      <Button
        onClick={() => {
          dispatch(clearFlights());
          navigate("/admin");
        }}
        size="medium"
        sx={{
          fontSize: { xs: 10, sm: 16 },
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
        {children}
      </Button>
    )
  );
}

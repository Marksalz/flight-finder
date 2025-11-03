import { Box, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SelectField from "./SelectField";
import { useSelector } from "react-redux";
import { useState } from "react";
import DateField from "./DateField";
import GenericSubmitButton from "./SubmitButton";

export default function AdminFilterForm({ handeleSubmit }) {
  const airports = useSelector((state) => state.airports.airports);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    startDate: null,
    endDate: null,
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handeleSubmit(formData);
      }}
      sx={{
        width: "100%",
        p: 4,
        bgcolor: "#a6c3e9ab",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SelectField
        label="origin"
        value={formData.origin}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, origin: e.target.value }))
        }
        options={airports}
        icon={<FlightTakeoffIcon color="primary" />}
        tooltip="Select your departure airport"
      />
      <SelectField
        label="destination"
        value={formData.destination}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, destination: e.target.value }))
        }
        options={airports}
        icon={<FlightLandIcon color="primary" />}
        tooltip="Select your arrival airport"
      />
      <DateField
        label="from"
        value={formData.startDate}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, startDate: newValue }))
        }
      />
      <Typography>--
      </Typography>
      <DateField
        label="to"
        value={formData.endDate}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, endDate: newValue }))
        }
      />
      <GenericSubmitButton>Filter</GenericSubmitButton>
    </Box>
  );
}

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useState } from "react";

import GenericSubmitButton from "./SubmitButton";
import SelectField from "./SelectField";
import DateField from "./DateField";
import dayjs from "dayjs";

export default function AdminFilterForm({ handeleSubmit }) {
  const airports = useSelector((state) => state.airports.airports);
  const adminSearchParams = useSelector((state) => state.search.adminSearch);

  const [formData, setFormData] = useState({
    origin: adminSearchParams.origin,
    destination: adminSearchParams.destination,
    startDate:
      adminSearchParams.startDate !== ""
        ? dayjs(adminSearchParams.startDate)
        : null,
    endDate:
      adminSearchParams.endDate !== ""
        ? dayjs(adminSearchParams.endDate)
        : null,
  });

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        handeleSubmit(formData);
      }}
      sx={{
        width: "100%",
        p: 4,
        bgcolor: "#a6c3e99c",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SelectField
        label="origin"
        value={formData.origin}
        onChange={({ target: { value } }) =>
          setFormData((prev) => ({ ...prev, origin: value }))
        }
        options={airports}
        icon={<FlightTakeoffIcon color="primary" />}
        tooltip="Select your departure airport"
      />
      <SelectField
        label="destination"
        value={formData.destination}
        onChange={({ target: { value } }) =>
          setFormData((prev) => ({ ...prev, destination: value }))
        }
        options={airports}
        icon={<FlightLandIcon color="primary" />}
        tooltip="Select your arrival airport"
      />
      <DateField
        label="from"
        value={formData.startDate}
        required={true}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, startDate: newValue }))
        }
      />
      <Typography>--</Typography>
      <DateField
        label="to"
        value={formData.endDate}
        required={true}
        minDate={formData.startDate}
        onChange={(newValue) =>
          setFormData((prev) => ({ ...prev, endDate: newValue }))
        }
      />
      <GenericSubmitButton>Filter</GenericSubmitButton>
    </Box>
  );
}

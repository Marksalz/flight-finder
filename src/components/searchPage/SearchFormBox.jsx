import { Box, Grid } from "@mui/material";
import OriginDestinationFields from "./OriginDestinationFields";
import DateFields from "./DateFields";
import SearchButtonRow from "./SearchButtonRow";

export default function SearchFormBox({
  handleSubmit,
  airports,
  formData,
  setFormData,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Grid container spacing={3} justifyContent="center">
        <OriginDestinationFields
          airports={airports}
          formData={formData}
          setFormData={setFormData}
        />
        <DateFields formData={formData} setFormData={setFormData} />
        <SearchButtonRow />
      </Grid>
    </Box>
  );
}

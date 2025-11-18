import { Grid, TextField } from "@mui/material";

export default function AdditionalDetailsSection({
  formData,
  setFormData,
  handleChange,
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <TextField
          label="Price (USD)"
          name="price.amount"
          type="number"
          value={formData.price?.amount || ""}
          onChange={({ target: { value } }) =>
            setFormData((prev) => ({
              ...prev,
              price: {
                ...prev.price,
                amount: Number(value),
                currency: "USD",
              },
            }))
          }
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <TextField
          label="Aircraft"
          name="aircraft"
          value={formData.aircraft || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <TextField
          label="Terminal"
          name="terminal"
          value={formData.terminal || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <TextField
          label="Baggage Allowance"
          name="baggageAllowance"
          value={formData.baggageAllowance || ""}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

import React from "react";
import { Button, Box, TextField, FormControl, FormLabel } from "@mui/material";

export default function EventStep3({
  formData,
  handleChange,
  previousStep,
  handleSubmit,
}) {
  return (
    <Box component="form" sx={{ mt: 3 }}>
      <h2 className="text-xl font-bold mb-4 text-black">Reminder (Optional)</h2>

      <FormControl fullWidth margin="normal">
        <FormLabel>
          <strong>Default Reminder:</strong> Default reminder will be sent out
          when users register, 1 week before the event, and one day before the
          event.
        </FormLabel>

        <TextField
          label="Default Message"
          fullWidth
          variant="outlined"
          onChange={handleChange("defaultMessage")}
          value={formData.defaultMessage || ""}
          margin="normal"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Additional Message</FormLabel>
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          onChange={handleChange("additionalMessage")}
          value={formData.additionalMessage || ""}
          margin="normal"
        />
      </FormControl>

      <div className="flex justify-between mt-4">
        <Button
          variant="outlined"
          style={{
            borderColor: "#D1D1D1",
            color: "#585858",
            padding: "10px 30px",
            borderRadius: "25px",
            fontWeight: "bold",
          }}
          onClick={previousStep}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F9EF1F",
            color: "#000",
            padding: "10px 30px",
            borderRadius: "25px",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Publish
        </Button>
      </div>
    </Box>
  );
}

import React from "react";
import { TextField, Button, Box, FormControl, FormLabel } from "@mui/material";

export default function EventStep1({
  nextStep,
  handleChange,
  formData,
  error,
}) {
  const requiredLabel = (label) => (
    <>
      {label} <span style={{ color: "red" }}>*</span>
    </>
  );

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <h2 className="text-xl font-bold mb-4 text-black">Create a New Event</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormControl fullWidth margin="normal">
        <FormLabel>{requiredLabel("Event Name")}</FormLabel>
        <TextField
          fullWidth
          required
          variant="outlined"
          onChange={handleChange("eventName")}
          value={formData.eventName}
        />
      </FormControl>

      <div className="flex space-x-4">
        <FormControl fullWidth margin="normal">
          <FormLabel>{requiredLabel("Event Start Date")}</FormLabel>
          <TextField
            type="date"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("eventStartDate")}
            value={formData.eventStartDate}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>{requiredLabel("Event Start Time")}</FormLabel>
          <TextField
            type="time"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("eventStartTime")}
            value={formData.eventStartTime}
          />
        </FormControl>
      </div>

      <div className="flex space-x-4">
        <FormControl fullWidth margin="normal">
          <FormLabel>{requiredLabel("Event End Date")}</FormLabel>
          <TextField
            type="date"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("eventEndDate")}
            value={formData.eventEndDate}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>{requiredLabel("Event End Time")}</FormLabel>
          <TextField
            type="time"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("eventEndTime")}
            value={formData.eventEndTime}
          />
        </FormControl>
      </div>

      <div className="flex space-x-4">
        <FormControl fullWidth margin="normal">
          <FormLabel>Publish Date</FormLabel>
          <TextField
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("publishDate")}
            value={formData.publishDate}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>Publish Time</FormLabel>
          <TextField
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange("publishTime")}
            value={formData.publishTime}
          />
        </FormControl>
      </div>

      <FormControl fullWidth margin="normal">
        <FormLabel>{requiredLabel("Location")}</FormLabel>
        <TextField
          fullWidth
          required
          variant="outlined"
          onChange={handleChange("location")}
          value={formData.location}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>{requiredLabel("Quota")}</FormLabel>
        <TextField
          fullWidth
          required
          variant="outlined"
          onChange={handleChange("quota")}
          value={formData.quota}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Target Audience - ["Male", "Female", "Families"]</FormLabel>
        <TextField
          fullWidth
          placeholder="Options"
          variant="outlined"
          onChange={handleChange("targetAudience")}
          value={formData.targetAudience}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>
          Event Tags - ["Mental Health", "Emergency Relief"]
        </FormLabel>
        <TextField
          fullWidth
          placeholder="Example: Sports, Networking"
          variant="outlined"
          onChange={handleChange("eventTags")}
          value={formData.eventTags}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Upload Image</FormLabel>
        <div className="flex items-center space-x-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter image URL"
            value={formData.uploadImage || ""}
            onChange={handleChange("uploadImage")}
          />
          <Button
            variant="contained"
            component="label"
            style={{
              backgroundColor: "#01A9FF",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Upload
            <input
              type="file"
              hidden
              onChange={(e) => handleChange("uploadImage")(e.target.value)}
            />
          </Button>
        </div>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>{requiredLabel("Description")}</FormLabel>
        <TextField
          multiline
          rows={4}
          fullWidth
          required
          variant="outlined"
          onChange={handleChange("description")}
          value={formData.description}
        />
      </FormControl>
      <div className="flex justify-between mt-4">
        <Button
          variant="outlined"
          style={{
            borderColor: "#D1D1D1",
            color: "#585858",
            padding: "10px 30px",
            borderRadius: "25px", // Rounded corners
            fontWeight: "bold",
          }}
          onClick={() => console.log("Save Draft")}
        >
          Save Draft
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F9EF1F",
            color: "#000",
            padding: "10px 30px",
            borderRadius: "25px", // Rounded corners
            fontWeight: "bold",
          }}
          onClick={nextStep}
        >
          Proceed
        </Button>
      </div>
    </Box>
  );
}

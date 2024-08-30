import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import { MdDelete } from "react-icons/md";

export default function EventStep2({
  nextStep,
  previousStep,
  handleSectionChange,
  sections,
  addSection,
  removeSection,
}) {
  return (
    <Box component="form" sx={{ mt: 3 }}>
      <h2 className="text-xl font-bold mb-4 text-black">
        Training Details (optional)
      </h2>

      {sections.map((section, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-black">
              Section {index + 1}
            </h3>
            <IconButton onClick={() => removeSection(index)} color="error">
              <MdDelete />
            </IconButton>
          </div>

          <FormControl fullWidth margin="normal">
            <FormLabel>Section Heading</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              onChange={handleSectionChange(index, "sectionHeading")}
              value={section.sectionHeading}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Upload Video</FormLabel>
            <div className="flex items-center space-x-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter video URL"
                value={section.uploadVideo || ""}
                onChange={handleSectionChange(index, "uploadVideo")}
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
                  onChange={(e) =>
                    handleSectionChange(index, "uploadVideo")(e.target.value)
                  }
                />
              </Button>
            </div>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Section Description</FormLabel>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              onChange={handleSectionChange(index, "sectionDescription")}
              value={section.sectionDescription}
            />
          </FormControl>
        </div>
      ))}

      <Button
        variant="contained"
        style={{
          backgroundColor: "#01A9FF",
          color: "#fff",
          padding: "10px 20px",
          marginTop: "10px",
        }}
        onClick={addSection}
      >
        Add Section
      </Button>

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
          onClick={previousStep}
        >
          Back
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

import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
  DialogContent,
} from "@mui/material";

export default function ReminderForm() {
  return (
    <DialogContent>
      <Box className="ml-4 mr-4 p-4">
        <h2 className="text-3xl mb-6 mt-6 text-black">Create a New Reminder</h2>
        <Box component="form" className="space-y-4">
          <FormControl fullWidth>
            <FormLabel className="text-[#585858] font-bold mb-2 text-lg">
              Reminder Name <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <TextField
              fullWidth
              required
              variant="outlined"
              className="text-[#585858] mb-2"
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel className="text-[#585858] font-bold mb-2 text-lg">
              Target Group <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <TextField
              fullWidth
              required
              variant="outlined"
              placeholder="Search groups"
              className="text-[#585858] mb-2"
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel className="text-[#585858] font-bold mb-2 text-lg">
              Reminder Message <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <TextField
              fullWidth
              required
              variant="outlined"
              multiline
              rows={4}
              className="text-[#585858] mb-2"
            />
          </FormControl>

          <Box className="flex space-x-4">
            <FormControl fullWidth>
              <FormLabel className="text-[#585858] font-bold mb-2 text-lg">
                Scheduled Sent Date <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <TextField
                fullWidth
                required
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                className="text-[#585858] mb-2"
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel className="text-[#585858] font-bold mb-2 text-lg">
                Scheduled Sent Time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <TextField
                fullWidth
                required
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
                className="text-[#585858] mb-2"
              />
            </FormControl>
          </Box>

          <Box className="flex justify-between mt-4">
            <Button
              variant="outlined"
              className="border-gray-300 text-[#585858] px-8 py-2 rounded-full font-bold"
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              className="bg-[#F9EF1F] text-black px-8 py-2 rounded-full font-bold"
            >
              Remind
            </Button>
          </Box>
        </Box>
      </Box>
    </DialogContent>
  );
}

import AdminLayout from "../layout";
import { useState } from "react";
import {
  Fab,
  Dialog,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MdAdd, MdEdit, MdCancel, MdEvent } from "react-icons/md";
import FilterButtons from "@/components/ui/FilterButtons";
import ReminderForm from "../../../components/admin/ManageReminders/ReminderForm"; // Import your form component

export default function ManageReminders() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div
        className="flex justify-between items-center mb-6"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <h1 className="text-3xl font-bold">Manage Reminders</h1>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickOpen}
          className="bg-yellow-400 text-black w-14 h-14"
        >
          <MdAdd className="text-2xl" />
        </Fab>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <ReminderForm />
      </Dialog>

      <div className="mx-5">
        <FilterButtons b1="ALL" b2="Draft" b3="Event" b4="Filter" />
      </div>

      <div className="mx-5 mt-6">
        <Card className="flex flex-row items-center p-4">
          <CardMedia
            component="img"
            image="/images/1.png"
            alt="Kayaking Event"
            className="w-32 h-32 object-cover"
          />
          <CardContent className="flex-1 ml-4">
            <Typography variant="h6" className="font-bold">
              Reminder for Kayaking Events
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="flex items-center"
            >
              <MdEvent className="mr-2" /> Remind Date: Sat, Jul 27, 2024
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="flex items-center"
            >
              <MdEvent className="mr-2" /> Event Date: Sun, Jul 28, 2024
            </Typography>
          </CardContent>
          <div className="flex flex-col">
            <Button
              variant="contained"
              color="success"
              startIcon={<MdEdit />}
              className="mb-2"
            >
              Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<MdCancel />}>
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

import AdminLayout from "../layout";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, Container } from "@mui/material";
import CreateEvent from "../../../components/admin/ManageEvents/CreateEvent";
import { MdAdd } from "react-icons/md";
import FilterButtons from "@/components/ui/FilterButtons";
import EventCard from "@/components/admin/ManageEvents/EventCard";

export default function ManageEvents() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventCreated, setEventCreated] = useState(false); // State to track new event creation

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEventCreated(false); // Reset event created state
  };

  const handleEventCreated = () => {
    setEventCreated(true); // Set the state to true when a new event is created
    handleClose(); // Close the dialog after setting the state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events/get-all");
        const data = await response.json();
        setEvents(data.slice(0, 5)); // Limiting to 5 for testing purposes
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventCreated]); // Re-fetch data whenever a new event is created

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between mb-6 mx-6 md:mx-10 lg:mx-24 xl:mx-26 pt-24">
          <h1 className="text-4xl font-bold">Manage Events</h1>
          <button
            onClick={handleClickOpen}
            className="bg-[#F9EF1F] text-black w-14 h-14 rounded-full flex items-center justify-center"
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>

        <FilterButtons b1="Your Events" b2="ALL" b3="Draft" b4="Filter" />

        <Container sx={{ mt: 4 }} className="p-0">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </Container>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <CreateEvent onClose={handleEventCreated} /> {/* Pass the callback */}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

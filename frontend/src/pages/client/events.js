import React, { useState, useEffect } from "react";
import EventPreview from "../../components/events/user/EventPreview";
import styles from "../css/clientEventPage.module.css";

import Header from "../../components/ui/Header";
import { EventDialog } from "@/components/events/user/EventDialog";
import { ChatEpic } from "@/components/clients/ChatEpic";
import { FaChevronDown } from "react-icons/fa";

// const image1 = require("../images/1.jpg");
// const image2 = require("../images/1.png");

// const events = [
//   {
//     id: "1",
//     title: "Kayaking with your fellow friends",
//     date: "Sun, Jul 28, 2024",
//     time: "10:00 AM",
//     location: "Sham Shui Po",
//     image: image2,
//     description: "Join your friends for an exciting kayaking adventure!",
//   },
//   {
//     id: "2",
//     title: "Talk: Empowering Women",
//     date: "Sun, Jul 28, 2024",
//     time: "10:00 AM",
//     location: "Sham Shui Po",
//     image: image1,
//     description: "Attend a thought-provoking talk on empowering women.",
//   },
// ];

const EventPage = () => {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [user, setUser] = useState(null);
  console.log("User:", user);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '66cb157066c043cef5083cb1';
        const response = await fetch(`/api/events/get-all?userId=${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDialogOpen = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
    setOpenDialog(false);
  };

  return (
    <div>
      <EventDialog
        open={open}
        handleClose={() => setOpen(false)}
        eventData={eventData}
      />

      <Header
        img="/images/hpi.jpg"
        heading="Events"
        description="Review the events where you've volunteered and watch those requiring training."
      />

      <div className={styles.container}>
        <div className={styles.filterBar}>
          <button className={styles.filterButton}>Just for You</button>
          <button className={styles.filterButton}>All</button>
          <button className={styles.filterButton}>Registered</button>
          <button
            className={`${styles.filterButton} ${styles.filterButtonWithIcon}`}
          >
            <span className={styles.filterButtonText}>Filter</span>{" "}
            <FaChevronDown />
          </button>
        </div>

        <div className={styles.eventCards}>
          {events.map((event) => (
            <EventPreview
            onClick={() => handleDialogOpen(event)}
              imageSrc={event.event_details.image_url}
              title={event.event_details.event_name}
              date={event.event_details.start_date}
              time={event.event_details.start_time}
              location={event.event_details.location}
              description={event.event_details.description}
              onRegister={() =>
                console.log("Registered for event:", event.event_details.event_name)
              }
            />
          ))}
        </div>
      </div>
      {selectedEvent && (
        <EventDialog
          open={openDialog}
          handleClose={handleDialogClose}
          eventData={{
            image: selectedEvent.event_details.image_url,
            id : selectedEvent._id,
            title: selectedEvent.event_details.event_name,
            date: selectedEvent.event_details.start_date.slice(0, 10),
            time: `${selectedEvent.event_details.start_time} - ${selectedEvent.event_details.end_time}`,
            location: selectedEvent.event_details.location,
            description: selectedEvent.event_details.description,
          }}
        />
      )}
      <ChatEpic />
    </div>
  );
};

export default EventPage;

import React, { useState, useEffect } from 'react';
import EventPreviewCard from '../events/user/EventPreviewCard';
import styles from '../css/UpcomingEvents.module.css';
import { EventDialog } from '../events/user/EventDialog';
import image1 from '../../../public/images/1.jpg';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '66cb157066c043cef5083cb1';
        const response = await fetch(`/api/events/get-all?userId=${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEvents(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <div className={styles.upcomingEvents}>
      <h2 className={styles.title}>Upcoming Events Just for You</h2>
      <div className={styles.eventPreviewContainer}>
        {events.map((event, index) => (
          <EventPreviewCard
            onClick={() => handleDialogOpen(event)}
            key={index}
            id = {event._id}
            date={event.event_details.start_date.slice(8, 10)}
            month={event.event_details.start_date.slice(5, 7)}
            title={event.event_details.event_name}
            imageUrl={event.event_details.image_url}
          />
        ))}
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
    </div>
  );
};

export default UpcomingEvents;
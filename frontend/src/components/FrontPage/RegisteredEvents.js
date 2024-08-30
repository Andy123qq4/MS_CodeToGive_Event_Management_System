import React, { useState, useEffect } from 'react';
import EventPreviewCard from '../events/user/EventPreviewCard';
import { EventDialogUnRegister } from '../events/user/EventDialogUnRegister';
import styles from '../css/RegisteredEvents.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '66cb157066c043cef5083cb1'; // Replace with the actual user ID
        const response = await fetch(`/api/users/get-events?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        else {
          const data = await response.json();
          setEvents(data.data);
          console.log(data.data);
          toast.success('Registered events fetched successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        window.alert("Registered");
        toast.error('Failed to fetch registered events. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
    return formatter.format(date);
  };
  
  toast.success('Registered', {
    position: 'top-right',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });


  return (
    <div className={styles.registered}>
      <h2 className={styles.title}>Registered Events</h2>
      <div className={styles.eventPreviewContainer}>
        {events.map((event, index) => (
          <EventPreviewCard
            onClick={() => handleDialogOpen(event)}
            key={index}
            id={event._id}
            date={new Date(event.event_details.start_date).getDate().toString()}
            month={formatDate(event.event_details.start_date)}
            title={event.event_details.event_name}
            imageUrl={event.event_details.image_url || ''}
          />
        ))}
      </div>
      {selectedEvent && (
        <EventDialogUnRegister
          open={openDialog}
          handleClose={handleDialogClose}
          eventData={{
            image: selectedEvent.event_details.image_url,
            id: selectedEvent._id,
            title: selectedEvent.event_details.event_name,
            date: selectedEvent.event_details.start_date.slice(0, 10),
            time: `${selectedEvent.event_details.start_time} - ${selectedEvent.event_details.end_time}`,
            location: selectedEvent.event_details.location,
            description: selectedEvent.event_details.description,
          }}
          onClick={handlePrintEvent}
        />
      )}
    </div>
  );
};

export default RegisteredEvents;
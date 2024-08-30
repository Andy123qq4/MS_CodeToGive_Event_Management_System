import { DialogContent, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import styles from '../../css/EventPreview.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import axios from 'axios';

export const EventDialog = ({ open, handleClose, eventData, onRegister }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (eventData == null) return null;

 const handleRegister = async () => {
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

  try {
    const response = await fetch('/api/events/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_id: eventData.id,
        user_id: '66cb157066c043cef5083cb1',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Event registration response:', data);
    onRegister(eventData.event_id);
    window.alert('Registered');
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
  } catch (error) {
    console.error('Error registering for the event:', error);
    // Handle the error, e.g., display a notification to the user
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <div className="mb-7 text-black p-4">
          <div className="flex justify-center">
            <Image
              src={eventData.image}
              width={isSmallScreen ? '100%' : 500}
              height={isSmallScreen ? 'auto' : 250}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col justify-start gap-3 mt-4">
            <h1 className="text-md font-bold">{eventData.title}</h1>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold flex items-center gap-3 ">
                <CalendarMonth fontSize="small" /> {eventData.date}
              </span>
              <span className="text-xs font-bold flex items-center gap-3 ">
                <AccessTime fontSize="small" /> {eventData.time}
              </span>
              <span className="text-xs font-bold flex items-center gap-3 ">
                <LocationOn fontSize="small" /> {eventData.location}
              </span>
            </div>
            <div className="bg-gray-200 rounded-md p-4 text-sm">
              {eventData.description}
            </div>
            <div>
              <button className={styles.registerButton} onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};
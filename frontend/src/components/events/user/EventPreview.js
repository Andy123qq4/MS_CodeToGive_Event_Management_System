import React from 'react'
import Image from 'next/image'
import styles from '../../css/EventPreview.module.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventPreview = ({ onClick, imageSrc, title, date, time, location, description, onRegister }) => {
  return (
    <div style={{ padding: '20px' }} onClick={onClick}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
        <Image src={imageSrc} alt={title} width={300} height={300} style={{ borderRadius: '10px' }} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <CalendarMonthIcon className={styles.icon} />
              <span className={styles.label}>Date:</span> {date}
            </div>
            <div className={styles.detailItem}>
              <AccessTimeIcon className={styles.icon} />
              <span className={styles.label}>Time:</span> {time}
            </div>
            <div className={styles.detailItem}>
              <LocationOnIcon className={styles.icon} />
              <span className={styles.label}>Location:</span> {location}
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <button className={styles.registerButton} onClick={onRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
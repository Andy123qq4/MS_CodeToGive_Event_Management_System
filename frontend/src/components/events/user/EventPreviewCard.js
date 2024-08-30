import React from 'react';
import Image from 'next/image'
import styles from '../../css/EventPreviewCard.module.css';


const EventPreviewCard = ({ imageUrl, date, month, title, link, onClick}) => {
  return (
    <div style={{ padding: '20px' }} onClick={onClick}>
    <div className={styles.card}>
      <Image src={imageUrl} alt="Event" className={styles.cardImage} width={300} height={200} layout="responsive" />
      <div className={styles.cardContent}>
        <div className={styles.cardDate}>
          <h2>{date}</h2>
          <span>{month}</span>
        </div>
        <div className={styles.cardDetails}>
          <h3>{title}</h3>
          <a href={link} className={styles.cardLink}>
            Click for more detail
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EventPreviewCard;
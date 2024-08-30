import React, { useEffect, useState } from 'react';
import styles from '../css/Client_Volunteer_Welcome.module.css';
import Image from 'next/image';
import Lottie from 'react-lottie';
import animationData from '../../../public/lottie/Animation.json';
import animationData2 from '../../../public/lottie/Animation (2).json';

const WelcomeBackComponent = ({ username }) => {
  return <WelcomeBack username={username} />;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const WelcomeBack = ({ username = 'Furgy' }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '66cb157066c043cef5083cb1';
        const response = await fetch(`/api/users/?userId=${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles['welcome-back-container']}>
        <h2 className={styles['welcome-back-title']}>Welcome Back, {username}!</h2>
        <p className={styles['welcome-back-text']}>Here's a collection of your featured badges! Join more events for more!</p>
        <div className="badge-container">
          <Image src="/images/Badges1.png" alt="My Image" width={600} height={400} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WelcomeBackComponent;
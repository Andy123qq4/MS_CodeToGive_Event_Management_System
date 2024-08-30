import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import styles from '../css/Achievements.module.css';
import Image from 'next/image';

const AchievementsSection = () => {
  const achievements = [
    {
      name: 'Helper',
      xpRequired: 4,
      progress: 1,
      image: '/images/ach1.png',
    },
    {
      name: 'Social Bee',
      crownRequired: 4,
      progress: 1,
      image: '/images/ach2.png',
    },
    {
      name: 'Bob',
      courseCompleted: 4,
      progress: 2,
      image: '/images/ach3.png',
    },
  ];

  return (
    <div className={styles.achievementsSection}>
      <h2 className={styles.achievementsTitle}>Achievements</h2>
      {achievements.map((achievement, index) => (
        <div key={index} className={styles.achievementCard}>
          <div className={styles.achievementIcon}>
            <Image
              src={achievement.image}
              alt={achievement.name}
              width={100}
              height={100}
            />
          </div>
          <div className={styles.achievementDetails}>
            <h3 className={styles.achievementName}>{achievement.name}</h3>
            <ProgressBar
              className={styles.progressBar}
              completed={(achievement.progress / (achievement.xpRequired || achievement.crownRequired || achievement.courseCompleted)) * 100}
              bgColor={
                achievement.progress > 0
                  ? '#4CAF50' // Green for completed portion
                  : '#CCCCCC' // Grey for remaining portion
              }
              height="20px"
              borderRadius="10px"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsSection;
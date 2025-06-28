'use client'

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ExperienceSection.module.scss';

const ExperienceSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Replace this with your actual video URL
  const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"; // Example video - replace with your video

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Auto-play the video when it's shown
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className={styles['experience-section']}>
      <div className={styles['experience-section__container']}>
        <div className={styles['experience-section__media']}>
          <div className={styles['experience-section__video-box']}>
            {!isPlaying ? (
              // Show play button when video is not playing
              <motion.button 
                className={styles['experience-section__play-button']}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handlePlayVideo}
                aria-label="Play video"
              >
                <motion.span 
                  className={styles['experience-section__play-icon']}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ) : (
              // Show video when playing
              <video
                ref={videoRef}
                className={styles['experience-section__video']}
                src={VIDEO_URL}
                controls
                onEnded={handleVideoEnd}
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className={styles['experience-section__content']}>
          <h2 className={styles['experience-section__heading']}>
            Experience a<br />life without<br />hassle
          </h2>
          <p className={styles['experience-section__subtext']}>
            We're the spark that turns your chaos into calm, the groove that gets your life back in tune.
          </p>
          <button className={styles['experience-section__cta']} type="button">
            BOOK A SERVICE
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 
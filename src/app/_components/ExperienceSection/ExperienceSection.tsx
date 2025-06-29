'use client'

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ExperienceSection.module.scss';

const ExperienceSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Place your video file (e.g., my-video.mp4) in public/videos/ and use the path below
  const VIDEO_URL = "/videos/metromellow_animation.mp4"; // Example: /videos/my-video.mp4
  const THUMBNAIL_URL = "/images/cleaning/hero-cleaning.png";

  const handlePlayVideo = () => {
    setIsPlaying(true);
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
              // Show thumbnail with play button overlay
              <div className={styles['experience-section__thumbnail-wrapper']}>
                <Image
                  src={THUMBNAIL_URL}
                  alt="Video thumbnail"
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles['experience-section__thumbnail']}
                  priority
                />
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
              </div>
            ) : (
              // Show video when playing
              <video
                ref={videoRef}
                className={styles['experience-section__video']}
                src={VIDEO_URL}
                controls
                onEnded={handleVideoEnd}
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
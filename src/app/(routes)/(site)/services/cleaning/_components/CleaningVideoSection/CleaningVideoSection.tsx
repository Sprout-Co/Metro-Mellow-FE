"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "./CleaningVideoSection.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon, Play } from "lucide-react";

const CleaningVideoSection = ({ onCTAClick }: { onCTAClick: () => void }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const VIDEO_URL = "/videos/metromellow_animation.mp4";
  const THUMBNAIL_URL = "/images/cleaning/cleaning1.jpg";

  const playVideo = () => {
    setVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.video} ref={ref}>
      <div className={styles.video__container}>
        <motion.h2
          className={styles.video__title}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          See How We Transform Your Space
        </motion.h2>

        <div className={styles.video__main}>
          <motion.div
            className={styles.video__wrapper}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className={styles.video__player}>
              {!videoPlaying ? (
                <>
                  <div className={styles.video__thumbnail}>
                    <Image
                      src={THUMBNAIL_URL}
                      alt="Professional Cleaning Video Thumbnail"
                      className={styles.video__image}
                      width={800}
                      height={450}
                      loading="lazy"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className={styles.video__overlay}>
                      <button
                        className={styles.video__playButton}
                        onClick={playVideo}
                        aria-label="Play video"
                      >
                        <Play size={32} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <video
                  ref={videoRef}
                  className={styles.video__video}
                  src={VIDEO_URL}
                  controls
                  onEnded={handleVideoEnd}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            className={styles.video__content}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.p className={styles.video__description} variants={fadeIn}>
              Watch our professional cleaning service in Lagos in action. From
              initial assessment to final inspection, see how we deliver
              exceptional cleaning results across Lagos State every time.
            </motion.p>

            <motion.ul
              className={styles.video__features}
              variants={staggerContainer}
            >
              <motion.li className={styles.video__feature} variants={fadeIn}>
                Professional equipment and techniques
              </motion.li>
              <motion.li className={styles.video__feature} variants={fadeIn}>
                Attention to detail
              </motion.li>
              <motion.li className={styles.video__feature} variants={fadeIn}>
                Quality assurance process
              </motion.li>
              <motion.li className={styles.video__feature} variants={fadeIn}>
                Customer satisfaction guarantee
              </motion.li>
            </motion.ul>

            <motion.div className={styles.video__cta} variants={fadeIn}>
              <CTAButton
                onClick={onCTAClick}
                size="lg"
                animationType="pulse"
                animationIntensity="intense"
              >
                Book Your Cleaning Today
                <ArrowRightIcon className={styles.icon} />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CleaningVideoSection;

"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./SpyingEmoji.module.scss";

export type EmojiExpression =
  | "default"
  | "typingEmail"
  | "typingPassword"
  | "error"
  | "loading";

interface SpyingEmojiProps {
  expression?: EmojiExpression;
}

export default function SpyingEmoji({
  expression = "default",
}: SpyingEmojiProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (faceRef.current) {
        const rect = faceRef.current.getBoundingClientRect();
        const faceCenterX = rect.left + rect.width / 2;
        const faceCenterY = rect.top + rect.height / 2;

        // Calculate relative position from face center
        const relativeX = e.clientX - faceCenterX;
        const relativeY = e.clientY - faceCenterY;

        // Limit eye movement range (max 12px from center for 50px eyes)
        const maxDistance = 12;
        const distance = Math.min(
          Math.sqrt(relativeX * relativeX + relativeY * relativeY),
          maxDistance
        );
        const angle = Math.atan2(relativeY, relativeX);

        setMousePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.spyingEmoji}>
      <div className={styles.spyingEmoji__emoji}>
        <div
          ref={faceRef}
          className={`${styles.spyingEmoji__face} ${
            styles[`spyingEmoji__face--${expression}`]
          }`}
        >
          <div className={styles.spyingEmoji__eyes}>
            <div
              className={`${styles.spyingEmoji__eye} ${styles["spyingEmoji__eye--left"]}`}
            >
              <div
                className={styles.spyingEmoji__pupil}
                style={{
                  transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
                }}
              ></div>
            </div>
            <div
              className={`${styles.spyingEmoji__eye} ${styles["spyingEmoji__eye--right"]}`}
            >
              <div
                className={styles.spyingEmoji__pupil}
                style={{
                  transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
                }}
              ></div>
            </div>
          </div>
          <div
            className={`${styles.spyingEmoji__sweat} ${
              expression === "error" || expression === "typingPassword"
                ? styles["spyingEmoji__sweat--active"]
                : ""
            }`}
          ></div>
          <div
            className={`${styles.spyingEmoji__mouth} ${
              styles[`spyingEmoji__mouth--${expression}`]
            }`}
          ></div>
          {expression === "loading" && (
            <div className={styles.spyingEmoji__loading}>
              <div className={styles.spyingEmoji__loadingDot}></div>
              <div className={styles.spyingEmoji__loadingDot}></div>
              <div className={styles.spyingEmoji__loadingDot}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

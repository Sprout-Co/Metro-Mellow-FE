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
  const [showAwkwardEyes, setShowAwkwardEyes] = useState(false);
  const [awkwardOffset, setAwkwardOffset] = useState({ x: 0, y: 0 });
  const faceRef = useRef<HTMLDivElement>(null);
  const mouseMoveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const awkwardAnimationRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (faceRef.current) {
        const rect = faceRef.current.getBoundingClientRect();
        const faceCenterX = rect.left + rect.width / 2;
        const faceCenterY = rect.top + rect.height / 2;

        // Calculate relative position from face center
        const relativeX = e.clientX - faceCenterX;
        const relativeY = e.clientY - faceCenterY;

        // Limit eye movement range (max 15px from center for 70px eyes)
        const maxDistance = 15;
        const distance = Math.min(
          Math.sqrt(relativeX * relativeX + relativeY * relativeY),
          maxDistance
        );
        const angle = Math.atan2(relativeY, relativeX);

        setMousePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });

        // Hide awkward eyes when mouse is moving
        setShowAwkwardEyes(false);

        // Clear existing timeout
        if (mouseMoveTimeoutRef.current) {
          clearTimeout(mouseMoveTimeoutRef.current);
        }

        // Show awkward eyes after 1.5 seconds of no mouse movement (for all states)
        mouseMoveTimeoutRef.current = setTimeout(() => {
          setShowAwkwardEyes(true);
        }, 1500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial awkward eyes for all states
    setShowAwkwardEyes(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, [expression]);

  // Awkward eye animation for all states when mouse hasn't moved
  useEffect(() => {
    if (showAwkwardEyes) {
      const awkwardPositions = [
        { x: 8, y: -5 },
        { x: -6, y: 7 },
        { x: 10, y: 3 },
        { x: -8, y: -4 },
        { x: 0, y: 0 },
      ];
      let currentIndex = 0;

      const animate = () => {
        setAwkwardOffset(awkwardPositions[currentIndex]);
        currentIndex = (currentIndex + 1) % awkwardPositions.length;
        awkwardAnimationRef.current = setTimeout(animate, 800);
      };

      animate();

      return () => {
        if (awkwardAnimationRef.current) {
          clearTimeout(awkwardAnimationRef.current);
        }
      };
    } else {
      setAwkwardOffset({ x: 0, y: 0 });
    }
  }, [showAwkwardEyes]);

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
                  transform: `translate(calc(-50% + ${mousePosition.x + awkwardOffset.x}px), calc(-50% + ${mousePosition.y + awkwardOffset.y}px))`,
                }}
              ></div>
            </div>
            <div
              className={`${styles.spyingEmoji__eye} ${styles["spyingEmoji__eye--right"]}`}
            >
              <div
                className={styles.spyingEmoji__pupil}
                style={{
                  transform: `translate(calc(-50% + ${mousePosition.x + awkwardOffset.x}px), calc(-50% + ${mousePosition.y + awkwardOffset.y}px))`,
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

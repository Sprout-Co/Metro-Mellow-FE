"use client";

import styles from "./SpyingEmoji.module.scss";

export default function SpyingEmoji() {
  return (
    <div className={styles.spyingEmoji}>
      <div className={styles.spyingEmoji__emoji}>
        <div className={styles.spyingEmoji__face}>
          <div className={styles.spyingEmoji__eyes}>
            <div
              className={`${styles.spyingEmoji__eye} ${styles["spyingEmoji__eye--left"]}`}
            >
              <div className={styles.spyingEmoji__pupil}></div>
            </div>
            <div
              className={`${styles.spyingEmoji__eye} ${styles["spyingEmoji__eye--right"]}`}
            >
              <div className={styles.spyingEmoji__pupil}></div>
            </div>
          </div>
          <div className={styles.spyingEmoji__sweat}></div>
          <div className={styles.spyingEmoji__mouth}></div>
        </div>
      </div>
    </div>
  );
}

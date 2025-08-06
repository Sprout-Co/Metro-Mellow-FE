import React from "react";
import styles from "./FontWeightDemo.module.scss";

const FontWeightDemo: React.FC = () => {
  return (
    <div className={styles.fontWeightDemo}>
      <h2 className={styles.title}>Font Weight Demo</h2>

      {/* Baloo 2 Weights */}
      <section className={styles.fontSection}>
        <h3 className={styles.fontName}>Baloo 2 (Headings)</h3>
        <div className={styles.weightGrid}>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Regular (400)</span>
            <span className={styles.baloo2Regular}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Medium (500)</span>
            <span className={styles.baloo2Medium}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>SemiBold (600)</span>
            <span className={styles.baloo2SemiBold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Bold (700)</span>
            <span className={styles.baloo2Bold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>ExtraBold (800)</span>
            <span className={styles.baloo2ExtraBold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        </div>
      </section>

      {/* Montserrat Weights */}
      <section className={styles.fontSection}>
        <h3 className={styles.fontName}>Montserrat (Body Text)</h3>
        <div className={styles.weightGrid}>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Thin (100)</span>
            <span className={styles.montserratThin}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>ExtraLight (200)</span>
            <span className={styles.montserratExtraLight}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Light (300)</span>
            <span className={styles.montserratLight}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Regular (400)</span>
            <span className={styles.montserratRegular}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Medium (500)</span>
            <span className={styles.montserratMedium}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>SemiBold (600)</span>
            <span className={styles.montserratSemiBold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Bold (700)</span>
            <span className={styles.montserratBold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>ExtraBold (800)</span>
            <span className={styles.montserratExtraBold}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className={styles.weightItem}>
            <span className={styles.weightLabel}>Black (900)</span>
            <span className={styles.montserratBlack}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FontWeightDemo;

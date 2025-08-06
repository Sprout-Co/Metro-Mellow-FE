"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./OurStory.module.scss";

export default function OurStory() {
  return (
    <section className={styles.story}>
      <div className={styles.story__container}>
        <div className={styles.story__grid}>
          <motion.div
            className={styles.story__image}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/our-story.webp"
              alt="Metromellow founders"
              width={600}
              height={700}
              className={styles.story__imageMain}
            />
            <div className={styles.story__imageAccent}></div>
          </motion.div>

          <motion.div
            className={styles.story__content}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={styles.story__title}>Our Story</h2>
            <div className={styles.story__divider}></div>

            <p className={styles.story__paragraph}>
              Metromellow began in 2018 with a simple observation: maintaining a
              comfortable home shouldn't be stressful or time-consuming. Our
              founders, Sarah Chen and Marcus Thompson, experienced firsthand
              the challenges of balancing busy careers with home care.
            </p>

            <p className={styles.story__paragraph}>
              What started as a small cleaning service in downtown has evolved
              into a comprehensive home services company that thousands of
              families trust. Our mission has remained constant: to provide
              high-quality, reliable home services that give our clients more
              time to focus on what truly matters.
            </p>

            <p className={styles.story__paragraph}>
              We've built our reputation on exceptional service, reliable staff,
              and a deep understanding of our clients' needs. Every Metromellow
              professional is thoroughly vetted, trained, and shares our
              commitment to excellence.
            </p>

            <div className={styles.story__signature}>
              <Image
                src="/images/signature.webp"
                alt="Founders' signature"
                width={180}
                height={60}
              />
              <p className={styles.story__founders}>
                Sarah Chen & Marcus Thompson, Founders
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

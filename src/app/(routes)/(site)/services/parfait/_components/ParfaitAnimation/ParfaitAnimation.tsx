"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ParfaitAnimation.module.scss";

const ParfaitAnimation: React.FC = () => {
  const layers = [
    {
      id: "yogurt1",
      color: "linear-gradient(to bottom, #FFF8E1, #FFECB3)",
      height: 60,
      delay: 0,
    },
    {
      id: "granola",
      color: "linear-gradient(to bottom, #8D6E63, #6D4C41)",
      height: 40,
      delay: 0.2,
    },
    {
      id: "berries",
      color: "linear-gradient(to bottom, #E91E63, #C2185B)",
      height: 50,
      delay: 0.4,
    },
    {
      id: "yogurt2",
      color: "linear-gradient(to bottom, #FFF8E1, #FFECB3)",
      height: 60,
      delay: 0.6,
    },
    {
      id: "honey",
      color: "linear-gradient(to bottom, #FFB300, #FF8F00)",
      height: 30,
      delay: 0.8,
    },
  ];

  return (
    <div className={styles["parfait-animation"]}>
      <div className={styles["parfait-animation__glass"]}>
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className={styles["parfait-animation__layer"]}
            initial={{ scaleY: 0, transformOrigin: "bottom" }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
              delay: layer.delay,
              ease: "easeOut",
            }}
            style={{
              background: layer.color,
              height: `${layer.height}px`,
              bottom: `${layers
                .slice(0, index)
                .reduce((sum, l) => sum + l.height, 0)}px`,
            }}
          />
        ))}
        <motion.div
          className={styles["parfait-animation__topping"]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          🍓
        </motion.div>
      </div>
      <div className={styles["parfait-animation__floating"]}>
        <motion.span
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🫐
        </motion.span>
        <motion.span
          animate={{
            y: [0, -10, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🥜
        </motion.span>
        <motion.span
          animate={{
            y: [0, -20, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🍯
        </motion.span>
      </div>
    </div>
  );
};

export default ParfaitAnimation;

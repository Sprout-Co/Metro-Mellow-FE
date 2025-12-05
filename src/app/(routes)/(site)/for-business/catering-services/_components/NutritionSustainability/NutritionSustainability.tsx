"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Recycle, Award, Truck, Users } from "lucide-react";
import styles from "./NutritionSustainability.module.scss";

interface Commitment {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const nutritionCommitments: Commitment[] = [
  {
    icon: <Heart />,
    title: "Nutritional Excellence",
    description: "Every meal is designed with health and nutrition in mind",
    details: [
      "Certified nutritionist on staff",
      "Calorie counts and nutritional information",
      "Balanced macro and micronutrients",
      "Seasonal, fresh ingredient sourcing"
    ]
  },
  {
    icon: <Leaf />,
    title: "Dietary Accommodations",
    description: "Comprehensive options for all dietary needs and preferences",
    details: [
      "Vegetarian and vegan options",
      "Gluten-free and allergen-free meals",
      "Keto, paleo, and low-carb choices",
      "Religious dietary requirements"
    ]
  },
  {
    icon: <Award />,
    title: "Quality Standards",
    description: "Rigorous quality control and food safety protocols",
    details: [
      "HACCP certified kitchen facilities",
      "Regular third-party quality audits",
      "Fresh, never frozen ingredients",
      "Temperature-controlled delivery"
    ]
  }
];

const sustainabilityInitiatives: Commitment[] = [
  {
    icon: <Recycle />,
    title: "Zero Waste Goals",
    description: "Minimizing environmental impact through waste reduction",
    details: [
      "Compostable packaging materials",
      "Food waste reduction programs",
      "Recycling and composting services",
      "Reusable serving containers"
    ]
  },
  {
    icon: <Truck />,
    title: "Local Sourcing",
    description: "Supporting local farmers and reducing carbon footprint",
    details: [
      "Partnership with local farms",
      "Seasonal menu planning",
      "Reduced transportation emissions",
      "Supporting community economy"
    ]
  },
  {
    icon: <Users />,
    title: "Social Responsibility",
    description: "Giving back to the community through our catering services",
    details: [
      "Surplus food donation programs",
      "Local charity partnerships",
      "Fair trade ingredient sourcing",
      "Employee wellness programs"
    ]
  }
];

const NutritionSustainability: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.nutritionSustainability}>
      <div className={styles.nutritionSustainability__container}>
        <motion.div
          className={styles.nutritionSustainability__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Nutrition & Sustainability</h2>
          <p>We're committed to serving healthy, delicious meals while protecting our planet and supporting our community</p>
        </motion.div>

        <div className={styles.nutritionSustainability__content}>
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.section__header}>
              <div className={styles.section__icon}>
                <Heart />
              </div>
              <h3>Nutritional Excellence</h3>
              <p>Every meal we serve is thoughtfully crafted to nourish your team</p>
            </div>

            <motion.div
              className={styles.commitments__grid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {nutritionCommitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  className={styles.commitment__card}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.commitment__icon}>
                    {commitment.icon}
                  </div>
                  <h4>{commitment.title}</h4>
                  <p className={styles.commitment__description}>
                    {commitment.description}
                  </p>
                  <ul className={styles.commitment__details}>
                    {commitment.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.section__header}>
              <div className={styles.section__icon}>
                <Leaf />
              </div>
              <h3>Environmental Sustainability</h3>
              <p>Protecting our planet through responsible business practices</p>
            </div>

            <motion.div
              className={styles.commitments__grid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {sustainabilityInitiatives.map((initiative, index) => (
                <motion.div
                  key={index}
                  className={styles.commitment__card}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.commitment__icon}>
                    {initiative.icon}
                  </div>
                  <h4>{initiative.title}</h4>
                  <p className={styles.commitment__description}>
                    {initiative.description}
                  </p>
                  <ul className={styles.commitment__details}>
                    {initiative.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.stats__section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.stats__grid}>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>85%</div>
                <div className={styles.stat__label}>Local Ingredients</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>0</div>
                <div className={styles.stat__label}>Waste to Landfill</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>50+</div>
                <div className={styles.stat__label}>Dietary Options</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>100%</div>
                <div className={styles.stat__label}>Compostable Packaging</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSustainability;
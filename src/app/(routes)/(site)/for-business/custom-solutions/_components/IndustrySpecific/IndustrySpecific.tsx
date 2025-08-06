"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Heart, Utensils, Factory, GraduationCap, ShoppingBag } from "lucide-react";
import styles from "./IndustrySpecific.module.scss";

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  services: string[];
  specialRequirements: string[];
}

const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    icon: <Heart />,
    description: "Specialized cleaning and maintenance for medical facilities with strict hygiene standards",
    services: ["Medical-grade sanitization", "Biohazard waste management", "Equipment sterilization", "24/7 emergency response"],
    specialRequirements: ["HIPAA compliance", "Hospital-grade disinfectants", "Certified staff training"]
  },
  {
    id: "hospitality",
    name: "Hotels & Hospitality",
    icon: <Building2 />,
    description: "Complete facility management for hotels, restaurants, and entertainment venues",
    services: ["Guest room cleaning", "Kitchen deep cleaning", "Laundry services", "Pest control"],
    specialRequirements: ["24/7 availability", "Guest satisfaction focus", "Brand standard compliance"]
  },
  {
    id: "restaurants",
    name: "Restaurants & Food Service",
    icon: <Utensils />,
    description: "Food-safe cleaning and maintenance services for dining establishments",
    services: ["Kitchen sanitization", "Grease trap cleaning", "Floor care", "Equipment maintenance"],
    specialRequirements: ["Food safety certification", "Health department compliance", "Non-toxic products"]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: <Factory />,
    description: "Heavy-duty cleaning and maintenance for industrial facilities and warehouses",
    services: ["Equipment cleaning", "Floor maintenance", "Waste management", "Safety compliance"],
    specialRequirements: ["OSHA compliance", "Industrial-grade equipment", "Safety protocol training"]
  },
  {
    id: "education",
    name: "Schools & Universities",
    icon: <GraduationCap />,
    description: "Safe and thorough cleaning services for educational institutions",
    services: ["Classroom cleaning", "Cafeteria sanitization", "Restroom maintenance", "Floor care"],
    specialRequirements: ["Child-safe products", "Background checks", "Flexible scheduling"]
  },
  {
    id: "retail",
    name: "Retail & Commercial",
    icon: <ShoppingBag />,
    description: "Professional cleaning and maintenance services for retail spaces and offices",
    services: ["Store cleaning", "Window cleaning", "Carpet care", "Maintenance"],
    specialRequirements: ["Flexible hours", "Brand presentation", "Customer-friendly staff"]
  }
];

const IndustrySpecific: React.FC = () => {
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
    <section className={styles.industrySpecific}>
      <div className={styles.industrySpecific__container}>
        <motion.div
          className={styles.industrySpecific__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Industry-Specific Solutions</h2>
          <p>We understand that every industry has unique requirements. Our specialized services are tailored to meet the specific needs and regulations of your sector.</p>
        </motion.div>

        <motion.div
          className={styles.industrySpecific__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              className={styles.industryCard}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.industryCard__header}>
                <div className={styles.industryCard__icon}>
                  {industry.icon}
                </div>
                <h3>{industry.name}</h3>
              </div>
              
              <p className={styles.industryCard__description}>
                {industry.description}
              </p>

              <div className={styles.industryCard__services}>
                <h4>Core Services</h4>
                <ul>
                  {industry.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.industryCard__requirements}>
                <h4>Special Requirements</h4>
                <div className={styles.requirements__tags}>
                  {industry.specialRequirements.map((requirement, index) => (
                    <span key={index} className={styles.requirement__tag}>
                      {requirement}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.industrySpecific__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Don't See Your Industry?</h3>
          <p>We work with businesses across all sectors. Contact us to discuss how we can create a custom solution for your specific industry needs.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySpecific;
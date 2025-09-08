"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SuccessStoriesSection.module.scss";
import { Icon } from "@/components/ui/Icon/Icon";
import { motion } from "framer-motion";

// Success metrics data
const metrics = [
  { icon: "users", value: "500+", label: "Happy Clients" },
  { icon: "star", value: "95%", label: "Satisfaction Rate" },
  { icon: "clock", value: "40%", label: "Time Saved" },
  { icon: "repeat", value: "85%", label: "Retention Rate" },
];

// Case study data
const caseStudies = [
  {
    id: 1,
    company: "Horizon Properties",
    logo: "/images/brand/b1.jpeg",
    industry: "Commercial Real Estate",
    challenge: "Managing cleaning services across 12 office buildings",
    solution: "Centralized scheduling and quality control system",
    results: {
      time: "32% reduction in management time",
      cost: "18% decrease in operational costs",
      satisfaction: "94% tenant satisfaction rating",
    },
    testimonial:
      "Metromellow transformed our property management workflow. Their reliable service and attention to detail have made a significant impact on our operational efficiency.",
    author: "Sarah Johnson",
    position: "Facilities Director",
  },
  {
    id: 2,
    company: "GreenLife Healthcare",
    logo: "/images/brand/b2.jpeg",
    industry: "Healthcare",
    challenge: "Maintaining sterile environments with eco-friendly products",
    solution: "Custom cleaning protocols with hospital-grade green products",
    results: {
      compliance: "100% compliance with health regulations",
      environmental: "60% reduction in chemical usage",
      health: "45% decrease in sick days among staff",
    },
    testimonial:
      "Finding a service that could meet our strict healthcare standards while maintaining our commitment to sustainability seemed impossible until we partnered with Metromellow.",
    author: "Dr. Michael Chen",
    position: "Chief Medical Officer",
  },
  {
    id: 3,
    company: "Urban Living Co",
    logo: "/images/brand/b3.jpeg",
    industry: "Residential Communities",
    challenge: "Coordinating services for 200+ luxury apartments",
    solution: "Integrated resident portal with on-demand scheduling",
    results: {
      efficiency: "85% faster service deployment",
      satisfaction: "92% resident satisfaction score",
      retention: "24% increase in lease renewals",
    },
    testimonial:
      "Our residents love the convenience and quality of Metromellow's services. It's become one of our most valued amenities and a key differentiator in our market.",
    author: "James Rodriguez",
    position: "Property Manager",
  },
  {
    id: 4,
    company: "TechNova",
    logo: "/images/brand/b4.jpeg",
    industry: "Technology",
    challenge: "Providing flexible services for hybrid work environment",
    solution: "AI-powered scheduling adapting to office occupancy",
    results: {
      flexibility: "100% adaptation to changing schedules",
      productivity: "28% increase in workplace productivity",
      savings: "35% reduction in service costs",
    },
    testimonial:
      "As our workplace evolved, Metromellow evolved with us. Their adaptive approach to our changing needs has been invaluable during our transition to hybrid work.",
    author: "Lisa Park",
    position: "Head of Workplace Experience",
  },
];

// Industry spotlight data
const industrySpotlights = [
  {
    industry: "Residential",
    icon: "home",
    highlight: "Transforming home management for 300+ families",
    metric: "4.8/5 average customer rating",
  },
  {
    industry: "Commercial",
    icon: "building",
    highlight: "Servicing 50+ office buildings with custom solutions",
    metric: "32% average operational cost reduction",
  },
  {
    industry: "Healthcare",
    icon: "heart",
    highlight: "Supporting 12 medical facilities with specialized care",
    metric: "100% compliance with health regulations",
  },
  {
    industry: "Hospitality",
    icon: "bed",
    highlight: "Enhancing guest experience for 8 boutique hotels",
    metric: "28% increase in positive reviews",
  },
];

const SuccessStoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle next slide
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length
    );
  };

  // Handle dot navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, activeIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoplay(false);
  };

  // Resume autoplay on mouse leave
  const handleMouseLeave = () => {
    setIsAutoplay(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.span className={styles.badge} variants={itemVariants}>
            SUCCESS STORIES
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Transforming Lives, One Service at a Time
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            See how our services have made a measurable impact for businesses
            across industries
          </motion.p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          className={styles.metricsBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={styles.metricCard}
              variants={itemVariants}
            >
              <div className={styles.metricIcon}>
                <Icon name={metric.icon} size={32} />
              </div>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;

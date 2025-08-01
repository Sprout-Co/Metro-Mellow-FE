"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./EventShowcase.module.scss";

interface EventCase {
  id: string;
  title: string;
  client: string;
  eventType: string;
  attendees: number;
  location: string;
  description: string;
  challenges: string[];
  solutions: string[];
  testimonial: {
    text: string;
    author: string;
    position: string;
  };
  image: string;
}

const eventCases: EventCase[] = [
  {
    id: "tech-conference",
    title: "Annual Tech Conference",
    client: "TechCorp Solutions",
    eventType: "Corporate Conference",
    attendees: 500,
    location: "Downtown Convention Center",
    description: "A three-day technology conference featuring keynote speakers, breakout sessions, and networking events requiring comprehensive meal service.",
    challenges: [
      "Accommodating 15+ dietary restrictions",
      "Serving 500 people simultaneously",
      "Maintaining food quality over 3 days",
      "Coordinating with multiple venue areas"
    ],
    solutions: [
      "Custom buffet stations with clear labeling",
      "Professional service staff coordination",
      "On-site kitchen setup for fresh preparation",
      "Real-time communication system"
    ],
    testimonial: {
      text: "Metro Mellow exceeded our expectations. The food was exceptional and the service was flawless. Our attendees couldn't stop talking about the meals!",
      author: "Sarah Chen",
      position: "Event Director, TechCorp Solutions"
    },
    image: "/images/catering/tech-conference.jpg"
  },
  {
    id: "product-launch",
    title: "Global Product Launch",
    client: "Innovation Inc.",
    eventType: "Product Launch Event",
    attendees: 200,
    location: "Corporate Headquarters",
    description: "An elegant evening event celebrating the launch of a revolutionary product, requiring upscale catering and impeccable presentation.",
    challenges: [
      "High-end presentation requirements",
      "Coordinating with media and VIP guests",
      "Limited prep space at venue",
      "Dietary needs of international guests"
    ],
    solutions: [
      "Premium plated dinner service",
      "Dedicated VIP service team",
      "Mobile kitchen and prep stations",
      "International cuisine options"
    ],
    testimonial: {
      text: "The catering was absolutely perfect. Every detail was handled professionally, allowing us to focus on our guests and product announcement.",
      author: "Michael Rodriguez",
      position: "CMO, Innovation Inc."
    },
    image: "/images/catering/product-launch.jpg"
  },
  {
    id: "team-retreat",
    title: "Leadership Team Retreat",
    client: "Global Finance Corp",
    eventType: "Corporate Retreat",
    attendees: 50,
    location: "Mountain Resort",
    description: "A multi-day leadership retreat focusing on strategy and team building, requiring varied meal options in a remote location.",
    challenges: [
      "Remote location logistics",
      "Outdoor dining requirements",
      "Weather contingency planning",
      "Varied meal preferences"
    ],
    solutions: [
      "Mobile catering equipment transport",
      "Weatherproof service setup",
      "Flexible indoor/outdoor options",
      "Family-style and buffet combinations"
    ],
    testimonial: {
      text: "Despite the challenging location, Metro Mellow delivered outstanding service. The meals brought our team together and enhanced the entire retreat experience.",
      author: "Jennifer Park",
      position: "VP Operations, Global Finance Corp"
    },
    image: "/images/catering/team-retreat.jpg"
  }
];

const EventShowcase: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState(0);

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % eventCases.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + eventCases.length) % eventCases.length);
  };

  const currentCase = eventCases[currentEvent];

  return (
    <section className={styles.eventShowcase}>
      <div className={styles.eventShowcase__container}>
        <motion.div
          className={styles.eventShowcase__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Corporate Event Success Stories</h2>
          <p>See how we've helped companies create memorable and successful events through exceptional catering</p>
        </motion.div>

        <div className={styles.showcase__wrapper}>
          <motion.div
            className={styles.showcase__navigation}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button 
              className={styles.nav__button}
              onClick={prevEvent}
              aria-label="Previous event"
            >
              <ChevronLeft />
            </button>
            <button 
              className={styles.nav__button}
              onClick={nextEvent}
              aria-label="Next event"
            >
              <ChevronRight />
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentEvent}
              className={styles.event__card}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.event__content}>
                <div className={styles.event__info}>
                  <div className={styles.event__header}>
                    <h3>{currentCase.title}</h3>
                    <div className={styles.event__meta}>
                      <span className={styles.client}>{currentCase.client}</span>
                      <span className={styles.event__type}>{currentCase.eventType}</span>
                    </div>
                  </div>

                  <div className={styles.event__details}>
                    <div className={styles.detail__item}>
                      <Users size={16} />
                      <span>{currentCase.attendees} attendees</span>
                    </div>
                    <div className={styles.detail__item}>
                      <MapPin size={16} />
                      <span>{currentCase.location}</span>
                    </div>
                  </div>

                  <p className={styles.event__description}>
                    {currentCase.description}
                  </p>

                  <div className={styles.event__challenges}>
                    <h4>Challenges</h4>
                    <ul>
                      {currentCase.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.event__solutions}>
                    <h4>Our Solutions</h4>
                    <ul>
                      {currentCase.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.event__testimonial}>
                  <div className={styles.testimonial__content}>
                    <div className={styles.testimonial__stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote>
                      "{currentCase.testimonial.text}"
                    </blockquote>
                    <cite>
                      <strong>{currentCase.testimonial.author}</strong>
                      <span>{currentCase.testimonial.position}</span>
                    </cite>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className={styles.showcase__indicators}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {eventCases.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentEvent ? styles.indicator_active : ''}`}
                onClick={() => setCurrentEvent(index)}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.showcase__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Create Your Success Story?</h3>
          <p>Let us help you plan and execute a memorable corporate event that exceeds your expectations</p>
          <Button variant="primary" size="lg">
            Plan Your Event
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventShowcase;
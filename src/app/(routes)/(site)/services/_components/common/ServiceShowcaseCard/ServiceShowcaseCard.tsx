import { ServiceOption } from "@/graphql/api";
import styles from "./ServiceShowcaseCard.module.scss";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface ServiceShowcaseCardProps {
  service: ServiceOption;
  onBookNowClick: (service: ServiceOption) => void;
}

export default function ServiceShowcaseCard({
  service,
  onBookNowClick,
}: ServiceShowcaseCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getServiceEmoji = (serviceName: string) => {
    if (serviceName.toLowerCase().includes("standard")) return "🏠";
    if (serviceName.toLowerCase().includes("deep")) return "✨";
    if (
      serviceName.toLowerCase().includes("office") ||
      serviceName.toLowerCase().includes("commercial")
    )
      return "🏢";
    return "🧹";
  };

  return (
    <motion.div
      key={service.id}
      className={styles.showcase__card}
      variants={cardVariants}
    >
      {/* Card Header */}
      <div className={styles.showcase__cardHeader}>
        <div className={styles.showcase__iconWrapper}>
          <span className={styles.showcase__emoji}>
            {getServiceEmoji(service.label)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.showcase__cardContent}>
        <h3 className={styles.showcase__cardTitle}>{service.label}</h3>
        <p className={styles.showcase__cardDescription}>
          {service.description}
        </p>

        {/* Price */}
        <div className={styles.showcase__price}>
          <span className={styles.showcase__priceLabel}>Starting at</span>
          <div className={styles.showcase__priceAmount}>
            <span className={styles.showcase__priceCurrency}>₦</span>
            <span className={styles.showcase__priceValue}>
              {service.price?.toLocaleString()}
            </span>
            <span className={styles.showcase__priceUnit}>/service</span>
          </div>
        </div>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => onBookNowClick(service)}
        >
          Book Now
          <ArrowRight className={styles.showcase__buttonIcon} />
        </Button>
      </div>

      {/* Card Footer */}
      {/* <div className={styles.showcase__cardFooter}>
                <Clock className={styles.showcase__footerIcon} />
                <span>Book in 60 seconds</span>
              </div> */}
    </motion.div>
  );
}

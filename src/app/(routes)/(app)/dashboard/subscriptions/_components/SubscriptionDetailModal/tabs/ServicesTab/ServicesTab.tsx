import React from "react";
import { Repeat, Calendar } from "lucide-react";
import { GetCustomerSubscriptionsQuery, ServiceCategory } from "@/graphql/api";
import { getServiceIcon, getServiceColor, formatPrice } from "../types";
import styles from "./ServicesTab.module.scss";

type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

interface ServicesTabProps {
  subscription: SubscriptionType;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ subscription }) => {
  return (
    <div className={styles.modal__sections}>
      <div className={styles.modal__section}>
        <h3 className={styles.modal__sectionTitle}>Included Services</h3>
        <div className={styles.modal__servicesList}>
          {subscription.subscriptionServices.map((service) => (
            <div key={service.id} className={styles.modal__serviceItem}>
              <div
                className={styles.modal__serviceItemIcon}
                style={{
                  backgroundColor: `${getServiceColor(service.service_category)}15`,
                  color: getServiceColor(service.service_category),
                }}
              >
                {getServiceIcon(service.service_category as ServiceCategory)}
              </div>
              <div className={styles.modal__serviceItemContent}>
                <div className={styles.modal__serviceItemHeader}>
                  <h4 className={styles.modal__serviceItemName}>
                    {service.service.name}
                  </h4>
                  <span className={styles.modal__serviceItemPrice}>
                    {formatPrice(service.price)}
                  </span>
                </div>
                <div className={styles.modal__serviceItemDetails}>
                  <div className={styles.modal__serviceItemDetail}>
                    <Repeat size={12} />
                    <span>
                      {service.frequency.toLowerCase().replace("_", " ")}
                    </span>
                  </div>
                  <div className={styles.modal__serviceItemDetail}>
                    <Calendar size={12} />
                    <span>
                      {service.scheduledDays
                        .map(
                          (day: string) =>
                            day.charAt(0) + day.slice(1).toLowerCase()
                        )
                        .join(", ")}
                    </span>
                  </div>
                </div>
                <div className={styles.modal__serviceItemProgress}>
                  <div className={styles.modal__serviceItemProgressText}>
                    <span>Service active</span>
                    <span>{formatPrice(service.price)}</span>
                  </div>
                  <div className={styles.modal__serviceItemProgressBar}>
                    <div
                      className={styles.modal__serviceItemProgressFill}
                      style={{
                        width: `100%`,
                        backgroundColor: getServiceColor(
                          service.service_category
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;

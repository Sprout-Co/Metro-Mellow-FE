import React from "react";
import styles from "./ServicePerformance.module.scss";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";

interface ServicePerformanceProps {
  serviceData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}

const ServicePerformance: React.FC<ServicePerformanceProps> = ({
  serviceData,
}) => {
  const serviceStats = [
    { name: "Cleaning", value: "$14,842", color: "primary" },
    { name: "Laundry", value: "$8,648", color: "secondary" },
    { name: "Cooking", value: "$5,284", color: "success" },
    { name: "Pest Control", value: "$3,865", color: "info" },
  ];

  return (
    <Card className={styles.service_performance}>
      <div className={styles.service_performance__header}>
        <h3 className={styles.service_performance__title}>
          Service Performance
        </h3>
        <div className={styles.service_performance__controls}>
          <button className={styles.service_performance__button}>
            <span>Monthly</span>
            <span className={styles.icon}>▼</span>
          </button>
        </div>
      </div>

      <div className={styles.service_performance__chart}>
        <Chart data={serviceData} height={300} type="bar" />
      </div>

      <div className={styles.service_performance__stats}>
        {serviceStats.map((stat, index) => (
          <div key={stat.name} className={styles.service_performance__stat}>
            <div
              className={`${styles.service_performance__stat_indicator} ${styles[`service_performance__stat_indicator--${stat.color}`]}`}
            />
            <span className={styles.service_performance__stat_name}>
              {stat.name}
            </span>
            <span className={styles.service_performance__stat_value}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServicePerformance;

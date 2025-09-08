"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./ROICalculator.module.scss";

interface CalculatorInputs {
  employees: number;
  hourlyWage: number;
  cleaningHours: number;
  monthlyServiceCost: number;
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employees: 50,
    hourlyWage: 25,
    cleaningHours: 10,
    monthlyServiceCost: 2500,
  });

  const [results, setResults] = useState({
    monthlyInternalCost: 0,
    monthlySavings: 0,
    annualSavings: 0,
    roi: 0,
    paybackPeriod: 0,
  });

  useEffect(() => {
    const monthlyInternalCost =
      inputs.employees * inputs.hourlyWage * inputs.cleaningHours;
    const monthlySavings = monthlyInternalCost - inputs.monthlyServiceCost;
    const annualSavings = monthlySavings * 12;
    const roi = (annualSavings / (inputs.monthlyServiceCost * 12)) * 100;
    const paybackPeriod =
      inputs.monthlyServiceCost / Math.max(monthlySavings, 1);

    setResults({
      monthlyInternalCost,
      monthlySavings: Math.max(monthlySavings, 0),
      annualSavings: Math.max(annualSavings, 0),
      roi: Math.max(roi, 0),
      paybackPeriod: Math.max(paybackPeriod, 0),
    });
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  const benefits = [
    {
      icon: <Clock />,
      title: "Time Savings",
      description: "Free up employee time for core business activities",
    },
    {
      icon: <Users />,
      title: "Productivity Boost",
      description: "Employees focus on revenue-generating tasks",
    },
    {
      icon: <DollarSign />,
      title: "Cost Efficiency",
      description:
        "Professional services often cost less than internal resources",
    },
    {
      icon: <TrendingUp />,
      title: "Scalability",
      description: "Services scale with your business needs",
    },
  ];

  return (
    <section className={styles.roiCalculator}>
      <div className={styles.roiCalculator__container}>
        <motion.div
          className={styles.roiCalculator__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.header__icon}>
            <Calculator />
          </div>
          <h2>ROI Calculator</h2>
          <p>
            See how much you could save by outsourcing your facility management
            to Metromellow
          </p>
        </motion.div>

        <div className={styles.roiCalculator__content}>
          <motion.div
            className={styles.calculator__inputs}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Your Current Situation</h3>

            <div className={styles.input__group}>
              <label>Number of Employees</label>
              <input
                type="number"
                value={inputs.employees}
                onChange={(e) =>
                  handleInputChange("employees", parseInt(e.target.value) || 0)
                }
                min="1"
              />
            </div>

            <div className={styles.input__group}>
              <label>Average Hourly Wage ($)</label>
              <input
                type="number"
                value={inputs.hourlyWage}
                onChange={(e) =>
                  handleInputChange(
                    "hourlyWage",
                    parseFloat(e.target.value) || 0
                  )
                }
                min="0"
                step="0.50"
              />
            </div>

            <div className={styles.input__group}>
              <label>Hours Spent on Cleaning/Month</label>
              <input
                type="number"
                value={inputs.cleaningHours}
                onChange={(e) =>
                  handleInputChange(
                    "cleaningHours",
                    parseInt(e.target.value) || 0
                  )
                }
                min="0"
              />
            </div>

            <div className={styles.input__group}>
              <label>Monthly Service Cost ($)</label>
              <input
                type="number"
                value={inputs.monthlyServiceCost}
                onChange={(e) =>
                  handleInputChange(
                    "monthlyServiceCost",
                    parseFloat(e.target.value) || 0
                  )
                }
                min="0"
                step="50"
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.calculator__results}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Your Potential Savings</h3>

            <div className={styles.results__grid}>
              <div className={styles.result__card}>
                <div className={styles.result__value}>
                  ${results.monthlyInternalCost.toLocaleString()}
                </div>
                <div className={styles.result__label}>Current Monthly Cost</div>
              </div>

              <div className={styles.result__card}>
                <div className={styles.result__value}>
                  ${results.monthlySavings.toLocaleString()}
                </div>
                <div className={styles.result__label}>Monthly Savings</div>
              </div>

              <div className={styles.result__card}>
                <div className={styles.result__value}>
                  ${results.annualSavings.toLocaleString()}
                </div>
                <div className={styles.result__label}>Annual Savings</div>
              </div>

              <div className={styles.result__card}>
                <div className={styles.result__value}>
                  {results.roi.toFixed(1)}%
                </div>
                <div className={styles.result__label}>ROI</div>
              </div>
            </div>

            <div className={styles.payback__period}>
              <strong>
                Payback Period: {results.paybackPeriod.toFixed(1)} months
              </strong>
            </div>

            <Button variant="primary" size="lg">
              Get Custom Quote
            </Button>
          </motion.div>
        </div>

        <motion.div
          className={styles.benefits__section}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Beyond Cost Savings</h3>
          <div className={styles.benefits__grid}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={styles.benefit__card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.benefit__icon}>{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;

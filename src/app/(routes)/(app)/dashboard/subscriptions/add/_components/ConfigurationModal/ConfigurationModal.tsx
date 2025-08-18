"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import styles from "./ConfigurationModal.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";

// Service Types
interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  color: string;
  description: string;
  configOptions: ConfigOption[];
}

interface ConfigOption {
  id: string;
  label: string;
  type: "select" | "number" | "checkbox" | "radio";
  options?: { value: string; label: string; price?: number }[];
  min?: number;
  max?: number;
  unit?: string;
  priceMultiplier?: number;
}

interface ConfigurationModalProps {
  isOpen: boolean;
  service: ServiceOption | null;
  initialConfig?: Record<string, any>;
  onClose: () => void;
  onSave: (config: Record<string, any>) => void;
  calculateServicePrice: (
    service: ServiceOption,
    config: Record<string, any>
  ) => number;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = ({
  isOpen,
  service,
  initialConfig = {},
  onClose,
  onSave,
  calculateServicePrice,
}) => {
  const [tempConfig, setTempConfig] =
    useState<Record<string, any>>(initialConfig);

  const handleSave = () => {
    if (!service) return;
    onSave(tempConfig);
  };

  if (!service) return null;

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="md">
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Configure {service.name}</h2>
            <button
              onClick={onClose}
              className={styles.modalCloseButton}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.modalBody}>
            {service.configOptions.map((option) => (
              <div key={option.id} className={styles.configField}>
                <label className={styles.configLabel}>{option.label}</label>

                {option.type === "radio" && (
                  <div className={styles.radioGroup}>
                    {option.options?.map((opt) => (
                      <label key={opt.value} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name={option.id}
                          value={opt.value}
                          checked={tempConfig[option.id] === opt.value}
                          onChange={(e) =>
                            setTempConfig((prev) => ({
                              ...prev,
                              [option.id]: e.target.value,
                            }))
                          }
                        />
                        <span>{opt.label}</span>
                        {opt.price !== undefined && opt.price !== 0 && (
                          <span className={styles.priceModifier}>
                            {opt.price > 0 ? "+" : ""}₦
                            {opt.price.toLocaleString()}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {option.type === "number" && (
                  <div className={styles.numberInput}>
                    <button
                      className={styles.numberButton}
                      onClick={() =>
                        setTempConfig((prev) => ({
                          ...prev,
                          [option.id]: Math.max(
                            option.min || 1,
                            (prev[option.id] || option.min || 1) - 1
                          ),
                        }))
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={tempConfig[option.id] || option.min || 1}
                      onChange={(e) =>
                        setTempConfig((prev) => ({
                          ...prev,
                          [option.id]:
                            parseInt(e.target.value) || option.min || 1,
                        }))
                      }
                      min={option.min}
                      max={option.max}
                      style={{
                        width: "60px",
                        textAlign: "center" as const,
                        padding: "0.5rem",
                        border: "1px solid #f1f1f1",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <button
                      className={styles.numberButton}
                      onClick={() =>
                        setTempConfig((prev) => ({
                          ...prev,
                          [option.id]: Math.min(
                            option.max || 10,
                            (prev[option.id] || option.min || 1) + 1
                          ),
                        }))
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                {option.type === "checkbox" && (
                  <div className={styles.checkboxGroup}>
                    {option.options?.map((opt) => (
                      <label key={opt.value} className={styles.radioLabel}>
                        <input
                          type="checkbox"
                          value={opt.value}
                          checked={(tempConfig[option.id] || []).includes(
                            opt.value
                          )}
                          onChange={(e) => {
                            const values = tempConfig[option.id] || [];
                            if (e.target.checked) {
                              setTempConfig((prev) => ({
                                ...prev,
                                [option.id]: [...values, opt.value],
                              }));
                            } else {
                              setTempConfig((prev) => ({
                                ...prev,
                                [option.id]: values.filter(
                                  (v: string) => v !== opt.value
                                ),
                              }));
                            }
                          }}
                        />
                        <span>{opt.label}</span>
                        {opt.price !== undefined && opt.price !== 0 && (
                          <span className={styles.priceModifier}>
                            {opt.price > 0 ? "+" : ""}₦
                            {opt.price.toLocaleString()}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#fbfbfb",
                borderRadius: "0.5rem",
              }}
            >
              <span style={{ fontWeight: "600" }}>Service Price</span>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#075056",
                }}
              >
                ₦{calculateServicePrice(service, tempConfig).toLocaleString()}
                /month
              </span>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              className={`${styles.button} ${styles.buttonGhost}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleSave}
            >
              Save Configuration
            </button>
          </div>
        </motion.div>
      </motion.div>
    </ModalDrawer>
  );
};

export default ConfigurationModal;

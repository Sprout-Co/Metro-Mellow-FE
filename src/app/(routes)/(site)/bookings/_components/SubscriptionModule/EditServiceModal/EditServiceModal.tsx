// EditServiceModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./EditServiceModal.module.scss";
import Modal from "@/components/ui/Modal/Modal";
import { Icon, IconName } from "@/components/ui/Icon/Icon";

import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/slices/ui";
import { CleaningDetails, Service } from "@/graphql/api";

// Step information for progress bar
const steps = [
  { label: "Choose Service", icon: "ShoppingBag" },
  { label: "Details & Schedule", icon: "Sliders" },
  { label: "Review", icon: "CheckCircle" },
];


interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Service[];
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
}) => {
  console.log(selectedServices);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit `} maxWidth="800px">
      <h1>Hello World</h1>
    </Modal>
  );
};

export default EditServiceModal;

"use client";
import React from "react";
import { useUIStore } from "@/store";
import SubscriptionEditorModal from "@/app/(routes)/(site)/bookings/_components/SubscriptionModule/PlanSummary/SubscriptionEditorModal";

const ModalProvider: React.FC = () => {
  const { isModalOpen, modalType } = useUIStore();

  return (
    <>
      {isModalOpen && modalType === "craft-subscription" && (
        <SubscriptionEditorModal />
      )}
    </>
  );
};

export default ModalProvider;

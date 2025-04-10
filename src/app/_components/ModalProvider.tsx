"use client";
import React from "react";
import { useUIStore } from "@/store";
import SubscriptionEditorModal from "@/app/(routes)/(site)/bookings/_components/SubscriptionModule/PlanSummary/SubscriptionEditorModal";
import { ServiceType } from "@/app/(routes)/(site)/bookings/_components/SubscriptionModule/SubscriptionModule";

const ModalProvider: React.FC = () => {
  const { isModalOpen, modalType, modalData } = useUIStore();

  return (
    <>
      {isModalOpen && modalType === "craft-subscription" && (
        <SubscriptionEditorModal
          selectedServices={modalData?.selectedServices || []}
        />
      )}
    </>
  );
};

export default ModalProvider;

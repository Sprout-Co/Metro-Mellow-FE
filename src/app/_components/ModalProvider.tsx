"use client";
import React from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  selectIsModalOpen,
  selectModalType,
  selectModalData,
} from "@/lib/redux";
import SubscriptionEditorModal from "@/app/(routes)/(site)/bookings/_components/SubscriptionModule/PlanSummary/SubscriptionEditorModal";
import { service_category } from "@/app/(routes)/(site)/bookings/_components/SubscriptionModule/SubscriptionModule";

const ModalProvider: React.FC = () => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const modalType = useAppSelector(selectModalType);
  const modalData = useAppSelector(selectModalData);

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

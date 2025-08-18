"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  List,
  Plus,
  Filter,
  Search,
  CalendarDays,
  Grid3x3,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Bell,
} from "lucide-react";
import styles from "./DashboardHeader.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import AppointmentCard from "@/components/ui/AppointmentCard/AppointmentCard";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  actionBtnText?: string;
  actionBtnIcon?: React.ReactNode;
  onActionButtonClick?: () => void;
  upcomingService?: {
    serviceName: string;
    serviceType: string;
    date: string;
    status: string;
    provider: string;
  };
  extraContent?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  actionBtnText,
  actionBtnIcon,
  onActionButtonClick,
  upcomingService,
  extraContent,
}) => {
  return (
    <div className={styles.dashboardHeader}>
      {/* Header Section */}
      <div className={styles.dashboardHeader__header}>
        <div>
          <div className={styles.dashboardHeader__headerContent}>
            <h1 className={styles.dashboardHeader__title}>{title}</h1>
            <p className={styles.dashboardHeader__subtitle}>{subtitle}</p>
          </div>

          {/* Upcoming Service Banner */}
          {upcomingService && (
            <div className={styles.dashboardHeader__upcomingService}>
              <AppointmentCard
                serviceName={upcomingService.serviceName}
                serviceType={upcomingService.serviceType as any}
                date={upcomingService.date}
                status={upcomingService.status as any}
                provider={upcomingService.provider}
                variant="header"
              />
            </div>
          )}
        </div>

        {actionBtnText && (
          <div className={styles.dashboardHeader__headerActions}>
            <FnButton variant="white" size="md" onClick={onActionButtonClick}>
              {actionBtnIcon}
              {actionBtnText}
            </FnButton>
          </div>
        )}
      </div>
      {extraContent && (
        <div className={styles.dashboardHeader__extraContent}>
          {extraContent}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

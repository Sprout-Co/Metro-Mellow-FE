import React from "react";
import { SubscriptionServiceInput } from "@/graphql/api";

interface LaundryServiceConfigProps {
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
}

const LaundryServiceConfig: React.FC<LaundryServiceConfigProps> = ({
  configuration,
  onUpdate,
}) => {
  return null;
};

export default LaundryServiceConfig;
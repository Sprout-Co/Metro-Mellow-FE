import React from "react";
import { SubscriptionServiceInput } from "@/graphql/api";

interface PestControlServiceConfigProps {
  configuration: SubscriptionServiceInput;
  onUpdate: (update: Partial<SubscriptionServiceInput>) => void;
}

const PestControlServiceConfig: React.FC<PestControlServiceConfigProps> = ({
  configuration,
  onUpdate,
}) => {
  return null;
};

export default PestControlServiceConfig;
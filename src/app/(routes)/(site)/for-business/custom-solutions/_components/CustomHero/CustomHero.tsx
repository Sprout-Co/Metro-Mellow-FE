"use client";

import React from "react";
import ServiceHero from "@/components/ui/ServiceHero/ServiceHero";

const CustomHero: React.FC = () => {
  return (
    <ServiceHero
      backgroundImage="/images/corporate/cp12.png"
      accentText="Custom"
      mainText="Service Solutions"
      description="Tailored service packages for your business needs. From single locations to multi-national corporations."
      ctaText="Build Your Solution"
      connectorText=""
      animationType="wobble"
      animationIntensity="intense"
    />
  );
};

export default CustomHero;
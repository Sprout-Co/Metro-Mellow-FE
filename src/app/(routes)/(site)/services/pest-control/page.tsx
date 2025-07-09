import React from "react";
import Hero from "./_components/Hero/Hero";
import SafetyPromise from "./_components/SafetyPromise/SafetyPromise";
import ServiceCoverage from "./_components/ServiceCoverage/ServiceCoverage";

export const metadata = {
  title: "Professional Pest Control Services | Urban Serve",
  description:
    "Effective and eco-friendly pest control solutions for residential and commercial properties. Safe, thorough, and reliable pest management.",
  keywords:
    "pest control, pest management, insect control, rodent control, eco-friendly pest control, residential pest control, commercial pest control",
};

export default function PestControlPage() {
  return (
    <main>
      <Hero />
      <SafetyPromise />
      <ServiceCoverage />
    </main>
  );
}

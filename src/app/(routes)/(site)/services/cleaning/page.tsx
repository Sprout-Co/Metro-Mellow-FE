import React from "react";
import CleaningPageClient from "./_components/CleaningPageClient/CleaningPageClient";

export const metadata = {
  title: "Professional Cleaning Services | Urban Serve",
  description:
    "Experience sparkling clean spaces with our professional cleaning services. Residential, commercial and deep cleaning options available.",
};

export default function CleaningPage() {
  return (
    <main>
      <CleaningPageClient />
    </main>
  );
}

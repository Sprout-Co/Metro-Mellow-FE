"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../_components/AuthLayout";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import ProgressBar from "../../_components/ProgressBar/ProgressBar";

export default function ForgotPasswordClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Enter Email", "Check Email"];

  return (
    <AuthLayout
      title="You are just a few steps away from resetting your password 🔑"
      subtitle="Enter your email address and we'll send you instructions to reset your password"
      brandingCustomContent={
        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />
      }
    >
      <ForgotPasswordForm
        onBackToLogin={() => {
          router.push("/get-started");
        }}
        onStepChange={(step) => setCurrentStep(step)}
      />
    </AuthLayout>
  );
}

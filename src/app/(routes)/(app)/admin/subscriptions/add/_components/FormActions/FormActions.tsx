import React from "react";
import Button from "../../../../_components/UI/Button/Button";
import styles from "./FormActions.module.scss";

interface FormActionsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canProceed: boolean;
  canSubmit: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting,
  canProceed,
  canSubmit,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={styles.form_actions}>
      <div className={styles.form_actions__progress}>
        <span className={styles.form_actions__step_info}>
          Step {currentStep} of {totalSteps}
        </span>
        <div className={styles.form_actions__progress_bar}>
          <div
            className={styles.form_actions__progress_fill}
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.form_actions__buttons}>
        {!isFirstStep && (
          <Button
            variant="secondary"
            size="medium"
            onClick={onPrev}
            disabled={isSubmitting}
            className={styles.form_actions__button}
          >
            Previous
          </Button>
        )}

        {!isLastStep ? (
          <Button
            variant="primary"
            size="medium"
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
            className={styles.form_actions__button}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            size="medium"
            onClick={onSubmit}
            disabled={!canSubmit || isSubmitting}
            className={styles.form_actions__button}
          >
            {isSubmitting ? "Creating Subscription..." : "Create Subscription"}
          </Button>
        )}
      </div>

      <div className={styles.form_actions__help}>
        {currentStep === 1 && (
          <p>Select a customer and their delivery address to continue.</p>
        )}
        {currentStep === 2 && (
          <p>
            Choose services and configure their settings for the subscription.
          </p>
        )}
        {currentStep === 3 && (
          <p>Review the subscription details and create the subscription.</p>
        )}
      </div>
    </div>
  );
};

export default FormActions;

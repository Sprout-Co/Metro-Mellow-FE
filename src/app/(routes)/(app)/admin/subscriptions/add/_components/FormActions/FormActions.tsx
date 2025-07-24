import React from "react";
import Button from "../../../../_components/UI/Button/Button";
import styles from "./FormActions.module.scss";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  isLoading,
  disabled,
}) => {
  return (
    <div className={styles.form_actions}>
      <div className={styles.form_actions__buttons}>
        <Button
          variant="secondary"
          size="medium"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={onSubmit}
          disabled={disabled}
          loading={isLoading}
        >
          {isLoading ? "Creating Subscription..." : "Create Subscription"}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
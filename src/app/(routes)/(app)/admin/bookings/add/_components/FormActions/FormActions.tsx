import React from "react";
import { useRouter } from "next/navigation";
import Button from "../../../../_components/UI/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./FormActions.module.scss";

interface FormActionsProps {
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isValid,
  isSubmitting,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <div className={styles.form_actions}>
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Booking"}
      </Button>
    </div>
  );
};

export default FormActions;

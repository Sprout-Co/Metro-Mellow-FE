import Modal from "@/components/ui/Modal/Modal";
import React from "react";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Add Address Modal</h2>
      {/* Modal content goes here */}
    </Modal>
  );
};

export default AddAddressModal;

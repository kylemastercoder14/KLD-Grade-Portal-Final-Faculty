import React from "react";
import { Modal } from "../ui/modal";

const SupportForm = ({isOpen, onClose}: {isOpen: boolean; onClose: () => void;}) => {
  return (
    <Modal title="Sample Title" description="Wow" isOpen={isOpen} onClose={onClose}>
      SupportForm
    </Modal>
  );
};

export default SupportForm;

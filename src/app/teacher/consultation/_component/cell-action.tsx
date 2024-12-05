"use client";

import { Button } from "@/components/ui/button";
import { ConsultationColumn } from "./column";
import React from "react";
import { confirmConsultation } from "@/actions/consultation";
import { toast } from "sonner";

interface CellActionProps {
  data: ConsultationColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const handleConfirm = async () => {
    const response = await confirmConsultation(data.id);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Consultation confirmed.");
    }
  };
  return (
    <>
      <Button size="sm" variant="secondary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  );
};

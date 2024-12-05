"use client";

import { Button } from "@/components/ui/button";
import { LogsColumn } from "./column";
import React from "react";
import { confirmConsultation } from "@/actions/consultation";
import { toast } from "sonner";

interface CellActionTeacherProps {
  data: LogsColumn;
}

export const CellActionTeacher: React.FC<CellActionTeacherProps> = ({
  data,
}) => {
  const handleConfirm = async () => {
    const response = await confirmConsultation(data.id);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Consultation confirmed.");
    }
  };

  console.log("Position", data.position)
  return (
    <>
      <Button
        size="sm"
        disabled={
          data.teacher === "Confirmed" || data.position !== "Instructor"
        }
        variant={data.teacher === "Confirmed" ? "secondary" : "secondary"}
        onClick={handleConfirm}
      >
        {data.teacher === "Confirmed" ? "Confirmed" : "Confirm"}
      </Button>
    </>
  );
};

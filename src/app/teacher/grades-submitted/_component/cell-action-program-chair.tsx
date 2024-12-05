"use client";

import { Button } from "@/components/ui/button";
import { LogsColumn } from "./column";
import React from "react";
import AlertModal from "@/components/ui/alert-modal";
import { useConfirmEcrProgramChair } from "@/data/logs";

interface CellActionProgramChairProps {
  data: LogsColumn;
}

export const CellActionProgramChair: React.FC<CellActionProgramChairProps> = ({
  data,
}) => {
  const [isConfirm, setIsConfirm] = React.useState(false);

  const { mutate: confirmEcrProgramChair, isPending: isConfirming } =
    useConfirmEcrProgramChair();

  const onConfirm = async () => {
    confirmEcrProgramChair(data.id, {
      onSuccess: () => {
        window.location.reload();
        setIsConfirm(false);
      },
    });
  };

  return (
    <>
      <AlertModal
        title="Are you sure you want to confirm this data?"
        onConfirm={onConfirm}
        loading={isConfirming}
        isOpen={isConfirm}
        onClose={() => setIsConfirm(false)}
      />
      <Button
        size="sm"
        disabled={
          data.programChair === "Confirmed" ||
          data.position !== "Program Director"
        }
        variant={
          data.programChair === "Confirmed" ? "secondary" : "secondary"
        }
        onClick={() => setIsConfirm(true)}
      >
        {data.programChair === "Confirmed" ? "Confirmed" : "Confirm"}
      </Button>
    </>
  );
};

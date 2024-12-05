"use client";

import { Button } from "@/components/ui/button";
import { LogsColumn } from "./column";
import React from "react";
import AlertModal from "@/components/ui/alert-modal";
import { useConfirmEcrDean } from "@/data/logs";

interface CellActionDeanProps {
  data: LogsColumn;
}

export const CellActionDean: React.FC<CellActionDeanProps> = ({ data }) => {
  const [isConfirm, setIsConfirm] = React.useState(false);

  const { mutate: confirmEcrDean, isPending: isConfirming } =
    useConfirmEcrDean();

  const onConfirm = async () => {
    confirmEcrDean(data.id, {
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
        disabled={data.dean === "Confirmed" || data.position !== "Dean"}
        variant={data.dean === "Confirmed" ? "secondary" : "secondary"}
        onClick={() => setIsConfirm(true)}
      >
        {data.dean === "Confirmed" ? "Confirmed" : "Confirm"}
      </Button>
    </>
  );
};

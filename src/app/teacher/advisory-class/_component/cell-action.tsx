"use client";

import { Button } from "@/components/ui/button";
import { AdvisoryClassColumn } from "./column";
import React from "react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: AdvisoryClassColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        router.push(
          `https://kld-grade-portal-final-faculty.vercel.app/teacher/advisory-class/${data.section}`
        )
      }
    >
      Class Record
    </Button>
  );
};

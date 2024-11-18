"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { HandledCoursesColumn } from "./column";

interface CellActionProps {
  data: HandledCoursesColumn;
}

// `https://kld-grade-portal-final-faculty.vercel.app/teacher/handled-courses/class-record?section=${data.section}&course=${data.course}`

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        router.push(
          `http://localhost:3000/teacher/handled-courses/class-record?section=${data.section}&course=${data.course}`
        )
      }
    >
      Class Record
    </Button>
  );
};

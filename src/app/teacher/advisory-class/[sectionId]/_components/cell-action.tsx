"use client";

import { Button } from "@/components/ui/button";
import { StudentColumn } from "./column";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: StudentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() =>
          router.push(
            `/teacher/advisory-class/${params.sectionId}/${data.studentId}`
          )
        }
        size="sm"
        variant="secondary"
      >
        View Student
      </Button>
    </>
  );
};

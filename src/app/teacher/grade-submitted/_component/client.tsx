"use client";

import React, { useRef } from "react";
import { columns, GradeSubmittedColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetGradeSubmitted } from "@/data/grade-submitted";

const GradeSubmittedClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: gradeSubmitted, error, isLoading } = useGetGradeSubmitted();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: GradeSubmittedColumn[] =
    gradeSubmitted?.data?.map((item) => ({
      id: item.id,
      course: item.course.name + " (" + item.course.code + ")",
      status:
        item.teacherSigned &&
        item.deanSigned &&
        item.programChairSigned &&
        item.registrarSigned
          ? "Completed"
          : "Pending",
      file: "Next Task",
      program: item.programs.name,
      section: item.section.name,
      semester: item.period,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} />
      <div ref={tableRef}>
        <DataTable
          loading={isLoading}
          searchKey="program"
          columns={columns}
          data={formattedData}
        />
      </div>
    </div>
  );
};

export default GradeSubmittedClient;

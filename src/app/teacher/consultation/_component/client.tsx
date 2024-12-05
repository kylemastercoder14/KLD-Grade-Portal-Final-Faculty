"use client";

import React from "react";
import { columns, ConsultationColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetConsultation } from "@/data/consultation";

const ConsultationClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: consultationData, error, isLoading } = useGetConsultation();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: ConsultationColumn[] =
    consultationData?.data?.map((item) => ({
      id: item.id,
      course: item.course.name + " (" + item.course.code + ")",
      student: item.student.firstName + " " + item.student.lastName,
      studentId: item.studentNumber,
      status: item.status,
      concern: item.concern,
      comment: item.comment,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader />
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default ConsultationClient;

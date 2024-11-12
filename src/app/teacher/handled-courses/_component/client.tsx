"use client";

import React, { useRef } from "react";
import { columns, HandledCoursesColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetHandledCourse } from "@/data/handled-course";

const HandledCourseClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: handledCourseData, error, isLoading } = useGetHandledCourse();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: HandledCoursesColumn[] =
    handledCourseData?.data?.map((item) => ({
      id: item.id,
      sectionId: item.sectionId,
      section: item.section.name,
      courseId: item.courseId,
      course: item.course.name,
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
          searchKey="name"
          columns={columns}
          data={formattedData}
        />
      </div>
    </div>
  );
};

export default HandledCourseClient;

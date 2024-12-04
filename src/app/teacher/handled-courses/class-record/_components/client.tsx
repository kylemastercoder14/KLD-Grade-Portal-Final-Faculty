"use client";

import React from "react";
import { columns, StudentColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Programs, Sections, Students, YearLevels } from "@prisma/client";
import TableHeader from "./table-header";

interface StudentsProps extends Students {
  programs: Programs | null;
  sections: Sections | null;
  yearLevels: YearLevels | null;
}

const ClassRecordClient = ({
  data,
  course,
}: {
  data: StudentsProps[];
  course: string;
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedData: StudentColumn[] =
    data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      studentId: item.studentNumber,
      programId: item.programs?.name ?? "",
      yearLevelId: item.yearLevels?.name ?? "",
      sectionId: item.sections?.name ?? "",
      status: item.isArchive ? "Inactive" : "Active",
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader course={course} />
      <DataTable searchKey="name" columns={columns} data={formattedData} />
    </div>
  );
};

export default ClassRecordClient;

"use client";

import React, { useRef } from "react";
import { columns, StudentColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Programs, Sections, Students, YearLevels } from "@prisma/client";

interface StudentsProps extends Students {
  programs: Programs | null;
  sections: Sections | null;
  yearLevels: YearLevels | null;
}

const ClassRecordClient = ({ data }: { data: StudentsProps[] }) => {
  const tableRef = useRef<HTMLTableElement>(null);
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
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div ref={tableRef}>
        <DataTable searchKey="name" columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default ClassRecordClient;

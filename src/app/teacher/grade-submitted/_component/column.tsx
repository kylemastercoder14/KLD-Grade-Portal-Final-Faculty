/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type GradeSubmittedColumn = {
  id: string;
  file: string;
  course: string;
  program: string;
  section: string;
  status: string;
  semester: string;
  createdAt: string;
};

export const columns: ColumnDef<GradeSubmittedColumn>[] = [
  {
    accessorKey: "yearLevel",
    header: "Year Level",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "file",
    header: "File",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Pending" ? "destructive" : "default"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type ConsultationColumn = {
  id: string;
  student: string;
  studentId: string;
  course: string;
  concern: string;
  comment: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<ConsultationColumn>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "student",
    header: "Student",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "concern",
    header: "Concern",
  },
  {
    accessorKey: "comment",
    header: "Comment",
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

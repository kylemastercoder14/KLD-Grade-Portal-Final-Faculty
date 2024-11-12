/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type HandledCoursesColumn = {
  id: string;
  section: string;
  sectionId: string;
  course: string;
  courseId: string;
  createdAt: string;
};

export const columns: ColumnDef<HandledCoursesColumn>[] = [
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];

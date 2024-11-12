/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AdvisoryClassColumn = {
  id: string;
  section: string;
  sectionId: string;
  createdAt: string;
};

export const columns: ColumnDef<AdvisoryClassColumn>[] = [
  {
    accessorKey: "section",
    header: "Section",
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

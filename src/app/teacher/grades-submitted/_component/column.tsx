/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Badge } from "@/components/ui/badge";
import { IconFileDownload } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { CellActionTeacher } from "./cell-action-teacher";
import { CellActionProgramChair } from "./cell-action-program-chair";
import { CellActionDean } from "./cell-action-dean";

export type LogsColumn = {
  id: string;
  file: string;
  teacher: string;
  programChair: string;
  dean: string;
  position: string;
  createdAt: string;
};

export const columns: ColumnDef<LogsColumn>[] = [
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => {
      // Extract file name from the URL and remove extension
      const fileUrl = row.original.file;
      const fileNameWithExtension = fileUrl.split("/").pop() || "";
      const fileName = fileNameWithExtension.replace(/\.xlsx$/, "");

      return (
        <div className="flex items-center gap-2">
          <IconFileDownload className="w-4 h-4" />
          <a
            href={fileUrl}
            download={fileNameWithExtension}
            className="text-primary underline"
          >
            {fileName}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
    cell: ({ row }) => <CellActionTeacher data={row.original} />,
  },
  {
    accessorKey: "programChair",
    header: "Program Director",
    cell: ({ row }) => <CellActionProgramChair data={row.original} />,
  },
  {
    accessorKey: "dean",
    header: "Dean",
    cell: ({ row }) => <CellActionDean data={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];

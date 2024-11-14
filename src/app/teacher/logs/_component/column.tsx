/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { IconFileDownload } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

export type LogsColumn = {
  id: string;
  file: string;
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
    accessorKey: "createdAt",
    header: "Date Created",
  },
];

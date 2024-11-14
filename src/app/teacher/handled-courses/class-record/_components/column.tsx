/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type StudentColumn = {
  id: string;
  name: string;
  studentId: string;
  programId: string;
  yearLevelId: string;
  sectionId: string;
  email: string;
  status: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<StudentColumn>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            alt="Image"
            width={40}
            height={40}
            className="object-cover rounded-md no-print"
          />
        ) : (
          <Avatar className="w-10 h-10 object-cover no-print rounded-md">
            <AvatarFallback className="rounded-md">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "studentId",
    header: "Student No.",
  },
  {
    accessorKey: "programId",
    header: "Program",
  },
  {
    accessorKey: "yearLevelId",
    header: "Year Level",
  },
  {
    accessorKey: "sectionId",
    header: "Section",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "secondary" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];

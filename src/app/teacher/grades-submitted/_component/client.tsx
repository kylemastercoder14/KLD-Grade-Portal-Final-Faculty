"use client";

import React, { useRef } from "react";
import { columns, LogsColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetLogs } from "@/data/logs";

const LogsClient = ({position}: {position: string}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: logsData, error, isLoading } = useGetLogs();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: LogsColumn[] =
    logsData?.data?.map((item) => ({
      id: item.id,
      file: item.name,
      teacher: item.teacherSigned === true ? "Confirmed" : "Pending",
      position: position,
      programChair: item.programChairSigned === true ? "Confirmed" : "Pending",
      dean: item.deanSigned === true ? "Confirmed" : "Pending",
      registrar: item.registrarSigned === true ? "Confirmed" : "Pending",
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

export default LogsClient;

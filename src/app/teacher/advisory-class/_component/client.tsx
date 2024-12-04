"use client";

import React from "react";
import { columns, AdvisoryClassColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetAdvisoryClass } from "@/data/assign-adviser";

const AdvisoryClassClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: advisoryClassData, error, isLoading } = useGetAdvisoryClass();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: AdvisoryClassColumn[] =
    advisoryClassData?.data?.map((item) => ({
      id: item.id,
      sectionId: item.sectionId,
      section: item.section.name,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader />
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default AdvisoryClassClient;

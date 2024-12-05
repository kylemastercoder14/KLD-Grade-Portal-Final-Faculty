"use client";

import React, { RefObject } from "react";
import MoreButton from "@/components/globals/more-button";

const TableHeader = ({
  tableRef,
}: {
  tableRef: RefObject<HTMLTableElement>;
}) => {
  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Uploaded ECR Record</p>
        <p className="text-sm text-muted-foreground">
          View and manage uploaded Electronic Class Records (ECR). This table
          provides an organized overview of class records, enabling efficient
          tracking, downloading, and management of course-related data.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

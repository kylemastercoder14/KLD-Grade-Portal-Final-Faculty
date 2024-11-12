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
        <p className="text-xl font-bold">Advisory Class Record</p>
        <p className="text-sm text-muted-foreground">
          Manage and track advisory classes assigned to each teacher. This table
          provides an organized view of student groups under each adviser,
          enabling easy updates and efficient management of advisory
          assignments.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

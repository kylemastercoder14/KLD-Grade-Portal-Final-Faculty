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
        <p className="text-xl font-bold">Handled Course Record</p>
        <p className="text-sm text-muted-foreground">
          View and manage courses assigned to instructors. This table provides a
          comprehensive overview of course assignments, allowing easy tracking
          and updating of instructor-course pairings.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

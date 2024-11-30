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
        <p className="text-xl font-bold">Grade Submitted Record</p>
        <p className="text-sm text-muted-foreground">
          This table provides a detailed log of all grades submitted for
          students, allowing administrators, faculty, and staff to track
          progress and ensure timely updates. It serves as an essential tool for
          monitoring the status of grade submissions, addressing any issues or
          concerns, and maintaining an organized record of academic assessments.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

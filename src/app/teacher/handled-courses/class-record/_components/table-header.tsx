"use client";

import React, { RefObject } from "react";
import MoreButton from "@/components/globals/more-button";
import UploadEcr from "./upload-ecr";

const TableHeader = ({
  tableRef,
  course,
}: {
  tableRef: RefObject<HTMLTableElement>;
  course: string;
}) => {
  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">{course}</p>
        <p className="text-sm text-muted-foreground">
          This table provides an organized view of student groups under each
          course and their teacher, enabling easy updates and efficient
          management of grades and academic performance.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <UploadEcr />
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

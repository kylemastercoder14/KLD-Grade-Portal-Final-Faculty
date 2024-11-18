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
        <p className="text-xl font-bold">Consultation Record</p>
        <p className="text-sm text-muted-foreground">
          Keep a comprehensive record of consultations between students and
          advisers. This table offers a detailed view of each consultation
          session, enabling you to monitor progress, address concerns
          efficiently, and ensure effective academic and personal support for
          students.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
    </div>
  );
};

export default TableHeader;

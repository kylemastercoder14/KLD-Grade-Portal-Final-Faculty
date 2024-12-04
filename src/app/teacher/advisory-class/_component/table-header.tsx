"use client";

import React from "react";

const TableHeader = () => {
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
    </div>
  );
};

export default TableHeader;

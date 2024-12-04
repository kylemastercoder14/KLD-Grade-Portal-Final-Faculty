"use client";

import React from "react";

const TableHeader = () => {
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
    </div>
  );
};

export default TableHeader;

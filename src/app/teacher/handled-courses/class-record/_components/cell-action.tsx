/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { StudentColumn } from "./column";
import * as XLSX from "xlsx";
import { ChangeEvent, useState } from "react";

interface CellActionProps {
  data: StudentColumn;
}

type JsonData = Record<string, unknown>[];

const parseExcelFile = async (file: File): Promise<JsonData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet name
      const sheetName = workbook.SheetNames[3];

      // Convert the sheet to JSON
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      resolve(jsonData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [excelData, setExcelData] = useState<JsonData | null>(null);
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await parseExcelFile(file);
      setExcelData(data);
    }
  };
  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <Button size="sm" variant="secondary">
        Compute Grade
      </Button>
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </>
  );
};

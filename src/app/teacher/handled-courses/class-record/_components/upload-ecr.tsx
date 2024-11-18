/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { getAllStudentNumbers } from "@/actions/class-record";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { insertGradeToDatabase, uploadEcr } from "@/actions/upload-ecr";
import ConfirmModal from "@/components/globals/confirm-modal";
import { uploadFile } from "@/lib/upload";

type JsonData = Record<string, unknown>[];
type Grades = {
  studentNumber: any;
  courseCode: any;
  programCode: any;
  sectionName: any;
  grade: any;
  remarks: any;
  period: any;
};

const parseExcelFile = async (file: File): Promise<JsonData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[3];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      resolve(jsonData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const columnMapping = {
  __EMPTY_2: "studentNumber",
  __EMPTY_3: "studentName",
  __EMPTY_5: "programCode",
  __EMPTY_6: "grade",
  __EMPTY_8: "remarks",
  metadata_courseCode: "courseCode",
  metadata_sectionName: "sectionName",
};

const transformData = (data: JsonData): Grades[] => {
  const courseCode = data.find((row) => row.__EMPTY_1 === "Course Code:")
    ?.__EMPTY_3 as string;
  const sectionName = data.find((row) => row.__EMPTY_1 === "Course Title:")
    ?.__EMPTY_6 as string;

  return data
    .filter((row) => row.__EMPTY_2 && row.__EMPTY_6)
    .map((row) => {
      const transformed: Partial<Grades> = {
        [columnMapping.metadata_courseCode]: courseCode,
        [columnMapping.metadata_sectionName]: sectionName,
      };
      Object.entries(columnMapping).forEach(([excelKey, schemaKey]) => {
        if (excelKey.startsWith("metadata_")) return;
        const value = row[excelKey];
        if (typeof value === "string" || typeof value === "number") {
          transformed[schemaKey as keyof Grades] =
            value as Grades[keyof Grades];
        }
      });
      return transformed as Grades;
    });
};

const UploadEcr = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentNumbers, setStudentNumbers] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<Grades[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchStudentNumbers = async () => {
      const data = await getAllStudentNumbers(section);
      if (data.data) {
        setStudentNumbers(data.data);
      } else {
        toast.error(data.error);
        console.error(data.error);
      }
    };

    fetchStudentNumbers();
  }, [section]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const rawData = await parseExcelFile(file);
        const transformedData = transformData(rawData);
        const excludedFirstRow = transformedData.slice(1);

        // Filter valid data that matches student numbers
        const validData = excludedFirstRow.filter((row) =>
          studentNumbers.includes(row.studentNumber)
        );

        // Identify unmatched student numbers
        const unmatchedData = excludedFirstRow.filter(
          (row) => !studentNumbers.includes(row.studentNumber)
        );

        if (unmatchedData.length > 0) {
          console.warn(
            "Unmatched student numbers:",
            unmatchedData.map((row) => row.studentNumber)
          );
        }

        // Update state with valid data
        setExcelData(validData);

        // Open confirmation modal before proceeding
        if (validData.length > 0) {
          setIsDialogOpen(true);
        } else {
          toast.error("No valid student numbers found in the uploaded file.");
        }
      } catch (error) {
        toast.error("Error processing the file. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      if (excelData && excelData.length > 0) {
        const response = await insertGradeToDatabase(excelData);
        if (response.error) {
          toast.error(response.error);
        } else {
          const uploadResult = await uploadFile(
            fileInputRef.current?.files?.[0] as File
          );
          await uploadEcr(uploadResult.url);
          toast.success(`ECR successfully uploaded.`);
        }
      }
    } catch (error) {
      toast.error("Error uploading data.");
      console.error("Error:", error);
    } finally {
      setIsDialogOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        loading={isLoading}
        onConfirm={onConfirm}
      />
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      <Button size="sm" variant="default" onClick={triggerFileInput}>
        Upload ECR
      </Button>
    </>
  );
};

export default UploadEcr;

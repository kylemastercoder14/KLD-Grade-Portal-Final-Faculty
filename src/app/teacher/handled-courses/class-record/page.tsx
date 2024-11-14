"use client";
import { getAllClassRecord } from "@/actions/class-record";
import { Card, CardContent } from "@/components/ui/card";
import { Programs, Sections, Students, YearLevels } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ClassRecordClient from "./_components/client";

interface ClassRecordProps extends Students {
  sections: Sections;
  programs: Programs;
  yearLevels: YearLevels;
}

const ClassRecord = () => {
  const searchParams = useSearchParams();
  const [classRecord, setClassRecord] = useState<ClassRecordProps[]>([]);

  const section = searchParams.get("section") || "";
  const course = searchParams.get("course") || "";

  useEffect(() => {
    const fetchClassRecord = async () => {
      const response = await getAllClassRecord(section);
      if (response.data) {
        setClassRecord(response.data);
      } else {
        toast.error(response.error);
        console.error(response.error);
      }
    };

    fetchClassRecord();
  }, [section]);

  return (
    <div>
      <Card className="mt-4">
        <CardContent>
          <ClassRecordClient course={course} data={classRecord} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassRecord;

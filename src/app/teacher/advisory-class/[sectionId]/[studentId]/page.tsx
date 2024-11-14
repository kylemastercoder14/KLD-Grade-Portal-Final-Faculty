import db from "@/lib/db";
import React from "react";
import StudentProfile from "./student-profile";
import { redirect } from "next/navigation";

const ViewStudent = async ({
  params,
}: {
  params: { studentId: string; sectionId: string };
}) => {
  const student = await db.students.findFirst({
    where: {
      studentNumber: params.studentId,
    },
    include: {
      grades: true,
      sections: true,
      programs: true,
      yearLevels: true,
    },
  });

  if (!student) {
    redirect(`/teacher/advisory-class/${params.sectionId}`);
  }

  return (
    <div>
      <StudentProfile student={student} />
    </div>
  );
};

export default ViewStudent;

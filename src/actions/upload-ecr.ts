/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const insertGradeToDatabase = async (data: any[]) => {
  try {
    const existingGrade = await db.grades.findFirst({
      where: {
        studentNumber: data[0].studentNumber,
        courseCode: data[0].courseCode,
        programCode: data[0].programCode,
        sectionName: data[0].sectionName,
        period: "Midterm Period",
      },
    });

    if (existingGrade) {
      return { error: "Grades already submitted." };
    }

    const response = await db.grades.createMany({
      data: data.map((grade) => ({
        studentNumber: grade.studentNumber,
        courseCode: grade.courseCode,
        programCode: grade.programCode,
        sectionName: grade.sectionName,
        period: "Midterm Period",
        grade: grade.grade,
        remarks: grade.remarks,
      })),
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const uploadEcr = async (file: string) => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "Teacher not found." };
  }
  try {
    const response = await db.uploadedEcr.create({
      data: {
        teacherId,
        name: file,
      },
    });

    const teacher = await db.teachers.findFirst({
      where: {
        id: teacherId,
      },
    });

    await db.logs.create({
      data: {
        action: `${teacher?.firstName} ${
          teacher?.lastName
        } uploaded ECR file on ${new Date().toLocaleString()}`,
      },
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

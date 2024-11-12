/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllHandledCourses = async () => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "No Teacher ID found." };
  }

  try {
    const data = await db.assignCourseTeacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        teacherId,
      },
      include: {
        section: true,
        course: true,
      },
    });

    if (!data) {
      return { error: "No handled course found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

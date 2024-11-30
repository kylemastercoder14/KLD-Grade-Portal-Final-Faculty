"use server";

/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllGradesSubmitted = async () => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "No Teacher ID found." };
  }

  try {
    const data = await db.grades.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        teacherId,
      },
      include: {
        course: true,
        programs: true,
        section: true,
        student: true,
        teacher: true
      },
    });

    if (!data) {
      return { error: "No grades found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

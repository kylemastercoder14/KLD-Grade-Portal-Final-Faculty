/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllAdvisory = async () => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "No Teacher ID found." };
  }

  try {
    const data = await db.assignTeacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        teacherId,
      },
      include: {
        section: true,
      },
    });

    if (!data) {
      return { error: "No advisory class found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

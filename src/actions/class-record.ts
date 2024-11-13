/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import db from "@/lib/db";

export const getAllClassRecord = async (section: string) => {
  try {
    const data = await db.students.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        sections: {
          name: section,
        },
      },
      include: {
        programs: true,
        sections: true,
        yearLevels: true,
      },
    });

    if (!data) {
      return { error: "No students found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

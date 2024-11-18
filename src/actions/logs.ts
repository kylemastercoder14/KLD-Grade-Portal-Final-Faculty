/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllLogs = async () => {
  const { teacherId } = await useUser();
  try {
    const data = await db.uploadedEcr.findMany({
      where: {
        teacherId
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      return { error: "No logs found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

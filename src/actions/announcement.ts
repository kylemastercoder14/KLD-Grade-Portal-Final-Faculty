/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import db from "@/lib/db";

export const getAllAnnouncement = async () => {
  try {
    const data = await db.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      return { error: "No announcement found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

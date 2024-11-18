/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllConsultation = async () => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "No Teacher ID found." };
  }

  try {
    const data = await db.consultation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        teacherId,
      },
      include: {
        student: true,
        teacher: true,
        course: true,
      },
    });

    if (!data) {
      return { error: "No consultation found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const confirmConsultation = async (id: string) => {
  try {
    const data = await db.consultation.update({
      where: {
        id,
      },
      data: {
        status: "Confirmed",
      },
    });

    if (!data) {
      return { error: "No consultation found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";

export const getAllLogs = async () => {
  const { teacherId, teacher } = await useUser();
  try {
    if (teacher?.position === "Instructor") {
      const data = await db.uploadedEcr.findMany({
        where: {
          teacherId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!data) {
        return { error: "No logs found." };
      }

      return { data };
    }

    const data = await db.uploadedEcr.findMany({
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

export const confirmEcrProgramChair = async (ecrId: string) => {
  if (!ecrId) {
    return { error: "ECR ID is required." };
  }

  try {
    const ecr = await db.uploadedEcr.update({
      data: {
        programChairSigned: true,
      },
      where: {
        id: ecrId,
      },
    });

    return { success: "ECR confirmed successfully", ecr };
  } catch (error: any) {
    return {
      error: `Failed to confirm ECR. Please try again. ${error.message || ""}`,
    };
  }
};

export const confirmEcrDean = async (ecrId: string) => {
  if (!ecrId) {
    return { error: "ECR ID is required." };
  }

  try {
    const ecr = await db.uploadedEcr.update({
      data: {
        deanSigned: true,
      },
      where: {
        id: ecrId,
      },
    });

    return { success: "ECR confirmed successfully", ecr };
  } catch (error: any) {
    return {
      error: `Failed to confirm ECR. Please try again. ${error.message || ""}`,
    };
  }
};

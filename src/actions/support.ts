/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { SupportValidators } from "@/functions/validators";
import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";
import { z } from "zod";

export const createSupport = async (
  values: z.infer<typeof SupportValidators>
) => {
  const { teacher } = await useUser();
  if (!teacher) {
    return { error: "You must be logged in to create a support ticket" };
  }

  const validatedField = SupportValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { concern, attachment } = validatedField.data;

  try {
    const support = await db.support.create({
      data: {
        name: teacher.firstName + " " + teacher.lastName,
        email: teacher.email,
        concerns: concern,
        attachment,
      },
    });

    return { success: "Ticket submitted successfully", support };
  } catch (error: any) {
    return {
      error: `Failed to submit ticket. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

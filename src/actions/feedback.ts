/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use server";

import { FeedbackValidators } from "@/functions/validators";
import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";
import { z } from "zod";

export const createFeedback = async (
  values: z.infer<typeof FeedbackValidators>
) => {
  const { teacher } = await useUser();
  if (!teacher) {
    return { error: "You must be logged in to create a support ticket" };
  }

  const validatedField = FeedbackValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { feedback, comment } = validatedField.data;

  try {
    const feedbacks = await db.feedback.create({
      data: {
        name: teacher.firstName + " " + teacher.lastName,
        feedback,
        comment: comment || "",
      },
    });

    return { success: "Feedback submitted successfully", feedbacks };
  } catch (error: any) {
    return {
      error: `Failed to submit feedback. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

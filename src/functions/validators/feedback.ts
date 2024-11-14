import { z } from "zod";

export const FeedbackValidators = z.object({
  feedback: z.string().min(1, { message: "Feedback is required" }),
  comment: z.string().optional(),
});

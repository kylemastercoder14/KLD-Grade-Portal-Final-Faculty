import { z } from "zod";

export const SupportValidators = z.object({
  concern: z.string().min(1, { message: "Concern is required" }),
  attachment: z.string().min(1, { message: "Attachment is required" }),
});

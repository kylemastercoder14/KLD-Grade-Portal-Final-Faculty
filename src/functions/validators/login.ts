import { z } from "zod";

export const LoginValidators = z.object({
  employeeNumber: z.string().min(1, { message: "Employee number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

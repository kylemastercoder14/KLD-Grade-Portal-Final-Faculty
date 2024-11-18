import { z } from "zod";

export const LoginValidators = z.object({
  employeeNumber: z.string().min(1, { message: "Employee number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const ResetPasswordValidators = z.object({
  email: z
    .string()
    .min(1, { message: "KLD email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@kld\.edu\.ph$/, {
      message: "Email must be in the format: jdelacruz@kld.edu.ph",
    }),
});

export const NewPasswordValidators = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Attach error to the confirmPassword field
  });

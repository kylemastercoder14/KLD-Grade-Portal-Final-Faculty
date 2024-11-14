/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TeacherValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { useUser } from "@/hooks/use-user";

export const changeProfileImage = async (image: string) => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "Teacher ID is required." };
  }

  try {
    const response = await db.teachers.update({
      data: {
        profileImage: image,
      },
      where: {
        id: teacherId,
      },
    });

    return { success: "Profile image updated successfully", response };
  } catch (error: any) {
    return {
      error: `Failed to update profile image. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteProfileImage = async () => {
  const { teacherId } = await useUser();
  if (!teacherId) {
    return { error: "Teacher ID is required." };
  }

  try {
    // Update database to remove profile image
    const response = await db.teachers.update({
      data: {
        profileImage: "",
      },
      where: {
        id: teacherId,
      },
    });

    return { success: "Profile image deleted successfully", response };
  } catch (error: any) {
    return {
      error: `Failed to delete profile image. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateTeacher = async (
  values: z.infer<typeof TeacherValidator>,
  teacherId: string
) => {
  if (!teacherId) {
    return { error: "Teacher ID is required." };
  }

  const validatedField = TeacherValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    employeeNumber,
    firstName,
    middleName,
    lastName,
    extensionName,
    age,
    barangay,
    birthDate,
    maritalStatus,
    email,
    gender,
    houseNumber,
    municipality,
    phoneNumber,
    province,
    region,
    position,
    zipCode,
    profileImage,
    confirmPassword,
    password,
  } = validatedField.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const teacher = await db.teachers.update({
      data: {
        employeeId: employeeNumber,
        firstName,
        middleName,
        lastName,
        extensionName,
        age,
        barangay,
        birthDate,
        civilStatus: maritalStatus,
        email,
        gender,
        houseNumber,
        city: municipality,
        phoneNumber,
        province,
        region,
        zipCode,
        profileImage,
        position,
        password: hashedPassword,
      },
      where: {
        id: teacherId,
      },
    });
    return { success: "Account updated successfully", teacher };
  } catch (error: any) {
    return {
      error: `Failed to update account. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

import db from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Since this is running in a server component, we should treat it as a utility, not a hook
export const useUser = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("Authorization");

  if (!authToken) {
    return { error: "Authorization token is missing" };
  }

  try {
    const token = authToken.value;
    // Verify JWT token using the secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      exp: number;
    };

    const teacherId = decodedToken.sub;

    // Fetch teacher from database
    const teacher = await db.teachers.findFirst({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      return { error: "Teacher not found" };
    }

    return { teacher, teacherId, authToken };
  } catch (error) {
    console.error(error);
    return { error: "Invalid or expired token" };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllHandledCourses } from "@/actions/handled-course";
import { useQuery } from "@tanstack/react-query";

export function useGetHandledCourse() {
  return useQuery({
    queryFn: async () => getAllHandledCourses(),
    queryKey: ["handledCourses"],
  });
}

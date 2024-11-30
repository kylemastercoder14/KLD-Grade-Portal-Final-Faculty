/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllGradesSubmitted } from "@/actions/grade-submitted";
import { useQuery } from "@tanstack/react-query";

export function useGetGradeSubmitted() {
  return useQuery({
    queryFn: async () => getAllGradesSubmitted(),
    queryKey: ["gradeSubmitted"],
  });
}

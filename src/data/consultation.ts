/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllConsultation } from "@/actions/consultation";
import { useQuery } from "@tanstack/react-query";

export function useGetConsultation() {
  return useQuery({
    queryFn: async () => getAllConsultation(),
    queryKey: ["consultation"],
  });
}

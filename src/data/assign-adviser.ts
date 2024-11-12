/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllAdvisory } from "@/actions/advisory-class";
import { useQuery } from "@tanstack/react-query";

export function useGetAdvisoryClass() {
  return useQuery({
    queryFn: async () => getAllAdvisory(),
    queryKey: ["advisoryClass"],
  });
}

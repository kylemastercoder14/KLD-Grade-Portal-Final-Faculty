/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllAnnouncement } from "@/actions/announcement";
import { useQuery } from "@tanstack/react-query";

export function useGetAnnouncement() {
  return useQuery({
    queryFn: async () => getAllAnnouncement(),
    queryKey: ["announcement"],
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { confirmEcrDean, confirmEcrProgramChair, getAllLogs } from "@/actions/logs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetLogs() {
  return useQuery({
    queryFn: async () => getAllLogs(),
    queryKey: ["logs"],
  });
}

export function useConfirmEcrProgramChair() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ecrId: string) => {
      return confirmEcrProgramChair(ecrId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["logs"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useConfirmEcrDean() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ecrId: string) => {
      return confirmEcrDean(ecrId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["logs"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

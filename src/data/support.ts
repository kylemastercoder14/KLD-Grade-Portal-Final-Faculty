/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSupport } from "@/actions/support";
import { SupportValidators } from "@/functions/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useSaveSupport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof SupportValidators>) => {
      return createSupport(values);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["support"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

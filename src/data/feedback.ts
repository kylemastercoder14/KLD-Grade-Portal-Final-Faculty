/* eslint-disable @typescript-eslint/no-explicit-any */

import { createFeedback } from "@/actions/feedback";
import { FeedbackValidators } from "@/functions/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useSaveFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof FeedbackValidators>) => {
      return createFeedback(values);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["feedback"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

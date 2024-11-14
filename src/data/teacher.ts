/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateTeacher } from "@/actions/teacher";
import { TeacherValidator } from "@/functions/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";


export function useSaveTeacher(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof TeacherValidator>) => {
      if (initialData) {
        // Update the teacher
        return updateTeacher(values, initialData.id);
      }
    },
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
import React from "react";
import { Modal } from "../ui/modal";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FeedbackValidators } from "@/functions/validators";
import { useSaveFeedback } from "@/data/feedback";

const FeedbackForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const form = useForm<z.infer<typeof FeedbackValidators>>({
    resolver: zodResolver(FeedbackValidators),
    mode: "onChange",
    defaultValues: {
      feedback: "",
      comment: "",
    },
  });

  const { mutate: saveFeedback, isPending: isSaving } = useSaveFeedback();

  async function onSubmit(values: z.infer<typeof FeedbackValidators>) {
    saveFeedback(values, {
      onSuccess: () => {
        onClose();
        window.location.reload();
      },
    });
  }
  return (
    <Modal
      title="Rate your Experience"
      description="Help us improve by sharing your thoughts. Whether it's a suggestion, a complaint, or just a compliment, we value your feedback!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3.5">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.FEEDBACK_RADIO}
              isRequired={true}
              name="feedback"
              disabled={isSaving}
              feedbackOptions={[
                { value: "Love", label: "Love It!", icon: "😍" },
                { value: "Decent", label: "Decent", icon: "😊" },
                {
                  value: "Bad",
                  label: "Bad",
                  icon: "😞",
                },
              ]}
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              placeholder="Share your feedback here. Let us know what went well or what could be improved."
              label="Tell us more"
              isRequired={false}
              name="comment"
              disabled={isSaving}
            />
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isSaving}
            size="sm"
          >
            {isSaving && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Submit Feedback
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default FeedbackForm;

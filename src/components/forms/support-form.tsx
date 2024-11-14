import React from "react";
import { Modal } from "../ui/modal";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupportValidators } from "@/functions/validators";
import { useSaveSupport } from "@/data/support";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const SupportForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const form = useForm<z.infer<typeof SupportValidators>>({
    resolver: zodResolver(SupportValidators),
    mode: "onChange",
    defaultValues: {
      concern: "",
      attachment: "",
    },
  });

  const { mutate: saveSupport, isPending: isSaving } = useSaveSupport();

  async function onSubmit(values: z.infer<typeof SupportValidators>) {
    saveSupport(values, {
      onSuccess: () => {
        onClose();
        window.location.reload();
      },
    });
  }
  return (
    <Modal
      title="Submit a Support Ticket"
      description="Having an issue or need assistance? Fill out the form below to submit a support ticket. Our team will review your request and get back to you shortly."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3.5">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              placeholder="Concerns"
              label="Explain your concerns to help speed up our investigation."
              isRequired={true}
              name="concern"
              disabled={isSaving}
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DROP_ZONE}
              label="Attachment"
              isRequired={true}
              name="attachment"
              disabled={isSaving}
            />
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isSaving} size="sm">
            {isSaving && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Submit Ticket
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default SupportForm;

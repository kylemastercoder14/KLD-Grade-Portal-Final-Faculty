"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import CustomFormField from "../globals/custom-formfield";
import { Button } from "../ui/button";
import { FormFieldType } from "@/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ResetPasswordValidators } from "@/functions/validators";
import { resetPassword } from "@/actions/login";

const ResetPasswordComponent = () => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof ResetPasswordValidators>>({
    resolver: zodResolver(ResetPasswordValidators),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordValidators>) {
    setLoading(true);
    try {
      const response = await resetPassword(values.email);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          isRequired
          disabled={loading}
          label="KLD Email Address"
          placeholder="jdelacruz@kld.edu.ph"
          name="email"
        />
        <Button disabled={loading} className="w-full mt-2" type="submit">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Reset
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordComponent;
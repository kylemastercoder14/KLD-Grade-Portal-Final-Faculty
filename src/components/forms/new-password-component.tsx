"use client";

import React from "react";
import { Form } from "../ui/form";
import CustomFormField from "../globals/custom-formfield";
import { Button } from "../ui/button";
import { FormFieldType } from "@/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordValidators } from "@/functions/validators";
import { updateNewPassword } from "@/actions/login";

const NewPasswordComponent = ({ teacherId }: { teacherId: string }) => {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof NewPasswordValidators>>({
    resolver: zodResolver(NewPasswordValidators),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof NewPasswordValidators>) {
    setLoading(true);
    try {
      const response = await updateNewPassword(values, teacherId);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
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
          label="New Password"
          type="password"
          placeholder="--------"
          name="password"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          isRequired
          disabled={loading}
          type="password"
          label="Confirm Password"
          placeholder="--------"
          name="confirmPassword"
        />
        <Button disabled={loading} className="w-full mt-2" type="submit">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordComponent;

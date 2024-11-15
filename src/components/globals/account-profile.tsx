"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Teachers } from "@prisma/client";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherValidator } from "@/functions/validators";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAddressData } from "@/functions/address-selection";
import CustomFormField from "./custom-formfield";
import { FormFieldType } from "@/constants";
import { useSaveTeacher } from "@/data/teacher";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { upload } from "@/lib/upload";
import { changeProfileImage, deleteProfileImage } from "@/actions/teacher";
import { toast } from "sonner";
import AlertModal from "../ui/alert-modal";

const AccountProfile = ({ user }: { user: Teachers }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || ""
  );
  const [isImageChanging, setImageChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof TeacherValidator>>({
    resolver: zodResolver(TeacherValidator),
    mode: "onChange",
    defaultValues: user
      ? {
          ...user,
          middleName: user.middleName ?? "",
          extensionName: user.extensionName ?? "",
          profileImage: user.profileImage ?? "",
          maritalStatus: user.civilStatus ?? "",
          municipality: user.city ?? "",
          barangay: user.barangay ?? "",
          employeeNumber: user.employeeId ?? "",
          password: "",
        }
      : {
          employeeNumber: "",
          firstName: "",
          middleName: "",
          lastName: "",
          extensionName: "",
          birthDate: "",
          age: "",
          gender: "",
          maritalStatus: "",
          phoneNumber: "",
          region: "CALABARZON",
          province: "Cavite",
          municipality: "",
          barangay: "",
          houseNumber: "",
          zipCode: "",
          email: "",
          password: "",
          profileImage: "",
          position: "",
          confirmPassword: "",
        },
  });

  const { mutate: saveTeacher, isPending: isLoading } = useSaveTeacher(user);

  async function onSubmit(values: z.infer<typeof TeacherValidator>) {
    saveTeacher(values, {
      onSuccess: () => router.push("/teacher/account"),
    });
  }

  const selectedRegionName = form.watch("region");
  const selectedProvinceName = form.watch("province");
  const selectedMunicipalityName = form.watch("municipality");

  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );

  const handleChangePicture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageChanging(true);
      const response = await upload(file);

      if (response.url) {
        const upload = await changeProfileImage(response.url);
        if (upload.success) {
          setProfileImage(response.url);
          toast.success(upload.success);
          router.refresh();
        } else {
          console.error("Error uploading to database:", upload.error);
          toast.error(upload.error);
        }
      } else {
        toast.error("Error uploading image. Please try again.");
      }

      setImageChanging(false);
    }
  };

  const handleDeletePicture = async () => {
    setLoading(true);
    try {
      const response = await deleteProfileImage();

      if (response.success) {
        setProfileImage(null);
        toast.success(response.success);
        window.location.reload();
      } else {
        console.error("Error deleting image:", response.error);
        toast.error(response.error || "Failed to delete the profile image.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred while deleting the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        loading={loading}
        title="Are you sure you want to delete your profile picture?"
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeletePicture}
      />
      <div className="flex items-center gap-2">
        <Avatar className="w-16 h-16 mr-2">
          <AvatarImage src={profileImage ?? ""} />
          <AvatarFallback>
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="default"
          size="sm"
          onClick={handleChangePicture}
          disabled={isImageChanging}
        >
          {isImageChanging ? "Uploading..." : "Change Picture"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button disabled={isImageChanging} onClick={() => setIsOpen(true)} variant="destructive" size="sm">
          Delete Picture
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="">Personal Information</h3>
          <Separator className="mt-3 mb-2" />
          <div className="space-y-3 flex flex-col">
            <CustomFormField
              label="Employee Number"
              name="employeeNumber"
              placeholder="Enter employee number"
              isRequired
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
              <CustomFormField
                label="First Name"
                name="firstName"
                placeholder="Juan"
                isRequired
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Middle Name"
                name="middleName"
                placeholder="Santiago"
                isRequired={false}
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Last Name"
                name="lastName"
                placeholder="Dela Cruz"
                isRequired
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Extension Name"
                name="extensionName"
                placeholder="JR, SR, III"
                isRequired={false}
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
            </div>
            <CustomFormField
              label="Email Address"
              name="email"
              placeholder="jdelacruz@kld.edu.ph"
              isRequired
              type="email"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Phone Number"
              name="phoneNumber"
              type="phone"
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              disabled={isLoading}
              isRequired
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <CustomFormField
                label="Date of Birth"
                name="birthDate"
                placeholder="dd/mm/yyyy"
                isRequired
                type="date"
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Age"
                name="age"
                placeholder="Enter age"
                isRequired
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <CustomFormField
                label="Sex"
                name="gender"
                placeholder="Select your sex"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                options={["Male", "Female"]}
                disabled={isLoading}
              />
              <CustomFormField
                label="Marital Status"
                name="maritalStatus"
                placeholder="Select your marital status"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                options={["Single", "Married", "Separated", "Widowed"]}
                disabled={isLoading}
              />
            </div>
            <CustomFormField
              label="House/Unit/Block No., Street, Subdivision/Village"
              name="houseNumber"
              placeholder="Blk 1 Lot 2 Phase 3"
              isRequired
              fieldType={FormFieldType.INPUT}
              type="text"
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Region"
              name="region"
              placeholder="Select your region"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={regionOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled
            />
            <CustomFormField
              label="Province"
              name="province"
              placeholder="Select your province"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={provinceOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled
            />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <CustomFormField
                label="Municipality"
                name="municipality"
                placeholder="Select your municipality"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                dynamicOptions={municipalityOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                disabled={isLoading}
              />
              <CustomFormField
                label="Barangay"
                name="barangay"
                placeholder="Select your barangay"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                dynamicOptions={barangayOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                disabled={isLoading || !selectedMunicipalityName}
              />
              <CustomFormField
                label="Zip Code"
                name="zipCode"
                placeholder="4114"
                isRequired
                fieldType={FormFieldType.INPUT}
                type="text"
                control={form.control}
                disabled={isLoading}
              />
            </div>
            <CustomFormField
              label="Position"
              name="position"
              placeholder="Select your position"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={[
                "Dean",
                "Associate Dean",
                "Professor I",
                "Assistant Professor",
              ]}
              disabled={isLoading}
            />
          </div>
          <h3 className="mt-5">Change Password</h3>
          <Separator className="mt-3 mb-2" />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="New Password"
              name="password"
              placeholder="Enter new password"
              isRequired
              type="password"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm new password"
              isRequired
              type="password"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="mt-3 md:w-auto w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AccountProfile;

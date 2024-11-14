"use client";

import React from "react";
import {
  Grades,
  Programs,
  Sections,
  Students,
  YearLevels,
} from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StudentProps extends Students {
  grades: Grades[] | [];
  programs: Programs | null;
  sections: Sections | null;
  yearLevels: YearLevels | null;
}

const StudentProfile = ({ student }: { student: StudentProps }) => {
    const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-5">
          <Avatar className="w-16 h-16">
            <AvatarImage src={student?.profileImage ?? ""} />
            <AvatarFallback>
              {student.firstName.charAt(0)}
              {student.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold text-2xl">
              {student.firstName} {student.lastName} ({student.studentNumber})
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border-r pr-2">
                <IconMapPin className="w-4 h-4" />
                <p className="text-sm">
                  {student.houseNumber} {student.barangay}, {student.city},{" "}
                  {student.province}, {student.region}, {student.zipCode}
                </p>
              </div>
              <div className="flex items-center gap-1 border-r pr-2">
                <IconPhone className="w-4 h-4" />
                <p className="text-sm">{student.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-1">
                <IconMail className="w-4 h-4" />
                <p className="text-sm">{student.email}</p>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => router.back()} size="sm">Go Back &rarr;</Button>
      </div>
      {/* <Separator className="my-5" /> */}
      <h3>Personal Details</h3>
      <Separator className="my-2" />
      <div className="mt-2 mb-3">
        <p className="font-semibold">
          Full Name:{" "}
          <span className="font-normal">
            {student.lastName}, {student.firstName} {student.middleName}{" "}
            {student.extensionName}
          </span>
        </p>
        <p className="font-semibold">
          Date of Birth:{" "}
          <span className="font-normal">
            {format(student.birthDate, "MMMM dd, yyyy")}
          </span>
        </p>
        <p className="font-semibold">
          Age: <span className="font-normal">{student.age} years old</span>
        </p>
        <p className="font-semibold">
          Sex: <span className="font-normal">{student.gender}</span>
        </p>
        <p className="font-semibold">
          Civil Status:{" "}
          <span className="font-normal">{student.civilStatus}</span>
        </p>
        <p className="font-semibold">
          Phone Number:{" "}
          <span className="font-normal">{student.phoneNumber}</span>
        </p>
        <p className="font-semibold">
          KLD Email: <span className="font-normal">{student.email}</span>
        </p>
        <p className="font-semibold">
          Address:{" "}
          <span className="font-normal">
            {student.houseNumber} {student.barangay}, {student.city},{" "}
            {student.province}, {student.region}, {student.zipCode}
          </span>
        </p>
      </div>
      <h3>Educational Details</h3>
      <Separator className="my-2" />
      <div className="mt-2 mb-3">
        <p className="font-semibold">
          Year Level:{" "}
          <span className="font-normal">{student.yearLevels?.name}</span>
        </p>
        <p className="font-semibold">
          Program:{" "}
          <span className="font-normal">
            {student.programs?.name} ({student.programs?.code})
          </span>
        </p>
        <p className="font-semibold">
          Section: <span className="font-normal">{student.sections?.name}</span>
        </p>
        <p className="font-semibold">
          Past Elementary School:{" "}
          <span className="font-normal">{student.elementarySchool}</span>
        </p>
        <p className="font-semibold">
          Past High School:{" "}
          <span className="font-normal">{student.highSchool}</span>
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;

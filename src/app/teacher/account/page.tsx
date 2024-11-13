/* eslint-disable react-hooks/rules-of-hooks */
import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "@/components/ui/button";

const Account = async () => {
  const { teacherId } = await useUser();
  const data = await db.teachers.findFirst({
    where: {
      id: teacherId,
    },
  });
  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar className="w-16 h-16 mr-2">
          <AvatarImage src={data?.profileImage ?? ""} />
          <AvatarFallback>{data?.firstName.charAt(0)}{data?.lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button variant="secondary" size="sm">Change Picture</Button>
        <Button variant="destructive" size="sm">Delete Picture</Button>
      </div>
    </>
  );
};

export default Account;

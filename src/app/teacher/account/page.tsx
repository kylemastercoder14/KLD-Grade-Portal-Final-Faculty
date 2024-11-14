/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";
import AccountProfile from "@/components/globals/account-profile";
import { Loader2 } from "lucide-react";

const Account = async () => {
  const { teacherId } = await useUser();
  const data = await db.teachers.findFirst({
    where: {
      id: teacherId,
    },
  });
  return (
    <>
      {data ? (
        <AccountProfile user={data} />
      ) : (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
    </>
  );
};

export default Account;

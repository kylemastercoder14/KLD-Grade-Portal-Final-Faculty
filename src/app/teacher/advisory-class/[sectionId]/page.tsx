/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import { useUser } from "@/hooks/use-user";
import db from "@/lib/db";
import ClassRecordClient from "./_components/client";

const ClassRecord = async ({ params }: { params: { sectionId: string } }) => {
  const { teacher } = await useUser();
  const data = await db.students.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      sections: {
        name: params.sectionId,
      },
    },
    include: {
      programs: true,
      sections: true,
      yearLevels: true,
    },
  });
  return (
    <div>
      <GreetingsHeader teacher={teacher ?? null} />
      <Card>
        <CardContent>
          <ClassRecordClient data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassRecord;

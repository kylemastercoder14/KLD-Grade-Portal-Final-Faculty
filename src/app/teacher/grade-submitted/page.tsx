/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import { useUser } from "@/hooks/use-user";
import { getAllGradesSubmitted } from "@/actions/grade-submitted";
import GradeSubmittedClient from "./_component/client";

const GradeSubmitted = async () => {
  const { teacher } = await useUser();
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["gradeSubmitted"],
    queryFn: getAllGradesSubmitted,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader teacher={teacher ?? null} />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <GradeSubmittedClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeSubmitted;

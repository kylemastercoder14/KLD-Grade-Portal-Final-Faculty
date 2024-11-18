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
import { getAllConsultation } from "@/actions/consultation";
import ConsultationClient from "./_component/client";

const Consultation = async () => {
  const { teacher } = await useUser();
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["consultation"],
    queryFn: getAllConsultation,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader teacher={teacher ?? null} />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <ConsultationClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consultation;

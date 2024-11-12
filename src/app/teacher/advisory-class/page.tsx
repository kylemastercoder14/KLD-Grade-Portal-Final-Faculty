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
import AdvisoryClassClient from "./_component/client";
import { getAllAdvisory } from "@/actions/advisory-class";

const AdvisoryClass = async () => {
  const { teacher } = await useUser();
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["advisoryClass"],
    queryFn: getAllAdvisory,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader teacher={teacher ?? null} />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <AdvisoryClassClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvisoryClass;

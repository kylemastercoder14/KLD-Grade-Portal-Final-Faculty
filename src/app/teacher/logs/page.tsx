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
import { getAllLogs } from "@/actions/logs";
import LogsClient from "./_component/client";

const Logs = async () => {
  const { teacher } = await useUser();
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["logs"],
    queryFn: getAllLogs,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader teacher={teacher ?? null} />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <LogsClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;

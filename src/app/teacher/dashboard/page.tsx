import { getAllAnnouncement } from "@/actions/announcement";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import AnnouncementClient from "./_component/client";

const Dashboard = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["announcement"],
    queryFn: getAllAnnouncement,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col px-5 pb-5">
      <h1>News and Events</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Stay updated with the latest happenings, announcements, and exciting
        events. Discover what&apos;s new and noteworthy, and never miss out on
        important updates!
      </p>
      <HydrationBoundary state={dehydratedState}>
        <AnnouncementClient />
      </HydrationBoundary>
    </div>
  );
};

export default Dashboard;

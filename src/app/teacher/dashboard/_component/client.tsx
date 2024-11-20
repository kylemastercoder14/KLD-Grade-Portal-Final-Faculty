"use client";

import React from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetAnnouncement } from "@/data/announcement";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const AnnouncementClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: announcementData, error, isLoading } = useGetAnnouncement();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-5 gap-3 grid md:grid-cols-3 grid-cols-1">
      {isLoading ? (
        <div className="flex items-center justify-center flex-col h-[30vh]">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : (announcementData?.data ?? []).length > 0 ? (
        announcementData?.data?.map((announcement) => (
          <div
            key={announcement.id}
            className="shadow-md relative border rounded-md mb-5"
          >
            <Badge
              variant="destructive"
              className="absolute top-3 z-10 right-3"
            >
              {format(new Date(announcement.createdAt), "dd MMM yyyy")}
            </Badge>
            <div className="relative w-full h-[300px]">
              <Image
                src={announcement.image}
                alt="Announcement"
                fill
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
            <div className="px-5 py-2">
              <h1 className="text-xl font-semibold">{announcement.name}</h1>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {announcement.description}
              </p>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-lg font-semibold text-muted-foreground">
          No announcements found yet.
        </h2>
      )}
    </div>
  );
};

export default AnnouncementClient;

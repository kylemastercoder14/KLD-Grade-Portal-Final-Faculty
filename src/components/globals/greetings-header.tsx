"use client";

import { Teachers } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const GreetingsHeader = ({ teacher }: { teacher: Teachers | null }) => {
  const [dateInfo, setDateInfo] = useState({
    date: "",
    day: "",
    greeting: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateDateInfo = () => {
      const now = new Date();

      const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const formattedDate = now.toLocaleDateString(undefined, dateOptions);

      const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
      const formattedDay = now.toLocaleDateString(undefined, dayOptions);

      const hour = now.getHours();
      let greeting = "";

      if (hour < 12) {
        greeting = "Good Morning";
      } else if (hour < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }

      setDateInfo({
        date: formattedDate,
        day: formattedDay,
        greeting: greeting,
      });

      setLoading(false);
    };

    updateDateInfo();
    const intervalId = setInterval(updateDateInfo, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={100} />
      </div>
    );
  }

  return (
    <div className="flex items-center mb-5 justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          {dateInfo.day}, {dateInfo.date}
        </p>
        <p className="text-lg font-bold">
          {dateInfo.greeting}, {teacher?.firstName + " " + teacher?.lastName || "Guest"}! 👋
        </p>
      </div>
    </div>
  );
};

export default GreetingsHeader;

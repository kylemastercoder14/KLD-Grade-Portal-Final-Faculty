/* eslint-disable react-hooks/rules-of-hooks */
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/globals/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { teacher } = await useUser();
  if (!teacher) redirect("/");
  return (
    <SidebarProvider>
      <AppSidebar teacher={teacher} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TeacherLayout;

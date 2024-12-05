import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconBooks,
  IconBrandTabler,
  IconFileText,
  IconHeartHandshake,
  IconLayersIntersect,
} from "@tabler/icons-react";
import Image from "next/image";
import { Teachers } from "@prisma/client";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teacher: Teachers | null;
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/teacher/dashboard",
      icon: IconBrandTabler,
    },
    {
      title: "Advisory Class",
      url: "/teacher/advisory-class",
      icon: IconLayersIntersect,
    },
    {
      title: "Handled Courses",
      url: "/teacher/handled-courses",
      icon: IconBooks,
    },
    {
      title: "Consultation",
      url: "/teacher/consultation",
      icon: IconHeartHandshake,
    },
    {
      title: "Grade Submitted",
      url: "/teacher/grades-submitted",
      icon: IconFileText,
    },
  ],
};

export function AppSidebar({ teacher, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/teacher/dashboard">
                <Image
                  src="/images/kld-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    KLD Grade Portal
                  </span>
                  <span className="truncate text-xs">Teacher Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser teacher={teacher} />
      </SidebarFooter>
    </Sidebar>
  );
}

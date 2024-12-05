"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { Teachers } from "@prisma/client";
import { logout } from "@/actions/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AlertModal from "./ui/alert-modal";

export function NavUser({ teacher }: { teacher: Teachers | null }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { isMobile } = useSidebar();
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    toast.success("Logging out...");
    window.location.assign("/");
  };

  return (
    <>
      <AlertModal
        title="Are you sure you want to logout?"
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="object-cover"
                    src={teacher?.profileImage ?? ""}
                    alt={teacher?.firstName + " " + teacher?.lastName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {teacher?.firstName.charAt(0)}
                    {teacher?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {teacher?.firstName + " " + teacher?.lastName}
                  </span>
                  <span className="truncate text-xs">{teacher?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={teacher?.profileImage ?? ""}
                      alt={teacher?.firstName + " " + teacher?.lastName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {teacher?.firstName.charAt(0)}
                      {teacher?.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {teacher?.firstName + " " + teacher?.lastName}
                    </span>
                    <span className="truncate text-xs">{teacher?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => router.push("/teacher/account")}
                >
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

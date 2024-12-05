"use client";

import * as React from "react";
import { LifeBuoy, Send } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SupportForm from "./forms/support-form";
import FeedbackForm from "./forms/feedback-form";

export function NavSecondary({
  ...props
}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [isSupportOpen, setIsSupportOpen] = React.useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
  return (
    <>
      <SupportForm
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm">
                <a onClick={() => setIsSupportOpen(true)} href="#">
                  <LifeBuoy />
                  <span>Support</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm">
                <a onClick={() => setIsFeedbackOpen(true)} href="#">
                  <Send />
                  <span>Feedback</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  ActivityIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  DollarSignIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SchoolIcon,
  UsersIcon,
} from "lucide-react"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc.",
      logo: (
        <GalleryVerticalEndIcon size={30}
        />
      ),
      plan: "School",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: <LayoutDashboardIcon size={30}/>,
    },
    {
      title: "Teachers",
      url: "#",
      icon: <GraduationCapIcon size={30}/>,
    },
    {
      title: "Students",
      url: "#",
      icon: <UsersIcon size={30}/>,
    },
    {
      title: "Classes",
      url: "#",
      icon: <SchoolIcon size={30}/>,
    },
    {
      title: "Subjects",
      url: "#",
      icon: <BookOpenIcon size={30}/>,
    },
    {
      title: "Assignments",
      url: "#",
      icon: <ListChecksIcon size={30}/>,
    },
    {
      title: "Attendance",
      url: "#",
      icon: <ClipboardCheckIcon size={30}/>,
    },
    {
      title: "Grades",
      url: "#",
      icon: <ActivityIcon size={30}/>,
    },
    {
      title: "Payments",
      url: "#",
      icon: <DollarSignIcon size={30}/>,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

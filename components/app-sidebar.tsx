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
import { GalleryVerticalEndIcon } from "lucide-react"

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
      url: "/dashboard/overview",
      icon: <LayoutDashboardIcon size={30}/>,
    },
    {
      title: "Teachers",
      url: "/dashboard/teachers",
      icon: <GraduationCapIcon size={30}/>,
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: <UsersIcon size={30}/>,
    },
    {
      title: "Classes",
      url: "/dashboard/classes",
      icon: <SchoolIcon size={30}/>,
    },
    {
      title: "Subjects",
      url: "/dashboard/subjects",
      icon: <BookOpenIcon size={30}/>,
    },
    {
      title: "Assignments",
      url: "/dashboard/assignments",
      icon: <ListChecksIcon size={30}/>,
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      icon: <ClipboardCheckIcon size={30}/>,
    },
    {
      title: "Grades",
      url: "/dashboard/grades",
      icon: <ActivityIcon size={30}/>,
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
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

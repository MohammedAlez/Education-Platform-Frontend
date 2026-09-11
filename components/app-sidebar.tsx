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
  SettingsIcon,
} from "lucide-react"
import { GalleryVerticalEndIcon } from "lucide-react"

// This is sample data.
const data = {
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
      roles: ["ADMIN", "TEACHER", "STUDENT"], // Example roles for access control
    },
    {
      title: "Teachers",
      url: "/dashboard/teachers",
      icon: <GraduationCapIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: <UsersIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Classes",
      url: "/dashboard/classes",
      icon: <SchoolIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Subjects",
      url: "/dashboard/subjects",
      icon: <BookOpenIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Assignments",
      url: "/dashboard/assignments",
      icon: <ListChecksIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      icon: <ClipboardCheckIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Grades",
      url: "/dashboard/grades",
      icon: <ActivityIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: <DollarSignIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <SettingsIcon size={30}/>,
      roles: ["ADMIN"], // Example roles for access control
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

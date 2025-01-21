"use client"

import { Heart, Home, Send, User, FileText, Activity, Apple, LineChart, ClipboardList, Mic } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSection } from "@/components/navigation/nav-section"
import { NavProfile } from "@/components/navigation/nav-profile"
import useUser from "@/app/hook/useUser"
import ManageProfile from "@/components/supaauth/manage-profile"
import Image from "next/image"

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: Send,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: User,
  },
]

const healthItems = [
  {
    title: "Health Monitor",
    href: "/health/monitor",
    icon: Heart,
    description: "View your real-time health data",
  },
  {
    title: "Nutrition Log",
    href: "/health/nutrition",
    icon: Apple,
    description: "Log and analyze your daily nutrition",
  },
  {
    title: "Health Records",
    href: "/health/records",
    icon: ClipboardList,
    description: "View your comprehensive health records",
  },
  {
    title: "Activities",
    href: "/health/activities",
    icon: Activity,
    description: "View your Strava activities",
  },
  {
    title: "Voice Assistant",
    href: "/voice-assistant",
    icon: Mic,
    description: "Select your voice assistant",
  },
]

const documentItems = [
  {
    title: "Health Reports",
    href: "/health/reports",
    icon: LineChart,
    description: "View your health reports",
  },
  {
    title: "Generate Prescription",
    href: "/health/documents",
    icon: FileText,
    description: "Generate prescriptions",
  },
]

export function AppSidebar() {
  const { data: user } = useUser()

  if (!user) return null

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="px-6 py-4 border-b flex items-center gap-2">
            <Image src="/idea-lab-round.png" alt="Logo" width={40} height={40} />
            <h1 className="text-sm font-semibold">Health Monitor</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="">
          <div className="">
            <NavSection 
              label="Navigation" 
              items={navigationItems} 
            />
            <NavSection 
              label="Health Features"
              items={healthItems}
              collapsible
              icon={Heart}
              collapsibleTitle="Health Tools"
            />
            <NavSection 
              label="Documents"
              items={documentItems}
              collapsible
              icon={FileText}
              collapsibleTitle="Documents"
            />
          </div>
        </SidebarContent>
        <SidebarFooter className="px-2">
          <NavProfile user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <ManageProfile />
    </>
  )
} 
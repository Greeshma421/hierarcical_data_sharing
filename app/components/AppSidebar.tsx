"use client"

import { Command, LifeBuoy, LogOut, MoreHorizontal, Send, Settings, User, ChevronRight, Activity, Apple, FileText, Footprints, FootprintsIcon, Bike } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTransition, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import useUser from "@/app/hook/useUser"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Avatar from "@/components/supaauth/avatar"
import ManageProfile from "@/components/supaauth/manage-profile"
import { Skeleton } from "@/components/ui/skeleton"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const components = [
  {
    title: "Home",
    href: "/",
    icon: Command,
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
  {
    title: "About",
    href: "/about",
    icon: LifeBuoy,
  }
]

const healthItems = [
  {
    title: "Health Monitor",
    href: "/health-monitor",
    description: "View your real-time health data",
    icon: Activity,
  },
  {
    title: "Nutrition Log",
    href: "/health/nutrition",
    description: "Log and analyze your daily nutrition",
    icon: Apple,
  },
  {
    title: "Health Records",
    href: "/health-records",
    description: "View your comprehensive health records",
    icon: FileText,
  },
  {
    title: "Activities",
    href: "/activities",
    icon: Footprints,
  },
  {
    title: "Health Reports",
    href: "/health/reports",
    icon: FileText,
  }
]

// const activityItems = [
//   {
//     title: "All Activities",
//     href: "/activities",
//     icon: Footprints,
//   },
//   {
//     title: "Running",
//     href: "/activities?type=run",
//     icon: FootprintsIcon,
//   },
//   {
//     title: "Cycling",
//     href: "/activities?type=ride",
//     icon: Bike,
//   },
//   // Add more activity types as needed
// ]

function SidebarSkeleton() {
  return (
    <Sidebar variant="floating" className="mt-16 h-[calc(100%-4rem)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Skeleton className="h-10 w-full" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {[1, 2, 3, 4].map((item) => (
              <SidebarMenuItem key={item}>
                <Skeleton className="h-8 w-full" />
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Skeleton className="h-12 w-full" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: user, error: userError, isFetching } = useUser()
  const [isSignOut, startSignOut] = useTransition()
  const [isHealthOpen, setIsHealthOpen] = useState(true)
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true)

  const signout = () => {
    startSignOut(async () => {
      const supabase = createSupabaseBrowser()
      await supabase.auth.signOut()
      router.push("/signin")
    })
  }

  if (userError) return <div>Error loading user data</div>
  if (isFetching || !user) return <SidebarSkeleton />

  return (
    <>
      <Sidebar variant="floating" className="mt-16 h-[calc(100%-4rem)]">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">HealthHub</span>
                    <span className="truncate text-xs">Your Health Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {components.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className={pathname === item.href ? "bg-accent" : ""}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Collapsible open={isHealthOpen} onOpenChange={setIsHealthOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Health Tools</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 ${isHealthOpen ? 'rotate-90' : ''}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {healthItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
              {/* <Collapsible open={isActivitiesOpen} onOpenChange={setIsActivitiesOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Footprints className="mr-2 h-4 w-4" />
                    <span>Activities</span>
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 ${isActivitiesOpen ? 'rotate-90' : ''}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger> */}
                {/* <CollapsibleContent>
                  <SidebarMenuSub>
                    {activityItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent> */}
              {/* </Collapsible> */}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className={cn(
                      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                      { "animate-pulse": isSignOut }
                    )}
                  >
                    <Avatar />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.email}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <MoreHorizontal className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                  align="start"
                  sideOffset={4}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => document.getElementById("manage-profile")?.click()}>
                    <User className="mr-2 h-4 w-4" />
                    Manage Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signout}>
                    {!isSignOut ? (
                      <LogOut className="mr-2 h-4 w-4" />
                    ) : (
                      <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <ManageProfile />
    </>
  )
}

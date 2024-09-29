"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { NavigationMobile } from "./NavigationMobile"

const components = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Chat",
    href: "/chat",
  },
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "About",
    href: "/about",
  }
]

const healthItems = [
  {
    title: "Health Monitor",
    href: "/health-monitor",
    description: "View your real-time health data",
  },
  {
    title: "Activity Tracker",
    href: "/health/activity",
    description: "Track your daily activities and exercises",
  },
  {
    title: "Nutrition Log",
    href: "/health/nutrition",
    description: "Log and analyze your daily nutrition",
  },
  {
    title: "Health Reports",
    href: "/health/reports",
    description: "View your comprehensive health reports",
  },
  {
    title: 'Data Visualization',
    href: '/health/visualization',
    description: 'View your health data in a visual format',
  }
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 max-w-10xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/idea-lab-round.png" alt="Health Monitor" width={32} height={32} />
            <span className="text-xl font-bold">Health Monitor</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {components.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Health</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {healthItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <nav className="flex items-center space-x-4">
          <div className="md:hidden">
            <NavigationMobile components={components} healthItems={healthItems} />
          </div>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
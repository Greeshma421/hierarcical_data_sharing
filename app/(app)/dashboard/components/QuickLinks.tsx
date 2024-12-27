
import Link from "next/link"
import { Activity, Apple, FileText, MessageSquare, Footprints } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const healthItems = [
    {
      title: "Health Monitor",
      href: "/health/monitor",
      description: "View your real-time health data",
      icon: Activity,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Nutrition Log",
      href: "/health/nutrition",
      description: "Log and analyze your daily nutrition",
      icon: Apple,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Health Records",
      href: "/health/records",
      description: "View your comprehensive health records",
      icon: FileText,
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Chat",
      href: "/chat",
      description: "Chat with our health assistant",
      icon: MessageSquare,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Activities",
      href: "/health/activities",
      description: "View your Strava activities",
      icon: Footprints,
      color: "from-red-400 to-red-600",
    },
  ]

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>Access key features of your health management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {healthItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "p-4 rounded-lg bg-gradient-to-br transition-all",
                "hover:scale-105",
                item.color
              )}>
                <div className="flex flex-col items-center justify-center text-white">
                  <item.icon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium text-center">{item.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
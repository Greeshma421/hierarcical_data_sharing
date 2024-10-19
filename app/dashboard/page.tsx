"use client"

import { useState, useEffect } from "react"
import { User } from "../chat/types"
import { Activity as StravaActivity } from "../activities/types"
import Link from "next/link"
import { Activity, Apple, FileText, MessageSquare, Footprints, Sidebar } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Suspense } from 'react'
import { DashboardCharts } from './components/DashboardCharts'
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { SidebarTrigger } from "@/components/ui/sidebar"

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

async function getHealthRecords(userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('file_metadata')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

async function getNutritionLogs(userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('daily_nutrition')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

async function getStravaActivities(userId: string) {
  const supabase = createSupabaseBrowser()
  const { data, error } = await supabase
    .from('strava_activities')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false })
    .limit(30)
  
  if (error) throw error
  return data
}


type HealthRecord = {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  created_at: string;
  // Add other health record properties as needed
}

type NutritionLog = {
  id: string;
  user_id: string;
  date: string;
  total_calories: number;
  // Add other nutrition log properties as needed
}


function DashboardContent() {
  const [user, setUser] = useState<User | null>(null)
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([])
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([])
  const [stravaActivities, setStravaActivities] = useState<StravaActivity[]>([])

  useEffect(() => {
    async function fetchData() {
      const supabase = createSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user as User)
        const records = await getHealthRecords(user.id)
        const logs = await getNutritionLogs(user.id)
        const activities = await getStravaActivities(user.id)
        setHealthRecords(records as HealthRecord[])
        setNutritionLogs(logs as NutritionLog[])
        setStravaActivities(activities as StravaActivity[])
      }
    }
    fetchData()
  }, [])

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader className="py-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6" />
            <CardTitle className="text-xl font-bold text-white drop-shadow-md">Dashboard</CardTitle>
          </div>
          <CardDescription className="text-white text-opacity-90 text-sm font-medium drop-shadow">
            Welcome to your health dashboard
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Access key features of your health management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {healthItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className={`h-32 transition-colors hover:bg-primary group bg-gradient-to-br ${item.color}`}>
                  <CardContent className="flex flex-col items-center justify-center h-full p-2">
                    <item.icon className="w-8 h-8 mb-2 text-white" />
                    <span className="text-xs text-center font-medium text-white">{item.title}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Visualize your health data and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardCharts 
            healthRecords={healthRecords} 
            nutritionLogs={nutritionLogs} 
            stravaActivities={stravaActivities}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

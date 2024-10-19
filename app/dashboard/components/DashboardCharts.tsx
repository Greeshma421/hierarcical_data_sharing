"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface DashboardChartsProps {
  healthRecords: any[]
  nutritionLogs: any[]
  stravaActivities: any[]
}

export function DashboardCharts({ healthRecords, nutritionLogs, stravaActivities }: DashboardChartsProps) {
  const recordsOverTime = useMemo(() => {
    const recordsByDate: { [key: string]: number } = {}
    healthRecords.forEach(record => {
      const date = new Date(record.created_at).toLocaleDateString()
      recordsByDate[date] = (recordsByDate[date] || 0) + 1
    })
    return Object.entries(recordsByDate).map(([date, count]) => ({ date, count }))
  }, [healthRecords])

  const nutritionOverTime = useMemo(() => {
    const caloriesByDate: { [key: string]: number } = {}
    nutritionLogs.forEach(log => {
      const date = new Date(log.date).toLocaleDateString()
      caloriesByDate[date] = (caloriesByDate[date] || 0) + log.total_calories
    })
    return Object.entries(caloriesByDate).map(([date, calories]) => ({ date, calories }))
  }, [nutritionLogs])

  const recordTypes = useMemo(() => {
    const types: { [key: string]: number } = {}
    healthRecords.forEach(record => {
      types[record.file_type] = (types[record.file_type] || 0) + 1
    })
    return Object.entries(types).map(([name, value]) => ({ name, value }))
  }, [healthRecords])

  const activityData = useMemo(() => {
    return stravaActivities.map((activity: any) => ({
      date: new Date(activity.start_date).toLocaleDateString(),
      distance: activity.distance / 1000, // Convert to kilometers
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [stravaActivities])

  const chartConfig: ChartConfig = {
    records: { label: "Records", color: "hsl(var(--chart-1))" },
    calories: { label: "Calories", color: "hsl(var(--chart-2))" },
    count: { label: "Count", color: "hsl(var(--chart-3))" },
    distance: { label: "Distance (km)", color: "hsl(var(--chart-4))" },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Health Records Uploaded</CardTitle>
          <CardDescription>Number of records uploaded over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={recordsOverTime} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="count" stroke={chartConfig.records.color} fill={chartConfig.records.color} fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Calorie Intake</CardTitle>
          <CardDescription>Calories consumed per day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={nutritionOverTime} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="calories" stroke={chartConfig.calories.color} fill={chartConfig.calories.color} fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Record Types</CardTitle>
          <CardDescription>Distribution of record types</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <PieChart width={300} height={300}>
              <Pie
                data={recordTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {recordTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} className="rounded-full"/>
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your Strava activities over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={activityData} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="distance" stroke={chartConfig.distance.color} fill={chartConfig.distance.color} fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

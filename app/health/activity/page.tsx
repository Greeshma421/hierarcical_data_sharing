"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock data for activities
const mockActivities = [
  { id: 1, type: "Running", duration: 30, calories: 300, date: "2023-05-01" },
  { id: 2, type: "Cycling", duration: 45, calories: 400, date: "2023-05-02" },
  { id: 3, type: "Swimming", duration: 60, calories: 500, date: "2023-05-03" },
  { id: 4, type: "Yoga", duration: 45, calories: 150, date: "2023-05-04" },
  { id: 5, type: "Weight Training", duration: 40, calories: 200, date: "2023-05-05" },
]

const activityTypes = ["Running", "Cycling", "Swimming", "Yoga", "Weight Training"]

const chartConfig: ChartConfig = {
  calories: {
    label: "Calories Burned",
    color: "hsl(var(--chart-1))",
  },
}

export default function ActivityTracker() {
  const [activities, setActivities] = useState(mockActivities)
  const [newActivity, setNewActivity] = useState({ type: "", duration: "", calories: "" })

  const handleAddActivity = () => {
    if (newActivity.type && newActivity.duration && newActivity.calories) {
      const activity = {
        id: activities.length + 1,
        type: newActivity.type,
        duration: parseInt(newActivity.duration),
        calories: parseInt(newActivity.calories),
        date: new Date().toISOString().split('T')[0],
      }
      setActivities([...activities, activity])
      setNewActivity({ type: "", duration: "", calories: "" })
    }
  }

  const chartData = activities.map(activity => ({
    name: activity.type,
    calories: activity.calories,
  }))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Activity Tracker</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Log New Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Select
              onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
              value={newActivity.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Calories burned"
              value={newActivity.calories}
              onChange={(e) => setNewActivity({ ...newActivity, calories: e.target.value })}
            />
            <Button onClick={handleAddActivity}>Add Activity</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.slice(-5).reverse().map((activity) => (
              <div key={activity.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p>{activity.duration} minutes</p>
                  <p>{activity.calories} calories</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Burned by Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="bar" />}
                />
                <Bar dataKey="calories" fill={chartConfig.calories.color} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
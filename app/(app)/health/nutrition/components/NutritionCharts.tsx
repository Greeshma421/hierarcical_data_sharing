"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Food } from "../types"

interface NutritionChartsProps {
  foods: Food[]
}

export function NutritionCharts({ foods }: NutritionChartsProps) {
  const dailyCalories = useMemo(() => {
    const caloriesByDay: { [key: string]: number } = {}
    foods.forEach(food => {
      const date = new Date(food.consumed_at).toLocaleDateString()
      caloriesByDay[date] = (caloriesByDay[date] || 0) + food.calories
    })
    return Object.entries(caloriesByDay).map(([date, calories]) => ({ date, calories }))
  }, [foods])

  const macronutrients = useMemo(() => {
    const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0)
    const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0)
    const totalFat = foods.reduce((sum, food) => sum + food.fat, 0)
    return [
      { name: 'Protein', value: totalProtein },
      { name: 'Carbs', value: totalCarbs },
      { name: 'Fat', value: totalFat },
    ]
  }, [foods])

  const foodFrequency = useMemo(() => {
    const frequency: { [key: string]: number } = {}
    foods.forEach(food => {
      frequency[food.food_name] = (frequency[food.food_name] || 0) + 1
    })
    return Object.entries(frequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [foods])

  const chartConfig: ChartConfig = {
    calories: { label: "Calories", color: "hsl(var(--chart-1))" },
    protein: { label: "Protein", color: "hsl(var(--chart-2))" },
    carbs: { label: "Carbs", color: "hsl(var(--chart-3))" },
    fat: { label: "Fat", color: "hsl(var(--chart-4))" },
    count: { label: "Count", color: "hsl(var(--chart-5))" },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Calorie Intake</CardTitle>
          <CardDescription>Calories consumed per day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={dailyCalories} height={300}>
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
          <CardTitle>Macronutrient Distribution</CardTitle>
          <CardDescription>Protein, Carbs, and Fat breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <PieChart width={300} height={300}>
              <Pie
                data={macronutrients}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {macronutrients.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.name.toLowerCase() as keyof ChartConfig].color} className="rounded-full"/>
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
          <CardTitle>Most Frequently Consumed Foods</CardTitle>
          <CardDescription>Top 5 foods by frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={foodFrequency} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill={chartConfig.count.color} radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
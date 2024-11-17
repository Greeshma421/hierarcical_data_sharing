"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

const mockHealthData = {
  weight: [
    { timestamp: '2023-01-01', value: 70 },
    { timestamp: '2023-02-01', value: 69 },
    { timestamp: '2023-03-01', value: 68 },
    { timestamp: '2023-04-01', value: 67.5 },
    { timestamp: '2023-05-01', value: 67 },
  ],
  bloodPressure: [
    { timestamp: '2023-01-01', systolic: 120, diastolic: 80 },
    { timestamp: '2023-02-01', systolic: 118, diastolic: 79 },
    { timestamp: '2023-03-01', systolic: 122, diastolic: 81 },
    { timestamp: '2023-04-01', systolic: 119, diastolic: 80 },
    { timestamp: '2023-05-01', systolic: 121, diastolic: 79 },
  ],
  cholesterol: {
    total: 180,
    hdl: 50,
    ldl: 110,
  },
  bloodSugar: 95,
}

const chartConfig: ChartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
  systolic: {
    label: "Systolic",
    color: "hsl(var(--chart-2))",
  },
  diastolic: {
    label: "Diastolic",
    color: "hsl(var(--chart-3))",
  },
}

export default function HealthReports() {
  const [selectedMetric, setSelectedMetric] = useState("weight")

  const getChartData = () => {
    switch (selectedMetric) {
      case "weight":
        return mockHealthData.weight
      case "bloodPressure":
        return mockHealthData.bloodPressure
      default:
        return []
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Health Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockHealthData.weight[mockHealthData.weight.length - 1].value} kg</p>
            <p className="text-sm text-gray-500">Last updated: {mockHealthData.weight[mockHealthData.weight.length - 1].timestamp}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockHealthData.bloodPressure[mockHealthData.bloodPressure.length - 1].systolic}/
              {mockHealthData.bloodPressure[mockHealthData.bloodPressure.length - 1].diastolic} mmHg
            </p>
            <p className="text-sm text-gray-500">Last updated: {mockHealthData.bloodPressure[mockHealthData.bloodPressure.length - 1].timestamp}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cholesterol</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockHealthData.cholesterol.total} mg/dL</p>
            <p className="text-sm">HDL: {mockHealthData.cholesterol.hdl} mg/dL</p>
            <p className="text-sm">LDL: {mockHealthData.cholesterol.ldl} mg/dL</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blood Sugar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockHealthData.bloodSugar} mg/dL</p>
            <Progress value={(mockHealthData.bloodSugar / 200) * 100} className="w-full mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Health Metrics Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setSelectedMetric} defaultValue={selectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={getChartData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                height={300}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                {selectedMetric === "weight" && (
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={chartConfig.weight.color}
                  />
                )}
                {selectedMetric === "bloodPressure" && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke={chartConfig.systolic.color}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke={chartConfig.diastolic.color}
                    />
                  </>
                )}
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button>Generate Full Report</Button>
      </div>
    </div>
  )
}
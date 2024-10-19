import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface HealthChartProps {
  data: any[];
  dataKey: string;
  title: string;
  unit: string;
  chartType: 'area' | 'line';
}

export function HealthChart({ data, dataKey, title, unit, chartType }: HealthChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: "hsl(var(--chart-1))",
    },
    "average_temperature": {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
    "average_ecg": {
      label: "ECG",
      color: "hsl(var(--chart-2))",
    },
    "average_spo2": {
      label: "SpO2",
      color: "hsl(var(--chart-3))",
    },
    "average_heart_rate": {
      label: "Heart Rate",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  const commonChartProps = {
    data: data,
    margin: { top: 10, right: 30, left: 0, bottom: 0 },
    height: 300,
  };

  const commonDataComponentProps = {
    type: "monotone" as const,
    dataKey: dataKey,
    stroke: chartConfig[dataKey].color,
    fillOpacity: 0.3,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Real-time {title.toLowerCase()} measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {chartType === 'area' ? (
            <AreaChart {...commonChartProps}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                {...commonDataComponentProps}
                fill={chartConfig[dataKey].color}
              />
            </AreaChart>
          ) : (
            <LineChart {...commonChartProps}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                {...commonDataComponentProps}
                fill="none"
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
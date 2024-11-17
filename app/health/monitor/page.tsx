'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from 'lucide-react'
import { HealthChart } from './components/HealthChart'
import { Sidebar } from './components/Sidebar'
import { fetchHealthData } from './utils/api'

interface HealthData {
  average_heart_rate: number;
  average_temperature: number;
  average_ecg: number;
  average_spo2: number;
  timestamp?: string;
}

export default function HealthMonitor() {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStreaming = () => {
    if (!isStreaming) {
      setIsStreaming(true);
      fetchData(); 
      intervalRef.current = setInterval(fetchData, 500);
    }
  };

  const stopStreaming = () => {
    if (isStreaming) {
      setIsStreaming(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const fetchData = async () => {
    const newData = await fetchHealthData();
    setHealthData(prevData => {
      const updatedData = [...prevData, { ...newData, timestamp: new Date().toISOString() }];
      return updatedData.slice(-100); 
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden gap-4">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isStreaming={isStreaming}
        startStreaming={startStreaming}
        stopStreaming={stopStreaming}
        chartType={chartType}
        setChartType={setChartType}
      />

      <div className="flex-grow overflow-hidden">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Health Monitor</CardTitle>
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <HealthChart data={healthData} dataKey="average_heart_rate" title="Heart Rate" unit="bpm" chartType={chartType} />
                <HealthChart data={healthData} dataKey="average_temperature" title="Temperature" unit="°C" chartType={chartType} />
                <HealthChart data={healthData} dataKey="average_ecg" title="ECG" unit="mV" chartType={chartType} />
                <HealthChart data={healthData} dataKey="average_spo2" title="SpO2" unit="%" chartType={chartType} />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Raw Data</CardTitle>
                  <CardDescription>Latest health measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Heart Rate (bpm)</TableHead>
                        <TableHead>Temperature (°C)</TableHead>
                        <TableHead>ECG (mV)</TableHead>
                        <TableHead>SpO2 (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {healthData.slice(-10).reverse().map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(data.timestamp!).toLocaleString()}</TableCell>
                          <TableCell>{data.average_heart_rate.toFixed(2)}</TableCell>
                          <TableCell>{data.average_temperature.toFixed(2)}</TableCell>
                          <TableCell>{data.average_ecg.toFixed(2)}</TableCell>
                          <TableCell>{data.average_spo2.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
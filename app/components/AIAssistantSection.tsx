'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  CornerDownLeft,
  Upload,
  Mic,
  Paperclip,
  LineChart,
  Table,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

export function AIAssistantSection() {
  return (
    <motion.section
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* <h2 className="text-3xl font-bold text-center mb-2">Your Personal AI Health Assistant</h2> */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Chat with Your Health Data</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div>
              <Label htmlFor="ai-model">AI Model</Label>
              <Select defaultValue="gpt4">
                <SelectTrigger id="ai-model">
                  <SelectValue placeholder="Select AI Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                  <SelectItem value="llama">Llama 3 7B (On-Device)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="upload">Upload Medical Records</Label>
              <Button variant="outline" className="w-full mt-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
          <Card className="md:col-span-3 h-[600px] flex flex-col">
            <CardHeader className="flex flex-row items-center">
              <CardTitle>Chat History</CardTitle>
              <Badge variant="secondary" className="ml-auto">AI Assistant</Badge>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-4">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Bot className="w-8 h-8 mt-1" />
                    <div className="bg-muted p-4 rounded-lg max-w-[75%]">
                      <p className="font-medium mb-1">Welcome to Your Health Dashboard</p>
                      <p>How can I assist you with your health data today?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary/10 text-primary p-4 rounded-lg max-w-[75%]">
                      <p>What was my average heart rate in the morning last week?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bot className="w-8 h-8 mt-1" />
                    <div className="bg-muted p-4 rounded-lg max-w-[75%]">
                      <p className="font-medium mb-2">Analysis of Morning Heart Rate</p>
                      <p className="mb-4">I&apos;ve analyzed your heart rate data for the mornings of last week. Here&apos;s a summary:</p>
                      <Card className="mb-4">
                        <CardHeader>
                          <CardTitle className="text-sm">SQL Query</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {`SELECT AVG(heart_rate) as avg_hr, DATE(timestamp) as date
FROM health_data
WHERE timestamp BETWEEN '2024-03-11' AND '2024-03-17'
  AND HOUR(timestamp) BETWEEN 6 AND 11
GROUP BY DATE(timestamp)`}
                          </pre>
                        </CardContent>
                      </Card>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm flex items-center">
                              <Table className="w-4 h-4 mr-2" />
                              Data Table
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <table className="w-full text-sm">
                              <thead>
                                <tr>
                                  <th className="text-left">Date</th>
                                  <th className="text-left">Avg HR</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>2024-03-11</td>
                                  <td>68 bpm</td>
                                </tr>
                                <tr>
                                  <td>2024-03-12</td>
                                  <td>72 bpm</td>
                                </tr>
                              </tbody>
                            </table>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm flex items-center">
                              <LineChart className="w-4 h-4 mr-2" />
                              Heart Rate Trend
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-muted h-32 rounded flex items-center justify-center text-muted-foreground">
                              Chart Placeholder
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <p>Your average morning heart rate last week was 70 bpm. It remained relatively stable, with a slight increase towards the end of the week. This is within a normal range for most adults.</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
              <form className="flex space-x-2">
                <Textarea
                  placeholder="Ask about your health data..."
                  className="flex-grow resize-none"
                  rows={1}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" type="button">
                        <Paperclip className="w-4 h-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach health records</TooltipContent>
                  </Tooltip>
                </TooltipProvider>  
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" type="button">
                        <Mic className="w-4 h-4" />
                        <span className="sr-only">Voice input</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voice input</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Link href="/chat">
                <Button>
                  <CornerDownLeft className="w-4 h-4 mr-2" />
                  Send
                </Button>
                </Link>
              </form>
            </div>
          </Card>
        </CardContent>
      </Card>
    </motion.section>
  )
}
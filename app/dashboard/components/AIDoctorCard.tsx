import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Bot } from 'lucide-react'

export function AIDoctorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Your Personal AI Doctor</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Bot className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
            <span className="font-medium text-sm sm:text-base">AI Assistant</span>
          </div>
          <Button variant="link" asChild className="text-sm sm:text-base">
            <Link href="/chat">Chat →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
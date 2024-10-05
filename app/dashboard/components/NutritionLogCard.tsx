import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function NutritionLogCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Nutrition Log</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Utensils className="h-5 w-5" />
            <span className="text-sm sm:text-base">Track your daily nutrition</span>
          </div>
          <Button variant="link" asChild className="text-sm sm:text-base">
            <Link href="/health/nutrition">View Log →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
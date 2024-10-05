import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface HealthRisksCardProps {
  risksCount: number;
}

export function HealthRisksCard({ risksCount }: HealthRisksCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Risks</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <span>{risksCount} risks detected</span>
        </div>
      </CardContent>
    </Card>
  )
}
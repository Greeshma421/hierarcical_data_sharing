import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SupplementsCardProps {
  completionPercentage: number;
}

export function SupplementsCard({ completionPercentage }: SupplementsCardProps) {
  return (
    <Card className="bg-gray-50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-700">Supplements</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Progress value={completionPercentage} className="w-full h-2 bg-gray-200" />
        <span className="text-sm text-gray-500 mt-2 inline-block">{completionPercentage}% completed</span>
      </CardContent>
    </Card>
  )
}
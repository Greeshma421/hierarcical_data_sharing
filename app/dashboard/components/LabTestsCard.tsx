import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface LabTestsCardProps {
  testsAnalyzed: number;
}

export function LabTestsCard({ testsAnalyzed }: LabTestsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Lab Tests</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm sm:text-base">{testsAnalyzed} test{testsAnalyzed !== 1 ? 's' : ''} analyzed</span>
          </div>
          <Button variant="link" asChild className="text-sm sm:text-base">
            <Link href="/health-records">View Records →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
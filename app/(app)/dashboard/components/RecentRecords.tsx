"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function RecentRecords({ records }: { records: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Records</CardTitle>
        <CardDescription>
          Recently uploaded health records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {records.slice(0, 5).map((record) => (
            <Link 
              key={record.id} 
              href={`/health/records/${record.id}`}
            >
              <div className={cn(
                "flex items-center",
                "hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors",
                "cursor-pointer"
              )}>
                <div className="flex items-center justify-center space-x-4">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {record.file_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {record.file_type}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
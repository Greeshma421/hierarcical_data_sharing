"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivities({ activities }: { activities: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          Your latest health activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="flex items-center justify-center space-x-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.start_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="ml-auto font-medium">
                {(activity.distance / 1000).toFixed(2)}km
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
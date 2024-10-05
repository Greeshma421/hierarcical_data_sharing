"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import UserProfile from "@/components/supaauth/user-profile";

interface HealthProfileCardProps {
  name: string;
  completionPercentage: number;
}

export function HealthProfileCard({ name, completionPercentage }: HealthProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
          <UserProfile /> 
          <div className="truncate">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary truncate">{name}&apos;s</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Health Profile</p>
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <Progress value={completionPercentage} className="w-16 h-16 rounded-full" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-primary">{completionPercentage}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
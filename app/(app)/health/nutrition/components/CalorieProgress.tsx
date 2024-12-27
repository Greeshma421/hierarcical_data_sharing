import { Progress } from "@/components/ui/progress"

interface CalorieProgressProps {
  totalCalories: number
  calorieGoal: number
}

export function CalorieProgress({ totalCalories, calorieGoal }: CalorieProgressProps) {
  return (
    <div className="mt-6">
      <p className="font-medium mb-2">Total Calories: {totalCalories} / {calorieGoal}</p>
      <Progress value={(totalCalories / calorieGoal) * 100} className="w-full" />
    </div>
  )
}
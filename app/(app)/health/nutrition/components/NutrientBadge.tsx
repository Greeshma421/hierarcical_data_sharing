import { Badge } from "@/components/ui/badge"

interface NutrientBadgeProps {
  label: string
  value: number
  unit: string
  color: string
}

export function NutrientBadge({ label, value, unit, color }: NutrientBadgeProps) {
  return (
    <Badge variant="outline" className={`${color} p-2 text-sm font-medium flex flex-col items-center justify-center`}>
      <span>{label}</span>
      <span>{value?.toFixed(1)} {unit}</span>
    </Badge>
  )
}
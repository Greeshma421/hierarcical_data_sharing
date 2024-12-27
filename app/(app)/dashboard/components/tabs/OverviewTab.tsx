import { HealthMetrics } from '../HealthMetrics'
import { DashboardCharts } from '../DashboardCharts'
import { StatsCards } from '../StatsCards'
import { Food } from '../../../health/nutrition/types'

interface OverviewTabProps {
  healthRecords: any[]
  nutritionLogs: any[]
  stravaActivities: any[]
  reports: any[]
  sensorData: any[]
  consumedFoods: Food[]
}

export function OverviewTab({ 
  healthRecords, 
  nutritionLogs, 
  stravaActivities,
  reports,
  sensorData,
  consumedFoods
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <StatsCards 
        healthRecords={healthRecords}
        nutritionLogs={nutritionLogs}
        stravaActivities={stravaActivities}
        reports={reports}
      />

      <HealthMetrics sensorData={sensorData} />

      <DashboardCharts 
        healthRecords={healthRecords}
        nutritionLogs={nutritionLogs}
        stravaActivities={stravaActivities}
        sensorData={sensorData}
        consumedFoods={consumedFoods}
      />
    </div>
  )
} 
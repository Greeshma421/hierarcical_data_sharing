'use client'

import { Activity, Database, LineChart, Bell, FileText, MessageSquare } from 'lucide-react'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'
import { BorderBeam } from '@/components/ui/border-beam'


const features = [
  {
    name: "Real-time Data Collection",
    description: "Collect data from Arduino sensors for heart rate, temperature, ECG, and SpO2 in real-time.",
    icon: Activity,
    href: "/features/real-time-data",
    cta: "Learn more",
    className: "md:col-span-2"
  },
  {
    name: "Data Storage & Analysis",
    description: "Store and analyze your health data using SQLite for historical insights and trends.",
    icon: Database,
    href: "/features/data-analysis",
    cta: "See analytics",
    className: "md:col-span-1"
  },
  {
    name: "Comprehensive Reports",
    description: "Generate detailed reports on your health trends and patterns for better insights.",
    icon: FileText,
    href: "/features/reports",
    cta: "View sample report",
    className: "md:col-span-1"
  },
  {
    name: "Health Chatbot",
    description: "Interact with an AI chatbot for health tips, reminders, and personalized alerts.",
    icon: MessageSquare,
    href: "/features/chatbot",
    cta: "Try chatbot",
    className: "md:col-span-1"
  },
  {
    name: "Customizable Alerts",
    description: "Receive customized notifications based on your health metrics to stay informed and proactive.",
    icon: Bell,
    href: "/features/alerts",
    cta: "Set up alerts",
    className: "md:col-span-1"
  }
]

export default function FeaturesGrid() {
  return (
    <BentoGrid className="mb-16">
      {features.map((feature, index) => (
        <BentoCard
          key={index}
          name={feature.name}
          description={feature.description}
          Icon={feature.icon}
          href={feature.href}
          cta={feature.cta}
          className={feature.className}
          background={<div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800" />}
        />
      ))}
    </BentoGrid>
  )
}
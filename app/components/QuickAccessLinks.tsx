'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Utensils, Activity, FileText, MessageSquare } from 'lucide-react'

const quickLinks = [
  { title: "Nutrition Tracker", icon: Utensils, href: "/health/nutrition" },
  { title: "Health Dashboard", icon: Activity, href: "/health-monitor" },
  { title: "Health Reports", icon: FileText, href: "/reports" },
  { title: "Health Chatbot", icon: MessageSquare, href: "/chat" },
]

export default function QuickAccessLinks() {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold text-center mb-8">Quick Access to Your Health Journey</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {quickLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            <Card className="hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center py-6">
                <link.icon size={36} className="mb-4" />
                <h3 className="text-lg font-medium text-center">{link.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
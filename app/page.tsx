'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Activity, Database, LineChart, Bell, FileText, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: "Real-time Data Collection",
    description: "Collect data from Arduino sensors for heart rate, temperature, ECG, and SpO2 in real-time.",
    icon: Activity
  },
  {
    title: "Interactive Visualizations",
    description: "View your health metrics through interactive, real-time charts and graphs.",
    icon: LineChart
  },
  {
    title: "Data Storage & Analysis",
    description: "Store and analyze your health data using SQLite for historical insights and trends.",
    icon: Database
  },
  {
    title: "Comprehensive Reports",
    description: "Generate detailed reports on your health trends and patterns for better insights.",
    icon: FileText
  },
  {
    title: "Health Chatbot",
    description: "Interact with an AI chatbot for health tips, reminders, and personalized alerts.",
    icon: MessageSquare
  },
  {
    title: "Customizable Alerts",
    description: "Receive customized notifications based on your health metrics to stay informed and proactive.",
    icon: Bell
  }
]

export default function HeroPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Health Monitoring Dashboard</h1>
        <p className="text-xl text-gray-600">Real-time tracking and analysis of your vital health metrics</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {<feature.icon className="mr-2" />} {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href="/health-monitor">
          <Button size="lg" className="mr-4">
            View Dashboard <ChevronRight className="ml-2" />
          </Button>
        </Link>
        <Link href="/chat">
          <Button size="lg" variant="outline">
            Try Health Chatbot <ChevronRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Activity, FileText, MessageSquare } from 'lucide-react'

const pageDescriptions = [
    {
        title: "Nutrition Tracker",
        description: "Track your daily nutrition intake with our advanced food search and logging system. Visualize your macronutrient balance and calorie consumption with interactive charts.",
        icon: Utensils,
        features: ["Food database integration", "Real-time nutritional analysis", "Customizable meal plans"]
      },
      {
        title: "Health Dashboard",
        description: "Get a comprehensive overview of your health metrics in one place. Monitor vital signs, activity levels, and wellness scores through an intuitive interface.",
        icon: Activity,
        features: ["Real-time data visualization", "Personalized health insights", "Goal tracking and progress reports"]
      },
      {
        title: "Health Reports",
        description: "Generate detailed health reports based on your historical data. Identify trends, patterns, and areas for improvement in your overall wellness journey.",
        icon: FileText,
        features: ["Customizable report templates", "Data-driven health recommendations", "Exportable PDF reports"]
      },
      {
        title: "Health Chatbot",
        description: "Interact with our AI-powered health assistant for personalized advice, quick health queries, and wellness tips tailored to your profile.",
        icon: MessageSquare,
        features: ["Natural language processing", "Contextual health recommendations", "24/7 availability"]
    }
]

export default function FeatureExplorer() {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Explore Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pageDescriptions.map((page, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center text-2xl">
                  <page.icon className="mr-3" size={32} />
                  {page.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col h-full">
                <CardDescription className="text-lg mb-4 flex-grow">{page.description}</CardDescription>
                <ul className="list-disc list-inside">
                  {page.features.map((feature, fIndex) => (
                    <li key={fIndex} className="mb-2">{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
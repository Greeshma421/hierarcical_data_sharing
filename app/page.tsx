'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Activity, Database, LineChart, Bell, FileText, MessageSquare, Utensils, Brain, Code, Server } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Spotlight } from '@/components/ui/spotlight'
import Image from 'next/image'

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

const quickLinks = [
  { title: "Nutrition Tracker", icon: Utensils, href: "/health/nutrition" },
  { title: "Health Dashboard", icon: Activity, href: "/health-monitor" },
  { title: "Health Reports", icon: FileText, href: "/reports" },
  { title: "Health Chatbot", icon: MessageSquare, href: "/chat" },
]

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

export default function HeroPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

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
    <div className="container mx-auto px-4 py-16" ref={containerRef}>
      <motion.div
        className="flex flex-col gap-16 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* First image and text */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Complete Health Hub</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Empowering you with real-time health tracking, personalized insights, and comprehensive wellness management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/health-monitor">
                <Button size="lg" className="w-full sm:w-auto">
                  View Dashboard <ChevronRight className="ml-2" />
                </Button>
              </Link>
              {/* <Link href="/chat">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try Health Chatbot <ChevronRight className="ml-2" />
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/health-monitor-graphs.jpg"
              alt="Health Dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Second image and text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="w-full md:w-1/2 text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Health Insights</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Our LLM powered health assistant can answer your health related questions by querying your health data using natural language.
            </p>
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto">
              Try Health Assistant <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/health-monitor-chat.jpg"
              alt="AI Health Insights"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  {<feature.icon className="mr-3 text-primary" size={24} />} {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

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

      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12">Our Technology Stack</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Database className="mr-2" /> Database Integration
                </h3>
                <p className="mb-4">
                  Our system utilizes a robust SQLite database to store and manage your health data securely. This allows for efficient querying and analysis of your health metrics over time.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Brain className="mr-2" /> AI-Powered Insights
                </h3>
                <p className="mb-4">
                  We leverage a sophisticated LLM (Large Language Model) to provide personalized health insights and power our health chatbot. The LLM uses your data schema as context to deliver accurate and relevant information.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Code className="mr-2" /> Advanced RAG Pipeline
                </h3>
                <p className="mb-4">
                  Our system employs a state-of-the-art Retrieval-Augmented Generation (RAG) pipeline using LangChain and LangGraph. This allows for dynamic information retrieval and generation based on your specific health profile and queries.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <Server className="mr-2" /> Real-time Processing
                </h3>
                <p className="mb-4">
                  With our advanced backend infrastructure, we process and analyze your health data in real-time, ensuring that you always have access to the most up-to-date insights and recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
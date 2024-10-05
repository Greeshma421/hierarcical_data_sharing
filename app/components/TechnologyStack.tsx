'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Database, Brain, Code, Server } from 'lucide-react'

export default function TechnologyStack() {
  return (
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
  )
}
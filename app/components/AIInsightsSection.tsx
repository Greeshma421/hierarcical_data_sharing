'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import {BorderBeam} from '@/components/ui/border-beam'

export default function AIInsightsSection() {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="w-full md:w-1/2 text-center md:text-right">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Health Insights</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Our LLM powered health assistant can answer your health related questions by querying your health data using natural language.
        </p>
        <Link href="/chat">
          <RainbowButton>
            Try Health Assistant <ChevronRight className="ml-2" />
          </RainbowButton>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/health-monitor-chat.jpg"
          alt="AI Health Insights"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          />
          <BorderBeam size={150} duration={12} delay={9} borderWidth={2} />
        </div>
      </div>
    </div>
  )
}
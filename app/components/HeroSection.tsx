'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { cn } from "@/lib/utils"
import { BorderBeam } from '@/components/ui/border-beam'
import Ripple from '@/components/ui/ripple'
import GridPattern from '@/components/ui/grid-pattern'
import Meteors from '@/components/ui/meteors'

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 text-center sm:text-left">
        <Link href="/chat">
          <AnimatedGradientText className="inline-flex items-left mb-6">
            ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              New: Health Assistant
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Complete Health Hub</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Empowering you with real-time health tracking, personalized insights, and comprehensive wellness management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <RainbowButton>
              View Dashboard <ChevronRight className="ml-2" />
            </RainbowButton>
          </Link>
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden w-full md:w-1/2 ">
        <img
          src="/health-monitor-graphs.jpg"
          alt="Health Dashboard"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <BorderBeam size={150} duration={12} delay={9} borderWidth={2} />
        <Ripple mainCircleOpacity={0.15}/>
      </div>
      
    </div>
  )
}
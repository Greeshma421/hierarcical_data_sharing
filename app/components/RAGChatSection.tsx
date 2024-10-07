'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { cn } from "@/lib/utils"
import { BorderBeam } from '@/components/ui/border-beam'
import { AnimatedBeamMultipleOutputDemo } from './AnimatedBeamDemo'
import Spline from '@splinetool/react-spline/next';


export default function RAGChatSection() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-8 py-16">
      <div className="w-full md:w-1/2 text-center sm:text-left order-2 md:order-1">
        <Link href="/chat">
          <AnimatedGradientText className="inline-flex items-left mb-6">
            🤖 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#40c9ff] via-[#e81cff] to-[#40c9ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Intelligent RAG Chat
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced AI-Powered Health Assistant</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Experience our cutting-edge RAG (Retrieval-Augmented Generation) chat system. Get personalized health insights, recommendations, and answers to your questions using data from multiple trusted sources.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/chat">
            <RainbowButton>
              Try RAG Chat <ChevronRight className="ml-2" />
            </RainbowButton>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 order-1 md:order-2">
        <div className="relative rounded-lg overflow-hidden">
          <AnimatedBeamMultipleOutputDemo className="w-full h-[400px]" />
          <BorderBeam size={150} duration={12} delay={9} borderWidth={2} />
        </div>
      </div>
    </div>
  )
}
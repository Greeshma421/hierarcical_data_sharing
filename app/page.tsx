'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import HeroSection from '@/app/components/HeroSection'
import AIInsightsSection from '@/app/components/AIInsightsSection'
import FeaturesGrid from '@/app/components/FeaturesGrid'
import QuickAccessLinks from '@/app/components/QuickAccessLinks'
import FeatureExplorer from '@/app/components/FeatureExplorer'
import TechnologyStack from '@/app/components/TechnologyStack'
import Ripple from "@/components/ui/ripple";
import { cn } from "@/lib/utils"
import GridPattern from '@/components/ui/grid-pattern'
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { AIAssistantSection } from '@/app/components/AIAssistantSection';
import { AnimatedBeamMultipleOutputDemo } from '@/app/components/AnimatedBeamDemo'
import Spline from '@splinetool/react-spline/next';
import RAGChatSection from '@/app/components/RAGChatSection';  
export default function HeroPage() {
  const containerRef = useRef(null)

  return (
    <div className="container mx-auto px-4 py-16 gap-20" ref={containerRef}>
      <motion.div
        className="flex flex-col gap-24 mb-24 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <HeroSection />
        <AIInsightsSection />
        <RAGChatSection />

      </motion.div>

      <div className="space-y-18">
        <FeaturesGrid />
        <QuickAccessLinks />

        {/* <NeonGradientCard className="bg-background/40 backdrop-blur-lg h-full">
          <AIAssistantSection />
        </NeonGradientCard> */}
        <FeatureExplorer />
        <TechnologyStack />
      </div>

      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
    </div>
  )
}
"use client"

import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { TechStack } from "@/components/landing/tech-stack";
import { RAGPipeline } from "@/components/landing/rag-pipeline";
import { motion } from "framer-motion";
import FeaturesGrid from "@/app/components/FeaturesGrid";
import GridPattern from "@/components/ui/grid-pattern";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/app/components/Header";
export default function Home() {
  return (
    <>
    <Header />

    <div className="flex flex-col min-h-screen p-4 sm:p-10">
      <div className="flex flex-col gap-24 mb-24 z-10">
        <Hero />
        <Features />
        <RAGPipeline />
        <TechStack />
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      <Footer />
    </div>
    </>
  );
}


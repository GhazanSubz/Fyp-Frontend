"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomizationPanel } from "../(main)/_components/customization-panel";
import { LoadingScreen } from "../(main)/_components/loading-screen";
import { PromptInput } from "../(main)/_components/prompt-input";
import { GlitchText } from "../(main)/_components/ui/glitch-text";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export type VideoSettings = {
  subtitleColor: string;
  iterations: number;
  genre: string;
  backgroundVideo: string;
  backgroundMusic: string;
  voiceType: "male" | "female";
};

export function VideoGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [settings, setSettings] = useState<VideoSettings>({
    subtitleColor: "#ff00ff",
    iterations: 3,
    genre: "cyberpunk",
    backgroundVideo: "urban",
    backgroundMusic: "synthwave",
    voiceType: "male",
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePromptSubmit = (value: string) => {
    setPrompt(value);
    setCurrentStep(1);
  };

  const handleSettingsChange = (key: keyof VideoSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }


  return (
    <div className="dark w-full min-h-screen bg-zinc-900">
    <div className="relative w-full max-w-7xl mx-auto dark:bg-zinc-900">
      {/* 🟢 Sliding Sidebar (SideNav) */}
      <Sheet>
        <SheetTrigger className="fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-md shadow-md hover:bg-zinc-700">
          <Menu className="text-white w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-900 text-white w-[280px] p-4">
          <h2 className="text-xl font-bold">Navigation</h2>
          <ul className="mt-4 space-y-3">
            <li className="hover:text-gray-400 cursor-pointer"><Link href="/dashboard">🏠 Dashboard</Link></li>
            <li className="hover:text-gray-400 cursor-pointer">🎥 Create Video</li>
            <li className="hover:text-gray-400 cursor-pointer">🔍 Explore</li>
            <li className="hover:text-gray-400 cursor-pointer">💳 Billing</li>
          </ul>
        </SheetContent>
      </Sheet>

      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* 🟣 Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <GlitchText className="text-white text-5xl font-bold tracking-tighter">
           Generate Your AI Video 
        </GlitchText>
        <div className="h-1 w-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto mt-2"></div>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
          Enter your video idea below and customize it with our punk-style generator. Break the rules and create
          something revolutionary!
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="flex-1"
          initial={{ opacity: 1 }}
          animate={{
            opacity: prompt ? 1 : 1,
            flex: prompt ? "0 0 40%" : "1 0 100%",
          }}
          transition={{ duration: 0.5 }}
        >
          <PromptInput value={prompt} onChange={setPrompt} onSubmit={handlePromptSubmit} />
        </motion.div>
        <AnimatePresence>
          {prompt && (
            <motion.div
              className="flex-1 bg-zinc-900"
              initial={{ opacity: 1, x: 50, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: 50, width: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <CustomizationPanel
                settings={settings}
                onSettingsChange={handleSettingsChange}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
   

      </div>
    </div>
    </div>
  );
}

// ✅ Default export for Next.js
export default function PlaygroundPage() {
  return <VideoGenerator />;
}


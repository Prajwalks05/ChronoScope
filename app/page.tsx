"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import TimeConsole from "@/components/time-console"
import HistoricalData from "@/components/historical-data"
import TimelineScroll from "@/components/timeline-scroll"
import ComparisonMode from "@/components/comparison-mode"
import StarryBackground from "@/components/starry-background"
import Navigation from "@/components/navigation"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"wheel" | "timeline" | "comparison">("wheel")
  const [isAltHistory, setIsAltHistory] = useState(false)
  const [favorites, setFavorites] = useState<Date[]>([])

  const addToFavorites = (date: Date) => {
    setFavorites((prev) => [...prev, date])
  }

  const removeFromFavorites = (date: Date) => {
    setFavorites((prev) => prev.filter((d) => d.getTime() !== date.getTime()))
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <StarryBackground />

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />

      <div className="relative z-10">
        <Navigation
          viewMode={viewMode}
          setViewMode={setViewMode}
          isAltHistory={isAltHistory}
          setIsAltHistory={setIsAltHistory}
          favorites={favorites}
        />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200 text-sm font-medium">TimeScope 2.0</span>
            </div>

            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Historical Time Viewer
            </h1>

            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Journey through time and explore history like never before. Discover events, inventions, culture, and
              people from any moment in human history.
            </p>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {viewMode === "wheel" && (
              <motion.div
                key="wheel"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <TimeConsole selectedDate={selectedDate} onDateChange={setSelectedDate} />
                  <HistoricalData
                    date={selectedDate}
                    isAltHistory={isAltHistory}
                    onAddToFavorites={addToFavorites}
                    isFavorited={favorites.some((d) => d.getTime() === selectedDate.getTime())}
                  />
                </div>
              </motion.div>
            )}

            {viewMode === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TimelineScroll onDateSelect={setSelectedDate} isAltHistory={isAltHistory} />
              </motion.div>
            )}

            {viewMode === "comparison" && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ComparisonMode isAltHistory={isAltHistory} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Clock, TimerIcon as Timeline, GitCompare, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface NavigationProps {
  viewMode: "wheel" | "timeline" | "comparison"
  setViewMode: (mode: "wheel" | "timeline" | "comparison") => void
  isAltHistory: boolean
  setIsAltHistory: (value: boolean) => void
  favorites: Date[]
}

export default function Navigation({
  viewMode,
  setViewMode,
  isAltHistory,
  setIsAltHistory,
  favorites,
}: NavigationProps) {
  return (
    <nav className="relative z-20 p-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ChronoScope</span>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Button
              variant={viewMode === "wheel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("wheel")}
              className={`rounded-full ${viewMode === "wheel" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Time Wheel
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("timeline")}
              className={`rounded-full ${viewMode === "timeline" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            >
              <Timeline className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={viewMode === "comparison" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("comparison")}
              className={`rounded-full ${viewMode === "comparison" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Alt History Toggle */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-white/80">Alt History</span>
              <Switch checked={isAltHistory} onCheckedChange={setIsAltHistory} />
            </div>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favorites
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-purple-500 text-white">
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}

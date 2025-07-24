"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Zap } from "lucide-react"

interface TimeWheelProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export default function TimeWheel({ selectedDate, onDateChange }: TimeWheelProps) {
  const [century, setCentury] = useState(Math.floor(selectedDate.getFullYear() / 100) + 1)
  const [decade, setDecade] = useState(Math.floor((selectedDate.getFullYear() % 100) / 10))
  const [year, setYear] = useState(selectedDate.getFullYear() % 10)
  const [isLocked, setIsLocked] = useState(false)

  const lockInDate = () => {
    const newYear = (century - 1) * 100 + decade * 10 + year
    const newDate = new Date(newYear, selectedDate.getMonth(), selectedDate.getDate())
    onDateChange(newDate)
    setIsLocked(true)

    // Portal animation effect
    setTimeout(() => setIsLocked(false), 2000)
  }

  return (
    <Card className="p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Time Machine Console</h2>
        <p className="text-white/70">Set your temporal coordinates</p>
      </div>

      {/* Time Wheels */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Century Wheel */}
        <div className="text-center">
          <label className="block text-sm font-medium text-white/80 mb-3">Century</label>
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-2xl font-bold text-white">{century}</span>
            </motion.div>
            <div className="flex justify-center gap-2 mt-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCentury(Math.max(1, century - 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCentury(Math.min(21, century + 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decade Wheel */}
        <div className="text-center">
          <label className="block text-sm font-medium text-white/80 mb-3">Decade</label>
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-2xl font-bold text-white">{decade}0s</span>
            </motion.div>
            <div className="flex justify-center gap-2 mt-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDecade(Math.max(0, decade - 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDecade(Math.min(9, decade + 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Year Wheel */}
        <div className="text-center">
          <label className="block text-sm font-medium text-white/80 mb-3">Year</label>
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-2xl font-bold text-white">{year}</span>
            </motion.div>
            <div className="flex justify-center gap-2 mt-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setYear(Math.max(0, year - 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setYear(Math.min(9, year + 1))}
                className="w-8 h-8 p-0 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <Calendar className="w-4 h-4 text-white/70" />
          <span className="text-lg font-semibold text-white">{(century - 1) * 100 + decade * 10 + year}</span>
        </div>
      </div>

      {/* Lock In Button */}
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button
            onClick={lockInDate}
            disabled={isLocked}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg"
          >
            {isLocked ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="w-5 h-5 mr-2" />
              </motion.div>
            ) : (
              <Zap className="w-5 h-5 mr-2" />
            )}
            {isLocked ? "Traveling Through Time..." : "Lock In & Travel"}
          </Button>
        </motion.div>
      </div>

      {/* Portal Animation Overlay */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.5, 1],
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-80"
          />
        </motion.div>
      )}
    </Card>
  )
}

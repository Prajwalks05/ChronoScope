"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Sparkles } from "lucide-react"

interface TimelineScrollProps {
  onDateSelect: (date: Date) => void
  isAltHistory: boolean
}

interface TimelineEvent {
  year: number
  title: string
  description: string
  category: string
  color: string
}

export default function TimelineScroll({ onDateSelect, isAltHistory }: TimelineScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    // Generate timeline events
    const timelineEvents: TimelineEvent[] = []

    if (isAltHistory) {
      // Alternative history timeline
      const altEvents = [
        {
          year: 1850,
          title: "Steam Internet Invented",
          description: "Victorian engineers create mechanical network",
          category: "Technology",
          color: "bg-yellow-500/20 text-yellow-300",
        },
        {
          year: 1885,
          title: "Flying Carriage Patent",
          description: "First aerial vehicle design approved",
          category: "Transportation",
          color: "bg-blue-500/20 text-blue-300",
        },
        {
          year: 1920,
          title: "Tesla's Time Radio",
          description: "Temporal communication device demonstrated",
          category: "Science",
          color: "bg-purple-500/20 text-purple-300",
        },
        {
          year: 1955,
          title: "Atomic Flying Cars",
          description: "Nuclear-powered personal aircraft mass produced",
          category: "Transportation",
          color: "bg-green-500/20 text-green-300",
        },
        {
          year: 1980,
          title: "Holographic Television",
          description: "3D broadcasting becomes mainstream",
          category: "Entertainment",
          color: "bg-pink-500/20 text-pink-300",
        },
      ]
      setEvents(altEvents)
    } else {
      // Real history timeline
      const realEvents = [
        {
          year: 1876,
          title: "Telephone Invented",
          description: "Alexander Graham Bell patents the telephone",
          category: "Technology",
          color: "bg-blue-500/20 text-blue-300",
        },
        {
          year: 1903,
          title: "First Flight",
          description: "Wright brothers achieve powered flight",
          category: "Transportation",
          color: "bg-green-500/20 text-green-300",
        },
        {
          year: 1945,
          title: "Computer Age Begins",
          description: "ENIAC, first electronic computer, completed",
          category: "Technology",
          color: "bg-purple-500/20 text-purple-300",
        },
        {
          year: 1969,
          title: "Moon Landing",
          description: "Apollo 11 lands on the moon",
          category: "Space",
          color: "bg-yellow-500/20 text-yellow-300",
        },
        {
          year: 1991,
          title: "World Wide Web",
          description: "Internet becomes publicly available",
          category: "Technology",
          color: "bg-cyan-500/20 text-cyan-300",
        },
        {
          year: 2007,
          title: "Smartphone Revolution",
          description: "iPhone launches, changing mobile computing",
          category: "Technology",
          color: "bg-pink-500/20 text-pink-300",
        },
      ]
      setEvents(realEvents)
    }
  }, [isAltHistory])

  return (
    <div ref={containerRef} className="relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Timeline Explorer
          {isAltHistory && (
            <Badge className="ml-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Alternative History
            </Badge>
          )}
        </h2>
        <p className="text-white/70 text-lg">Scroll through time and discover key moments in history</p>
      </div>

      {/* Timeline Line */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-30"
        style={{ height: `${events.length * 400}px` }}
      />

      {/* Timeline Events */}
      <div className="space-y-32">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div className={`w-full max-w-md ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
              <Card
                className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => onDateSelect(new Date(event.year, 0, 1))}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.year}</h3>
                    <Badge className={event.color}>{event.category}</Badge>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                <p className="text-white/70">{event.description}</p>
              </Card>
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full overflow-hidden"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.5, 1]) }}
      >
        <motion.div
          className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </motion.div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function PendulumBackground() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.1)
    }, 100) // Smoother updates every 100ms

    return () => clearInterval(interval)
  }, [])

  // More realistic pendulum physics with smoother motion
  const swingAngle = Math.sin(time * 0.8) * 25 // Slightly slower, more realistic swing

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Clock Case - Rustic wooden frame */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        {/* Wooden clock case */}
        <div className="relative w-32 h-40 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 rounded-lg shadow-2xl border-4 border-amber-700">
          {/* Wood grain texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/20 to-transparent rounded-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-transparent to-amber-900/30 rounded-lg"></div>

          {/* Brass corner decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>

          {/* Clock face */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-2 border-yellow-600 shadow-inner">
            {/* Clock numbers */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800">
                12
              </div>
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-800">
                3
              </div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800">
                6
              </div>
              <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-800">
                9
              </div>
            </div>

            {/* Clock hands */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-6 h-0.5 bg-gray-800 rounded-full transform rotate-45 origin-right"></div>
              <div className="absolute w-4 h-0.5 bg-gray-600 rounded-full transform -rotate-12 origin-right"></div>
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            </div>
          </div>

          {/* Pendulum anchor mechanism */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-t-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-transparent rounded-t-lg"></div>
          </div>
        </div>

        {/* Pendulum rod and bob */}
        <motion.div
          className="absolute top-36 left-1/2 origin-top"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            rotate: swingAngle,
          }}
          transition={{
            duration: 1.6,
            ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing
            repeat: 0,
          }}
        >
          {/* Pendulum rod - brass/bronze */}
          <div className="w-1 h-96 bg-gradient-to-b from-yellow-600 via-yellow-700 to-yellow-800 rounded-full shadow-lg relative">
            {/* Rod highlight */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
          </div>

          {/* Pendulum bob - ornate brass weight */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            {/* Main bob body */}
            <div className="w-16 h-20 bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-800 rounded-full shadow-2xl relative">
              {/* Ornate decorations on bob */}
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                <div className="absolute inset-1 border-2 border-yellow-700 rounded-full"></div>
                <div className="absolute inset-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>

                {/* Center medallion */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full border border-yellow-700">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full"></div>
                </div>
              </div>

              {/* Highlight on bob */}
              <div className="absolute top-2 left-2 w-6 h-8 bg-gradient-to-br from-yellow-300/60 to-transparent rounded-full"></div>

              {/* Shadow under bob */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm"></div>
            </div>
          </div>
        </motion.div>

        {/* Ticking sound visualization (optional visual effect) */}
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 bg-yellow-400/40 rounded-full"></div>
        </motion.div>
      </div>

      {/* Enhanced ambient particles with smoother motion */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle clock shadow on the wall */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-black/5 rounded-lg blur-xl"></div>
    </div>
  )
}

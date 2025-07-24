"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  z: number
  size: number
  speed: number
  opacity: number
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [time, setTime] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Generate initial stars
    const initialStars: Star[] = []
    for (let i = 0; i < 200; i++) {
      initialStars.push({
        id: i,
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }
    setStars(initialStars)

    // Animation loop
    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
      setStars((prevStars) =>
        prevStars.map((star) => {
          let newZ = star.z - star.speed * 2
          let newX = star.x
          let newY = star.y

          // Reset star when it gets too close
          if (newZ <= 0) {
            newZ = 1000
            newX = (Math.random() - 0.5) * 2000
            newY = (Math.random() - 0.5) * 2000
          }

          return {
            ...star,
            x: newX,
            y: newY,
            z: newZ,
          }
        }),
      )
    }, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/20 via-purple-950/40 to-black"></div>

      {/* Nebula clouds */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/8 via-teal-500/4 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-pink-500/6 via-purple-500/3 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Stars */}
      {dimensions.width > 0 &&
        stars.map((star) => {
          const perspective = 1000
          const scale = perspective / (perspective + star.z)
          const x = star.x * scale + dimensions.width / 2
          const y = star.y * scale + dimensions.height / 2
          const size = star.size * scale
          const opacity = star.opacity * scale
          const trailLength = Math.max(0, (1000 - star.z) / 100)

          return (
            <div
              key={star.id}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {trailLength > 2 && (
                <div
                  className="absolute bg-gradient-to-t from-white/20 to-transparent blur-sm"
                  style={{
                    width: `${size * 0.5}px`,
                    height: `${trailLength * 3}px`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              <div
                className="bg-white rounded-full shadow-lg"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: Math.min(opacity, 1),
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`,
                }}
              />
            </div>
          )
        })}

      {/* Shooting stars */}
      {dimensions.width > 0 &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * dimensions.width}px`,
              top: `${Math.random() * (dimensions.height * 0.5)}px`,
            }}
            animate={{
              x: [0, dimensions.width],
              y: [0, dimensions.height * 0.3],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Floating time particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-200/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
    </div>
  )
}

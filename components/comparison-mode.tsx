"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Sparkles, TrendingUp, Users, Lightbulb } from "lucide-react"

interface ComparisonModeProps {
  isAltHistory: boolean
}

interface ComparisonData {
  year: number
  population: string
  technology: string[]
  culture: string[]
  economy: string
}

export default function ComparisonMode({ isAltHistory }: ComparisonModeProps) {
  const [leftYear, setLeftYear] = useState(1950)
  const [rightYear, setRightYear] = useState(2000)
  const [leftData, setLeftData] = useState<ComparisonData | null>(null)
  const [rightData, setRightData] = useState<ComparisonData | null>(null)

  const generateComparisonData = (year: number): ComparisonData => {
    if (isAltHistory) {
      // Alternative history data
      return {
        year,
        population: `${Math.floor(Math.random() * 5 + 3)}B (with sky cities)`,
        technology: [
          "Steam-powered computers",
          "Mechanical internet",
          "Flying carriages",
          "Time communication devices",
        ],
        culture: ["Victorian punk music", "Aerial racing sports", "Clockwork art movement", "Steam café culture"],
        economy: "Gear-based currency system",
      }
    } else {
      // Real historical data
      if (year <= 1950) {
        return {
          year,
          population: "2.5B",
          technology: ["Radio", "Early computers", "Automobiles", "Telephone"],
          culture: ["Jazz music", "Cinema", "Radio shows", "Dance halls"],
          economy: "Post-war reconstruction",
        }
      } else if (year <= 1980) {
        return {
          year,
          population: "4.4B",
          technology: ["Television", "Personal computers", "Space technology", "Satellites"],
          culture: ["Rock music", "Television", "Youth movements", "Pop art"],
          economy: "Industrial economy",
        }
      } else {
        return {
          year,
          population: "6.1B",
          technology: ["Internet", "Mobile phones", "Personal computers", "Digital media"],
          culture: ["Pop music", "MTV", "Video games", "Global culture"],
          economy: "Service economy",
        }
      }
    }
  }

  const handleCompare = () => {
    setLeftData(generateComparisonData(leftYear))
    setRightData(generateComparisonData(rightYear))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Time Comparison
          {isAltHistory && (
            <Badge className="ml-3 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Alternative Timeline
            </Badge>
          )}
        </h2>
        <p className="text-white/70 text-lg">Compare different time periods side by side</p>
      </div>

      {/* Year Selection */}
      <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <label className="block text-sm font-medium text-white/80 mb-2">First Year</label>
            <input
              type="number"
              value={leftYear}
              onChange={(e) => setLeftYear(Number.parseInt(e.target.value))}
              min="1800"
              max="2024"
              className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <ArrowRight className="w-6 h-6 text-white/60" />

          <div className="text-center">
            <label className="block text-sm font-medium text-white/80 mb-2">Second Year</label>
            <input
              type="number"
              value={rightYear}
              onChange={(e) => setRightYear(Number.parseInt(e.target.value))}
              min="1800"
              max="2024"
              className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <Button
            onClick={handleCompare}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg"
          >
            Compare
          </Button>
        </div>
      </Card>

      {/* Comparison Results */}
      {leftData && rightData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left Side */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{leftData.year}</h3>
            </div>

            <div className="space-y-6">
              {/* Population */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-300" />
                  <h4 className="font-semibold text-white">Population</h4>
                </div>
                <p className="text-white/70">{leftData.population}</p>
              </div>

              {/* Technology */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-300" />
                  <h4 className="font-semibold text-white">Technology</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leftData.technology.map((tech, index) => (
                    <Badge key={index} className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Culture */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <h4 className="font-semibold text-white">Culture</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leftData.culture.map((culture, index) => (
                    <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {culture}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Economy */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <h4 className="font-semibold text-white">Economy</h4>
                </div>
                <p className="text-white/70">{leftData.economy}</p>
              </div>
            </div>
          </Card>

          {/* Right Side */}
          <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{rightData.year}</h3>
            </div>

            <div className="space-y-6">
              {/* Population */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-300" />
                  <h4 className="font-semibold text-white">Population</h4>
                </div>
                <p className="text-white/70">{rightData.population}</p>
              </div>

              {/* Technology */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-300" />
                  <h4 className="font-semibold text-white">Technology</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rightData.technology.map((tech, index) => (
                    <Badge key={index} className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Culture */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <h4 className="font-semibold text-white">Culture</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rightData.culture.map((culture, index) => (
                    <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {culture}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Economy */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <h4 className="font-semibold text-white">Economy</h4>
                </div>
                <p className="text-white/70">{rightData.economy}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

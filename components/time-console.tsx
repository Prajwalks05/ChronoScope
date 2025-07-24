"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Zap, ChevronDown } from "lucide-react"

interface TimeConsoleProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export default function TimeConsole({ selectedDate, onDateChange }: TimeConsoleProps) {
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())
  const [selectedDay, setSelectedDay] = useState(selectedDate.getDate())
  const [isLocked, setIsLocked] = useState(false)
  const [showYearPopup, setShowYearPopup] = useState(false)
  const [showMonthPopup, setShowMonthPopup] = useState(false)

  // Generate years from 1000 to 2024
  const years = Array.from({ length: 1025 }, (_, i) => 1000 + i)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get days in selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Update days when year or month changes
  useEffect(() => {
    const maxDays = getDaysInMonth(selectedYear, selectedMonth)
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays)
    }
  }, [selectedYear, selectedMonth, selectedDay])

  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay)
    onDateChange(newDate)
  }, [selectedYear, selectedMonth, selectedDay, onDateChange])

  const lockInDate = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay)
    onDateChange(newDate)
    setIsLocked(true)
    setTimeout(() => setIsLocked(false), 2000)
  }

  const YearPopup = () => (
    <AnimatePresence>
      {showYearPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowYearPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Select Year</h3>

            {/* Quick Century Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((century) => (
                <Button
                  key={century}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const yearInCentury = (century - 1) * 100 + 50 // Middle of century
                    setSelectedYear(Math.min(2024, yearInCentury))
                  }}
                  className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
                >
                  {century}th
                </Button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-96 pr-2">
              <div className="grid grid-cols-5 gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedYear(year)
                      setShowYearPopup(false)
                    }}
                    className={`text-sm ${
                      year === selectedYear
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowYearPopup(false)}
                className="text-white/70 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const MonthPopup = () => (
    <AnimatePresence>
      {showMonthPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowMonthPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Select Month</h3>

            <div className="grid grid-cols-2 gap-3">
              {months.map((month, index) => (
                <Button
                  key={month}
                  variant="ghost"
                  onClick={() => {
                    setSelectedMonth(index)
                    setShowMonthPopup(false)
                  }}
                  className={`text-sm p-3 ${
                    index === selectedMonth
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {month}
                </Button>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowMonthPopup(false)}
                className="text-white/70 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <Card className="p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Time Machine Console</h2>
        <p className="text-white/70">Select your temporal coordinates</p>
      </div>

      {/* Calendar Interface */}
      <div className="mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
          {/* Calendar Header with Clickable Year and Month */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowMonthPopup(true)}
              className="text-xl font-semibold text-white hover:text-purple-200 hover:bg-white/10 flex items-center gap-2"
            >
              {months[selectedMonth]}
              <ChevronDown className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowYearPopup(true)}
              className="text-xl font-semibold text-white hover:text-purple-200 hover:bg-white/10 flex items-center gap-2"
            >
              {selectedYear}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-white/60 text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {(() => {
              const firstDay = new Date(selectedYear, selectedMonth, 1).getDay()
              const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
              const daysInPrevMonth = getDaysInMonth(selectedYear, selectedMonth - 1)
              const calendarDays = []

              // Previous month's trailing days
              for (let i = firstDay - 1; i >= 0; i--) {
                const day = daysInPrevMonth - i
                calendarDays.push(
                  <button
                    key={`prev-${day}`}
                    className="w-10 h-10 text-white/30 hover:text-white/50 hover:bg-white/5 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
                      const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear
                      setSelectedMonth(newMonth)
                      setSelectedYear(newYear)
                      setSelectedDay(day)
                    }}
                  >
                    {day}
                  </button>,
                )
              }

              // Current month days
              for (let day = 1; day <= daysInMonth; day++) {
                const isSelected = day === selectedDay
                const isToday =
                  selectedYear === new Date().getFullYear() &&
                  selectedMonth === new Date().getMonth() &&
                  day === new Date().getDate()

                calendarDays.push(
                  <button
                    key={`current-${day}`}
                    className={`w-10 h-10 rounded-lg transition-all text-sm font-medium ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110"
                        : isToday
                          ? "bg-white/20 text-white border border-white/30"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>,
                )
              }

              // Next month's leading days
              const remainingCells = 42 - calendarDays.length // 6 rows × 7 days
              for (let day = 1; day <= remainingCells; day++) {
                calendarDays.push(
                  <button
                    key={`next-${day}`}
                    className="w-10 h-10 text-white/30 hover:text-white/50 hover:bg-white/5 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
                      const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear
                      setSelectedMonth(newMonth)
                      setSelectedYear(newYear)
                      setSelectedDay(day)
                    }}
                  >
                    {day}
                  </button>,
                )
              }

              return calendarDays
            })()}
          </div>

          {/* Quick Date Buttons */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date()
                setSelectedYear(today.getFullYear())
                setSelectedMonth(today.getMonth())
                setSelectedDay(today.getDate())
              }}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedYear(1600)
                setSelectedMonth(0) // January
                setSelectedDay(1)
              }}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              1600s
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedYear(1969)
                setSelectedMonth(6) // July
                setSelectedDay(20)
              }}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              Moon Landing
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedYear(1776)
                setSelectedMonth(6) // July
                setSelectedDay(4)
              }}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              Independence
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedYear(1066)
                setSelectedMonth(9) // October
                setSelectedDay(14)
              }}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              Battle of Hastings
            </Button>
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <Calendar className="w-4 h-4 text-white/70" />
          <span className="text-lg font-semibold text-white">
            {new Date(selectedYear, selectedMonth, selectedDay).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
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

      {/* Popups */}
      <YearPopup />
      <MonthPopup />
    </Card>
  )
}

"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import {
  GRADES_STATS_PATH,
  GRADES_STATS_QUERY_KEY,
  STUDENT_AVERAGES_PATH,
  STUDENT_AVERAGES_QUERY_KEY,
} from "@/lib/queries/grades"
import { GradesFilters } from "./grades-filters"
import { GradesStatsCards } from "./grades-stats-cards"
import { StudentAveragesTable } from "./student-averages-table"

export function AdminGradesMonitoringPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>("all")
  const [selectedSubject, setSelectedSubject] = useState<string | null>("all")
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>("all")

  // Build query parameters dynamically
  const filterParams = new URLSearchParams()
  if (selectedClass !== "all" && selectedClass) filterParams.append("classId", selectedClass)
  if (selectedSubject !== "all" && selectedSubject) filterParams.append("subjectId", selectedSubject)
  if (selectedTeacher !== "all" && selectedTeacher) filterParams.append("teacherId", selectedTeacher)

  const queryString = filterParams.toString() ? `?${filterParams.toString()}` : ""

  // Fetch Aggregated Performance Metrics
  const { data: statsRes, isLoading: isStatsLoading } = useApiQuery<any>(
    [...GRADES_STATS_QUERY_KEY, selectedClass, selectedSubject, selectedTeacher],
    `${GRADES_STATS_PATH}${queryString}`
  )
  const stats = statsRes?.data || statsRes

  // Fetch Student Grade Averages
  const { data: averagesRes, isLoading: isAveragesLoading } = useApiQuery<any>(
    [...STUDENT_AVERAGES_QUERY_KEY, selectedClass, selectedSubject, selectedTeacher],
    `${STUDENT_AVERAGES_PATH}${queryString}`
  )
  const averages = Array.isArray(averagesRes) ? averagesRes : averagesRes?.data || []

  return (
    <div className="space-y-6 p-2">
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Grades Monitoring
          </h1>
          <p className="text-sm text-muted-foreground">
            Track student academic performance and evaluation distributions.
          </p>
        </div>

        <GradesFilters
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
        />
      </div>

      {/* Key Performance Indicators */}
      <GradesStatsCards stats={stats} isLoading={isStatsLoading} />

      {/* Main Student Averages Listing */}
      <StudentAveragesTable averages={averages} isLoading={isAveragesLoading} />
    </div>
  )
}
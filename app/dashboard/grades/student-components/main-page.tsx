"use client"

import { useState } from "react"
import { PerformanceHero } from "./performance-hero"
import { SubjectGradesTable } from "./subject-grades-table"
import {
  GradeHistorySheet,
  SubjectGradeDetail,
} from "./grade-history-sheet"

const gradesData: SubjectGradeDetail[] = [
  {
    id: "math",
    subject: "Mathematics",
    average: "16.2",
    history: [
      { type: "Quiz", score: "15" },
      { type: "Assignment", score: "17" },
      { type: "Test", score: "16" },
      { type: "Exam", score: "17" },
    ],
  },
  {
    id: "physics",
    subject: "Physics",
    average: "15.1",
    history: [
      { type: "Quiz", score: "14" },
      { type: "Assignment", score: "15" },
      { type: "Test", score: "15" },
      { type: "Exam", score: "16" },
    ],
  },
  {
    id: "cs",
    subject: "Computer Science",
    average: "17.8",
    history: [
      { type: "Quiz", score: "18" },
      { type: "Assignment", score: "19" },
      { type: "Test", score: "17" },
      { type: "Exam", score: "17" },
    ],
  },
  {
    id: "english",
    subject: "English",
    average: "14.9",
    history: [
      { type: "Quiz", score: "14" },
      { type: "Assignment", score: "15" },
      { type: "Test", score: "15" },
      { type: "Exam", score: "15 font" },
    ],
  },
  {
    id: "arabic",
    subject: "Arabic",
    average: "15.7",
    history: [
      { type: "Quiz", score: "15" },
      { type: "Assignment", score: "16" },
      { type: "Test", score: "16" },
      { type: "Exam", score: "16" },
    ],
  },
]

export default function StudentGradesPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectGradeDetail | null>(null)

  return (
    <div className="space-y-6 p-2">
      <PerformanceHero overallAverage="15.8" />

      <SubjectGradesTable
        subjects={gradesData}
        onSelectSubject={(subj) => setSelectedSubject(subj)}
      />

      <GradeHistorySheet
        subject={selectedSubject}
        isOpen={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  )
}
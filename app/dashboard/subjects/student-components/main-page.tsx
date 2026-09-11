"use client"

import { useState } from "react"
import { SubjectCard } from "./subject-card"
import { SubjectDetailSheet, SubjectDetail } from "./subject-detail-sheet"

const subjectsData: SubjectDetail[] = [
  {
    id: "math",
    title: "Mathematics",
    teacher: "Ahmed",
    average: "16.2",
    grades: [
      { type: "Quiz", score: "15/20" },
      { type: "Assignment", score: "17/20" },
      { type: "Test", score: "16/20" },
      { type: "Exam", score: "—" },
    ],
  },
  {
    id: "physics",
    title: "Physics",
    teacher: "Sara",
    average: "15.1",
    grades: [
      { type: "Quiz", score: "14/20" },
      { type: "Assignment", score: "16/20" },
      { type: "Test", score: "15/20" },
      { type: "Exam", score: "—" },
    ],
  },
  {
    id: "cs",
    title: "Computer Science",
    teacher: "Mohammed",
    average: "17.8",
    grades: [
      { type: "Quiz", score: "18/20" },
      { type: "Assignment", score: "19/20" },
      { type: "Test", score: "17/20" },
      { type: "Exam", score: "—" },
    ],
  },
]

export default function StudentSubjectsPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectDetail | null>(null)

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Subjects</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Select a subject to view your detailed grades breakdown.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjectsData.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={(sub) => setSelectedSubject(sub)}
          />
        ))}
      </div>

      <SubjectDetailSheet
        subject={selectedSubject}
        isOpen={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  )
}
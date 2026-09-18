export interface GradeStat {
  averageGrade: number
  highestGrade: number
  lowestGrade: number
  studentsBelow10: number
}

export interface StudentAverageItem {
  student: {
    id: string
    firstName: string
    lastName: string
  }
  class: {
    name: string
  }
  averageGrade: number
  status: "EXCELLENT" | "GOOD" | "AVERAGE" | "NEEDS_IMPROVEMENT" | string
}
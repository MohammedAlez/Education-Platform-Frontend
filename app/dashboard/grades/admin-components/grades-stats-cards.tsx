"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Award, TrendingDown, AlertTriangle } from "lucide-react"
import { GradeStat } from "@/types/grade"

interface GradesStatsCardsProps {
  stats?: GradeStat
  isLoading: boolean
}

export function GradesStatsCards({ stats, isLoading }: GradesStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Average Grade */}
      <Card className="bg-purple-50/40 border-purple-100 dark:bg-purple-950/10 dark:border-purple-900/20">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Average Grade</p>
            {isLoading ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold">
                  {stats?.averageGrade !== undefined ? Number(stats.averageGrade).toFixed(1) : "0.0"}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">/ 20</span>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-purple-100 rounded-xl dark:bg-purple-900/30">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </CardContent>
      </Card>

      {/* Highest Grade */}
      <Card className="bg-emerald-50/40 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Highest Grade</p>
            {isLoading ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold">
                  {stats?.highestGrade !== undefined ? Number(stats.highestGrade).toFixed(1) : "0.0"}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">/ 20</span>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-emerald-100 rounded-xl dark:bg-emerald-900/30">
            <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardContent>
      </Card>

      {/* Lowest Grade */}
      <Card className="bg-amber-50/40 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/20">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Lowest Grade</p>
            {isLoading ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold">
                  {stats?.lowestGrade !== undefined ? String(stats.lowestGrade).padStart(2, "0") : "00"}.0
                </span>
                <span className="text-sm font-semibold text-muted-foreground">/ 20</span>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-amber-100 rounded-xl dark:bg-amber-900/30">
            <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </CardContent>
      </Card>

      {/* Students Below 10 */}
      <Card className="bg-rose-50/40 border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/20">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Students Below 10</p>
            {isLoading ? (
              <Skeleton className="h-8 w-12 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1 text-rose-600">
                {stats?.studentsBelow10 ?? 0}
              </p>
            )}
          </div>
          <div className="p-2.5 bg-rose-100 rounded-xl dark:bg-rose-900/30">
            <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
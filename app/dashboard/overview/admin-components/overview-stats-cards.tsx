"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap, Users, School, Banknote } from "lucide-react"
import { DashboardStats } from "@/types/dashboard"

interface OverviewStatsCardsProps {
  stats?: DashboardStats
  isLoading: boolean
}

export function OverviewStatsCards({ stats, isLoading }: OverviewStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Students */}
      <Card className="bg-purple-50/40 border-purple-100 dark:bg-purple-950/10 dark:border-purple-900/20">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Students</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <div>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {stats?.totalStudents ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ↑ {stats?.studentsGrowthThisMonth ?? 0} this month
                </p>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-purple-100 rounded-xl dark:bg-purple-900/30">
            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </CardContent>
      </Card>

      {/* Teachers */}
      <Card className="bg-sky-50/40 border-sky-100 dark:bg-sky-950/10 dark:border-sky-900/20">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Teachers</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <div>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {stats?.activeTeachers ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Active</p>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-sky-100 rounded-xl dark:bg-sky-900/30">
            <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
        </CardContent>
      </Card>

      {/* Classes */}
      <Card className="bg-amber-50/40 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/20">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Classes</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <div>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {stats?.activeClasses ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Active</p>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-amber-100 rounded-xl dark:bg-amber-900/30">
            <School className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card className="bg-emerald-50/40 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Revenue</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <div>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {stats?.revenueThisMonth?.toLocaleString() ?? 0} DA
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">This month</p>
              </div>
            )}
          </div>
          <div className="p-2.5 bg-emerald-100 rounded-xl dark:bg-emerald-900/30">
            <Banknote className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
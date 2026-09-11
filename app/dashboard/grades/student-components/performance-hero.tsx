"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Sparkles } from "lucide-react"

interface PerformanceHeroProps {
  overallAverage: string
}

export function PerformanceHero({ overallAverage = "15.8" }: PerformanceHeroProps) {
  return (
    <Card className="border shadow-xs bg-gradient-to-r from-purple-900/10 via-primary/5 to-background relative overflow-hidden">
      <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 gap-1 text-xs px-2.5 py-0.5 font-medium">
              <Sparkles className="h-3 w-3" /> Academic Summary
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Academic Performance
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Real-time calculation of your subject marks and academic standing for the current term.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-background/80 backdrop-blur-xs p-4 rounded-xl border shadow-2xs z-10 w-full sm:w-auto">
          <div className="p-3.5 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Overall Average
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-foreground">
                {overallAverage}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">/ 20</span>
            </div>
          </div>
        </div>

        {/* Decorative ambient background blur */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      </CardContent>
    </Card>
  )
}
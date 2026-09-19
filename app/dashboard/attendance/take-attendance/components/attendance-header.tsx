"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft } from "lucide-react"

interface AttendanceHeaderProps {
  className: string
  subjectName: string
  date: string
  disabled: boolean
  onMarkAllPresent: () => void
}

export function AttendanceHeader({
  className,
  subjectName,
  date,
  disabled,
  onMarkAllPresent,
}: AttendanceHeaderProps) {
  const router = useRouter()

  return (
    <CardHeader className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/attendance")}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <CardTitle className="text-xl font-bold">Take Attendance</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2">
          <Badge variant="outline" className="font-semibold text-purple-600 bg-purple-50">
            {className}
          </Badge>
          <span>•</span>
          <span className="font-medium text-foreground">{subjectName}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>

      <Button
        onClick={onMarkAllPresent}
        variant="outline"
        size="sm"
        disabled={disabled}
        className="rounded-xl border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 dark:bg-emerald-950/20"
      >
        <Check className="h-4 w-4 mr-1.5" /> Mark All Present
      </Button>
    </CardHeader>
  )
}
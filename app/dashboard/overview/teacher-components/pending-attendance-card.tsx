"use client"

import Link from "next/link"
import { useApiQuery } from "@/hooks/use-api"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
  AlertCircle,
  ClipboardCheck,
  Loader2,
} from "lucide-react"

import { PendingAttendanceItem } from "@/types/teacher-overview"

type PendingAttendanceResponse =
  | PendingAttendanceItem[]
  | {
      data: PendingAttendanceItem[]
    }

export function PendingAttendanceCard() {
  const {
    data: response,
    isLoading,
  } = useApiQuery<PendingAttendanceResponse>(
    ["pending-attendance"],
    "/teacher/me/attendance/pending"
  )

  const pendingList: PendingAttendanceItem[] =
    Array.isArray(response)
      ? response
      : response?.data ?? []

  const firstPending = pendingList[0]

  return (
    <Card className="shadow-xs border border-amber-200/60 dark:border-amber-900/40 h-full flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Attendance Needing Attention
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="flex h-20 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : pendingList.length === 0 ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-center">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                All attendance recorded for today! 🎉
              </p>
            </div>
          ) : (
            pendingList.map((item) => (
              <div
                key={item.scheduleId}
                className="flex items-center justify-between rounded-lg border bg-amber-50/40 dark:bg-amber-950/20 p-3 border-amber-100 dark:border-amber-900/30"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.className} — {item.subjectName}
                  </p>

                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    Not recorded yet ({item.startTime})
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="border-amber-300 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                >
                  Pending
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </div>

      <CardContent className="pt-0">
        {firstPending ? (
          <Link
            href={`/dashboard/attendance?teachingAssignmentId=${encodeURIComponent(
              firstPending.teachingAssignmentId
            )}&date=${encodeURIComponent(firstPending.date)}`}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ClipboardCheck className="h-4 w-4" />
            Take Attendance
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="inline-flex h-9 w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-primary/50 px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <ClipboardCheck className="h-4 w-4" />
            Take Attendance
          </div>
        )}
      </CardContent>
    </Card>
  )
}
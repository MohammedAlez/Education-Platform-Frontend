"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"

interface AttendanceDatePickerProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

export function AttendanceDatePicker({
  selectedDate,
  onDateChange,
}: AttendanceDatePickerProps) {
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Select Session Date</p>
          <p className="text-xs text-muted-foreground">
            Choose the date you want to record attendance for.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="pl-9 bg-background font-medium"
          />
        </div>
      </CardContent>
    </Card>
  )
}
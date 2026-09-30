"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, User } from "lucide-react"
import { StudentScheduleSlot } from "@/types/student-schedule"

interface StudentSlotCardProps {
  slot: StudentScheduleSlot
}

export function StudentSlotCard({ slot }: StudentSlotCardProps) {
  return (
    <Card className="border shadow-2xs hover:border-primary/50 transition-all">
      <CardContent className="p-3.5 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-medium">
          <span className="flex items-center gap-1 text-primary font-semibold">
            <Clock className="h-3.5 w-3.5" />
            {slot.startTime} - {slot.endTime}
          </span>
          <span className="flex items-center gap-1 text-foreground font-bold bg-muted px-2 py-0.5 rounded-md">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            {slot.room}
          </span>
        </div>

        <div>
          <p className="font-bold text-sm text-foreground capitalize">
            {slot.subjectName}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>{slot.teacherName}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
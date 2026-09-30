"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, GraduationCap } from "lucide-react"
import { TeacherScheduleSlot } from "@/types/teacher-schedule"

interface ScheduleSlotItemProps {
  slot: TeacherScheduleSlot
}

export function ScheduleSlotItem({ slot }: ScheduleSlotItemProps) {
  return (
    <Card className="border shadow-2xs hover:border-primary/50 transition-all group">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
          <span className="flex items-center gap-1 text-primary font-semibold">
            <Clock className="h-3 w-3" />
            {slot.startTime} - {slot.endTime}
          </span>
          <span className="flex items-center gap-0.5 font-bold text-foreground">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            {slot.room}
          </span>
        </div>

        <div>
          <p className="font-bold text-xs text-foreground capitalize">
            {slot.subject?.name || "Subject"}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
              <GraduationCap className="h-3 w-3" />
              Class {slot.class?.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Clock,
  MapPin,
  Trash2,
  User,
  Loader2,
} from "lucide-react"
import { ScheduleSlot } from "@/types/admin-schedule"
import { useApiMutation } from "@/hooks/use-api"

interface ScheduleSlotCardProps {
  slot: ScheduleSlot
  onDeleteSuccess: () => void
}

export function ScheduleSlotCard({
  slot,
  onDeleteSuccess,
}: ScheduleSlotCardProps) {
  const deleteSlot = useApiMutation<void, void>(
    `/schedules/admin/${slot.id}`,
    "DELETE",
    ["admin-schedules"]
  )

  const handleDelete = () => {
    deleteSlot.mutate(undefined, {
      onSuccess: () => {
        onDeleteSuccess()
      },
    })
  }

  return (
    <Card className="border shadow-2xs hover:border-primary/50 transition-all group relative overflow-hidden">
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-primary" />
            {slot.startTime} - {slot.endTime}
          </span>

          <span className="flex items-center gap-0.5 font-semibold text-foreground">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            {slot.room}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between gap-1">
            <p className="font-bold text-xs capitalize text-foreground">
              {slot.subject?.name || "Subject"}
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={deleteSlot.isPending}
              className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {deleteSlot.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <User className="h-3 w-3 shrink-0" />
            <span>{slot.teacher?.name || "Unassigned"}</span>
          </p>

          {slot.class?.name && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
              {slot.class.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useApiMutation } from "@/hooks/use-api"
import { DayOfWeek, TeachingAssignment } from "@/types/admin-schedule"
import { Loader2 } from "lucide-react"

interface AddScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  assignments: TeachingAssignment[]
}

const DAYS: { label: string; value: DayOfWeek }[] = [
  { label: "Sunday", value: "SUNDAY" },
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
]

interface CreateSchedulePayload {
  teachingAssignmentId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}

export function AddScheduleModal({
  isOpen,
  onClose,
  onSuccess,
  assignments,
}: AddScheduleModalProps) {
  const [assignmentId, setAssignmentId] = useState<string | null>("")
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>("SUNDAY")
  const [startTime, setStartTime] = useState<string>("08:00")
  const [endTime, setEndTime] = useState<string>("10:00")
  const [room, setRoom] = useState<string>("")

  const createSlot = useApiMutation<void, CreateSchedulePayload>(
    "/schedules/admin",
    "POST",
    ["admin-schedules"]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!assignmentId) return

    createSlot.mutate(
      {
        teachingAssignmentId: assignmentId,
        dayOfWeek,
        startTime,
        endTime,
        room,
      },
      {
        onSuccess: () => {
          onSuccess()
          onClose()

          setAssignmentId("")
          setDayOfWeek("SUNDAY")
          setStartTime("08:00")
          setEndTime("10:00")
          setRoom("")
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Schedule Slot</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Teaching Assignment */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Teaching Assignment
            </Label>

            <Select
              value={assignmentId}
              onValueChange={setAssignmentId}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class - Subject - Teacher" />
              </SelectTrigger>

              <SelectContent>
                {assignments.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.class.name} — {item.subject.name} (
                    {item.teacher.firstName} {item.teacher.lastName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Day */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Day of Week
            </Label>

            <Select
              value={dayOfWeek}
              onValueChange={(value) =>
                setDayOfWeek(value as DayOfWeek)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Start Time
              </Label>

              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                End Time
              </Label>

              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Room */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">
              Room / Laboratory
            </Label>

            <Input
              placeholder="e.g. Room 102"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createSlot.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createSlot.isPending || !assignmentId}
            >
              {createSlot.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              Save Slot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
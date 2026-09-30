"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Calendar, Loader2, Filter } from "lucide-react"
import { AddScheduleModal } from "./add-schedule-modal"
import { ScheduleSlotCard } from "./schedule-slot-card"
import { ScheduleSlot, TeachingAssignment, DayOfWeek } from "@/types/admin-schedule"

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "SUNDAY", label: "Sunday" },
  { key: "MONDAY", label: "Monday" },
  { key: "TUESDAY", label: "Tuesday" },
  { key: "WEDNESDAY", label: "Wednesday" },
  { key: "THURSDAY", label: "Thursday" },
]

export function AdminSchedulesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState<string | null>("ALL")

  // 1. Fetch Teaching Assignments for Modal Dropdown
  const { data: assignmentsResponse } = useApiQuery<
    { data: TeachingAssignment[] } | TeachingAssignment[]
  >(["teaching-assignments"], "/teaching-assignments")

  const assignmentsList: TeachingAssignment[] = Array.isArray(assignmentsResponse)
    ? assignmentsResponse
    : (assignmentsResponse as any)?.data || []

  // 2. Fetch All Admin Schedules
  const {
    data: schedulesResponse,
    isLoading: isLoadingSchedules,
    refetch,
  } = useApiQuery<{ data: ScheduleSlot[] } | ScheduleSlot[]>(
    ["admin-schedules"],
    "/schedules/admin"
  )

  const slotsList: ScheduleSlot[] = Array.isArray(schedulesResponse)
    ? schedulesResponse
    : (schedulesResponse as any)?.data || []

  // Extract unique classes for filter dropdown
  const availableClasses = Array.from(
    new Map(
      assignmentsList.map((item) => [item.class.id, item.class])
    ).values()
  )

  // Filter slots by selected class
  const filteredSlots =
    selectedClassId === "ALL"
      ? slotsList
      : slotsList.filter((s) => s.class?.id === selectedClassId)

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Timetable & Scheduling
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage and structure weekly class sessions, rooms, and teacher schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Class Filter Dropdown */}
          <div className="w-48">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="h-9 text-xs">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Classes</SelectItem>
                {availableClasses.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => setIsModalOpen(true)} className="gap-2 h-9 text-xs">
            <Plus className="h-4 w-4" />
            Add Schedule Slot
          </Button>
        </div>
      </div>

      {/* Grid View for Weekdays */}
      {isLoadingSchedules ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {DAYS.map((day) => {
            const daySlots = filteredSlots
              .filter((s) => s.dayOfWeek === day.key)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))

            return (
              <div key={day.key} className="space-y-3">
                <div className="p-2.5 text-center bg-muted/50 rounded-lg font-semibold text-xs tracking-wide border">
                  {day.label}
                </div>

                <div className="space-y-2.5">
                  {daySlots.length === 0 ? (
                    <div className="p-4 border border-dashed rounded-lg text-center text-xs text-muted-foreground">
                      No sessions scheduled
                    </div>
                  ) : (
                    daySlots.map((slot) => (
                      <ScheduleSlotCard
                        key={slot.id}
                        slot={slot}
                        onDeleteSuccess={refetch}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Slot Modal Component */}
      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
        assignments={assignmentsList}
      />
    </div>
  )
}
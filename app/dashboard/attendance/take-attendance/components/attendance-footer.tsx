"use client"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Save } from "lucide-react"

interface AttendanceFooterProps {
  saveError: string | null
  isSaving: boolean
  isDisabled: boolean
  onSave: () => void
}

export function AttendanceFooter({
  saveError,
  isSaving,
  isDisabled,
  onSave,
}: AttendanceFooterProps) {
  return (
    <CardFooter className="flex flex-col items-end gap-3 p-5 border-t">
      {saveError && (
        <p className="text-sm text-destructive text-right">{saveError}</p>
      )}
      <Button
        onClick={onSave}
        disabled={isDisabled}
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 h-10 font-semibold"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save Attendance"}
      </Button>
    </CardFooter>
  )
}
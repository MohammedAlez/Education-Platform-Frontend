"use client"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Save, Sparkles } from "lucide-react"

interface GradesFooterProps {
  classBatchAverage: string | null
  saveError: string | null
  isSaving: boolean
  isDisabled: boolean
  onSave: () => void
}

export function GradesFooter({
  classBatchAverage,
  saveError,
  isSaving,
  isDisabled,
  onSave,
}: GradesFooterProps) {
  return (
    <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="h-4 w-4 text-amber-500" />
        <span className="text-muted-foreground">Class Batch Average:</span>
        <span className="font-bold text-foreground">
          {classBatchAverage ? `${classBatchAverage} / 20` : "-- / 20"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {saveError && (
          <p className="text-sm text-destructive text-center sm:text-right">{saveError}</p>
        )}
        <Button
          onClick={onSave}
          disabled={isDisabled}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 h-10 font-semibold w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Grades"}
        </Button>
      </div>
    </CardFooter>
  )
}
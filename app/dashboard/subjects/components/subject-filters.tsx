"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SubjectFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search subjects..."
          className="pl-9 bg-card"
        />
      </div>
    </div>
  )
}
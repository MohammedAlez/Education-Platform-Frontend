"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export function ClassFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search class or teacher..."
          className="pl-9 bg-card"
        />
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px] bg-card">
            <SelectValue placeholder="Academic Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">2025 / 2026</SelectItem>
            <SelectItem value="2024">2024 / 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
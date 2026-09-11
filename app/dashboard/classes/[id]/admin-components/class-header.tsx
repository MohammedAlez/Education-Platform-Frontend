import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, School, Users } from "lucide-react"

export function ClassHeader() {
  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/classes"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Classes
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
            <School className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Class A</h1>
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                2025 / 2026
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
              <Users className="h-3.5 w-3.5" />
              <span>28 Enrolled Students</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Class
          </Button>
        </div>
      </div>
    </div>
  )
}
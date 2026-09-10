import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, UserX } from "lucide-react"

export function StudentHeader() {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link
        href="/dashboard/students"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Students
      </Link>

      {/* Main Action Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
            AA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Ahmed Ali</h1>
              <Badge
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              >
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ahmed@example.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Student
          </Button>
          <Button variant="destructive" className="gap-2">
            <UserX className="h-4 w-4" />
            Deactivate
          </Button>
        </div>
      </div>
    </div>
  )
}
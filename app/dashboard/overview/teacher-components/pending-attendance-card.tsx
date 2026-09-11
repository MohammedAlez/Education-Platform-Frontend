import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ClipboardCheck } from "lucide-react"

export function PendingAttendanceCard() {
  return (
    <Card className="shadow-xs border border-amber-200/60 dark:border-amber-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          Attendance Needing Attention
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-amber-50/40 dark:bg-amber-950/20 p-3 border-amber-100 dark:border-amber-900/30">
          <div>
            <p className="text-sm font-semibold text-foreground">Class A</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Not recorded yet</p>
          </div>
          <Badge variant="outline" className="border-amber-300 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Pending
          </Badge>
        </div>

        <Button className="w-full gap-2">
          <Link href="/dashboard/attendance">
            <ClipboardCheck className="h-4 w-4" />
            Take Attendance
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export function TabAttendance() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="shadow-xs border md:col-span-1">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <span className="text-4xl font-extrabold text-primary">92%</span>
          <span className="mt-1 text-xs text-muted-foreground">Overall ratio</span>
        </CardContent>
      </Card>

      <Card className="shadow-xs border md:col-span-2">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-xs text-muted-foreground">Present</p>
              <p className="text-lg font-bold">92 Days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-rose-50/50 dark:bg-rose-950/20">
            <XCircle className="h-5 w-5 text-rose-500" />
            <div>
              <p className="text-xs text-muted-foreground">Absent</p>
              <p className="text-lg font-bold">5 Days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3 bg-amber-50/50 dark:bg-amber-950/20">
            <Clock className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Late</p>
              <p className="text-lg font-bold">3 Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
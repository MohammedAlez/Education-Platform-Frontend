import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardCheck } from "lucide-react"

export function ClassDetailAttendance() {
  return (
    <Card className="shadow-xs border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Class Attendance Logs</CardTitle>
        <Button size="sm" className="gap-2">
          <ClipboardCheck className="h-4 w-4" />
          Mark Attendance
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Detailed session-by-session attendance tracking logs for this class.
        </p>
      </CardContent>
    </Card>
  )
}
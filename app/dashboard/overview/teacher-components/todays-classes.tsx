import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const todaysSchedule = [
  { time: "09:00", subject: "Mathematics", className: "Class A" },
  { time: "11:00", subject: "Mathematics", className: "Class B" },
  { time: "14:00", subject: "Mathematics", className: "Class C" },
]

export function TodaysClasses() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Today's Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todaysSchedule.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border bg-muted/20 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.subject}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
              {item.className}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
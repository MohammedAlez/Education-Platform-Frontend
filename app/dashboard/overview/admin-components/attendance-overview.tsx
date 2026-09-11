import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

const stats = [
  {
    label: "Present",
    count: 218,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  {
    label: "Absent",
    count: 19,
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400",
    icon: XCircle,
  },
  {
    label: "Late",
    count: 8,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
    icon: Clock,
  },
]

export function AttendanceOverview() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-md p-2 ${item.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-lg font-bold">{item.count}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
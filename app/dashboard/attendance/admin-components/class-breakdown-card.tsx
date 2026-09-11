import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const classAttendanceData = [
  { className: "Class A", rate: 94 },
  { className: "Class B", rate: 88 },
  { className: "Class C", rate: 91 },
]

export function ClassBreakdownCard() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Attendance by Class
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {classAttendanceData.map((item) => (
            <div
              key={item.className}
              className="space-y-2 rounded-lg border bg-muted/20 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{item.className}</span>
                <span className="text-sm font-bold text-primary">
                  {item.rate}%
                </span>
              </div>
              <Progress value={item.rate} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
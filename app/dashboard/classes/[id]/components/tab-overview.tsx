import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, Clock } from "lucide-react"

const overviewStats = [
  { label: "Students", value: "28", icon: Users, color: "text-purple-600" },
  { label: "Subjects", value: "5", icon: BookOpen, color: "text-amber-500" },
  { label: "Teachers", value: "4", icon: GraduationCap, color: "text-sky-500" },
  { label: "Attendance", value: "91%", icon: Clock, color: "text-emerald-600" },
]

export function TabOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {overviewStats.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label} className="shadow-xs border">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-bold mt-1 text-foreground">{item.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${item.color}`} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
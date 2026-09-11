"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen } from "lucide-react"

const todayClasses = [
  { time: "09:00", subject: "Mathematics", room: "Room 102", teacher: "Pr. Zitouni" },
  { time: "11:00", subject: "Physics", room: "Lab B", teacher: "Dr. Lakhdar" },
]

export function TodaysClasses() {
  return (
    <Card className="border shadow-xs h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Today's Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {todayClasses.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.subject}</p>
                  <p className="text-xs text-muted-foreground">{item.room} • {item.teacher}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-background border shadow-2xs">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
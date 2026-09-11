"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserCheck, Mail } from "lucide-react"

const teachers = [
  { name: "Ahmed", subject: "Mathematics", initials: "AH", email: "ahmed@school.edu" },
  { name: "Sara", subject: "Physics", initials: "SA", email: "sara@school.edu" },
  { name: "Farouq", subject: "Computer Science", initials: "FZ", email: "farouq@school.edu" },
  { name: "Elena", subject: "English", initials: "EL", email: "elena@school.edu" },
  { name: "Tariq", subject: "Arabic", initials: "TR", email: "tariq@school.edu" },
]

export function ClassTeachers() {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-emerald-600" />
          My Teachers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="flex items-center justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                    {teacher.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold">{teacher.name}</h3>
                  <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                title={`Contact ${teacher.name}`}
                onClick={() => window.location.href = `mailto:${teacher.email}`}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
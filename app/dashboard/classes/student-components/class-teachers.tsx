"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserCheck, Mail } from "lucide-react"
import { StudentTeacher } from "@/types/student-portal"

interface ClassTeachersProps {
  teachers: StudentTeacher[]
}

export function ClassTeachers({ teachers }: ClassTeachersProps) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-emerald-600" />
          My Teachers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {teachers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => {
              const initials = `${teacher.firstName[0] || ""}${
                teacher.lastName[0] || ""
              }`.toUpperCase()

              return (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold capitalize">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {teacher.subjectName}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    title={`Contact ${teacher.firstName}`}
                    onClick={() =>
                      (window.location.href = `mailto:${teacher.email}`)
                    }
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground py-6 text-center border border-dashed rounded-md">
            No teachers assigned to this class yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
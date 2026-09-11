"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { School, Percent, Award, CalendarCheck } from "lucide-react"

export interface TeacherScopedStudent {
  id: string
  name: string
  className: string
  attendance: string
  average: string
  recentGrades: { subject: string; type: string; grade: string; date: string }[]
  attendanceLogs: { date: string; subject: string; status: "PRESENT" | "ABSENT" | "LATE" }[]
}

interface TeacherStudentDetailsSheetProps {
  student: TeacherScopedStudent | null
  isOpen: boolean
  onClose: () => void
}

export function TeacherStudentDetailsSheet({
  student,
  isOpen,
  onClose,
}: TeacherStudentDetailsSheetProps) {
  if (!student) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <SheetTitle className="text-xl font-bold">{student.name}</SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-0.5">
                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                  {student.className}
                </Badge>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6 space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border shadow-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
                    <Percent className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Attendance Rate</p>
                    <p className="text-lg font-bold">{student.attendance}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Academic Average</p>
                    <p className="text-lg font-bold">{student.average}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Enrolled Class Details</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Class Name</span>
                  <span className="font-semibold">{student.className}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Primary Subject</span>
                  <span className="font-semibold">Mathematics</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ATTENDANCE TAB */}
          <TabsContent value="attendance">
            <Card className="border shadow-none">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.attendanceLogs.map((log, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-medium">{log.date}</TableCell>
                        <TableCell className="text-xs">{log.subject}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="secondary"
                            className={
                              log.status === "PRESENT"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : log.status === "LATE"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GRADES TAB */}
          <TabsContent value="grades">
            <Card className="border shadow-none">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead>Subject</TableHead>
                      <TableHead>Evaluation Type</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.recentGrades.map((g, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-xs">{g.subject}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{g.type}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{g.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
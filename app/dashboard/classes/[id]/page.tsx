import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassHeader } from "./components/class-header"
import { TabOverview } from "./components/tab-overview"
import { TabStudents } from "./components/tab-students"
import { TabSubjects } from "./components/tab-subjects"
import { TabTeachers } from "./components/tab-teachers"
import { TabAttendance } from "./components/tab-attendance"

export default function ClassDetailsPage() {
  return (
    <div className="space-y-6 p-2">
      <ClassHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/80 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TabOverview />
        </TabsContent>
        <TabsContent value="students">
          <TabStudents />
        </TabsContent>
        <TabsContent value="subjects">
          <TabSubjects />
        </TabsContent>
        <TabsContent value="teachers">
          <TabTeachers />
        </TabsContent>
        <TabsContent value="attendance">
          <TabAttendance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
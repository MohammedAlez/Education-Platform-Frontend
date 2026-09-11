import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassHeader } from "./admin-components/class-header"
import { TabOverview } from "./admin-components/tab-overview"
import { TabStudents } from "./admin-components/tab-students"
import { TabSubjects } from "./admin-components/tab-subjects"
import { TabTeachers } from "./admin-components/tab-teachers"
import { TabAttendance } from "./admin-components/tab-attendance"
import { getCurrentUser } from "@/lib/user"
import { Role } from "@/lib/rbac"
import { ClassDetailGrades } from "./teacher-components/class-detail-grades"
import { ClassDetailAttendance } from "./teacher-components/class-detail-attendance"
import { ClassDetailStudentsTable } from "./teacher-components/class-detail-students-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Link } from "lucide-react"
import { ClassDetailOverview } from "./teacher-components/class-detail-overview"

export default async function ClassDetailsPage() {
  const currentUser = await getCurrentUser()
      // const userRole = currentUser?.role 
      const userRole:Role = "TEACHER"
    
      if (userRole === "ADMIN") {
        return <AdminClassDetailsPage />
      }else if (userRole === "TEACHER") {
        return <TeacherClassesPage />
      }
      return <div>Access Denied</div>
}

function AdminClassDetailsPage() {
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

function TeacherClassesPage() {

  const classData = {
    id: "alsdkjflksd",
    name: "Class A",
    studentCount: 28,
    averageGrade: "15.4 / 20",
    attendanceRate: "92%",
  }

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center gap-4">
        <Button  variant="outline" size="icon" className="h-9 w-9">
          <Link href="/dashboard/classes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{classData.name}</h1>
          <p className="text-sm text-muted-foreground">
            Class section performance overview and roster management.
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ClassDetailOverview
            className={classData.name}
            studentCount={classData.studentCount}
            averageGrade={classData.averageGrade}
            attendanceRate={classData.attendanceRate}
          />
        </TabsContent>

        <TabsContent value="students">
          <ClassDetailStudentsTable />
        </TabsContent>

        <TabsContent value="attendance">
          <ClassDetailAttendance />
        </TabsContent>

        <TabsContent value="grades">
          <ClassDetailGrades />
        </TabsContent>
      </Tabs>
    </div>
  )
}
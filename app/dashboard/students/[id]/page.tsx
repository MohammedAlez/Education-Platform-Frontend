import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentHeader } from "./components/student-header"
import { TabOverview } from "./components/tab-overview"
import { TabAcademic } from "./components/tab-academic"
import { TabAttendance } from "./components/tab-attendance"
import { TabGrades } from "./components/tab-grades"
import { TabPayments } from "./components/tab-payments"

export default function StudentDetailsPage() {
  return (
    <div className="space-y-6 p-2">
      {/* Dynamic Header */}
      <StudentHeader />

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/80 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TabOverview />
        </TabsContent>
        <TabsContent value="academic">
          <TabAcademic />
        </TabsContent>
        <TabsContent value="attendance">
          <TabAttendance />
        </TabsContent>
        <TabsContent value="grades">
          <TabGrades />
        </TabsContent>
        <TabsContent value="payments">
          <TabPayments />
        </TabsContent>
      </Tabs>
    </div>
  )
}
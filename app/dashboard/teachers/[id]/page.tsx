import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherHeader } from "./components/teacher-header"
import { TabOverview } from "./components/tab-overview"
import { TabAssignments } from "./components/tab-assignments"
import { TabClasses } from "./components/tab-classes"

export default function TeacherDetailsPage() {
  return (
    <div className="space-y-6 p-2">
      <TeacherHeader />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/80 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TabOverview />
        </TabsContent>
        <TabsContent value="assignments">
          <TabAssignments />
        </TabsContent>
        <TabsContent value="classes">
          <TabClasses />
        </TabsContent>
      </Tabs>
    </div>
  )
}
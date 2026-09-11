import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ClassDetailGrades() {
  return (
    <Card className="shadow-xs border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Gradebook Management</CardTitle>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Grade
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          View test, exam, and homework evaluation matrices for this class.
        </p>
      </CardContent>
    </Card>
  )
}
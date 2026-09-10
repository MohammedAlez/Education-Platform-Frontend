import { Button } from "@/components/ui/button"
import { ClassStats } from "./components/class-stats"
import { ClassFilters } from "./components/class-filters"
import { ClassGrid } from "./components/class-card"
import { PlusCircle } from "lucide-react"

export default function ClassesPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
          <p className="text-sm text-muted-foreground">
            Overview and management of all school classes.
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" />
          Create Class
        </Button>
      </div>

      <ClassStats />

      <div className="space-y-4">
        <ClassFilters />
        <ClassGrid />
      </div>
    </div>
  )
}
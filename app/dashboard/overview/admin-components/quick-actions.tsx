import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, UserCheck, PlusCircle, CreditCard } from "lucide-react"

const actions = [
  { label: "Add Student", icon: UserPlus, variant: "default" as const },
  { label: "Add Teacher", icon: UserCheck, variant: "outline" as const },
  { label: "Create Class", icon: PlusCircle, variant: "outline" as const },
  { label: "Record Payment", icon: CreditCard, variant: "outline" as const },
]

export function QuickActions() {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="h-auto flex-col gap-2 py-4 shadow-xs"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
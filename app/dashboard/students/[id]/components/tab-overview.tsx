import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TabOverview() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">First Name</p>
          <p className="mt-1 text-sm font-medium text-foreground">Ahmed</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Last Name</p>
          <p className="mt-1 text-sm font-medium text-foreground">Ali</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Email Address</p>
          <p className="mt-1 text-sm font-medium text-foreground">ahmed@example.com</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Phone Number</p>
          <p className="mt-1 text-sm font-medium text-foreground">0550 12 34 56</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Status</p>
          <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">Active</p>
        </div>
      </CardContent>
    </Card>
  )
}
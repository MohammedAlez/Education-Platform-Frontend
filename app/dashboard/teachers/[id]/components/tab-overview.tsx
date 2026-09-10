import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TabOverview() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Teacher Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Full Name</p>
          <p className="mt-1 text-sm font-medium text-foreground">Ahmed Benali</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Email Address</p>
          <p className="mt-1 text-sm font-medium text-foreground">ahmed.benali@school.com</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Phone Number</p>
          <p className="mt-1 text-sm font-medium text-foreground">0661 23 45 67</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Status</p>
          <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Active
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
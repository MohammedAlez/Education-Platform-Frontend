import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

const statsData = [
  {
    title: "Total Expected",
    value: "450,000 DA",
    icon: DollarSign,
    bgColor: "bg-purple-50/60 dark:bg-purple-950/20",
    borderColor: "border-purple-100 dark:border-purple-900/40",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Paid",
    value: "390,000 DA",
    icon: CheckCircle2,
    bgColor: "bg-emerald-50/60 dark:bg-emerald-950/20",
    borderColor: "border-emerald-100 dark:border-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Pending",
    value: "40,000 DA",
    icon: Clock,
    bgColor: "bg-amber-50/60 dark:bg-amber-950/20",
    borderColor: "border-amber-100 dark:border-amber-900/40",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Overdue",
    value: "20,000 DA",
    icon: AlertTriangle,
    bgColor: "bg-rose-50/60 dark:bg-rose-950/20",
    borderColor: "border-rose-100 dark:border-rose-900/40",
    iconColor: "text-rose-500 dark:text-rose-400",
  },
]

export function PaymentStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className={`border shadow-none transition-all hover:shadow-xs ${stat.bgColor} ${stat.borderColor}`}
          >
            <CardContent className="p-6 py-0">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center">
                  <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
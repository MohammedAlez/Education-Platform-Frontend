"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, ShieldCheck } from "lucide-react"

interface AccountProfileCardProps {
  name: string
  email: string
  role: "TEACHER" | "STUDENT"
  identifierLabel: string
  identifierValue: string
}

export function AccountProfileCard({
  name,
  email,
  role,
  identifierLabel,
  identifierValue,
}: AccountProfileCardProps) {
  return (
    <Card className="border shadow-xs">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-bold text-2xl border-2 border-background shadow-xs">
              {name.charAt(0)}
            </div>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-background shadow-xs"
              title="Change photo"
            >
              <Camera className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold tracking-tight">{name}</h2>
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 font-medium"
              >
                {role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {identifierLabel}: <strong className="text-foreground">{identifierValue}</strong>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
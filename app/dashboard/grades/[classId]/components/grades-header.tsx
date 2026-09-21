"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface GradesHeaderProps {
  className: string
  subjectName: string
}

export function GradesHeader({ className, subjectName }: GradesHeaderProps) {
  const router = useRouter()

  return (
    <CardHeader className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/grades")}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <CardTitle className="text-xl font-bold">Grade Management</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2">
          <Badge variant="outline" className="font-semibold text-purple-600 bg-purple-50">
            {className}
          </Badge>
          <span>•</span>
          <span className="font-medium text-foreground">{subjectName}</span>
        </div>
      </div>
    </CardHeader>
  )
}
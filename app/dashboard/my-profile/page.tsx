"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KeyRound, User, Mail, School } from "lucide-react"
import { ChangePasswordDialog } from "./components/change-password-dialog"

export default function StudentProfilePage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  // Demo Mock Data
  const student = {
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    class: "Class A",
  }

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          View your personal details and manage account credentials.
        </p>
      </div>

      <Card className="border shadow-xs">
        <CardHeader className="pb-4 border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{student.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 font-medium text-xs">
                Student Account
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-md bg-muted text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Name</p>
                <p className="text-sm font-semibold text-foreground">{student.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-md bg-muted text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Email</p>
                <p className="text-sm font-semibold text-foreground">{student.email}</p>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className="p-2 rounded-md bg-muted text-muted-foreground">
                <School className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Class</p>
                <p className="text-sm font-semibold text-foreground">{student.class}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPasswordModalOpen(true)}
              className="gap-2 w-full sm:w-auto"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  )
}
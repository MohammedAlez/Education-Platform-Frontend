"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangePasswordDialog } from "./change-password-dialog"

export function AccountTab() {
  return (
    <Card className="border shadow-xs">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
        <CardDescription>
          Manage your personal administrative credentials and account security.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Mohammed" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Alez" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@elamel-academy.dz" />
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <ChangePasswordDialog />
            <Button type="submit">Save Account</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
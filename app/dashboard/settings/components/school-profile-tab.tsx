"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export function SchoolProfileTab() {
  return (
    <Card className="border shadow-xs">
      <CardHeader>
        <CardTitle>School Profile</CardTitle>
        <CardDescription>
          General information displayed across reports, invoices, and communication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" defaultValue="El-Amel Private Academy" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolEmail">School Email</Label>
              <Input id="schoolEmail" type="email" defaultValue="contact@elamel-academy.dz" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolPhone">Phone Number</Label>
              <Input id="schoolPhone" defaultValue="+213 29 00 00 00" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Avenue 1er Novembre, Ouargla, Algeria" />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>School Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed bg-muted">
                  <span className="text-xs font-semibold text-muted-foreground">Logo</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}
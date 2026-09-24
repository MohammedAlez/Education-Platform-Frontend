"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Save, CheckCircle2, AlertCircle } from "lucide-react"

interface SchoolProfileTabProps {
  school?: {
    id: string
    name: string
    email: string
    phone: string
    address?: string
  }
}

export function SchoolProfileTab({ school }: SchoolProfileTabProps) {
  const initialName = school?.name || ""
  const initialEmail = school?.email || ""
  const initialPhone = school?.phone || ""
  const initialAddress = school?.address || ""

  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [address, setAddress] = useState(initialAddress)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const updateSchoolMutation = useApiMutation<
    any,
    { name: string; email: string; phone: string; address?: string }
  >("/profiles/school", "PATCH")

  // Check dirty state against initial props
  const isDirty =
    name !== initialName ||
    email !== initialEmail ||
    phone !== initialPhone ||
    address !== initialAddress

  // Ensure mandatory fields are present
  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== ""

  const isPending = updateSchoolMutation.isPending
  const isDisabled = !isDirty || !isFormValid || isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    setSavedSuccess(false)

    try {
      await updateSchoolMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
      })
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to update school profile:", err)
    }
  }

  return (
    <Card className="border shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">School Profile</CardTitle>
        <CardDescription>
          General organization details displayed across reports, invoices, and communication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolEmail">School Email</Label>
              <Input
                id="schoolEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolPhone">Phone Number</Label>
              <Input
                id="schoolPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="schoolAddress">School Address</Label>
              <Input
                id="schoolAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Quarter, City, Province"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>School Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed bg-muted">
                  <span className="text-xs font-semibold text-muted-foreground">Logo</span>
                </div>
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>

          {updateSchoolMutation.isError && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              {updateSchoolMutation.error?.message || "Failed to update school info."}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" />
                School information saved
              </span>
            ) : <div />}

            <Button
              type="submit"
              disabled={isDisabled}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
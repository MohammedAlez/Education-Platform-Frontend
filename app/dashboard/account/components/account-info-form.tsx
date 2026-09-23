"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Save, AlertCircle } from "lucide-react"

interface AccountInfoFormProps {
  initialFirstName: string
  initialLastName: string
  initialEmail: string
  initialPhone: string
}

export function AccountInfoForm({
  initialFirstName,
  initialLastName,
  initialEmail,
  initialPhone,
}: AccountInfoFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [phone, setPhone] = useState(initialPhone)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const updateProfileMutation = useApiMutation<
    any,
    { firstName: string; lastName: string; phone: string }
  >("/users/profile", "PATCH")

  // Check if form values differ from initial values
  const isDirty =
    firstName !== initialFirstName ||
    lastName !== initialLastName ||
    phone !== initialPhone

  // Ensure no fields are empty
  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    phone.trim() !== ""

  const isPending = updateProfileMutation.isPending
  const isDisabled = !isDirty || !isFormValid || isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    setSavedSuccess(false)

    try {
      await updateProfileMutation.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      })
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to update profile:", err)
    }
  }

  return (
    <Card className="border shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
        <CardDescription>
          Update your contact details and account information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={initialEmail}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {updateProfileMutation.isError && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              {updateProfileMutation.error?.message || "Failed to save profile changes."}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated successfully
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
"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react"

export function AccountSecurityForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationError, setValidationError] = useState<string | null>(null)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const changePasswordMutation = useApiMutation<
    any,
    { currentPassword: string; newPassword: string }
  >("/auth/change-password", "POST")

  // Check if any password field has been typed into
  const isDirty =
    currentPassword.length > 0 ||
    newPassword.length > 0 ||
    confirmPassword.length > 0

  // Validate that all fields are filled and new passwords match
  const isFormValid =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    newPassword === confirmPassword

  const isPending = changePasswordMutation.isPending
  const isDisabled = !isDirty || !isFormValid || isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return

    setValidationError(null)
    setSavedSuccess(false)

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      })

      setSavedSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to update password:", err)
    }
  }

  const errorMessage =
    validationError || (changePasswordMutation.isError ? changePasswordMutation.error?.message : null)

  return (
    <Card className="border shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Security & Password</CardTitle>
        <CardDescription>
          Ensure your account uses a secure password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPass">Current Password</Label>
            <Input
              id="currentPass"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPass">New Password</Label>
              <Input
                id="newPass"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPass">Confirm New Password</Label>
              <Input
                id="confirmPass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Show inline mismatch hint if typed passwords don't match yet */}
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              New passwords do not match.
            </p>
          )}

          {errorMessage && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" />
                Password changed successfully
              </span>
            ) : <div />}

            <Button
              type="submit"
              disabled={isDisabled}
              variant="outline"
              className="gap-2 bg-primary text-accent"
            >
              <KeyRound className="h-4 w-4" />
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
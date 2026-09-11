"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"

export function ChangePasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger >
        <Button variant="outline" className="gap-2">
          <KeyRound className="h-4 w-4" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your account security password.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-2" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="current-pass">Current Password</Label>
            <Input id="current-pass" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-pass">New Password</Label>
            <Input id="new-pass" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-pass">Confirm New Password</Label>
            <Input id="confirm-pass" type="password" />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
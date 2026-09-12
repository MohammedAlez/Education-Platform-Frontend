"use client"

import { useState, useEffect } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { TEACHERS_QUERY_KEY } from "@/lib/queries/teachers"
import { Teacher } from "@/types/teacher"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface EditTeacherDialogProps {
  teacher: Teacher | null
  isOpen: boolean
  onClose: () => void
}

export function EditTeacherDialog({ teacher, isOpen, onClose }: EditTeacherDialogProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | null>("ACTIVE")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (teacher) {
      setFirstName(teacher.firstName || "")
      setLastName(teacher.lastName || "")
      setEmail(teacher.user?.email || "")
      setPhone(teacher.phone || "")
      setStatus(teacher.status || "ACTIVE")
    }
  }, [teacher])

  const updateTeacher = useApiMutation(
    `/teachers/${teacher?.id}`,
    "PATCH",
    TEACHERS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teacher) return

    setErrorMsg("")
    updateTeacher.mutate(
      { firstName, lastName, email, phone, status },
      {
        onSuccess: () => onClose(),
        onError: (err: any) => setErrorMsg(err.message || "Failed to update teacher."),
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Teacher Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">First Name</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Last Name</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Account Status</Label>
            <Select value={status} onValueChange={(v: "ACTIVE" | "INACTIVE" | null) => setStatus(v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={updateTeacher.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateTeacher.isPending}>
              {updateTeacher.isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
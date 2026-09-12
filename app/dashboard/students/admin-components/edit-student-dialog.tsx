"use client"

import { useState, useEffect } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { STUDENTS_QUERY_KEY } from "@/lib/queries/students"
import { Student } from "@/types/student"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface EditStudentDialogProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

export function EditStudentDialog({ student, isOpen, onClose }: EditStudentDialogProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (student) {
      setEmail(student.user?.email || "")
      setPhone(student.phone || "")
    }
  }, [student])

  const updateStudent = useApiMutation(
    `/students/${student?.id}`,
    "PATCH",
    STUDENTS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return

    setErrorMsg("")
    updateStudent.mutate(
      { email, phone },
      {
        onSuccess: () => onClose(),
        onError: (err: any) => setErrorMsg(err.message || "Failed to update student details."),
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Student Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          <div>
            <p className="text-sm font-semibold text-foreground">
              {student?.firstName} {student?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">ID: {student?.id}</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={updateStudent.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateStudent.isPending}>
              {updateStudent.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { useState } from "react"
import { useApiMutation, useApiQuery } from "@/hooks/use-api"
import { TEACHING_ASSIGNMENTS_QUERY_KEY, TEACHING_ASSIGNMENTS_PATH, CLASSES_QUERY_KEY, CLASSES_PATH } from "@/lib/queries/classes"
import { SUBJECTS_QUERY_KEY, SUBJECTS_PATH } from "@/lib/queries/subjects"
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface AssignTeacherDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function AssignTeacherDialog({ isOpen, onClose }: AssignTeacherDialogProps) {
  const [teacherId, setTeacherId] = useState<string | null>(null)
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  // Fetch options dynamically for select dropdowns
  const { data: teachersRes } = useApiQuery<any>(["teachers"], "/teachers")
  const { data: subjectsRes } = useApiQuery<any>(SUBJECTS_QUERY_KEY, SUBJECTS_PATH)
  const { data: classesRes } = useApiQuery<any>(CLASSES_QUERY_KEY, CLASSES_PATH)

  const teachers = Array.isArray(teachersRes) ? teachersRes : teachersRes?.data || []
  const subjects = Array.isArray(subjectsRes) ? subjectsRes : subjectsRes?.data || []
  const classes = Array.isArray(classesRes) ? classesRes : classesRes?.data || []

  const createAssignment = useApiMutation(
    TEACHING_ASSIGNMENTS_PATH,
    "POST",
    TEACHING_ASSIGNMENTS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!teacherId || !subjectId || !classId) {
      setErrorMsg("Please select a teacher, subject, and class.")
      return
    }

    createAssignment.mutate(
      { teacherId, subjectId, classId },
      {
        onSuccess: () => {
          setTeacherId("")
          setSubjectId("")
          setClassId("")
          onClose()
        },
        onError: (err: any) => {
          setErrorMsg(err.message || "Failed to assign teacher.")
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Assign Teacher
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          {/* Teacher Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Teacher</Label>
            <Select value={teacherId} onValueChange={setTeacherId}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t: any) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.firstName} {t.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Subject</Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s: any) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Class</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={createAssignment.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createAssignment.isPending}>
              {createAssignment.isPending ? "Assigning..." : "Assign Teacher"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
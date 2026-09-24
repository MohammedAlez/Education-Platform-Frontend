"use client"

import { useState, useEffect } from "react"
import { useApiMutation, useApiQuery } from "@/hooks/use-api"
import { STUDENTS_QUERY_KEY } from "@/lib/queries/students"
import { Enrollment, Student } from "@/types/student"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, School, User, Save, Loader2 } from "lucide-react"

interface ClassItem {
  id: string
  name: string
  description?: string
}

interface EditStudentDialogProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

export function EditStudentDialog({ student, isOpen, onClose }: EditStudentDialogProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedClassId, setSelectedClassId] = useState<string | null>("")
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  // Fetch available school classes for enrollment
  const { data: classesData } = useApiQuery<{ data: ClassItem[] } | ClassItem[]>(
    ["classes"],
    "/classes"
  )

  const classList: ClassItem[] = Array.isArray(classesData)
    ? classesData
    : (classesData as any)?.data || []

  useEffect(() => {
    if (student) {
      setEmail(student.user?.email || "")
      setPhone(student.phone || "")
      setErrorMsg("")
      setIsAddingClass(false)
      setSelectedClassId("")
    }
  }, [student])

  // Mutations
  const updateStudent = useApiMutation(
    `/students/${student?.id}`,
    "PATCH",
    STUDENTS_QUERY_KEY
  )

  const createEnrollment = useApiMutation(
    "/enrollments",
    "POST",
    STUDENTS_QUERY_KEY
  )

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return
    setErrorMsg("")

    updateStudent.mutate(
      { email, phone },
      {
        onSuccess: () => onClose(),
        onError: (err: any) =>
          setErrorMsg(err.message || "Failed to update student details."),
      }
    )
  }

  const handleEnrollClass = () => {
    if (!student || !selectedClassId) return
    setErrorMsg("")

    createEnrollment.mutate(
      { studentId: student.id, classId: selectedClassId },
      {
        onSuccess: () => {
          setSelectedClassId("")
          setIsAddingClass(false)
        },
        onError: (err: any) =>
          setErrorMsg(err.message || "Failed to enroll student into class."),
      }
    )
  }

  // Filter out classes the student is already enrolled in
  const availableClasses = classList.filter(
    (cls) => !student?.enrollments?.some((e) => e.class?.id === cls.id)
  )
 
  console.log("student enrollments from edit dialog", student)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Manage Student Details
          </DialogTitle>
        </DialogHeader>

        {errorMsg && (
          <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
            {errorMsg}
          </p>
        )}

        <div className="space-y-6 pt-1">
          {/* Section 1: Basic Info Form */}
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="pb-1 border-b">
              <h3 className="text-sm font-bold text-foreground">
                {student?.firstName} {student?.lastName}
              </h3>
              <p className="text-[11px] text-muted-foreground">ID: {student?.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 text-xs bg-background"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-8 text-xs bg-background"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                size="sm"
                disabled={updateStudent.isPending}
                className="gap-1 h-8 text-xs"
              >
                {updateStudent.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5" />
                )}
                Save Info
              </Button>
            </div>
          </form>

          {/* Section 2: Enrollments & Classes */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <School className="h-3.5 w-3.5" /> Enrolled Classes
              </h4>
              {!isAddingClass && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingClass(true)}
                  className="h-7 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/5"
                >
                  <Plus className="h-3.5 w-3.5" /> Enroll into Class
                </Button>
              )}
            </div>

            {/* Inline Add Class Form */}
            {isAddingClass && (
              <div className="p-3 bg-muted/40 rounded-lg border space-y-2.5 animate-in fade-in-50 duration-150">
                <Label className="text-xs font-semibold">Select Class</Label>
                <div className="flex items-center gap-2">
                  <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                    <SelectTrigger className="h-8 text-xs bg-background">
                      <SelectValue placeholder="Choose a class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableClasses.length > 0 ? (
                        availableClasses.map((c) => (
                          <SelectItem key={c.id} value={c.id} className="text-xs">
                            {c.name} {c.description ? `(${c.description})` : ""}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-xs text-muted-foreground text-center">
                          No remaining classes available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleEnrollClass}
                    disabled={!selectedClassId || createEnrollment.isPending}
                    className="h-8 text-xs gap-1"
                  >
                    {createEnrollment.isPending ? "Adding..." : "Add"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAddingClass(false)
                      setSelectedClassId("")
                    }}
                    className="h-8 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* List of current enrollments */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {student?.enrollments && student.enrollments.length > 0 ? (
                student.enrollments.map((enr) => (
                  <EnrollmentRowItem key={enr.class.id} enrollment={enr} />
                ))
              ) : (
                <p className="text-xs text-center text-muted-foreground py-4 border border-dashed rounded-md">
                  No active class enrollments found.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Sub-component to toggle enrollment status
function EnrollmentRowItem({ enrollment }: { enrollment: Enrollment }) {
  const [status, setStatus] = useState(enrollment.status)

  const toggleStatus = useApiMutation(
    `/enrollments/${enrollment.id}`,
    "PATCH",
    STUDENTS_QUERY_KEY
  )

  const handleToggle = (checked: boolean) => {
    const nextStatus = checked ? "ACTIVE" : "INACTIVE"
    setStatus(nextStatus)

    toggleStatus.mutate(
      { status: nextStatus },
      {
        onError: () => setStatus(status), // Revert on failure
      }
    )
  }

  const isChecked = status === "ACTIVE"

  return (
    <div className="flex items-center justify-between p-2.5 rounded-md border bg-background text-xs">
      <div>
        <p className="font-semibold text-foreground">{enrollment.class?.name}</p>
        <p className="text-muted-foreground text-[11px]">
          {enrollment.class?.description || "No description"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          className={
            isChecked
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200"
              : "bg-rose-50 text-rose-700 hover:bg-rose-50 border-rose-200"
          }
        >
          {status}
        </Badge>
        <Switch
          checked={isChecked}
          onCheckedChange={handleToggle}
          disabled={toggleStatus.isPending}
        />
      </div>
    </div>
  )
}
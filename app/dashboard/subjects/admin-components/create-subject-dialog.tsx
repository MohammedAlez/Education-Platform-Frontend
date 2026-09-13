"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { SUBJECTS_QUERY_KEY, SUBJECTS_PATH } from "@/lib/queries/subjects"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface CreateSubjectDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateSubjectDialog({ isOpen, onClose }: CreateSubjectDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const createSubject = useApiMutation(
    SUBJECTS_PATH,
    "POST",
    SUBJECTS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    createSubject.mutate(
      { name, description },
      {
        onSuccess: () => {
          setName("")
          setDescription("")
          onClose()
        },
        onError: (err: any) => {
          setErrorMsg(err.message || "Failed to create subject.")
        },
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Add New Subject
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="subjectName" className="text-xs font-semibold">Subject Name</Label>
            <Input
              id="subjectName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mathematics, Physics, Computer Science"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subjectDescription" className="text-xs font-semibold">Description</Label>
            <Textarea
              id="subjectDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional summary of the subject curriculum..."
              rows={3}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={createSubject.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createSubject.isPending}>
              {createSubject.isPending ? "Adding..." : "Save Subject"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
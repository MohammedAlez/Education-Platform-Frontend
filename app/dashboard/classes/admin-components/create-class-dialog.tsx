"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { CLASSES_QUERY_KEY, CLASSES_PATH } from "@/lib/queries/classes"
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

interface CreateClassDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateClassDialog({ isOpen, onClose }: CreateClassDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const createClass = useApiMutation(
    CLASSES_PATH,
    "POST",
    CLASSES_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    createClass.mutate(
      { name, description },
      {
        onSuccess: () => {
          setName("")
          setDescription("")
          onClose()
        },
        onError: (err: any) => {
          setErrorMsg(err.message || "Failed to create class.")
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
            Create New Class
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="className" className="text-xs font-semibold">Class Name</Label>
            <Input
              id="className"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 6AS, Class A, 1AM"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="classDescription" className="text-xs font-semibold">Description</Label>
            <Textarea
              id="classDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description for this class..."
              rows={3}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={createClass.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createClass.isPending}>
              {createClass.isPending ? "Creating..." : "Save Class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
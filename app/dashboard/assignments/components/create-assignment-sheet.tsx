"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"

export function CreateAssignmentSheet() {
  return (
    <Sheet>
      <SheetTrigger >
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          Assign Teacher
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>New Teaching Assignment</SheetTitle>
          <SheetDescription>
            Connect a teacher to a specific subject and class allocation.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-6 pt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Select>
              <SelectTrigger id="teacher" className="bg-background">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ahmed">Ahmed Benali</SelectItem>
                <SelectItem value="sara">Sara Ali</SelectItem>
                <SelectItem value="karim">Karim Hassan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select>
              <SelectTrigger id="subject" className="bg-background">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select>
              <SelectTrigger id="class" className="bg-background">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class-a">Class A</SelectItem>
                <SelectItem value="class-b">Class B</SelectItem>
                <SelectItem value="class-c">Class C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Create Assignment
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
"use client"

import { Badge } from "@/components/ui/badge"
import { AttendanceStatus } from "@/types/attendance"
import { CheckCircle2, Clock, XCircle, ShieldAlert } from "lucide-react"

interface AttendanceStatusSelectorProps {
  status: AttendanceStatus
  onChange: (status: AttendanceStatus) => void
}

export function AttendanceStatusSelector({
  status,
  onChange,
}: AttendanceStatusSelectorProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {/* Active Status Badge */}
      {status === "PRESENT" && (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-medium">
          • Present
        </Badge>
      )}
      {status === "ABSENT" && (
        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none font-medium">
          • Absent
        </Badge>
      )}
      {status === "LATE" && (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-medium">
          • Late
        </Badge>
      )}
      {status === "EXCUSED" && (
        <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-none font-medium">
          • Excused
        </Badge>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border">
        <button
          type="button"
          onClick={() => onChange("PRESENT")}
          className={`p-1.5 rounded-full transition-colors ${
            status === "PRESENT"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-muted-foreground hover:text-emerald-600"
          }`}
          title="Mark Present"
        >
          <CheckCircle2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onChange("LATE")}
          className={`p-1.5 rounded-full transition-colors ${
            status === "LATE"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-muted-foreground hover:text-amber-500"
          }`}
          title="Mark Late"
        >
          <Clock className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onChange("ABSENT")}
          className={`p-1.5 rounded-full transition-colors ${
            status === "ABSENT"
              ? "bg-rose-600 text-white shadow-sm"
              : "text-muted-foreground hover:text-rose-600"
          }`}
          title="Mark Absent"
        >
          <XCircle className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onChange("EXCUSED")}
          className={`p-1.5 rounded-full transition-colors ${
            status === "EXCUSED"
              ? "bg-sky-600 text-white shadow-sm"
              : "text-muted-foreground hover:text-sky-600"
          }`}
          title="Mark Excused"
        >
          <ShieldAlert className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
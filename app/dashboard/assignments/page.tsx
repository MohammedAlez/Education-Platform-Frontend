import { fetchWithAuth } from "@/lib/api"
import { requireRole } from "@/lib/user"
import { TeachingAssignmentsGrid } from "./components/teaching-assignments-grid"
import { TeachingAssignment } from "@/types/class"

export default async function AdminTeachingAssignmentsPage() {
  await requireRole("ADMIN")

  let initialAssignments: TeachingAssignment[] = []

  try {
    const res = await fetchWithAuth("/teaching-assignments")
    if (res.ok) {
      const json = await res.json()
      initialAssignments = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed to fetch teaching assignments:", error)
  }

  return (
    <div className="p-2">
      <TeachingAssignmentsGrid initialAssignments={initialAssignments} />
    </div>
  )
}
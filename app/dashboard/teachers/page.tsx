import { fetchWithAuth } from "@/lib/api"
import { requireRole } from "@/lib/user"
import { TeachersTable } from "./components/teacher-table"
import { Teacher } from "@/types/teacher"

export default async function AdminTeachersPage() {
  await requireRole("ADMIN")

  let initialTeachers: Teacher[] = []
  try {
    const res = await fetchWithAuth("/teachers")
    if (res.ok) {
      const json = await res.json()
      initialTeachers = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed fetching initial teachers:", error)
  }

  return (
    <div className="p-2">
      <TeachersTable initialData={initialTeachers} />
    </div>
  )
}
import { CurrentUser, requireUser } from "@/lib/user"
import { fetchWithAuth } from "@/lib/api"
import { AccountProfileCard } from "./components/account-profile-card"
import { AccountInfoForm } from "./components/account-info-form"
import { AccountSecurityForm } from "./components/account-security-form"


export default async function AccountPage() {
  await requireUser()

  const res = await fetchWithAuth("/auth/me")
  const userData: {data:CurrentUser} = res.ok ? await res.json() : null
  const user = userData?.data

  const firstName = user?.profile?.firstName || ""
  const lastName = user?.profile?.lastName || ""
  const fullName = `${firstName} ${lastName}`.trim() || user?.email || "User"
  
  const identifierLabel = user?.role === "TEACHER" ? "Teacher ID" : "Student ID"
  const identifierValue = user?.profile?.id || user?.id || "N/A"

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal details and account settings.
        </p>
      </div>

      <AccountProfileCard
        name={fullName}
        email={user?.email || ""}
        role={user?.role as "TEACHER" | "STUDENT"}
        identifierLabel={identifierLabel}
        identifierValue={identifierValue}
      />

      <AccountInfoForm
        initialFirstName={firstName}
        initialLastName={lastName}
        initialEmail={user?.email || ""}
        initialPhone={user?.profile?.phone || ""}
      />

      <AccountSecurityForm />
    </div>
  )
}
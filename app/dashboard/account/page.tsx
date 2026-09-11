import { AccountProfileCard } from "./components/account-profile-card"
import { AccountInfoForm } from "./components/account-info-form"
import { AccountSecurityForm } from "./components/account-security-form"

export default function AccountPage() {
  // Demo mock user payload (Teacher view context)
  const currentUser = {
    name: "Ahmed Ali",
    firstName: "Ahmed",
    lastName: "Ali",
    email: "ahmed.ali@elamel-academy.dz",
    phone: "+213 6 00 00 00 00",
    role: "TEACHER" as const,
    identifierLabel: "Teacher ID",
    identifierValue: "TCH-2026-04",
  }

  return (
    <div className="space-y-6 p-2 ">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal details and account settings.
        </p>
      </div>

      <AccountProfileCard
        name={currentUser.name}
        email={currentUser.email}
        role={currentUser.role}
        identifierLabel={currentUser.identifierLabel}
        identifierValue={currentUser.identifierValue}
      />

      <AccountInfoForm
        initialFirstName={currentUser.firstName}
        initialLastName={currentUser.lastName}
        initialEmail={currentUser.email}
        initialPhone={currentUser.phone}
      />

      <AccountSecurityForm />
    </div>
  )
}
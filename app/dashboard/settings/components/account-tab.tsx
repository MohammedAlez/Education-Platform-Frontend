"use client"

// import { AccountInfoForm } from "@/app/dashboard/account/components/account-info-form"
import { AccountSecurityForm } from "@/app/dashboard/account/components/account-security-form"
import { CurrentUser } from "@/lib/user"
import { AccountInfoForm } from "@/my-components/account-info-form"

interface AccountTabProps {
  user: CurrentUser
}

export function AccountTab({ user }: AccountTabProps) {

  const role = user?.role
  const profileId = user?.profile.id

  return (
    <div className="space-y-6">
      <AccountInfoForm
        role={role}
        profileId={profileId}
        initialFirstName={user?.profile?.firstName || ""}
        initialLastName={user?.profile?.lastName || ""}
        initialEmail={user?.email || ""}
        initialPhone={user?.profile?.phone || ""}
      />

      <AccountSecurityForm />
    </div>
  )
}
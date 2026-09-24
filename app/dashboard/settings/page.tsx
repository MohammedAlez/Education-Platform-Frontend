import { CurrentUser, requireUser } from "@/lib/user"
import { fetchWithAuth } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchoolProfileTab } from "./components/school-profile-tab"
import { AccountTab } from "./components/account-tab"


export default async function SettingsPage() {
  await requireUser()

  const res = await fetchWithAuth("/auth/me")
  const payload = res.ok ? await res.json() : null
  const user: CurrentUser | null = payload?.data || null

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage school profile information and administrator account settings.
        </p>
      </div>

      <Tabs defaultValue="school-profile" className="space-y-6 ">
        <TabsList className="inline-flex h-11 items-center justify-start rounded-lg bg-muted/70 p-2 py-5 text-muted-foreground gap-1 border border-border/40">
          <TabsTrigger
            value="school-profile"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border/80"
          >
            School Profile
          </TabsTrigger>

          <TabsTrigger
            value="account"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs data-[state=active]:border data-[state=active]:border-border/80"
          >
            My Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="school-profile" className="space-y-6">
          <SchoolProfileTab school={user?.school} />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          {user && <AccountTab user={user} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
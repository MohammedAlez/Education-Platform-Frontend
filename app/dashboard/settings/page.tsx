import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchoolProfileTab } from "./components/school-profile-tab"
import { AccountTab } from "./components/account-tab"

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage school information and administrator account preferences.
        </p>
      </div>

      <Tabs defaultValue="school-profile" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="school-profile">School Profile</TabsTrigger>
          <TabsTrigger value="account">My Account</TabsTrigger>
        </TabsList>

        <TabsContent value="school-profile">
          <SchoolProfileTab />
        </TabsContent>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
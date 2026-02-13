import PageHeader from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-content";
export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="ml-64 p-6 space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account and preferences"
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences" data-testid="tab-preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} data-testid="input-name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} data-testid="input-email" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user?.role === "NBFC_ADMIN" ? "NBFC Administrator" : "Bank Administrator"} disabled />
                </div>
                <Button data-testid="button-save-profile">Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-muted-foreground">Show more data in less space</p>
                  </div>
                  <Switch id="compact-view" data-testid="switch-compact-view" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                  </div>
                  <Switch id="auto-refresh" data-testid="switch-auto-refresh" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked data-testid="switch-email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about payment status</p>
                  </div>
                  <Switch id="payment-alerts" defaultChecked data-testid="switch-payment-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications for portfolio changes</p>
                  </div>
                  <Switch id="portfolio-updates" defaultChecked data-testid="switch-portfolio-updates" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

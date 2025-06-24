import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {useState} from "react";
import { toast } from "sonner";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Save, Shield} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.js";

export default function Settings() {
  const toast = console.log;
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem("settings")) || {});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAccount = () => {
    if (settings.newPassword && settings.newPassword !== settings.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New Password do not match",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem("settings", JSON.stringify(settings));
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been successfully updated."
    });
  }

  const handleSavePreferences = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been successfully updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 container flex flex-col items-start gap-1">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">Settings</h1>
        <p className="text-base text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your email and password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={settings.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveAccount} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSavePreferences} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
              />
              {settings.twoFactorAuth && (
                <Button size="sm" variant="outline">
                  <Shield className="h-4 w-4 mr-1" />
                  Configure
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
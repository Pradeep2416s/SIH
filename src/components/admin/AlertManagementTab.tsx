import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Bell, Mail, MessageSquare, Zap, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AlertManagementTab = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Alert thresholds and notification preferences have been updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Alert Thresholds */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-warning" />
          <div>
            <h3 className="text-xl font-bold">Alert Thresholds</h3>
            <p className="text-sm text-muted-foreground">Configure trigger conditions for system alerts</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Voltage Deviation Threshold (%)</Label>
              <span className="text-sm font-medium">±15%</span>
            </div>
            <Slider defaultValue={[15]} max={30} step={1} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              Alert when voltage deviates more than this percentage from normal
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Critical Response Time (hours)</Label>
              <span className="text-sm font-medium">2.0h</span>
            </div>
            <Slider defaultValue={[2]} max={6} step={0.5} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              Maximum acceptable response time for critical alerts
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Fault Prediction Confidence (%)</Label>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Slider defaultValue={[85]} max={100} step={5} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">
              Minimum confidence level required to trigger predictive alerts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="maxAlerts">Max Concurrent Alerts</Label>
              <Input id="maxAlerts" type="number" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alertExpiry">Alert Auto-Close (hours)</Label>
              <Input id="alertExpiry" type="number" defaultValue="24" />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">Choose how you want to receive alerts</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">In-App Notifications</p>
                <p className="text-sm text-muted-foreground">Real-time alerts within the dashboard</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Critical alerts sent via SMS</p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="pt-4">
            <Label htmlFor="notificationEmail" className="mb-2 block">Notification Email</Label>
            <Input id="notificationEmail" type="email" placeholder="admin@kseb.in" defaultValue="admin@kseb.in" />
          </div>
        </div>
      </Card>

      {/* Alert Categories */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Alert Categories</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-destructive" />
                <span className="font-medium">Critical Faults</span>
              </div>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">Immediate danger situations requiring urgent response</p>
          </div>

          <div className="p-4 rounded-lg border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="font-medium">High Risk Events</span>
              </div>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">Significant issues that may escalate if not addressed</p>
          </div>

          <div className="p-4 rounded-lg border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-info" />
                <span className="font-medium">Maintenance Alerts</span>
              </div>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">Scheduled maintenance and routine inspections</p>
          </div>

          <div className="p-4 rounded-lg border bg-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <span className="font-medium">System Notifications</span>
              </div>
              <Switch />
            </div>
            <p className="text-sm text-muted-foreground">General system updates and information</p>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

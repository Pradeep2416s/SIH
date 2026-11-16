import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export const ReportIssueTab = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issueType: "",
    location: "",
    description: "",
    urgency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a mock complaint ID
    const complaintId = `FMS-${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Complaint Submitted Successfully",
      description: `Your complaint ID is ${complaintId}. We'll contact you shortly.`,
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      issueType: "",
      location: "",
      description: "",
      urgency: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Report Electrical Issue</h2>
          <p className="text-muted-foreground">Fill in the details below to submit your complaint</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type *</Label>
              <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power-outage">Power Outage</SelectItem>
                  <SelectItem value="voltage-fluctuation">Voltage Fluctuation</SelectItem>
                  <SelectItem value="damaged-equipment">Damaged Equipment</SelectItem>
                  <SelectItem value="fallen-wire">Fallen Wire</SelectItem>
                  <SelectItem value="meter-issue">Meter Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical - Immediate danger</SelectItem>
                  <SelectItem value="high">High - Major disruption</SelectItem>
                  <SelectItem value="medium">Medium - Significant issue</SelectItem>
                  <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location/Address *</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter detailed location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Issue Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              rows={6}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Submit Complaint
          </Button>
        </form>
      </Card>
    </div>
  );
};

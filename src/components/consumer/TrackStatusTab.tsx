import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { RiskIndicator } from "@/components/RiskIndicator";

const mockComplaints = [
  {
    id: "FMS-234567",
    date: "2024-01-15",
    issueType: "Power Outage",
    location: "Trivandrum, Pattom",
    status: "resolved" as const,
    risk: "medium" as const
  },
  {
    id: "FMS-234568",
    date: "2024-01-18",
    issueType: "Voltage Fluctuation",
    location: "Kochi, Edappally",
    status: "in-progress" as const,
    risk: "high" as const
  },
  {
    id: "FMS-234569",
    date: "2024-01-20",
    issueType: "Damaged Equipment",
    location: "Kozhikode, Calicut",
    status: "pending" as const,
    risk: "low" as const
  }
];

export const TrackStatusTab = () => {
  const [searchId, setSearchId] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Track Complaint Status</h2>
          <p className="text-muted-foreground">Enter your complaint ID to check the current status</p>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <Label htmlFor="searchId">Complaint ID</Label>
            <Input
              id="searchId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter complaint ID (e.g., FMS-234567)"
            />
          </div>
          <div className="flex items-end">
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
        <div className="space-y-4">
          {mockComplaints.map((complaint) => (
            <Card key={complaint.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg">{complaint.id}</h4>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">Submitted on {complaint.date}</p>
                </div>
                <RiskIndicator risk={complaint.risk} />
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Issue Type</p>
                  <p className="font-medium">{complaint.issueType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{complaint.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last updated: 2 hours ago</span>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

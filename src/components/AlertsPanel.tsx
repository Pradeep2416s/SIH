import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";

const alerts = [
  {
    id: 1,
    district: "Ernakulam",
    type: "Voltage Fluctuation",
    time: "5 min ago",
    status: "active" as const,
    risk: "high" as const
  },
  {
    id: 2,
    district: "Kozhikode",
    type: "Power Outage",
    time: "12 min ago",
    status: "active" as const,
    risk: "critical" as const
  },
  {
    id: 3,
    district: "Idukki",
    type: "Equipment Fault",
    time: "23 min ago",
    status: "dispatched" as const,
    risk: "high" as const
  },
  {
    id: 4,
    district: "Thiruvananthapuram",
    type: "Line Damage",
    time: "45 min ago",
    status: "dispatched" as const,
    risk: "medium" as const
  },
  {
    id: 5,
    district: "Thrissur",
    type: "Voltage Fluctuation",
    time: "1 hour ago",
    status: "active" as const,
    risk: "medium" as const
  }
];

export const AlertsPanel = () => {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="font-semibold text-sm">{alert.type}</span>
              </div>
              <RiskIndicator risk={alert.risk} showIcon={false} />
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{alert.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>{alert.time}</span>
              </div>
            </div>

            <div className="mt-3">
              <Badge
                variant="outline"
                className={
                  alert.status === "active"
                    ? "bg-warning/10 text-warning border-warning/20"
                    : "bg-info/10 text-info border-info/20"
                }
              >
                {alert.status === "active" ? "Active" : "Team Dispatched"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

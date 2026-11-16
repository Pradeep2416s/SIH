import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Risk = "critical" | "high" | "medium" | "low";

interface RiskIndicatorProps {
  risk: Risk;
  showIcon?: boolean;
  className?: string;
}

export const RiskIndicator = ({ risk, showIcon = true, className }: RiskIndicatorProps) => {
  const config = {
    critical: {
      label: "Critical",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
    },
    high: {
      label: "High Risk",
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
    },
    medium: {
      label: "Medium Risk",
      className: "bg-info/10 text-info border-info/20 hover:bg-info/20"
    },
    low: {
      label: "Low Risk",
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20"
    }
  };

  const { label, className: badgeClass } = config[risk];

  return (
    <Badge variant="outline" className={cn(badgeClass, className)}>
      {showIcon && <AlertTriangle className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  );
};

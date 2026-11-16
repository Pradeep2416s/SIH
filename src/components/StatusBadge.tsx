import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "resolved" | "in-progress" | "pending";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = {
    resolved: {
      label: "Resolved",
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20"
    },
    "in-progress": {
      label: "In Progress",
      className: "bg-info/10 text-info border-info/20 hover:bg-info/20"
    },
    pending: {
      label: "Pending",
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
    }
  };

  const { label, className: badgeClass } = config[status];

  return (
    <Badge variant="outline" className={cn(badgeClass, className)}>
      {label}
    </Badge>
  );
};

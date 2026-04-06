import { Badge } from "@/components/ui/badge";

interface UrgencyBadgeProps {
  urgency: "Critical" | "High" | "Medium";
}

const styles = {
  Critical: "bg-critical/15 text-critical border-critical/30",
  High: "bg-warning/15 text-warning border-warning/30",
  Medium: "bg-safe/15 text-safe border-safe/30",
};

export function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  return (
    <Badge variant="outline" className={`text-xs font-semibold ${styles[urgency]}`}>
      {urgency}
    </Badge>
  );
}

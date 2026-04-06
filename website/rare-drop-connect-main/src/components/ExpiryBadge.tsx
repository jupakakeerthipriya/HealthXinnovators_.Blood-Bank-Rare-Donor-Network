import { Badge } from "@/components/ui/badge";
import { getExpiryStatus, getDaysUntilExpiry } from "@/data/mockData";

interface ExpiryBadgeProps {
  expiryDate: string;
}

export function ExpiryBadge({ expiryDate }: ExpiryBadgeProps) {
  const status = getExpiryStatus(expiryDate);
  const days = getDaysUntilExpiry(expiryDate);

  const styles = {
    safe: "bg-safe/15 text-safe border-safe/30 hover:bg-safe/20",
    warning: "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20",
    critical: "bg-critical/15 text-critical border-critical/30 hover:bg-critical/20",
  };

  return (
    <Badge variant="outline" className={`text-xs font-medium ${styles[status]}`}>
      {days <= 0 ? "Expired" : `${days}d left`}
    </Badge>
  );
}

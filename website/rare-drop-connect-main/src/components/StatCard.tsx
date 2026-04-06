import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "safe" | "warning" | "critical";
}

const variantStyles = {
  default: "bg-card",
  safe: "bg-safe/10 border-safe/20",
  warning: "bg-warning/10 border-warning/20",
  critical: "bg-critical/10 border-critical/20",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  safe: "bg-safe/20 text-safe",
  warning: "bg-warning/20 text-warning",
  critical: "bg-critical/20 text-critical",
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <Card className={`shadow-card ${variantStyles[variant]}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[variant]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

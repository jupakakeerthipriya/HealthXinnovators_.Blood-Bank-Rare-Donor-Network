import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { urgentRequests, getHospitalName, hospitals } from "@/data/mockData";
import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UrgentRequests() {
  const active = urgentRequests.filter((r) => r.status === "active");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Urgent Blood Requests</h2>
        <p className="text-sm text-muted-foreground">Broadcast requests for rare blood types</p>
      </div>

      <div className="space-y-4">
        {active.map((req) => {
          const hosp = hospitals.find((h) => h.id === req.hospitalId);
          return (
            <Card key={req.id} className={`shadow-card border-l-4 ${
              req.urgency === "Critical" ? "border-l-critical" :
              req.urgency === "High" ? "border-l-warning" : "border-l-safe"
            }`}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary">
                      <span className="text-sm font-bold text-primary-foreground">{req.bloodGroup}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{req.unitsNeeded} units of {req.bloodGroup} needed</p>
                      <p className="text-sm text-muted-foreground">{getHospitalName(req.hospitalId)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />{hosp?.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />{new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UrgencyBadge urgency={req.urgency} />
                    <Button size="sm" className="gradient-primary text-primary-foreground">
                      Respond
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

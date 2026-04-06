import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bloodInventory, getHospitalName } from "@/data/mockData";
import { Thermometer, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SAFE_MIN = 2;
const SAFE_MAX = 6;

export default function ColdChain() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Cold-Chain Monitoring</h2>
        <p className="text-sm text-muted-foreground">Temperature tracking for stored blood units</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bloodInventory.map((unit) => {
          const safe = unit.temperature >= SAFE_MIN && unit.temperature <= SAFE_MAX;
          return (
            <Card key={unit.id} className={`shadow-card border-l-4 ${safe ? "border-l-safe" : "border-l-critical"}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{unit.id}</p>
                    <p className="font-semibold text-foreground mt-1">{unit.bloodGroup}</p>
                    <p className="text-xs text-muted-foreground">{getHospitalName(unit.hospitalId)}</p>
                  </div>
                  <div className={`flex items-center gap-1 rounded-lg px-3 py-2 text-lg font-bold ${
                    safe ? "bg-safe/10 text-safe" : "bg-critical/10 text-critical"
                  }`}>
                    <Thermometer className="h-4 w-4" />
                    {unit.temperature}°C
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs">
                  {safe ? (
                    <><CheckCircle className="h-3 w-3 text-safe" /><span className="text-safe">Within safe range ({SAFE_MIN}–{SAFE_MAX}°C)</span></>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 text-critical" /><span className="text-critical">Temperature alert!</span></>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

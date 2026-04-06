import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExpiryBadge } from "@/components/ExpiryBadge";
import { bloodInventory, bloodGroups, hospitals, getHospitalName, getExpiryStatus } from "@/data/mockData";
import { Search, MapPin } from "lucide-react";

export default function BloodSearch() {
  const [group, setGroup] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [expiry, setExpiry] = useState<string>("all");

  const filtered = bloodInventory.filter((u) => {
    if (group !== "all" && u.bloodGroup !== group) return false;
    const hosp = hospitals.find((h) => h.id === u.hospitalId);
    if (location !== "all" && hosp?.location !== location) return false;
    if (expiry !== "all" && getExpiryStatus(u.expiryDate) !== expiry) return false;
    return u.status === "available";
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Network Blood Search</h2>
        <p className="text-sm text-muted-foreground">Find available blood across Warangal & Hanamkonda</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Blood Group" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {bloodGroups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Location" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Warangal">Warangal</SelectItem>
            <SelectItem value="Hanamkonda">Hanamkonda</SelectItem>
          </SelectContent>
        </Select>
        <Select value={expiry} onValueChange={setExpiry}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Expiry Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Expiry</SelectItem>
            <SelectItem value="safe">Safe (14+ days)</SelectItem>
            <SelectItem value="warning">Warning (7-14 days)</SelectItem>
            <SelectItem value="critical">Critical (&lt;7 days)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">No results found. Try adjusting filters.</p>
        )}
        {filtered.map((unit) => {
          const hosp = hospitals.find((h) => h.id === unit.hospitalId);
          return (
            <Card key={unit.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="gradient-primary text-primary-foreground text-sm font-bold px-3 py-1">
                    {unit.bloodGroup}
                  </Badge>
                  <ExpiryBadge expiryDate={unit.expiryDate} />
                </div>
                <p className="font-semibold text-foreground">{getHospitalName(unit.hospitalId)}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {hosp?.location}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{unit.quantity}</span>
                  <span className="text-xs text-muted-foreground">units available</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

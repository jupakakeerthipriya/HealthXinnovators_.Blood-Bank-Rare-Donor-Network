import { Droplets, Users, AlertTriangle, TrendingUp, Clock, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { ExpiryBadge } from "@/components/ExpiryBadge";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { bloodInventory, donors, urgentRequests, getHospitalName, bloodGroups } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const totalUnits = bloodInventory.reduce((sum, u) => sum + u.quantity, 0);
const expiringUnits = bloodInventory.filter(
  (u) => {
    const days = Math.ceil((new Date(u.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days <= 7;
  }
).length;

const groupData = bloodGroups.map((g) => ({
  group: g,
  units: bloodInventory.filter((u) => u.bloodGroup === g).reduce((s, u) => s + u.quantity, 0),
}));

const PIE_COLORS = [
  "hsl(0, 72%, 51%)",
  "hsl(25, 90%, 50%)",
  "hsl(38, 92%, 50%)",
  "hsl(142, 71%, 45%)",
  "hsl(200, 70%, 50%)",
  "hsl(260, 60%, 55%)",
  "hsl(320, 60%, 50%)",
  "hsl(0, 0%, 60%)",
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Warangal & Hanamkonda Blood Network Overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Units" value={totalUnits} subtitle="Across all facilities" icon={Droplets} />
        <StatCard title="Active Donors" value={donors.length} subtitle="Registered in network" icon={Users} />
        <StatCard title="Urgent Requests" value={urgentRequests.filter((r) => r.status === "active").length} subtitle="Pending fulfillment" icon={AlertTriangle} variant="critical" />
        <StatCard title="Expiring Soon" value={expiringUnits} subtitle="Within 7 days" icon={Clock} variant="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Blood Group Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={groupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis dataKey="group" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="units" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Distribution by Group</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={groupData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="units" nameKey="group" label={({ group }) => group}>
                  {groupData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-critical" />
              Urgent Blood Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentRequests.filter((r) => r.status === "active").map((req) => (
                <div key={req.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{req.bloodGroup} — {req.unitsNeeded} units</p>
                    <p className="text-xs text-muted-foreground">{getHospitalName(req.hospitalId)}</p>
                  </div>
                  <UrgencyBadge urgency={req.urgency} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bloodInventory
                .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                .slice(0, 5)
                .map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{unit.bloodGroup} — {unit.quantity} units</p>
                      <p className="text-xs text-muted-foreground">{getHospitalName(unit.hospitalId)}</p>
                    </div>
                    <ExpiryBadge expiryDate={unit.expiryDate} />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

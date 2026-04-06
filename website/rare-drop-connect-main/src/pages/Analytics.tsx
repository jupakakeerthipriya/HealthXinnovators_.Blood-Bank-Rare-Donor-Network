import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bloodInventory, bloodGroups } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jan", demand: 120, supply: 100 },
  { month: "Feb", demand: 110, supply: 115 },
  { month: "Mar", demand: 140, supply: 105 },
  { month: "Apr", demand: 130, supply: 125 },
  { month: "May", demand: 150, supply: 110 },
  { month: "Jun", demand: 160, supply: 130 },
];

const groupData = bloodGroups.map((g) => ({
  group: g,
  units: bloodInventory.filter((u) => u.bloodGroup === g).reduce((s, u) => s + u.quantity, 0),
}));

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <p className="text-sm text-muted-foreground">Blood shortage trends, demand vs supply</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Demand vs Supply (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="supply" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} stroke="hsl(142, 71%, 45%)" />
                <Area type="monotone" dataKey="demand" fill="hsl(0, 72%, 51%)" fillOpacity={0.2} stroke="hsl(0, 72%, 51%)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Current Stock by Group</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
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
      </div>
    </div>
  );
}

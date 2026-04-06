import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExpiryBadge } from "@/components/ExpiryBadge";
import { Badge } from "@/components/ui/badge";
import { bloodInventory, bloodGroups, getHospitalName } from "@/data/mockData";
import { Droplets, Thermometer } from "lucide-react";

export default function Inventory() {
  const [filterGroup, setFilterGroup] = useState<string>("all");

  const filtered = filterGroup === "all"
    ? bloodInventory
    : bloodInventory.filter((u) => u.bloodGroup === filterGroup);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Blood Inventory</h2>
        <p className="text-sm text-muted-foreground">Track all blood units across facilities</p>
      </div>

      <div className="flex gap-3">
        <Select value={filterGroup} onValueChange={setFilterGroup}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {bloodGroups.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            Inventory ({filtered.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Temp</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-mono text-xs">{unit.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold">{unit.bloodGroup}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{unit.quantity}</TableCell>
                  <TableCell className="text-sm">{getHospitalName(unit.hospitalId)}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Thermometer className="h-3 w-3 text-muted-foreground" />
                      {unit.temperature}°C
                    </span>
                  </TableCell>
                  <TableCell><ExpiryBadge expiryDate={unit.expiryDate} /></TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs capitalize">{unit.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

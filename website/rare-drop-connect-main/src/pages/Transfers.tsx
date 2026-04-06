import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const transfers = [
  { id: "T001", from: "MGM Hospital", to: "Red Cross Blood Bank", bloodGroup: "O-", units: 3, date: "2026-04-05", status: "completed" },
  { id: "T002", from: "Lions Blood Bank", to: "Sudha Hospital", bloodGroup: "AB-", units: 2, date: "2026-04-06", status: "in_transit" },
  { id: "T003", from: "Government Blood Bank", to: "Sri Lakshmi Hospital", bloodGroup: "B+", units: 5, date: "2026-04-04", status: "completed" },
];

export default function Transfers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Hospital-to-Hospital Transfers</h2>
        <p className="text-sm text-muted-foreground">Audit trail of all blood unit transfers</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-sm">
                      {t.from} <ArrowRight className="h-3 w-3 text-muted-foreground" /> {t.to}
                    </span>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{t.bloodGroup}</Badge></TableCell>
                  <TableCell className="font-medium">{t.units}</TableCell>
                  <TableCell className="text-sm">{t.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs capitalize ${
                      t.status === "completed" ? "bg-safe/15 text-safe border-safe/30" : "bg-warning/15 text-warning border-warning/30"
                    }`}>
                      {t.status.replace("_", " ")}
                    </Badge>
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

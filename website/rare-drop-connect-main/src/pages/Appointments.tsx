import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hospitals } from "@/data/mockData";
import { Calendar, Clock, MapPin } from "lucide-react";

const slots = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: false },
];

export default function Appointments() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Appointment Scheduling</h2>
        <p className="text-sm text-muted-foreground">Book your donation slot at a nearby facility</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((h) => (
          <Card key={h.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <p className="font-semibold text-foreground">{h.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />{h.location}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs capitalize">{h.type.replace("_", " ")}</Badge>
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Available Slots Today</p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <Button
                      key={s.time}
                      variant={s.available ? "outline" : "ghost"}
                      size="sm"
                      disabled={!s.available}
                      className="text-xs"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {s.time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

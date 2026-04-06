import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { donors } from "@/data/mockData";
import { Trophy, Award, Heart } from "lucide-react";

const sorted = [...donors].sort((a, b) => b.points - a.points);

const rankColors = [
  "gradient-primary text-primary-foreground",
  "bg-warning/20 text-warning",
  "bg-muted text-muted-foreground",
];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Donor Leaderboard</h2>
        <p className="text-sm text-muted-foreground">Top donors ranked by points & contributions</p>
      </div>

      <div className="space-y-3">
        {sorted.map((donor, i) => (
          <Card key={donor.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
                i < 3 ? rankColors[i] : "bg-secondary text-secondary-foreground"
              }`}>
                {i === 0 ? <Trophy className="h-5 w-5" /> : `#${i + 1}`}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {donor.showName ? donor.name : "Anonymous Donor"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{donor.bloodGroup}</Badge>
                  <span className="text-xs text-muted-foreground">{donor.totalDonations} donations</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{donor.points}</p>
                <p className="text-[10px] text-muted-foreground">points</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {donor.badges.map((b) => (
                  <Badge key={b} variant="outline" className="text-[10px] gap-1">
                    <Award className="h-3 w-3" />{b}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { donors as initialDonors, bloodGroups, type Donor } from "@/data/mockData";
import { Users, Shield, Award, MapPin, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function DonorRegistry() {
  const [donorList, setDonorList] = useState<Donor[]>(initialDonors);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [showName, setShowName] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bloodGroup || !location) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newDonor: Donor = {
      id: `d${Date.now()}`,
      name,
      bloodGroup: bloodGroup as Donor["bloodGroup"],
      location: location as Donor["location"],
      lastDonation: null,
      totalDonations: 0,
      points: 0,
      badges: [],
      eligible: true,
      showName,
    };
    setDonorList((prev) => [newDonor, ...prev]);
    setName("");
    setBloodGroup("");
    setLocation("");
    setShowName(true);
    setOpen(false);
    toast.success("Donor registered successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Donor Registry</h2>
          <p className="text-sm text-muted-foreground">Privacy-focused donor network</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2">
              <UserPlus className="h-4 w-4" />
              Register Donor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Donor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="donor-name">Full Name</Label>
                <Input id="donor-name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select value={bloodGroup} onValueChange={setBloodGroup}>
                  <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Warangal">Warangal</SelectItem>
                    <SelectItem value="Hanamkonda">Hanamkonda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Show name publicly</p>
                  <p className="text-xs text-muted-foreground">Your name will be visible to others</p>
                </div>
                <Switch checked={showName} onCheckedChange={setShowName} />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                Register
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {donorList.map((donor) => (
          <Card key={donor.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {donor.bloodGroup}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {donor.showName ? donor.name : "Anonymous Donor"}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {donor.location}
                    </p>
                  </div>
                </div>
                {donor.eligible ? (
                  <Badge className="bg-safe/15 text-safe border-safe/30 text-xs">Eligible</Badge>
                ) : (
                  <Badge className="bg-warning/15 text-warning border-warning/30 text-xs">Cooldown</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="rounded-lg bg-secondary p-2">
                  <p className="text-lg font-bold text-foreground">{donor.totalDonations}</p>
                  <p className="text-[10px] text-muted-foreground">Donations</p>
                </div>
                <div className="rounded-lg bg-secondary p-2">
                  <p className="text-lg font-bold text-foreground">{donor.points}</p>
                  <p className="text-[10px] text-muted-foreground">Points</p>
                </div>
              </div>

              {donor.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {donor.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-[10px] gap-1">
                      <Award className="h-3 w-3" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" />
                Contact via system notification only
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

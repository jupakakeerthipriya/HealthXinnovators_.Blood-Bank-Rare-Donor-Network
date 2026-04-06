export const hospitals = [
  { id: "h1", name: "MGM Hospital", location: "Warangal", type: "hospital" as const },
  { id: "h2", name: "Kakatiya Medical College Hospital", location: "Warangal", type: "hospital" as const },
  { id: "h3", name: "Prathima Institute of Medical Sciences", location: "Warangal", type: "hospital" as const },
  { id: "h4", name: "Sri Lakshmi Hospital", location: "Hanamkonda", type: "hospital" as const },
  { id: "h5", name: "Sudha Hospital", location: "Hanamkonda", type: "hospital" as const },
  { id: "bb1", name: "Red Cross Blood Bank", location: "Warangal", type: "blood_bank" as const },
  { id: "bb2", name: "Lions Blood Bank", location: "Hanamkonda", type: "blood_bank" as const },
  { id: "bb3", name: "Government Blood Bank", location: "Warangal", type: "blood_bank" as const },
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = typeof bloodGroups[number];

export interface BloodUnit {
  id: string;
  bloodGroup: BloodGroup;
  quantity: number;
  hospitalId: string;
  collectedDate: string;
  expiryDate: string;
  temperature: number;
  qrCode: string;
  status: "available" | "reserved" | "expired" | "transferred";
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  location: "Warangal" | "Hanamkonda";
  lastDonation: string | null;
  totalDonations: number;
  points: number;
  badges: string[];
  eligible: boolean;
  showName: boolean;
}

export interface UrgentRequest {
  id: string;
  bloodGroup: BloodGroup;
  hospitalId: string;
  urgency: "Critical" | "High" | "Medium";
  unitsNeeded: number;
  createdAt: string;
  status: "active" | "fulfilled" | "expired";
}

const today = new Date();
const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r.toISOString().split("T")[0];
};

export const bloodInventory: BloodUnit[] = [
  { id: "BU001", bloodGroup: "O+", quantity: 12, hospitalId: "h1", collectedDate: addDays(today, -30), expiryDate: addDays(today, 12), temperature: 4.2, qrCode: "QR-BU001", status: "available" },
  { id: "BU002", bloodGroup: "O-", quantity: 3, hospitalId: "h2", collectedDate: addDays(today, -35), expiryDate: addDays(today, 7), temperature: 4.0, qrCode: "QR-BU002", status: "available" },
  { id: "BU003", bloodGroup: "A+", quantity: 8, hospitalId: "bb1", collectedDate: addDays(today, -20), expiryDate: addDays(today, 22), temperature: 3.8, qrCode: "QR-BU003", status: "available" },
  { id: "BU004", bloodGroup: "A-", quantity: 2, hospitalId: "h3", collectedDate: addDays(today, -38), expiryDate: addDays(today, 4), temperature: 4.5, qrCode: "QR-BU004", status: "available" },
  { id: "BU005", bloodGroup: "B+", quantity: 15, hospitalId: "h4", collectedDate: addDays(today, -15), expiryDate: addDays(today, 27), temperature: 4.1, qrCode: "QR-BU005", status: "available" },
  { id: "BU006", bloodGroup: "B-", quantity: 1, hospitalId: "bb2", collectedDate: addDays(today, -40), expiryDate: addDays(today, 2), temperature: 4.3, qrCode: "QR-BU006", status: "available" },
  { id: "BU007", bloodGroup: "AB+", quantity: 6, hospitalId: "h5", collectedDate: addDays(today, -25), expiryDate: addDays(today, 17), temperature: 3.9, qrCode: "QR-BU007", status: "available" },
  { id: "BU008", bloodGroup: "AB-", quantity: 1, hospitalId: "bb3", collectedDate: addDays(today, -39), expiryDate: addDays(today, 3), temperature: 4.4, qrCode: "QR-BU008", status: "available" },
  { id: "BU009", bloodGroup: "O+", quantity: 20, hospitalId: "h4", collectedDate: addDays(today, -10), expiryDate: addDays(today, 32), temperature: 4.0, qrCode: "QR-BU009", status: "available" },
  { id: "BU010", bloodGroup: "A+", quantity: 5, hospitalId: "bb2", collectedDate: addDays(today, -28), expiryDate: addDays(today, 14), temperature: 4.2, qrCode: "QR-BU010", status: "available" },
];

export const donors: Donor[] = [
  { id: "d1", name: "Ravi Kumar", bloodGroup: "O-", location: "Warangal", lastDonation: addDays(today, -100), totalDonations: 12, points: 1200, badges: ["Life Saver", "Rare Hero"], eligible: true, showName: true },
  { id: "d2", name: "Priya Reddy", bloodGroup: "AB-", location: "Hanamkonda", lastDonation: addDays(today, -45), totalDonations: 5, points: 500, badges: ["Life Saver"], eligible: false, showName: true },
  { id: "d3", name: "Suresh Rao", bloodGroup: "B-", location: "Warangal", lastDonation: addDays(today, -120), totalDonations: 20, points: 2500, badges: ["Life Saver", "Rare Hero", "Champion"], eligible: true, showName: false },
  { id: "d4", name: "Lakshmi Devi", bloodGroup: "O+", location: "Hanamkonda", lastDonation: addDays(today, -200), totalDonations: 8, points: 800, badges: ["Life Saver"], eligible: true, showName: true },
  { id: "d5", name: "Venkat Reddy", bloodGroup: "A-", location: "Warangal", lastDonation: null, totalDonations: 0, points: 0, badges: [], eligible: true, showName: true },
  { id: "d6", name: "Anjali Sharma", bloodGroup: "AB+", location: "Hanamkonda", lastDonation: addDays(today, -90), totalDonations: 3, points: 350, badges: [], eligible: true, showName: false },
];

export const urgentRequests: UrgentRequest[] = [
  { id: "ur1", bloodGroup: "O-", hospitalId: "h1", urgency: "Critical", unitsNeeded: 5, createdAt: addDays(today, -1), status: "active" },
  { id: "ur2", bloodGroup: "AB-", hospitalId: "h3", urgency: "High", unitsNeeded: 2, createdAt: addDays(today, 0), status: "active" },
  { id: "ur3", bloodGroup: "B-", hospitalId: "h5", urgency: "Medium", unitsNeeded: 3, createdAt: addDays(today, -2), status: "active" },
];

export function getHospitalName(id: string) {
  return hospitals.find((h) => h.id === id)?.name ?? "Unknown";
}

export function getExpiryStatus(expiryDate: string): "safe" | "warning" | "critical" {
  const days = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days <= 5) return "critical";
  if (days <= 14) return "warning";
  return "safe";
}

export function getDaysUntilExpiry(expiryDate: string): number {
  return Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

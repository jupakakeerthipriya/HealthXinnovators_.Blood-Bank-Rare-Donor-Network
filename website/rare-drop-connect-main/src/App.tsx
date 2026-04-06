import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Inventory from "@/pages/Inventory";
import BloodSearch from "@/pages/BloodSearch";
import UrgentRequests from "@/pages/UrgentRequests";
import DonorRegistry from "@/pages/DonorRegistry";
import Appointments from "@/pages/Appointments";
import Transfers from "@/pages/Transfers";
import ColdChain from "@/pages/ColdChain";
import Analytics from "@/pages/Analytics";
import Leaderboard from "@/pages/Leaderboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/search" element={<BloodSearch />} />
            <Route path="/urgent" element={<UrgentRequests />} />
            <Route path="/donors" element={<DonorRegistry />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/cold-chain" element={<ColdChain />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

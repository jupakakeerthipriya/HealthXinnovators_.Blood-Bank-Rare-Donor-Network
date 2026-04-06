import {
  LayoutDashboard,
  Droplets,
  Search,
  AlertTriangle,
  Users,
  Calendar,
  BarChart3,
  ArrowLeftRight,
  Thermometer,
  Heart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Droplets },
  { title: "Blood Search", url: "/search", icon: Search },
  { title: "Urgent Requests", url: "/urgent", icon: AlertTriangle },
];

const managementItems = [
  { title: "Donor Registry", url: "/donors", icon: Users },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Transfers", url: "/transfers", icon: ArrowLeftRight },
  { title: "Cold Chain", url: "/cold-chain", icon: Thermometer },
];

const insightItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Leaderboard", url: "/leaderboard", icon: Heart },
];

function SidebarSection({ label, items }: { label: string; items: typeof mainItems }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        <div className="mb-4 flex items-center gap-2 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Droplets className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">BloodNet</span>
        </div>
        <SidebarSection label="Overview" items={mainItems} />
        <SidebarSection label="Management" items={managementItems} />
        <SidebarSection label="Insights" items={insightItems} />
      </SidebarContent>
    </Sidebar>
  );
}

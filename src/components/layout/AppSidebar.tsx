
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AreaChart,
  Building,
  Calendar,
  Car,
  Clock,
  Home,
  Hotel,
  LayoutDashboard,
  MonitorSmartphone,
  Package,
  ShoppingBag,
  UserPlus,
  Vote,
  Wine
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Dashboard items
  const dashboardItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Proposals", url: "/proposals", icon: Vote },
    { title: "History", url: "/history", icon: Clock },
  ];

  // Investment type items
  const investmentItems = [
    { title: "All Investments", url: "/investments", icon: AreaChart },
    { title: "Wine", url: "/investments/wine", icon: Wine, color: "investment-wine" },
    { title: "Real Estate", url: "/investments/realestate", icon: Home, color: "investment-realestate" },
    { title: "Cars", url: "/investments/cars", icon: Car, color: "investment-cars" },
    { title: "High Risk", url: "/investments/highrisk", icon: Package, color: "investment-highrisk" },
    { title: "Rentals", url: "/investments/rentals", icon: Hotel, color: "investment-rentals" },
    { title: "Companies", url: "/investments/companies", icon: Building, color: "investment-companies" },
    { title: "Websites", url: "/investments/websites", icon: MonitorSmartphone, color: "investment-websites" },
  ];

  // Admin items
  const adminItems = [
    { title: "Admin Dashboard", url: "/admin", icon: ShoppingBag },
    { title: "Manage Investors", url: "/admin/investors", icon: UserPlus },
    { title: "Calendar", url: "/admin/calendar", icon: Calendar },
  ];

  // Helper functions
  const isActive = (path: string) => currentPath === path || 
    (path !== '/' && currentPath.startsWith(path));
    
  const isDashboardExpanded = dashboardItems.some(i => isActive(i.url));
  const isInvestmentsExpanded = investmentItems.some(i => isActive(i.url));
  const isAdminExpanded = adminItems.some(i => isActive(i.url));

  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    cn(
      "flex items-center gap-3 rounded-md px-3 py-2 w-full transition-colors",
      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"
    );

  return (
    <Sidebar
      className={cn(
        "border-r bg-sidebar",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      <SidebarContent>
        <SidebarGroup
          defaultOpen={isDashboardExpanded}
        >
          <SidebarGroupLabel className="text-sm font-medium">
            {!collapsed && "Dashboard"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={getNavClass}>
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup
          defaultOpen={isInvestmentsExpanded}
        >
          <SidebarGroupLabel className="text-sm font-medium">
            {!collapsed && "Investments"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {investmentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon 
                        className={cn(
                          "h-5 w-5 shrink-0",
                          item.color && `text-${item.color}`
                        )} 
                      />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup
          defaultOpen={isAdminExpanded}
        >
          <SidebarGroupLabel className="text-sm font-medium">
            {!collapsed && "Admin"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

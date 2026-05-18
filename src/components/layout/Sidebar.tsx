"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Users,
  Search,
  Settings,
  AlertTriangle,
  FileText,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents", href: "/dashboard/agents", icon: Users },
  { name: "Prompt Inspection", href: "/dashboard/inspection", icon: Search },
  { name: "Policy Engine", href: "/dashboard/policies", icon: Shield },
  { name: "Incident Center", href: "/dashboard/incidents", icon: AlertTriangle },
  { name: "Oversight Graph", href: "/dashboard/graph", icon: Network },
  { name: "Audit Trail", href: "/dashboard/audit", icon: FileText },
  { name: "Red-Team Sim", href: "/dashboard/red-team", icon: Zap },
];

// Need Zap for red-team
import { Zap } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <Link className="flex items-center gap-2" href="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">SentinelOS</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
          <Settings className="h-4 w-4" />
          Settings
        </div>
      </div>
    </div>
  );
}

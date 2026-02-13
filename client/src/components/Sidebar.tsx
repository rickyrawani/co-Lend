import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Landmark, 
  Settings, 
  LogOut,
  Building2,
  GitMerge
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-content";

export function Sidebar() {
  const [location, navigate] = useLocation();
  const { logout, user } = useAuth();

const dashboardPath =
  user?.role === "NBFC_ADMIN" ? "/nbfc/dashboard" : "/bank/dashboard";

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: dashboardPath },
    { label: "MTA", icon: GitMerge, href: "/mta" },
    { label: "Reports", icon: FileText, href: "/reports" },
    { label: "Loans", icon: Landmark, href: "/loans" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

   const handleLogout = () => {
    logout();            // 🔐 clear auth
    navigate("/login");  // 🚀 redirect to login
  };


  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">Co-Lend Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a 
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button 
          data-testid="button-logout"
           onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}

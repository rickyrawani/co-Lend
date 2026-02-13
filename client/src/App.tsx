import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import BankDashboard from "./pages/bank-dashboard";
import NbfcDashboard from "./pages/nbfc-dashboard";
import PortfolioDetail from "@/pages/portfolio-details";
import { AuthProvider,useAuth } from "./lib/auth-content";
import { Sidebar } from "./components/Sidebar";
import ReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";
import MTA from "./pages/mta";
import CreateMTA from "./pages/create-mta";
import Loans from "./pages/Loans";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Component />
        </main>
      </div>
    </div>
  );
}

function Router() {
  const { isAuthenticated, user } = useAuth();
  return (
    <Switch>
      {/* Main Dashboard Route */}
      <Route path="/login">
        {isAuthenticated ? (
          <Redirect to={user?.role === "NBFC_ADMIN" ? "/nbfc/dashboard" : "/bank/dashboard"} />
        ) : (
          <LoginPage />
        )}
      </Route>

     <Route path="/nbfc/dashboard">
        <ProtectedRoute component={NbfcDashboard} />
      </Route>

      <Route path="/nbfc/portfolio/:id">
        <ProtectedRoute component={PortfolioDetail} />
      </Route>

      <Route path="/bank/dashboard">
        <ProtectedRoute component={BankDashboard} />
      </Route>

      <Route path="/bank/portfolio/:id">
        <ProtectedRoute component={PortfolioDetail} />
      </Route>
     
      <Route path="/mta">
        <ProtectedRoute component={MTA} />
      </Route>

      <Route path="/mta/create">
        <ProtectedRoute component={CreateMTA} />
      </Route>

       <Route path="/loans">
          <ProtectedRoute component={Loans} />
        </Route>


      {/* Other routes mapping to dashboard for now as they are placeholders */}
      <Route path="/reports">
        <ProtectedRoute component={ReportsPage} />
      </Route>

      <Route path="/settings">
        <ProtectedRoute component={SettingsPage} />
      </Route>


      <Route path="/">
        {isAuthenticated ? (
          <Redirect to={user?.role === "NBFC_ADMIN" ? "/nbfc/dashboard" : "/bank/dashboard"} />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
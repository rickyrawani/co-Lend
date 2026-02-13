
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TotalLoans from "@/components/tabs/TotalLoans";
import ApprovedLoans from "@/components/tabs/ApprovedLoans";
import PendingLoans from "@/components/tabs/PendingLoans";
import RejectedLoans from "@/components/tabs/RejectedLoans";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  AlertCircle,
  Check,
  Building,
  FileText,Bell
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function NbfcDashboard() {
  const [activeTab, setActiveTab] = React.useState("Total Loans");
  const [selectedBank, setSelectedBank] = React.useState("All Banks");
  const USER_ROLE = "NBFC";


  const renderTabContent = () => {
    switch (activeTab) {
      case "Pending Loans":
        return <PendingLoans role={USER_ROLE} entity={selectedBank} />;
      case "Approved Loans":
        return <ApprovedLoans role={USER_ROLE} entity={selectedBank} />;
      case "Rejected Loans":
        return <RejectedLoans role={USER_ROLE} entity={selectedBank} />;
      default:
        return <TotalLoans role={USER_ROLE} entity={selectedBank} />;
    }
  };


  return (
    <div className="min-h-screen bg-background font-sans">
      {/* <Sidebar /> */}

      <main className="pl-64">
        {/* Header */}
         <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-8 py-6">
           <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-foreground tracking-tight">NBFC Dashboard</h1>
               <div className="flex items-center gap-3">

                {/* Notification Icon */}
                  <button className="relative p-2 rounded-full hover:bg-muted/10 transition-colors">
                    <Bell className="w-6 h-6 text-foreground" />
                    {/* Optional: Red dot for unread notifications */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>

                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="
                      px-3 py-2 text-sm rounded-md border bg-background
                      text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                    "
                  >
                    <option value="All Banks">All Banks</option>
                    <option value="Yes Bank">Yes Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="SBI Bank">SBI Bank</option>
                  </select>
                </div>
             </div>

             {/* Top Tabs */}
             <div className="flex gap-1 border-b w-full">
               {["Total Loans", "Pending Loans", "Approved Loans", "Rejected Loans"].map((tab) => (                 <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 py-2 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>


        {/* BODY */}
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

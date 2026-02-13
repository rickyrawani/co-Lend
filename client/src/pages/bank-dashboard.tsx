// import React from "react";
// import { Sidebar } from "@/components/Sidebar";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { 
//   LineChart, 
//   Line, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
//   Cell,
//   PieChart,
//   Pie
// } from "recharts";
// import { 
//   Briefcase, 
//   Clock, 
//   CheckCircle2, 
//   XCircle,
//   TrendingUp,
//   AlertCircle,
//   Check,
//   Building,
//   FileText
// } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // Mock Data
// const roiData = [
//   { month: "Jan", roi: 8.2 },
//   { month: "Feb", roi: 8.6 },
//   { month: "Mar", roi: 9.1 },
//   { month: "Apr", roi: 9.5 },
// ];

// const loanStatusData = [
//   { name: "Pending", value: 45, color: "var(--color-chart-4)" },
//   { name: "Approved", value: 200, color: "var(--color-chart-2)" },
//   { name: "Rejected", value: 12, color: "var(--color-chart-3)" },
// ];

// const uploadErrorData = [
//   { name: "Successful", value: 480, color: "var(--color-chart-2)" },
//   { name: "Failed", value: 15, color: "var(--color-chart-3)" },
// ];

// const errorReasons = [
//   { reason: "Missing Documentation", count: 8 },
//   { reason: "Invalid Loan ID", count: 5 },
//   { reason: "CIBIL Data Error", count: 2 },
// ];

// const bankOffers = [
//   { id: 1, bank: "HDFC Bank", irr: 9.5, return: "High", status: "Active" },
//   { id: 2, bank: "ICICI Bank", irr: 8.9, return: "Medium", status: "Pending" },
//   { id: 3, bank: "Axis Bank", irr: 9.1, return: "Medium", status: "Rejected" },
// ];

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = React.useState("Total Loans");

//   return (
//     <div className="min-h-screen bg-background font-sans">
//       <Sidebar />
      
//       <main className="pl-64">
//         {/* Header Section */}
//         <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-8 py-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
//               <div className="flex items-center gap-2">
//                 <Badge variant="outline" className="px-3 py-1 bg-background text-sm font-normal text-muted-foreground">
//                   Last updated: Just now
//                 </Badge>
//               </div>
//             </div>

//             {/* Top Tabs */}
//             <div className="flex gap-1 border-b w-full">
//               {["Total Loans", "Pending Loans", "Approved Loans", "Rejected Loans"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`
//                     px-4 py-2 text-sm font-medium border-b-2 transition-colors
//                     ${activeTab === tab 
//                       ? "border-primary text-primary" 
//                       : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
//                     }
//                   `}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </header>

//         <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
//           {/* Summary Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <SummaryCard 
//               label="Total Portfolios" 
//               value="1,245" 
//               icon={Briefcase} 
//               trend="+12%" 
//               trendUp={true}
//               color="text-blue-600"
//               bg="bg-blue-50"
//             />
//             <SummaryCard 
//               label="Pending MTAs" 
//               value="32" 
//               icon={Clock} 
//               color="text-amber-600"
//               bg="bg-amber-50"
//             />
//             <SummaryCard 
//               label="Approved MTAs" 
//               value="210" 
//               icon={CheckCircle2} 
//               trend="+5%" 
//               trendUp={true}
//               color="text-emerald-600"
//               bg="bg-emerald-50"
//             />
//             <SummaryCard 
//               label="Rejected Loans" 
//               value="18" 
//               icon={XCircle} 
//               trend="-2%" 
//               trendUp={true} // Interpreting less rejections as "good" (up)
//               color="text-rose-600"
//               bg="bg-rose-50"
//             />
//           </div>

//           {/* Charts Row 1 */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* ROI Trend */}
//             <Card className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-primary" />
//                   ROI Trend
//                 </CardTitle>
//                 <CardDescription>Return on Investment over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={roiData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
//                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} domain={[0, 12]} />
//                       <Tooltip 
//                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                       />
//                       <Line 
//                         type="monotone" 
//                         dataKey="roi" 
//                         stroke="var(--color-primary)" 
//                         strokeWidth={3} 
//                         dot={{ r: 4, fill: "white", strokeWidth: 2 }} 
//                         activeDot={{ r: 6 }} 
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Loan Upload Status */}
//             <Card className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-primary" />
//                   Loan Upload Status
//                 </CardTitle>
//                 <CardDescription>Current processing state of uploaded loans</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={loanStatusData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                       <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
//                       <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
//                       <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} width={80} />
//                       <Tooltip 
//                         cursor={{fill: 'transparent'}}
//                         contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                       />
//                       <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
//                         {loanStatusData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Charts Row 2 */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Bank Offers Table */}
//             <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Building className="w-5 h-5 text-primary" />
//                   Bank Offers
//                 </CardTitle>
//                 <CardDescription>Co-lending offers from partner banks</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Bank Name</TableHead>
//                       <TableHead>Offered IRR</TableHead>
//                       <TableHead>Expected Return</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {bankOffers.map((offer) => (
//                       <TableRow key={offer.id}>
//                         <TableCell className="font-medium">{offer.bank}</TableCell>
//                         <TableCell>{offer.irr}%</TableCell>
//                         <TableCell>
//                           <Badge variant="secondary" className={
//                             offer.return === "High" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : 
//                             "bg-blue-100 text-blue-700 hover:bg-blue-100"
//                           }>
//                             {offer.return}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <StatusBadge status={offer.status} />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>

//             {/* Upload Error Tracker */}
//             <Card className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <AlertCircle className="w-5 h-5 text-primary" />
//                   Upload Error Tracker
//                 </CardTitle>
//                 <CardDescription>Success vs Failure Rates</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col items-center">
//                   <div className="h-[200px] w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={uploadErrorData}
//                           innerRadius={60}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {uploadErrorData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend verticalAlign="bottom" height={36}/>
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
                  
//                   <div className="w-full mt-4 space-y-3">
//                     <h4 className="text-sm font-semibold text-muted-foreground mb-2">Top Failure Reasons</h4>
//                     {errorReasons.map((item, i) => (
//                       <div key={i} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
//                         <span className="text-foreground">{item.reason}</span>
//                         <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">
//                           {item.count}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Additional Widgets */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//              <WidgetCard 
//                 title="Best Bank Return" 
//                 value="HDFC Bank" 
//                 subValue="9.5%" 
//                 icon={TrendingUp}
//                 color="text-emerald-600"
//              />
//              <WidgetCard 
//                 title="Data Compliance" 
//                 value="Compliant" 
//                 subValue="Verified" 
//                 icon={Check}
//                 color="text-blue-600"
//              />
//              <WidgetCard 
//                 title="Last Upload" 
//                 value="2 hours ago" 
//                 subValue="User: Admin" 
//                 icon={Clock}
//                 color="text-slate-600"
//              />
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

// // Sub-components for cleaner code
// function SummaryCard({ label, value, icon: Icon, trend, trendUp, color, bg }: any) {
//   return (
//     <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group">
//       <CardContent className="p-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">{label}</p>
//             <h3 className="text-3xl font-bold mt-2 tracking-tight text-foreground">{value}</h3>
//           </div>
//           <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
//             <Icon className="w-6 h-6" />
//           </div>
//         </div>
//         {trend && (
//           <div className="mt-4 flex items-center gap-1 text-sm">
//             <span className={trendUp ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
//               {trend}
//             </span>
//             <span className="text-muted-foreground">from last month</span>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const styles: Record<string, string> = {
//     Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-100 text-amber-700 border-amber-200",
//     Rejected: "bg-rose-100 text-rose-700 border-rose-200",
//   };
  
//   return (
//     <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-100 text-gray-700"}`}>
//       {status}
//     </span>
//   );
// }

// function WidgetCard({ title, value, subValue, icon: Icon, color }: any) {
//   return (
//     <Card className="bg-card/50 backdrop-blur border shadow-sm">
//       <CardContent className="p-4 flex items-center gap-4">
//         <div className={`p-2 rounded-full bg-background border shadow-sm ${color}`}>
//           <Icon className="w-5 h-5" />
//         </div>
//         <div>
//           <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
//           <div className="flex items-baseline gap-2">
//             <p className="text-lg font-bold text-foreground">{value}</p>
//             {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



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

export default function BankDashboard() {
  const [activeTab, setActiveTab] = React.useState("Total Loans");
  const [selectedNbfc, setSelectedNbfc] = React.useState("All NBFCs");
  const USER_ROLE = "BANK";


 const renderTabContent = () => {
  switch (activeTab) {
    case "Pending Loans":
      return <PendingLoans role={USER_ROLE} entity={selectedNbfc} />;
    case "Approved Loans":
      return <ApprovedLoans role={USER_ROLE} entity={selectedNbfc} />;
    case "Rejected Loans":
      return <RejectedLoans role={USER_ROLE} entity={selectedNbfc} />;
    default:
      return <TotalLoans role={USER_ROLE} entity={selectedNbfc} />;
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
               <h1 className="text-2xl font-bold text-foreground tracking-tight">Bank Dashboard</h1>
              <div className="flex items-center gap-3">
                {/* Notification Icon */}
                  <button className="relative p-2 rounded-full hover:bg-muted/10 transition-colors">
                    <Bell className="w-6 h-6 text-foreground" />
                    {/* Optional: Red dot for unread notifications */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                <select
                  value={selectedNbfc}
                  onChange={(e) => setSelectedNbfc(e.target.value)}
                  className="border rounded-md px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="All NBFCs">All NBFCs</option>
                  <option value="Bajaj Finance">Bajaj Finance</option>
                  <option value="Muthoot Finance">Muthoot Finance</option>
                  <option value="Sriram Finance">Sriram Finance</option>
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

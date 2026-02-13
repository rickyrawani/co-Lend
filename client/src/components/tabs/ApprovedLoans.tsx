import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  FileText,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock Data
const entityMeta = [
  // BANKS
  { key: "HDFC", label: "HDFC Bank", type: "BANK", color: "#2563eb" },
  { key: "Axis", label: "Axis Bank", type: "BANK", color: "#16a34a" },
  { key: "SBI", label: "SBI Bank", type: "BANK", color: "#dc2626" },
  { key: "Yes", label: "Yes Bank", type: "BANK", color: "#9333ea" },

  // NBFCs
  { key: "Bajaj", label: "Bajaj Finance", type: "NBFC", color: "#f97316" },
  { key: "Muthoot", label: "Muthoot Finance", type: "NBFC", color: "#0ea5e9" },
  { key: "Sriram", label: "Sriram Finance", type: "NBFC", color: "#22c55e" },
];

const roiData = [
  {
    month: "Jan",
    HDFC: 8.2,
    Axis: 7.9,
    SBI: 7.5,
    Yes: 8.0,
    Bajaj: 11.2,
    Muthoot: 12.1,
    Sriram: 10.8,
  },
  {
    month: "Feb",
    HDFC: 8.6,
    Axis: 8.1,
    SBI: 7.8,
    Yes: 8.3,
    Bajaj: 11.5,
    Muthoot: 12.4,
    Sriram: 11.1,
  },
];

const loanStatusData = [
  { name: "Pending", value: 45, color: "var(--color-chart-4)" },
  { name: "Approved", value: 200, color: "var(--color-chart-2)" },
  { name: "Rejected", value: 12, color: "var(--color-chart-3)" },
];

const uploadErrorData = [
  { name: "Successful", value: 480, color: "var(--color-chart-2)" },
  { name: "Failed", value: 15, color: "var(--color-chart-3)" },
];

const errorReasons = [
  { reason: "Missing Documentation", count: 8 },
  { reason: "Invalid Loan ID", count: 5 },
  { reason: "CIBIL Data Error", count: 2 },
];

const bankOffers = [
  { id: 1, bank: "HDFC Bank", irr: 9.5, return: "High", status: "Active" },
  { id: 2, bank: "ICICI Bank", irr: 8.9, return: "Medium", status: "Pending" },
  { id: 3, bank: "Axis Bank", irr: 9.1, return: "Medium", status: "Rejected" },
];


const loanDistributionData = [
  {
    name: "Home Loan",
    percentage: 40,
    amount: "—",
    color: "bg-blue-500",
  },
  {
    name: "Personal Loan",
    percentage: 30,
    amount: "-94 Cr",
    color: "bg-green-500",
  },
  {
    name: "SME Loan",
    percentage: 20,
    amount: "12.5 Cr",
    color: "bg-orange-500",
  },
  {
    name: "Auto Loan",
    percentage: 10,
    amount: "12.5 Cr",
    color: "bg-rose-500",
  },
];

export default function ApprovedLoans({
  role,
  entity,
}: {
  role: "BANK" | "NBFC";
  entity: string;
}) {



  // Determine default entity type to show based on login role
const defaultTypeToShow = role === "BANK" ? "NBFC" : "BANK";

// Filter entities to display in ROI chart
const visibleEntities = entityMeta.filter(e => {
  // If "All" is selected in dropdown, show all of the opposite type
  if (
    (role === "BANK" && entity === "All NBFCs" && e.type === "NBFC") ||
    (role === "NBFC" && entity === "All Banks" && e.type === "BANK")
  ) return true;

  // If a specific entity is selected
  if (e.label === entity) return true;

  // Default: show all of the opposite type
  return e.type === defaultTypeToShow && (entity === "" || entity.startsWith("All"));
});

  return (
<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">          
           {/* Summary Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <SummaryCard 
              label="Total Portfolios" 
              value="5000" 
              icon={Briefcase} 
              trend="+12%" 
              trendUp={true}
              color="text-blue-600"
              bg="bg-blue-50"
            />
           <SummaryCard
              label="Approved"
              value="1000"
              icon={CheckCircle2}
              color="text-emerald-600"
              bg="bg-emerald-50"
            />

            <SummaryCard
              label="Bad loans"
              value="10"
              icon={XCircle}
              trend="-2%"
              trendUp={false}
              color="text-rose-600"
              bg="bg-rose-50"
            />

            <SummaryCard
              label="Avg ROI"
              value="13.5%"
              icon={TrendingUp}
              trend="+5%"
              trendUp
              color="text-indigo-600"
              bg="bg-indigo-50"
            />

          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Trend */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  ROI Trend
                </CardTitle>
                <CardDescription>Return on Investment over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roiData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="month" />
                     <YAxis domain={[6, 12]} />
                     <Tooltip />
                     <Legend />
                     
                     {visibleEntities.map(e => (
                       <Line
                         key={e.key}
                         type="monotone"
                         dataKey={e.key}
                         name={e.label}
                         stroke={e.color}
                         strokeWidth={3}
                         dot={{ r: 3 }}
                         activeDot={{ r: 6 }}
                       />
                     ))}
                   </LineChart>
 
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

           {/* Loan Distribution */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Loan Distribution
              </CardTitle>
              <CardDescription>Loan category-wise allocation</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {loanDistributionData.map((loan, index) => (
                <div key={index} className="space-y-2">
                  {/* Label Row */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${loan.color}`} />
                      <span className="font-medium">{loan.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{loan.percentage}%</span>
                      <span className="text-muted-foreground">{loan.amount}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${loan.color} rounded-full transition-all duration-500`}
                      style={{ width: `${loan.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bank Offers Table */}
            <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Bank Offers
                </CardTitle>
                <CardDescription>Co-lending offers from partner banks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank Name</TableHead>
                      <TableHead>Offered IRR</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="font-medium">{offer.bank}</TableCell>
                        <TableCell>{offer.irr}%</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={
                            offer.return === "High" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : 
                            "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }>
                            {offer.return}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={offer.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Upload Error Tracker */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Upload Error Tracker
                </CardTitle>
                <CardDescription>Success vs Failure Rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={uploadErrorData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {uploadErrorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full mt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Top Failure Reasons</h4>
                    {errorReasons.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
                        <span className="text-foreground">{item.reason}</span>
                        <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">
                          {item.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <WidgetCard 
                title="Best Bank Return" 
                value="HDFC Bank" 
                subValue="9.5%" 
                icon={TrendingUp}
                color="text-emerald-600"
             />
             <WidgetCard 
                title="Data Compliance" 
                value="Compliant" 
                subValue="Verified" 
                icon={Check}
                color="text-blue-600"
             />
             <WidgetCard 
                title="Last Upload" 
                value="2 hours ago" 
                subValue="User: Admin" 
                icon={Clock}
                color="text-slate-600"
             />
          </div>

        </div>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */
function SummaryCard({ label, value, icon: Icon, trend, trendUp, color, bg }: any) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className="text-3xl font-bold mt-2 tracking-tight text-foreground">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className={trendUp ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
              {trend}
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function WidgetCard({ title, value, subValue, icon: Icon, color }: any) {
  return (
    <Card className="bg-card/50 backdrop-blur border shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-2 rounded-full bg-background border shadow-sm ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-foreground">{value}</p>
            {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
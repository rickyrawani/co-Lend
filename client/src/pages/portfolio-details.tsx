import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable, { StatusBadge } from "@/components/data-table";
import type { Column } from "@/components/data-table";
import ChartCard from "@/components/chart-card";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import { mockPortfolios, mockLoans } from "@/data/mock-data";
import { useAuth } from "@/lib/auth-content";
import type { Loan } from "@shared/schema";


export default function PortfolioDetail() {
  const [, params] = useRoute("/:role/portfolio/:id");
  const { user } = useAuth();
  const portfolioId = params?.id;
  
  const portfolio = mockPortfolios.find(p => p.id === portfolioId);
  const loans = mockLoans.filter(l => l.portfolioId === portfolioId);

  if (!portfolio || !user) {
    return <div className="p-6">Portfolio not found</div>;
  }

  const backPath = user.role === "NBFC_ADMIN" ? "/nbfc/dashboard" : "/bank/dashboard";

  const loanColumns: Column<Loan>[] = [
    { key: "id", label: "Loan ID", className: "font-mono text-xs" },
    { key: "borrowerName", label: "Borrower" },
    { 
      key: "amount", 
      label: "Amount", 
      render: (value) => <span className="font-mono">₹{value.toLocaleString()}</span>,
      className: "text-right"
    },
    { 
      key: "outstanding", 
      label: "Outstanding", 
      render: (value) => <span className="font-mono">₹{value.toLocaleString()}</span>,
      className: "text-right"
    },
    { 
      key: "interestRate", 
      label: "Interest", 
      render: (value) => <span className="font-mono">{value}%</span>,
      className: "text-right"
    },
    { 
      key: "status", 
      label: "Status", 
      render: (value) => <StatusBadge status={value} />
    }
  ];

  const statusDistribution = [
    { name: "Active", value: loans.filter(l => l.status === "active").length },
    { name: "Closed", value: loans.filter(l => l.status === "closed").length },
    { name: "Overdue", value: loans.filter(l => l.status === "overdue").length }
  ];

  const statusColors = {
    active: "bg-chart-2 text-white",
    pending: "bg-chart-3 text-white",
    completed: "bg-muted text-muted-foreground",
    defaulted: "bg-destructive text-destructive-foreground"
  };

  return (
    <div className="ml-64 p-8 flex-1 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <Link href={backPath}>
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold mb-1">{portfolio.name}</h1>
              <p className="text-muted-foreground font-mono">{portfolio.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={statusColors[portfolio.status]}>
                {portfolio.status.toUpperCase()}
              </Badge>
              <Button variant="outline" data-testid="button-download-report">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4 md:p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Total Amount</p>
          <p className="text-3xl font-bold font-mono">₹{(portfolio.totalAmount / 10000000).toFixed(1)} Cr</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Outstanding</p>
          <p className="text-3xl font-bold font-mono">₹{(portfolio.outstanding / 10000000).toFixed(1)} Cr</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Total Loans</p>
          <p className="text-3xl font-bold font-mono">{portfolio.loanCount}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Avg. Interest</p>
          <p className="text-3xl font-bold font-mono">{portfolio.averageInterestRate}%</p>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="loans" data-testid="tab-loans">Loans</TabsTrigger>
          <TabsTrigger value="documents" data-testid="tab-documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Portfolio Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NBFC Partner</span>
                  <span className="font-medium">{portfolio.nbfcName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank Partner</span>
                  <span className="font-medium">{portfolio.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NBFC Share</span>
                  <span className="font-medium font-mono">{portfolio.nbfcShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank Share</span>
                  <span className="font-medium font-mono">{portfolio.bankShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{new Date(portfolio.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{new Date(portfolio.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>

            <ChartCard 
              title="Loan Status Distribution" 
              type="pie" 
              data={statusDistribution}
              dataKey="value"
              height={265}
            />
          </div>
        </TabsContent>

        <TabsContent value="loans">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Loans</h3>
              <Button variant="outline" size="sm" data-testid="button-export-loans">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <DataTable columns={loanColumns} data={loans} />
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-md hover-elevate">
                <div>
                  <p className="font-medium">Co-Lending Agreement</p>
                  <p className="text-sm text-muted-foreground">Signed on {new Date(portfolio.startDate).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-download-agreement">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md hover-elevate">
                <div>
                  <p className="font-medium">Portfolio Summary Report</p>
                  <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" data-testid="button-download-summary">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

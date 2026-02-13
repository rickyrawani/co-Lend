import PageHeader from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, TrendingUp, Shield } from "lucide-react";
import { mockReports } from "@/data/mock-data";

const categoryIcons = {
  financial: TrendingUp,
  compliance: Shield,
  performance: FileText
};

const categoryColors = {
  financial: "bg-chart-2 text-white",
  compliance: "bg-chart-4 text-white",
  performance: "bg-chart-1 text-white"
};

export default function ReportsPage() {
  return (
    <div className="ml-64 p-6 space-y-6">
      <PageHeader 
        title="Reports" 
        description="Access and download financial, compliance, and performance reports"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map(report => {
          const Icon = categoryIcons[report.category];
          return (
            <Card key={report.id} className="p-6 hover-elevate">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge className={categoryColors[report.category]}>
                    {report.category.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{new Date(report.generatedDate).toLocaleDateString()}</span>
                <span className="font-mono">{report.fileSize}</span>
              </div>

              <Button className="w-full" variant="outline" data-testid={`button-download-${report.id}`}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Custom Report</h3>
        <p className="text-muted-foreground mb-4">
          Create a custom report with specific date ranges and parameters
        </p>
        <Button data-testid="button-generate-custom">
          Generate Custom Report
        </Button>
      </Card>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Portfolio } from "shared/schema";

interface PortfolioCardProps {
  portfolio: Portfolio;
  onViewDetails: (id: string) => void;
}

const statusColors = {
  active: "bg-chart-2 text-white",
  pending: "bg-chart-3 text-white",
  completed: "bg-muted text-muted-foreground",
  defaulted: "bg-destructive text-destructive-foreground"
};

export default function PortfolioCard({ portfolio, onViewDetails }: PortfolioCardProps) {
  return (
    <Card className="p-6 hover-elevate cursor-pointer" onClick={() => onViewDetails(portfolio.id)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{portfolio.name}</h3>
          <p className="text-sm text-muted-foreground font-mono">{portfolio.id}</p>
        </div>
        <Badge className={statusColors[portfolio.status]}>
          {portfolio.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Amount</p>
          <p className="text-base font-semibold font-mono">₹{(portfolio.totalAmount / 10000000).toFixed(1)} Cr</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Outstanding</p>
          <p className="text-base font-semibold font-mono">₹{(portfolio.outstanding / 10000000).toFixed(1)} Cr</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Loans</p>
          <p className="text-base font-semibold font-mono">{portfolio.loanCount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">NBFC Share</p>
          <p className="text-base font-semibold font-mono">{portfolio.nbfcShare}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Bank Share</p>
          <p className="text-base font-semibold font-mono">{portfolio.bankShare}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Avg. Interest</p>
          <p className="text-base font-semibold font-mono">{portfolio.averageInterestRate}%</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {new Date(portfolio.startDate).toLocaleDateString()} - {new Date(portfolio.endDate).toLocaleDateString()}
        </div>
        <Button variant="ghost" size="sm" data-testid={`button-view-portfolio-${portfolio.id}`}>
          View Details <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}

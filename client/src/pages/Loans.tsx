import React from "react";
import PortfolioCard from "@/components/portfolio-card";
import { mockPortfolios } from "@/data/mock-data";
import { useLocation } from "wouter";

export default function Loans() {
  const [, setLocation] = useLocation();

  return (
    <div className="ml-64 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Active Portfolios</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPortfolios.slice(0, 4).map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            onViewDetails={(id) => setLocation(`/nbfc/portfolio/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}



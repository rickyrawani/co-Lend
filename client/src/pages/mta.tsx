// pages/mta.tsx
import React from "react";
import { useLocation } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mtaData = [
  { id: 1, bank: "HDFC Bank", loanId: "LN1001", amount: "10 Cr", status: "Active" },
  { id: 2, bank: "Axis Bank", loanId: "LN1002", amount: "5 Cr", status: "Pending" },
  { id: 3, bank: "SBI Bank", loanId: "LN1003", amount: "7 Cr", status: "Closed" },
];

export default function MTA() {
  const [, navigate] = useLocation();

  return (
    <div className="ml-64 p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MTA</h1>
        <Button onClick={() => navigate("/mta/create")}>
          Create New MTA
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bank</TableHead>
            <TableHead>Loan ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mtaData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.bank}</TableCell>
              <TableCell>{item.loanId}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Badge
                  className={
                    item.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

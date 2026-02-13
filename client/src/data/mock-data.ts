//todo: remove mock functionality
import type { Portfolio, Loan, Agreement, Payment, Report, DashboardStats } from "@shared/schema";

export interface MockUser {
  userId: string;
  email: string;
  password: string;
  name: string;
  role: "NBFC_ADMIN" | "BANK_ADMIN";
  companyId: string;
}

export const mockUsers: MockUser[] = [
  {
    userId: "nbfc001",
    email: "admin@nbfc.com",
    password: "nbfc123",
    name: "NBFC Administrator",
    role: "NBFC_ADMIN",
    companyId: "NBFC_ABC"
  },
  {
    userId: "bank001",
    email: "admin@bank.com",
    password: "bank123",
    name: "Bank Administrator",
    role: "BANK_ADMIN",
    companyId: "BANK_NAT"
  },
  {
    userId: "nbfc002",
    email: "manager@nbfc.com",
    password: "nbfc456",
    name: "NBFC Manager",
    role: "NBFC_ADMIN",
    companyId: "NBFC_ABC"
  }
];

export const mockPortfolios: Portfolio[] = [
  {
    id: "PF001",
    name: "Retail Loan Portfolio A",
    totalAmount: 50000000,
    outstanding: 38000000,
    nbfcShare: 60,
    bankShare: 40,
    status: "active",
    loanCount: 125,
    averageInterestRate: 12.5,
    startDate: "2024-01-15",
    endDate: "2026-01-15",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank"
  },
  {
    id: "PF002",
    name: "MSME Portfolio B",
    totalAmount: 75000000,
    outstanding: 62000000,
    nbfcShare: 50,
    bankShare: 50,
    status: "active",
    loanCount: 89,
    averageInterestRate: 11.8,
    startDate: "2024-03-01",
    endDate: "2027-03-01",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank"
  },
  {
    id: "PF003",
    name: "Personal Loan Portfolio C",
    totalAmount: 30000000,
    outstanding: 15000000,
    nbfcShare: 70,
    bankShare: 30,
    status: "pending",
    loanCount: 45,
    averageInterestRate: 13.2,
    startDate: "2024-10-01",
    endDate: "2025-10-01",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank"
  },
  {
    id: "PF004",
    name: "Vehicle Loan Portfolio D",
    totalAmount: 100000000,
    outstanding: 5000000,
    nbfcShare: 40,
    bankShare: 60,
    status: "completed",
    loanCount: 200,
    averageInterestRate: 10.5,
    startDate: "2022-06-01",
    endDate: "2024-06-01",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank"
  }
];

export const mockLoans: Loan[] = [
  {
    id: "LN001",
    portfolioId: "PF001",
    borrowerName: "Rajesh Kumar",
    amount: 500000,
    outstanding: 380000,
    interestRate: 12.5,
    tenure: 36,
    status: "active",
    disbursementDate: "2024-02-01",
    nextPaymentDate: "2025-01-01",
    emi: 16700
  },
  {
    id: "LN002",
    portfolioId: "PF001",
    borrowerName: "Priya Sharma",
    amount: 300000,
    outstanding: 250000,
    interestRate: 12.8,
    tenure: 24,
    status: "active",
    disbursementDate: "2024-04-15",
    nextPaymentDate: "2025-01-15",
    emi: 14200
  },
  {
    id: "LN003",
    portfolioId: "PF001",
    borrowerName: "Amit Patel",
    amount: 750000,
    outstanding: 0,
    interestRate: 12.2,
    tenure: 48,
    status: "closed",
    disbursementDate: "2023-01-10",
    nextPaymentDate: "-",
    emi: 19800
  },
  {
    id: "LN004",
    portfolioId: "PF001",
    borrowerName: "Sunita Reddy",
    amount: 400000,
    outstanding: 420000,
    interestRate: 13.0,
    tenure: 36,
    status: "overdue",
    disbursementDate: "2023-08-20",
    nextPaymentDate: "2024-11-20",
    emi: 13500
  }
];

export const mockAgreements: Agreement[] = [
  {
    id: "AG001",
    portfolioId: "PF001",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank",
    totalAmount: 50000000,
    nbfcShare: 60,
    bankShare: 40,
    interestRate: 12.5,
    tenure: 24,
    status: "active",
    signedDate: "2024-01-10",
    expiryDate: "2026-01-10"
  },
  {
    id: "AG002",
    portfolioId: "PF002",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank",
    totalAmount: 75000000,
    nbfcShare: 50,
    bankShare: 50,
    interestRate: 11.8,
    tenure: 36,
    status: "active",
    signedDate: "2024-02-25",
    expiryDate: "2027-02-25"
  },
  {
    id: "AG003",
    portfolioId: "PF003",
    nbfcName: "ABC Finance Ltd",
    bankName: "National Bank",
    totalAmount: 30000000,
    nbfcShare: 70,
    bankShare: 30,
    interestRate: 13.2,
    tenure: 12,
    status: "pending",
    signedDate: "2024-09-15",
    expiryDate: "2025-09-15"
  }
];

export const mockPayments: Payment[] = [
  {
    id: "PAY001",
    portfolioId: "PF001",
    loanId: "LN001",
    amount: 16700,
    principalAmount: 12500,
    interestAmount: 4200,
    paymentDate: "2024-12-01",
    status: "completed",
    paymentMethod: "NEFT",
    borrowerName: "Rajesh Kumar"
  },
  {
    id: "PAY002",
    portfolioId: "PF001",
    loanId: "LN002",
    amount: 14200,
    principalAmount: 10800,
    interestAmount: 3400,
    paymentDate: "2024-12-15",
    status: "completed",
    paymentMethod: "UPI",
    borrowerName: "Priya Sharma"
  },
  {
    id: "PAY003",
    portfolioId: "PF002",
    loanId: "LN001",
    amount: 25000,
    principalAmount: 18000,
    interestAmount: 7000,
    paymentDate: "2025-01-05",
    status: "scheduled",
    paymentMethod: "RTGS",
    borrowerName: "Rajesh Kumar"
  },
  {
    id: "PAY004",
    portfolioId: "PF001",
    loanId: "LN004",
    amount: 13500,
    principalAmount: 9500,
    interestAmount: 4000,
    paymentDate: "2024-11-20",
    status: "failed",
    paymentMethod: "NEFT",
    borrowerName: "Sunita Reddy"
  }
];

export const mockReports: Report[] = [
  {
    id: "RPT001",
    title: "Monthly Portfolio Performance - December 2024",
    description: "Comprehensive analysis of all active portfolios including disbursements, collections, and NPAs",
    category: "performance",
    generatedDate: "2024-12-28",
    fileSize: "2.4 MB",
    downloadUrl: "#"
  },
  {
    id: "RPT002",
    title: "Regulatory Compliance Report Q4 2024",
    description: "Compliance status report covering RBI guidelines and co-lending regulations",
    category: "compliance",
    generatedDate: "2024-12-20",
    fileSize: "1.8 MB",
    downloadUrl: "#"
  },
  {
    id: "RPT003",
    title: "Financial Statement - FY 2024",
    description: "Annual financial statement with detailed P&L and balance sheet",
    category: "financial",
    generatedDate: "2024-12-15",
    fileSize: "3.2 MB",
    downloadUrl: "#"
  },
  {
    id: "RPT004",
    title: "Risk Assessment Report - November 2024",
    description: "Credit risk analysis and portfolio health indicators",
    category: "performance",
    generatedDate: "2024-12-01",
    fileSize: "1.5 MB",
    downloadUrl: "#"
  }
];

export const mockNbfcStats: DashboardStats = {
  totalPortfolios: 4,
  totalAmount: 255000000,
  outstandingAmount: 120000000,
  activeLoans: 459,
  paymentsReceived: 185000000,
  defaultRate: 2.8,
  averageTicketSize: 555555,
  portfolioGrowth: 18.5
};

export const mockBankStats: DashboardStats = {
  totalPortfolios: 4,
  totalAmount: 255000000,
  outstandingAmount: 120000000,
  activeLoans: 459,
  paymentsReceived: 185000000,
  defaultRate: 2.8,
  averageTicketSize: 555555,
  portfolioGrowth: 15.2
};

// import { sql } from "drizzle-orm";
// import { pgTable, text, varchar } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod";

// export const users = pgTable("users", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

// export type InsertUser = z.infer<typeof insertUserSchema>;
// export type User = typeof users.$inferSelect;


import { z } from "zod";

export interface User {
  id: string;
  username: string;
  password: string;
}

export type InsertUser = Omit<User, "id">;

export type UserRole = "NBFC_ADMIN" | "BANK_ADMIN";

export const userRoleSchema = z.enum(["NBFC_ADMIN", "BANK_ADMIN"]);

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Portfolio {
  id: string;
  name: string;
  totalAmount: number;
  outstanding: number;
  nbfcShare: number;
  bankShare: number;
  status: "active" | "pending" | "completed" | "defaulted";
  loanCount: number;
  averageInterestRate: number;
  startDate: string;
  endDate: string;
  nbfcName: string;
  bankName: string;
}

export interface Loan {
  id: string;
  portfolioId: string;
  borrowerName: string;
  amount: number;
  outstanding: number;
  interestRate: number;
  tenure: number;
  status: "active" | "closed" | "overdue" | "npa";
  disbursementDate: string;
  nextPaymentDate: string;
  emi: number;
}

export interface Agreement {
  id: string;
  portfolioId: string;
  nbfcName: string;
  bankName: string;
  totalAmount: number;
  nbfcShare: number;
  bankShare: number;
  interestRate: number;
  tenure: number;
  status: "active" | "pending" | "expired" | "terminated";
  signedDate: string;
  expiryDate: string;
}

export interface Payment {
  id: string;
  portfolioId: string;
  loanId: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  paymentDate: string;
  status: "completed" | "pending" | "failed" | "scheduled";
  paymentMethod: string;
  borrowerName: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: "financial" | "compliance" | "performance";
  generatedDate: string;
  fileSize: string;
  downloadUrl: string;
}

export interface DashboardStats {
  totalPortfolios: number;
  totalAmount: number;
  outstandingAmount: number;
  activeLoans: number;
  paymentsReceived: number;
  defaultRate: number;
  averageTicketSize: number;
  portfolioGrowth: number;
}

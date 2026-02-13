import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LendingRatio({ onBack, onNext }: any) {
  const [form, setForm] = useState<any>({
    product: "",
    bankShare: "",
    nbfcShare: "",
    cibilFrom: "",
    cibilTo: "",
    salary: "",
  });

  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleAdd = () => {
    setError("");

    if (Number(form.bankShare) + Number(form.nbfcShare) !== 100) {
      return setError("Bank + NBFC share must be 100%");
    }

    setRows([...rows, form]);

    setForm({
      product: "",
      bankShare: "",
      nbfcShare: "",
      cibilFrom: "",
      cibilTo: "",
      salary: "",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-lg font-semibold">Lending Ratio</h2>

      {/* Form */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Product</Label>
          <Select
            value={form.product}
            onValueChange={(v) => setForm({ ...form, product: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Home Loan">Home Loan</SelectItem>
              <SelectItem value="Personal Loan">Personal Loan</SelectItem>
              <SelectItem value="Auto Loan">Auto Loan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Bank %</Label>
          <Input
            type="number"
            value={form.bankShare}
            onChange={(e) => setForm({ ...form, bankShare: e.target.value })}
          />
        </div>

        <div>
          <Label>NBFC %</Label>
          <Input
            type="number"
            value={form.nbfcShare}
            onChange={(e) => setForm({ ...form, nbfcShare: e.target.value })}
          />
        </div>

        <div>
          <Label>CIBIL From</Label>
          <Input
            type="number"
            value={form.cibilFrom}
            onChange={(e) => setForm({ ...form, cibilFrom: e.target.value })}
          />
        </div>

        <div>
          <Label>CIBIL To</Label>
          <Input
            type="number"
            value={form.cibilTo}
            onChange={(e) => setForm({ ...form, cibilTo: e.target.value })}
          />
        </div>

        <div>
          <Label>Min Monthly Income (₹)</Label>
          <Input
            type="number"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleAdd}>Add</Button>

      {/* Table */}
      {rows.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Bank %</TableHead>
              <TableHead>NBFC %</TableHead>
              <TableHead>CIBIL</TableHead>
              <TableHead>Min Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.product}</TableCell>
                <TableCell>{r.bankShare}%</TableCell>
                <TableCell>{r.nbfcShare}%</TableCell>
                <TableCell>{r.cibilFrom}–{r.cibilTo}</TableCell>
                <TableCell>₹{r.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Save & Continue</Button>
      </div>
    </div>
  );
}

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BankDetails({ onNext }: { onNext?: () => void }) {
  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-lg font-semibold">Bank Details</h2>

      {/* Bank Name */}
      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Input id="bankName" placeholder="Enter bank name" />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter bank address" />
      </div>

      {/* Branch Code */}
      <div className="space-y-2">
        <Label htmlFor="branchCode">Branch Code</Label>
        <Input id="branchCode" placeholder="Enter branch code" />
      </div>

      {/* Official Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Official Email ID</Label>
        <Input id="email" type="email" placeholder="example@bank.com" />
      </div>

      {/* Contact */}
      <div className="space-y-2">
        <Label htmlFor="contact">Official Contact No</Label>
        <Input id="contact" type="tel" placeholder="Enter contact number" />
      </div>

      {/* Action Button */}
      <div className="flex justify-start">
        <Button onClick={onNext}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

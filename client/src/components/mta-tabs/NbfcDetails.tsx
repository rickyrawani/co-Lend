import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function NbfcDetails({
  onBack,
  onNext,
}: {
  onBack?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-lg font-semibold">NBFC Details</h2>

      {/* NBFC Name */}
      <div className="space-y-2">
        <Label htmlFor="nbfcName">NBFC Name</Label>
        <Input id="nbfcName" placeholder="Enter NBFC name" />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter NBFC address" />
      </div>

      {/* Branch Code */}
      <div className="space-y-2">
        <Label htmlFor="branchCode">Branch Code</Label>
        <Input id="branchCode" placeholder="Enter branch code" />
      </div>

      {/* Official Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Official Email ID</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@nbfc.com"
        />
      </div>

      {/* Official Contact */}
      <div className="space-y-2">
        <Label htmlFor="contact">Official Contact No</Label>
        <Input
          id="contact"
          type="tel"
          placeholder="Enter contact number"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

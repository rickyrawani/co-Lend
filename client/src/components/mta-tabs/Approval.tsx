import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Approval({ onBack, onSubmit }: any) {
  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-lg font-semibold">Approval</h2>

      {/* NBFC Approval */}
      <div className="space-y-4 border rounded-lg p-4">
        <h3 className="font-medium">NBFC Approval</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Approved By</Label>
            <Input placeholder="NBFC Approver Name" />
          </div>
          <div>
            <Label>Approval Date</Label>
            <Input type="date" />
          </div>
        </div>
      </div>

      {/* Bank Approval */}
      <div className="space-y-4 border rounded-lg p-4">
        <h3 className="font-medium">Bank Approval</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Approved By</Label>
            <Input placeholder="Bank Approver Name" />
          </div>
          <div>
            <Label>Approval Date</Label>
            <Input type="date" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>
          Submit MTA
        </Button>
      </div>
    </div>
  );
}

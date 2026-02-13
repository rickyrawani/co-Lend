// pages/create-mta.tsx
import React from "react";
import BankDetails from "@/components/mta-tabs/bankdetails";
import NbfcDetails from "@/components/mta-tabs/nbfcDetails";
import LendingRatio from "@/components/mta-tabs/LendingRatio";
import Approval from "@/components/mta-tabs/Approval";

const tabs = ["Bank Details", "NBFC Details", "Lending Ratio", "Approval"];

export default function CreateMTA() {
  const [activeTab, setActiveTab] = React.useState("Bank Details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "NBFC Details":
        return (
          <NbfcDetails
            onBack={() => setActiveTab("Bank Details")}
            onNext={() => setActiveTab("Lending Ratio")}
          />
        );

      case "Lending Ratio":
        return (
          <LendingRatio
            onBack={() => setActiveTab("NBFC Details")}
            onNext={() => console.log("Submit MTA")}
          />
        );

        case "Approval":
        return (
            <Approval
            onBack={() => setActiveTab("Lending Ratio")}
            onSubmit={() => console.log("FINAL MTA SUBMIT")}
            />
        );


      default:
        return (
          <BankDetails
            onNext={() => setActiveTab("NBFC Details")}
          />
        );
    }
  };

  return (
    <div className="ml-64 p-8 space-y-6">
      <h1 className="text-2xl font-bold">Create New MTA</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2
              ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pt-4">
        {renderTabContent()}
      </div>
    </div>
  );
}

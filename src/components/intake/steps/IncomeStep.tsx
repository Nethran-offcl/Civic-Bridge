"use client";

import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { INCOME_LABELS, type IncomeRange } from "@/types/profile";
import type { IntakeStepProps } from "../types";

const incomeOptions = Object.entries(INCOME_LABELS) as Array<[IncomeRange, string]>;

export function IncomeStep({ value, onChange }: IntakeStepProps) {
  return (
    <div className="grid gap-3">
      {incomeOptions.map(([income, label]) => (
        <Button
          key={income}
          type="button"
          variant={value.annualIncome === income ? "default" : "secondary"}
          onClick={() => onChange({ annualIncome: income })}
          className="min-h-14 justify-start"
        >
          <IndianRupee className="h-5 w-5" />
          {label}
        </Button>
      ))}
    </div>
  );
}

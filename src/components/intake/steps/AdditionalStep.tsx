"use client";

import { Accessibility, Sprout } from "lucide-react";
import { Select } from "@/components/ui/Select";
import type { CasteCategory, LandHolding } from "@/types/profile";
import type { IntakeStepProps } from "../types";

const casteOptions: CasteCategory[] = ["prefer_not_to_say", "SC", "ST", "OBC", "General"];
const landOptions: LandHolding[] = ["landless", "below_1acre", "1_2acres", "2_5acres", "above_5acres"];

const landLabels: Record<LandHolding, string> = {
  landless: "Landless",
  below_1acre: "Below 1 acre",
  "1_2acres": "1 to 2 acres",
  "2_5acres": "2 to 5 acres",
  above_5acres: "Above 5 acres"
};

export function AdditionalStep({ value, onChange }: IntakeStepProps) {
  return (
    <div className="space-y-5">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-800">Social category</span>
        <Select value={value.caste} onChange={(event) => onChange({ caste: event.target.value as CasteCategory })}>
          {casteOptions.map((option) => (
            <option key={option} value={option}>
              {option === "prefer_not_to_say" ? "Prefer not to say" : option}
            </option>
          ))}
        </Select>
      </label>
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Sprout className="h-4 w-4" />
          Land holding
        </span>
        <Select
          value={value.landHolding ?? "landless"}
          onChange={(event) => onChange({ landHolding: event.target.value as LandHolding })}
        >
          {landOptions.map((option) => (
            <option key={option} value={option}>
              {landLabels[option]}
            </option>
          ))}
        </Select>
      </label>
      <label className="flex min-h-14 items-center justify-between gap-4 rounded-md border border-slate-200 bg-white px-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Accessibility className="h-4 w-4" />
          Person with disability
        </span>
        <input
          type="checkbox"
          checked={value.disability ?? false}
          onChange={(event) => onChange({ disability: event.target.checked })}
          className="h-5 w-5 accent-brand-500"
        />
      </label>
    </div>
  );
}

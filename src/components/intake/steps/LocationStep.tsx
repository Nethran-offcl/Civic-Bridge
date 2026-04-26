"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { IntakeStepProps } from "../types";

const states = [
  "Karnataka",
  "Rajasthan",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "Kerala",
  "Gujarat",
  "Uttar Pradesh",
  "Bihar",
  "Madhya Pradesh",
  "West Bengal",
  "Odisha",
  "Punjab",
  "Haryana",
  "Assam",
  "Jharkhand",
  "Chhattisgarh"
];

export function LocationStep({ value, onChange }: IntakeStepProps) {
  return (
    <div className="space-y-5">
      <label className="block space-y-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <MapPin className="h-4 w-4" />
          State
        </span>
        <Select value={value.state} onChange={(event) => onChange({ state: event.target.value })}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-800">District</span>
        <Input
          value={value.district}
          onChange={(event) => onChange({ district: event.target.value })}
          placeholder="Example: Mandya"
        />
      </label>
    </div>
  );
}

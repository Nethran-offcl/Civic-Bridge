"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { SchemeCategory } from "@/types/scheme";

const categories: Array<{ value: SchemeCategory | "all"; label: string }> = [
  { value: "all", label: "All categories" },
  { value: "agriculture", label: "Agriculture" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "housing", label: "Housing" },
  { value: "women", label: "Women" },
  { value: "skill", label: "Skill" },
  { value: "pension", label: "Pension" },
  { value: "startup", label: "Business" },
  { value: "insurance", label: "Insurance" },
  { value: "labour", label: "Labour" }
];

export function FilterBar({
  query,
  category,
  onQueryChange,
  onCategoryChange
}: {
  query: string;
  category: SchemeCategory | "all";
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: SchemeCategory | "all") => void;
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_220px]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search schemes, documents, benefits"
          className="pl-9"
        />
      </label>
      <Select value={category} onChange={(event) => onCategoryChange(event.target.value as SchemeCategory | "all")}>
        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

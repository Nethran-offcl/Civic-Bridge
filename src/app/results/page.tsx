"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EligibilitySummary } from "@/components/results/EligibilitySummary";
import { FilterBar } from "@/components/results/FilterBar";
import { SchemeGrid } from "@/components/results/SchemeGrid";
import { useProfileStore } from "@/store/profileStore";
import type { SchemeCategory } from "@/types/scheme";

export default function ResultsPage() {
  const matches = useProfileStore((state) => state.matches);
  const profile = useProfileStore((state) => state.profile);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SchemeCategory | "all">("all");

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return matches.filter((match) => {
      const categoryMatch = category === "all" || match.scheme.category === category;
      const text = [
        match.scheme.name,
        match.scheme.description,
        match.scheme.tags.join(" "),
        match.scheme.documents.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return categoryMatch && (!lowered || text.includes(lowered));
    });
  }, [category, matches, query]);

  if (!profile || matches.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-950">Start with the intake form</h1>
        <p className="mt-3 text-slate-600">Your matched schemes will appear here after you answer five quick sections.</p>
        <Button asChild className="mt-6">
          <Link href="/intake">
            Start intake
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Matched schemes</h1>
          <p className="mt-2 text-slate-600">
            Sorted for a {profile.age}-year-old {profile.occupation.replace(/_/g, " ")} in {profile.state}.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/intake">Edit profile</Link>
        </Button>
      </div>
      <EligibilitySummary matches={matches} />
      <FilterBar query={query} category={category} onQueryChange={setQuery} onCategoryChange={setCategory} />
      <SchemeGrid matches={filtered} />
    </div>
  );
}

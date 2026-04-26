import { SchemeCard } from "./SchemeCard";
import type { MatchResult } from "@/types/scheme";

export function SchemeGrid({ matches }: { matches: MatchResult[] }) {
  if (matches.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="font-semibold text-slate-950">No schemes match these filters yet.</p>
        <p className="mt-2 text-sm text-slate-600">Try a broader category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {matches.map((match) => (
        <SchemeCard key={match.scheme.id} match={match} />
      ))}
    </div>
  );
}

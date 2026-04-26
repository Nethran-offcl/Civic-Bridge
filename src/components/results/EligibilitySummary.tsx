import { CircleCheck, ClipboardList, TriangleAlert } from "lucide-react";
import type { MatchResult } from "@/types/scheme";

export function EligibilitySummary({ matches }: { matches: MatchResult[] }) {
  const eligible = matches.filter((match) => match.status === "Eligible").length;
  const likely = matches.filter((match) => match.status === "Likely Eligible").length;
  const verify = matches.filter((match) => match.status === "Check Required").length;

  const items = [
    { label: "Eligible", value: eligible, icon: CircleCheck, className: "text-emerald-700 bg-emerald-50" },
    { label: "Likely", value: likely, icon: ClipboardList, className: "text-amber-700 bg-amber-50" },
    { label: "Verify", value: verify, icon: TriangleAlert, className: "text-slate-700 bg-slate-100" }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${item.className}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-slate-950">{item.value}</p>
            <p className="text-sm font-medium text-slate-600">{item.label} schemes</p>
          </div>
        );
      })}
    </div>
  );
}

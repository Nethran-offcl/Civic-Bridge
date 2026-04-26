import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { getCategoryAccent } from "@/lib/schemes";
import type { MatchResult } from "@/types/scheme";

function badgeTone(status: MatchResult["status"]) {
  if (status === "Eligible") return "green";
  if (status === "Likely Eligible") return "yellow";
  return "slate";
}

export function SchemeCard({ match }: { match: MatchResult }) {
  const { scheme } = match;
  const benefit = scheme.benefits[0];

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: getCategoryAccent(scheme.category) }} />
      <CardContent className="flex h-full flex-col gap-4 p-5 pl-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">{scheme.category}</p>
            <h3 className="text-lg font-bold leading-tight text-slate-950">{scheme.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{scheme.description}</p>
          </div>
          <Badge tone={badgeTone(match.status)}>{match.status}</Badge>
        </div>

        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase text-slate-500">Top benefit</p>
          <p className="mt-1 text-base font-bold text-slate-950">{benefit?.amount ?? benefit?.title ?? "Benefit varies"}</p>
          <p className="text-sm text-slate-600">{benefit?.description}</p>
        </div>

        <div className="space-y-2">
          {match.matchedCriteria.slice(0, 3).map((criterion) => (
            <p key={criterion} className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              {criterion}
            </p>
          ))}
        </div>

        <div className="mt-auto grid gap-2 sm:grid-cols-3">
          <Button asChild variant="secondary" className="sm:col-span-1">
            <Link href={`/scheme/${scheme.id}`}>
              Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" className="sm:col-span-1">
            <Link href={`/chat?schemeId=${scheme.id}`}>
              <Bot className="h-4 w-4" />
              Ask AI
            </Link>
          </Button>
          {scheme.applicationUrl ? (
            <Button asChild className="sm:col-span-1">
              <a href={scheme.applicationUrl} target="_blank" rel="noreferrer">
                Apply
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

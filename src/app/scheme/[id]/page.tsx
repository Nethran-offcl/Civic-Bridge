import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getAllSchemes, getCategoryAccent, getSchemeById } from "@/lib/schemes";
import { SchemeReadiness } from "@/components/results/SchemeReadiness";

export function generateStaticParams() {
  return getAllSchemes().map((scheme) => ({ id: scheme.id }));
}

export default async function SchemeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scheme = getSchemeById(id);
  if (!scheme) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost">
        <Link href="/results">
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>
      </Button>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 h-2 rounded-full" style={{ backgroundColor: getCategoryAccent(scheme.category) }} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge tone="blue">{scheme.category}</Badge>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-950 dark:text-slate-100">{scheme.name}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">{scheme.descriptionDetailed}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link href={`/chat?schemeId=${scheme.id}`}>
                <Bot className="h-4 w-4" />
                Ask AI
              </Link>
            </Button>
            {scheme.applicationUrl ? (
              <Button asChild>
                <a href={scheme.applicationUrl} target="_blank" rel="noreferrer">
                  Apply
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <SchemeReadiness scheme={scheme} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheme.benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="font-bold text-slate-950 dark:text-slate-100">{benefit.amount ?? benefit.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Application steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheme.applicationProcess.map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-100">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-slate-100">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scheme.eligibility.notes.map((note) => (
                <p key={note} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                  {note}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scheme.documents.map((document) => (
                <p key={document} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <FileText className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  {document}
                </p>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

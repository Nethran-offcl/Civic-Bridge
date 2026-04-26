import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, FileSearch, Languages, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { getAllSchemes } from "@/lib/schemes";

const categories = [
  { label: "Agriculture", count: "4+", color: "bg-emerald-50 text-emerald-700" },
  { label: "Health", count: "1+", color: "bg-blue-50 text-blue-700" },
  { label: "Education", count: "2+", color: "bg-violet-50 text-violet-700" },
  { label: "Labour", count: "3+", color: "bg-amber-50 text-amber-700" }
];

const steps = [
  { icon: FileSearch, title: "Tell us basics", text: "Age, location, occupation, income, and optional details." },
  { icon: CheckCircle2, title: "See matches", text: "Hard eligibility filters plus transparent score signals." },
  { icon: Bot, title: "Ask follow-ups", text: "Chat explains documents, steps, and official portals." }
];

export default function HomePage() {
  const schemeCount = getAllSchemes().length;

  return (
    <div className="bg-slate-50">
      <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
            <ShieldCheck className="h-4 w-4" />
            Privacy-first scheme discovery
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            CivicBridge
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-650">
            Find welfare schemes you may qualify for, understand the documents needed, and get simple application guidance in your language.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/intake">
                Find my schemes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/chat">
                Ask assistant
                <Bot className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 ring-1 ring-slate-200">
              <p className="text-2xl font-bold text-slate-950">{schemeCount}</p>
              <p className="text-sm text-slate-600">seed schemes</p>
            </div>
            <div className="rounded-lg bg-white p-4 ring-1 ring-slate-200">
              <p className="text-2xl font-bold text-slate-950">8</p>
              <p className="text-sm text-slate-600">languages</p>
            </div>
            <div className="rounded-lg bg-white p-4 ring-1 ring-slate-200">
              <p className="text-2xl font-bold text-slate-950">0</p>
              <p className="text-sm text-slate-600">signup needed</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-5 flex items-center gap-3">
              <Image src="/logo.svg" alt="CivicBridge app mark" width={56} height={56} className="rounded-lg" />
              <div>
                <p className="font-bold text-slate-950">Live match preview</p>
                <p className="text-sm text-slate-600">52-year-old farmer in Karnataka</p>
              </div>
            </div>
            <div className="space-y-3">
              {["PM-KISAN Samman Nidhi", "Pradhan Mantri Fasal Bima Yojana", "MGNREGA"].map((name, index) => (
                <div key={name} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-950">{name}</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                      {95 - index * 5}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Occupation, income, and location match.</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
              <Languages className="h-4 w-4 text-brand-600" />
              Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title}>
                  <CardContent className="p-5">
                    <Icon className="h-7 w-7 text-brand-600" />
                    <h2 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {categories.map((category) => (
              <div key={category.label} className={`rounded-lg p-4 ${category.color}`}>
                <p className="text-xl font-bold">{category.count}</p>
                <p className="text-sm font-semibold">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

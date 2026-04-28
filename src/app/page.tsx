"use client";

import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, FileSearch, Languages, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const categories = [
  { label: "Agriculture", count: "4+", color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
  { label: "Health", count: "1+", color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
  { label: "Education", count: "2+", color: "from-violet-500 to-violet-600", shadow: "shadow-violet-500/20" },
  { label: "Labour", count: "3+", color: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/20" }
];

const steps = [
  { icon: FileSearch, title: "Tell us basics", text: "Age, location, occupation, income, and optional details." },
  { icon: CheckCircle2, title: "See matches", text: "Hard eligibility filters plus transparent score signals." },
  { icon: Bot, title: "Ask follow-ups", text: "Chat explains documents, steps, and official portals." }
];

export default function HomePage() {
  const { t } = useTranslation();
  const schemeCount = 37;

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors">
      {/* Dynamic Background */}
      <div className="bg-gradient-glow"></div>
      
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-20">
        
        {/* Left Column - Hero Content */}
        <div className="flex flex-col justify-center animate-slide-up">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass-panel px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-300 ring-1 ring-sky-400/30">
            <ShieldCheck className="h-4 w-4 text-sky-500 dark:text-sky-400" />
            <span className="tracking-wide">{t("Privacy-first scheme discovery")}</span>
          </div>
          
          <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            {t("Unlock your")} <br/>
            <span className="text-gradient drop-shadow-sm">{t("Civic Benefits")}</span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t("Discover welfare schemes you qualify for. Navigate applications with confidence using our AI assistant, available in your preferred language.")}
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/intake" className="btn-primary flex items-center justify-center gap-2 group">
              {t("Find my schemes")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/chat" className="btn-secondary flex items-center justify-center gap-2 group">
              {t("Ask AI Assistant")}
              <Bot className="h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:animate-pulse" />
            </Link>
          </div>
          
          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3 animate-slide-up stagger-1">
            {[
              { value: schemeCount, label: t("Active Schemes") },
              { value: "8+", label: t("Languages") },
              { value: "100%", label: t("Free & Private") }
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Visual/Interactive elements */}
        <div className="flex items-center justify-center lg:justify-end animate-slide-up stagger-2">
          <div className="relative w-full max-w-md animate-float">
            {/* Glow behind the card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-400 to-purple-500 opacity-20 dark:opacity-30 blur-2xl"></div>
            
            <div className="glass-panel relative rounded-3xl p-6 md:p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{t("Live Match Engine")}</p>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t("52-year-old farmer in Karnataka")}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "PM-KISAN Samman Nidhi", score: 95, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-400/10" },
                  { name: "Pradhan Mantri Fasal Bima", score: 85, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-400/10" },
                  { name: "MGNREGA", score: 70, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-400/10" }
                ].map((scheme, index) => (
                  <div key={index} className="glass-card group relative overflow-hidden rounded-xl p-4 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/10 dark:via-white/5 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{scheme.name}</p>
                      <span className={`rounded-full ${scheme.bg} px-2.5 py-1 text-xs font-bold ${scheme.color} border border-slate-200 dark:border-white/10`}>
                        {scheme.score}% {t("Match")}
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r from-sky-400 to-purple-500 transition-all duration-1000 ease-out`}
                        style={{ width: `${scheme.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-100/50 dark:bg-white/5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                <Languages className="h-5 w-5 text-sky-500 dark:text-sky-400" />
                <span className="marquee-container overflow-hidden whitespace-nowrap">
                  <span>Hindi • Kannada • Tamil • Telugu • Marathi • Bengali • Gujarati</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t("How it works")}</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t("Three simple steps to discover your benefits.")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={`glass-card rounded-2xl p-8 text-center animate-slide-up stagger-${i+1}`}>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-purple-100 dark:from-sky-500/20 dark:to-purple-500/20 ring-1 ring-slate-200 dark:ring-white/10 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t(step.title)}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{t(step.text)}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
            {categories.map((category, i) => (
              <div key={i} className="glass-card group relative overflow-hidden rounded-2xl p-6 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 dark:opacity-0 transition-opacity duration-300 group-hover:opacity-15 dark:group-hover:opacity-10`}></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">{t(category.label)}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{category.count}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${category.color} shadow-lg ${category.shadow}`}>
                    <ArrowRight className="h-5 w-5 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

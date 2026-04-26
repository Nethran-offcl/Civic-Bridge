import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:glass-panel dark:bg-transparent transition-colors">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white transition-colors">
          <div className="rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 p-1 shadow-md dark:shadow-lg">
            <Image src="/logo.svg" alt="CivicBridge logo" width={28} height={28} className="rounded-sm dark:brightness-0 dark:invert" />
          </div>
          <span className="tracking-tight">CivicBridge</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link href="/intake" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">Intake</Link>
          <Link href="/results" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">Results</Link>
          <Link href="/chat" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">Chat</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 sm:flex transition-colors">
            <ShieldCheck className="h-4 w-4" />
            Private by default
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

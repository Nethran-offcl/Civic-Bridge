import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-950">
          <Image src="/logo.svg" alt="CivicBridge logo" width={36} height={36} className="rounded-md" />
          <span>CivicBridge</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <Link href="/intake" className="hover:text-brand-600">Intake</Link>
          <Link href="/results" className="hover:text-brand-600">Results</Link>
          <Link href="/chat" className="hover:text-brand-600">Chat</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 text-xs font-semibold text-emerald-700 sm:flex">
            <ShieldCheck className="h-4 w-4" />
            Private by default
          </div>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

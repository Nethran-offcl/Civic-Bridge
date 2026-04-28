"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, ArrowLeft, UserRound } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsSignedIn(Boolean(data.user));
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:glass-panel dark:bg-transparent transition-colors">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          {pathname !== "/" && (
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
              aria-label={t("Go back")}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white transition-colors">
            <div className="rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 p-1 shadow-md dark:shadow-lg">
              <Image src="/logo.svg" alt="CivicBridge logo" width={28} height={28} className="rounded-sm" />
            </div>
            <span className="tracking-tight hidden sm:inline-block">CivicBridge</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link href="/intake" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Intake")}</Link>
          <Link href="/results" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Results")}</Link>
          <Link href="/chat" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Chat")}</Link>
          {isSignedIn ? (
            <Link href="/profile" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Profile")}</Link>
          ) : (
            <>
              <Link href="/login" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Login")}</Link>
              <Link href="/register" className="hover:text-brand-600 dark:hover:text-sky-400 transition-colors">{t("Register")}</Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={isSignedIn ? "/profile" : "/login"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-sky-400 md:hidden"
            aria-label={isSignedIn ? t("Profile") : t("Login")}
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 sm:flex transition-colors">
            <ShieldCheck className="h-4 w-4" />
            {t("Private by default")}
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

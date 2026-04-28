"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 relative z-10 transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{t("CivicBridge helps citizens discover schemes. Verify final eligibility on official portals.")}</p>
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {t("Never share Aadhaar, OTP, or bank details in chat.")}
        </p>
      </div>
    </footer>
  );
}

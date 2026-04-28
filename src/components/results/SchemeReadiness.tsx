"use client";

import { type Scheme } from "@/types/scheme";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, FileText, MapPin, Clock } from "lucide-react";

export function SchemeReadiness({ scheme }: { scheme: Scheme }) {
  return (
    <Card className="border-t-4 border-t-emerald-500 shadow-md mb-6">
      <CardContent className="pt-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-sky-500" />
            Document Checklist
          </h3>
          
          <div className="space-y-3">
            {scheme.documents.map(doc => (
              <div key={doc} className="flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Action Plan</h3>
            
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Where to apply</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {scheme.applicationUrl ? (
                      <a href={scheme.applicationUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400 block break-all">
                        {scheme.applicationUrl}
                      </a>
                    ) : "Visit your local district office or Gram Panchayat."}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Expected Timeline</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Usually processed within 30-45 working days after document submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
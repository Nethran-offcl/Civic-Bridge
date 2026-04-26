import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/Progress";

export function StepIndicator({
  steps,
  currentStep
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="space-y-4">
      <Progress value={((currentStep + 1) / steps.length) * 100} />
      <ol className="grid grid-cols-5 gap-2">
        {steps.map((step, index) => (
          <li key={step} className="min-w-0">
            <div
              className={cn(
                "flex min-h-11 items-center justify-center rounded-md border px-2 text-center text-xs font-semibold",
                index < currentStep && "border-brand-500 bg-brand-50 text-brand-700",
                index === currentStep && "border-brand-500 bg-white text-brand-700 shadow-sm",
                index > currentStep && "border-slate-200 bg-slate-50 text-slate-500"
              )}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : <span className="truncate">{step}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

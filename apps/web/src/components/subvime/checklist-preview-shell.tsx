import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/shared";
import { ChecklistViewer } from "@/components/subvime/checklist-viewer";
import { Button } from "@/components/ui";
import type { ChecklistStep } from "@/types/checklist";

interface ChecklistPreviewShellProps {
  backHref?: string;
  backLabel?: string;
  metaRight?: ReactNode;
  badges?: ReactNode;
  title: string;
  description?: string;
  subtitle?: ReactNode;
  steps: ChecklistStep[];
  onStepsChange?: (steps: ChecklistStep[]) => void;
  readOnly?: boolean;
  primaryActionLabel: string;
  onPrimaryAction: () => void | Promise<void>;
  primaryActionLoading?: boolean;
}

export function ChecklistPreviewShell({
  backHref = "/app",
  backLabel = "← Back",
  metaRight,
  badges,
  title,
  description,
  subtitle,
  steps,
  onStepsChange,
  readOnly = false,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionLoading = false,
}: ChecklistPreviewShellProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-12 pt-20">
        <div className="mb-4 flex items-center justify-between text-xs text-white/35">
          <Link to={backHref} className="hover:text-white/60">
            {backLabel}
          </Link>
          {metaRight}
        </div>

        <div className="mb-4">
          {badges && <div className="mb-2 flex flex-wrap items-center gap-2">{badges}</div>}
          <h1 className="text-lg font-medium text-white">{title}</h1>
          {description && <p className="mt-2 text-sm text-white/45">{description}</p>}
          {subtitle}
        </div>

        <div className="mb-4 rounded-2xl border border-white/5 bg-white/2 p-1">
          <ChecklistViewer
            steps={steps}
            readOnly={readOnly}
            onChange={onStepsChange}
          />
        </div>

        <Button fullWidth onClick={() => void onPrimaryAction()} isLoading={primaryActionLoading}>
          {primaryActionLabel}
        </Button>
      </main>
      <Footer />
    </div>
  );
}

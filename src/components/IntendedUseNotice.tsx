"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslations } from "@/i18n/messages";

interface IntendedUseNoticeProps {
  className?: string;
}

export default function IntendedUseNotice({ className = "" }: IntendedUseNoticeProps) {
  const t = useTranslations("IntendedUse");

  return (
    <p
      role="note"
      aria-label="Intended use"
      className={`flex items-start gap-1.5 text-xs text-slate-500 leading-relaxed ${className}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
      {t("notice")}
    </p>
  );
}


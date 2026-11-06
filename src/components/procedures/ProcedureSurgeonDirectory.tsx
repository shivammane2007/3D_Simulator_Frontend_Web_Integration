import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "@/i18n/messages";

interface ProcedureSurgeonDirectoryProps {
  procedureSlug: string;
  procedureName: string;
  preferredCity?: string;
}

export default async function ProcedureSurgeonDirectory({
  procedureName,
}: ProcedureSurgeonDirectoryProps) {
  const t = await getTranslations("ProcedurePage");

  return (
    <section
      className="bg-warm py-12 md:py-16 border-y border-slate-200"
      aria-labelledby="surgeon-directory-heading"
    >
      <div className="container mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase text-sage mb-3">
            {t("surgeonDirectory.eyebrow")}
          </p>
          <h2
            id="surgeon-directory-heading"
            className="text-xl md:text-2xl font-body font-semibold text-ink mb-3"
          >
            {t("surgeonDirectory.headingEmpty", { procedure: procedureName.toLowerCase() })}
          </h2>
          <p className="text-sm text-slate-600 font-body mb-6 leading-relaxed">
            {t("surgeonDirectory.emptyBody", { procedure: procedureName.toLowerCase() })}
          </p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent("/onboarding?cohort=pune")}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sage hover:bg-sage-light text-white text-sm font-semibold rounded-full transition-colors font-body"
          >
            {t("surgeonDirectory.applyToList")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

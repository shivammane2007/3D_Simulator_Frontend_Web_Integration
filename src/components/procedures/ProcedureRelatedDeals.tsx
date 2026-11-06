import { Link } from "@/i18n/routing";
import { ArrowRight, Tag } from "lucide-react";

interface ProcedureRelatedDealsProps {
  procedureSlug: string;
  procedureName: string;
  preferredCity?: string;
}

export default async function ProcedureRelatedDeals({
  procedureSlug,
  procedureName,
}: ProcedureRelatedDealsProps) {
  return (
    <section
      className="bg-white py-14 md:py-20 border-y border-slate-200"
      aria-labelledby="related-deals-heading"
    >
      <div className="container mx-auto px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase text-[#CF4500] mb-2">
                Live deals
              </p>
              <h2
                id="related-deals-heading"
                className="text-2xl md:text-3xl font-body font-semibold text-ink leading-tight"
              >
                {procedureName} deals from vetted clinics
              </h2>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#CF4500]/5 to-warm border border-[#CF4500]/15 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#CF4500]/15 border border-[#CF4500]/25 flex items-center justify-center">
              <Tag className="w-6 h-6 text-[#CF4500]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-body font-semibold text-ink mb-2">
              No live {procedureName.toLowerCase()} deals yet
            </h3>
            <p className="text-sm text-slate-600 font-body max-w-md mx-auto mb-6 leading-relaxed">
              Be the first {procedureName.toLowerCase()} clinic listed in your city; Pune founder cohort: 0% commission until 1 August 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/login?callbackUrl=${encodeURIComponent("/onboarding?cohort=pune")}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-semibold rounded-full transition-colors font-body shadow-sm"
              >
                Apply for cohort <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

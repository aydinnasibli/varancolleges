import { getActiveExams } from "@/app/actions/exam-public";
import {
  Timer,
  BarChart3,
  ArrowRight,
  Clock,
} from "lucide-react";
import ExamNavbar from "@/components/exam/ExamNavbar";
import Footer from "@/components/layout/Footer";
import ExamSections from "./ExamSections";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Exam.listing" });
  const canonical =
    locale === "az"
      ? "https://www.varancolleges.com/exam"
      : `https://www.varancolleges.com/${locale}/exam`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "x-default": "https://www.varancolleges.com/exam",
        az: "https://www.varancolleges.com/exam",
        en: "https://www.varancolleges.com/en/exam",
      },
    },
  };
}

export default async function ExamListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [result, t, tExam] = await Promise.all([
    getActiveExams(),
    getTranslations({ locale, namespace: "Exam.listing" }),
    getTranslations({ locale, namespace: "Exam" }),
  ]);
  const allExams = result.success ? result.exams : [];
  const now = new Date();
  const upcomingExams = allExams.filter((e) => new Date((e as { examDate: string }).examDate) > now);
  const pastExams = allExams.filter((e) => new Date((e as { examDate: string }).examDate) <= now);

  return (
    <>
      <ExamNavbar />
      <main className="min-h-screen bg-white">

        {/* ── HERO — 50/50 split ──────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] bg-navy">

          {/* Left */}
          <div className="flex flex-col justify-between px-10 py-32 lg:py-40 lg:px-16">
            <p className="text-[9px] font-bold tracking-[0.14em] text-white/50 uppercase">
              {t("title")}
            </p>
            <div className="mt-auto">
              <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                {t("title")}
              </h1>
              <p className="text-base leading-[1.85] text-white/60 mt-6 max-w-md">
                {t("description")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-navy font-semibold px-7 py-3 rounded mt-8 text-sm transition-colors"
              >
                {t("registerNow")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right — exam structure table */}
          <div className="flex flex-col justify-center px-10 py-16 lg:px-16 border-l border-white/10">
            <p className="text-[10px] font-bold tracking-[0.14em] text-white/40 uppercase mb-6">
              {tExam("examStructure")}
            </p>

            <div className="flex flex-col gap-px">
              {[
                { module: "Reading & Writing — M1", questions: "27 q", time: "32 min" },
                { module: "Reading & Writing — M2", questions: "27 q", time: "32 min" },
                { module: "Math — Module 1", questions: "22 q", time: "35 min" },
                { module: "Math — Module 2", questions: "22 q", time: "35 min" },
              ].map(({ module, questions, time }) => (
                <div
                  key={module}
                  className="grid grid-cols-[1fr_40px_52px] items-center border border-white/10 rounded px-4 py-3"
                >
                  <span className="text-sm text-white/80 font-medium">{module}</span>
                  <span className="text-xs text-white/50 text-right">{questions}</span>
                  <span className="text-xs text-white/50 text-right">{time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-white/40 font-medium">
                {tExam("totalQuestions")}
              </span>
              <span className="text-xs text-white/40 font-medium">
                {tExam("scoreRange")}
              </span>
            </div>
          </div>

        </section>

        {/* ── HOW IT WORKS — bordered 3-column grid ───────────────────── */}
        <section className="py-24 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-[56px] font-bold text-navy leading-none mb-[52px]">
              {t("howItWorks.title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
              {[
                {
                  step: "01",
                  title: t("howItWorks.step1.title"),
                  desc: t("howItWorks.step1.desc"),
                },
                {
                  step: "02",
                  title: t("howItWorks.step2.title"),
                  desc: t("howItWorks.step2.desc"),
                },
                {
                  step: "03",
                  title: t("howItWorks.step3.title"),
                  desc: t("howItWorks.step3.desc"),
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-white px-9 py-10 flex flex-col min-h-[220px]"
                >
                  <p className="font-serif text-[64px] font-bold leading-none text-border mb-6">
                    {step}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXAM SECTIONS ────────────────────────────────────────────── */}
        <section id="exams" className="max-w-7xl mx-auto px-6 py-16">
          <ExamSections
            upcomingExams={upcomingExams as Parameters<typeof ExamSections>[0]["upcomingExams"]}
            pastExams={pastExams as Parameters<typeof ExamSections>[0]["pastExams"]}
            labels={{
              upcomingExams: t("availableExams"),
              activeSession: t("activeSession"),
              pastExams: t("pastExams"),
              questions: t("questions"),
              adaptive: t("adaptive"),
              viewDetails: t("viewDetails"),
              noExams: t("noExams"),
              noPastExams: t("noExams"),
              examDate: t("examDate"),
              showPastExams: t("pastExams"),
              hidePastExams: t("pastExams"),
            }}
          />
        </section>

        {/* ── FEATURES — bordered 3-column grid ───────────────────────── */}
        <section className="py-24 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
              {(
                [
                  { key: "timedModules", icon: Timer },
                  { key: "timedSections", icon: Clock },
                  { key: "detailedResults", icon: BarChart3 },
                ] as const
              ).map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="bg-white px-9 py-10 flex flex-col items-center text-center min-h-[190px] hover:bg-surface transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-navy/10 border border-navy/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-navy-light" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy mb-2">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`features.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

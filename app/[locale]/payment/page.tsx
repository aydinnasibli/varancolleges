import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentForm from "./PaymentForm";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [user, t, sp] = await Promise.all([
    currentUser(),
    getTranslations("Payment"),
    searchParams,
  ]);

  const paymentSuccess = sp.payment === "success";
  const paymentCancelled = sp.payment === "cancelled";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-text-secondary">
        {paymentSuccess && (
          <div className="bg-green-50 border-b border-green-200 py-3 px-6 text-center text-sm text-green-600 font-medium flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {t("successBanner")}
          </div>
        )}
        {paymentCancelled && (
          <div className="bg-yellow-50 border-b border-yellow-200 py-3 px-6 text-center text-sm text-yellow-600 font-medium flex items-center justify-center gap-2">
            <XCircle className="h-4 w-4" />
            {t("cancelledBanner")}
          </div>
        )}

        {/* Header */}
        <section className="border-b border-border py-12 bg-gradient-to-b from-surface to-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy/10 border border-navy/20 mb-5">
              <CreditCard className="h-7 w-7 text-navy-light" />
            </div>
            <h1 className="text-3xl font-bold text-navy mb-2">{t("title")}</h1>
            <p className="text-text-secondary">{t("subtitle")}</p>
            {user && (
              <p className="text-sm text-text-muted mt-3">
                {user.firstName} {user.lastName} &middot;{" "}
                {user.primaryEmailAddress?.emailAddress}
              </p>
            )}
          </div>
        </section>

        {/* Payment Form */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <PaymentForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

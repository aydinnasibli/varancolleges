import Link from "next/link";
import { ChevronLeft, Wallet, CreditCard, Banknote } from "lucide-react";
import { getExamById, getExamPayments } from "@/app/actions/exam-admin";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ExamPaymentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [examResult, paymentsResult] = await Promise.all([
    getExamById(id),
    getExamPayments(id),
  ]);

  if (!examResult.success || !examResult.exam) notFound();

  const exam = examResult.exam as { title: string; type: string };
  const payments = paymentsResult.success ? paymentsResult.payments ?? [] : [];
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/exam"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Geri
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ödəyənlər</h1>
          <p className="text-sm text-slate-500 mt-0.5">{exam.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1152d4]/10">
            <Wallet className="h-5 w-5 text-[#1152d4]" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Ödəyən sayı</p>
            <p className="text-xl font-bold text-slate-900">{payments.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
            <Banknote className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Ümumi məbləğ</p>
            <p className="text-xl font-bold text-slate-900">₼{(totalAmount / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Wallet className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Bu imtahana hələ heç kim ödəniş etməyib</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">İstifadəçi</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ödəniş üsulu</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Məbləğ</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tarix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    {p.user ? (
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {p.user.firstName} {p.user.lastName}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{p.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">{p.userId}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.paymentMethod === "cash" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Banknote className="h-3.5 w-3.5" />
                        Nağd
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CreditCard className="h-3.5 w-3.5" />
                        Kart
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    ₼{(p.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {p.purchasedAt
                      ? new Date(p.purchasedAt).toLocaleDateString("az-AZ", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

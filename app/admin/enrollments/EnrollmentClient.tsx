"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Trash2, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { grantExamAccess, revokeExamAccess } from "@/app/actions/exam-admin";

type User = {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Exam = {
  _id: string;
  title: string;
  type: string;
  price: number;
};

type Enrollment = {
  _id: string;
  userId: string;
  status: string;
  amount: number;
  purchasedAt: string | null;
  createdAt: string | null;
  user: { email: string; firstName: string; lastName: string } | null;
  exam: { _id: string; title: string; type: string } | null;
};

export function EnrollmentClient({
  users,
  exams,
  enrollments,
}: {
  users: User[];
  exams: Exam[];
  enrollments: Enrollment[];
}) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [revokeError, setRevokeError] = useState("");
  const [isGrantPending, startGrantTransition] = useTransition();
  const [isRevokePending, startRevokeTransition] = useTransition();

  const handleGrant = () => {
    setError("");
    setSuccess("");
    if (!selectedUserId || !selectedExamId) {
      setError("İstifadəçi və imtahan seçin");
      return;
    }
    startGrantTransition(async () => {
      const result = await grantExamAccess(selectedUserId, selectedExamId);
      if (result.success) {
        setSuccess("Giriş uğurla verildi!");
        setSelectedUserId("");
        setSelectedExamId("");
        router.refresh();
      } else {
        setError(result.error ?? "Xəta baş verdi");
      }
    });
  };

  const handleRevoke = (purchaseId: string) => {
    setRevokeError("");
    startRevokeTransition(async () => {
      const result = await revokeExamAccess(purchaseId);
      if (result.success) {
        router.refresh();
      } else {
        setRevokeError(result.error ?? "Ləğv etmək mümkün olmadı");
      }
    });
  };

  const activeEnrollments = enrollments.filter((e) => e.status === "completed");
  const revokedEnrollments = enrollments.filter((e) => e.status === "cancelled");

  return (
    <div className="space-y-6">
      {/* Grant Access Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <UserPlus className="h-5 w-5 text-[#1152d4]" />
          <h2 className="text-base font-semibold text-slate-900">Giriş Ver</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              İstifadəçi
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                setError("");
                setSuccess("");
              }}
              disabled={isGrantPending}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] disabled:opacity-50"
            >
              <option value="">— İstifadəçi seçin —</option>
              {users.map((u) => (
                <option key={u.clerkId} value={u.clerkId}>
                  {u.firstName} {u.lastName} — {u.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              İmtahan
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => {
                setSelectedExamId(e.target.value);
                setError("");
                setSuccess("");
              }}
              disabled={isGrantPending}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]/30 focus:border-[#1152d4] disabled:opacity-50"
            >
              <option value="">— İmtahan seçin —</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.title} ({exam.type}) — ₼{(exam.price / 100).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 mb-4">
            <CheckCircle className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        <button
          onClick={handleGrant}
          disabled={isGrantPending || !selectedUserId || !selectedExamId}
          className="flex items-center gap-2 bg-[#1152d4] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0e42b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus className="h-4 w-4" />
          {isGrantPending ? "Yüklənir..." : "Giriş Ver"}
        </button>
      </div>

      {/* Active Enrollments Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200">
          <Users className="h-5 w-5 text-[#1152d4]" />
          <h2 className="text-base font-semibold text-slate-900">
            Aktiv Nağd Qeydiyyatlar
          </h2>
          <span className="ml-auto bg-[#1152d4]/10 text-[#1152d4] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {activeEnrollments.length}
          </span>
        </div>

        {revokeError && (
          <div className="mx-6 mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {revokeError}
          </div>
        )}

        {activeEnrollments.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm">Hələ nağd qeydiyyat yoxdur</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  İstifadəçi
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  İmtahan
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Məbləğ
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tarix
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Əməliyyat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeEnrollments.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    {enrollment.user ? (
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {enrollment.user.firstName} {enrollment.user.lastName}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{enrollment.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">{enrollment.userId}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {enrollment.exam ? (
                      <div>
                        <p className="text-sm text-slate-900">{enrollment.exam.title}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-0.5">
                          {enrollment.exam.type}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    ₼{(enrollment.amount / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {enrollment.createdAt
                      ? new Date(enrollment.createdAt).toLocaleDateString("az-AZ", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRevoke(enrollment._id)}
                      disabled={isRevokePending}
                      className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 border border-red-200 hover:border-red-400 px-2.5 py-1.5 rounded-lg transition-colors ml-auto disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Ləğv et
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Revoked Enrollments */}
      {revokedEnrollments.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200">
            <XCircle className="h-5 w-5 text-slate-400" />
            <h2 className="text-base font-semibold text-slate-900">Ləğv Edilmiş Qeydiyyatlar</h2>
            <span className="ml-auto bg-slate-100 text-slate-500 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {revokedEnrollments.length}
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  İstifadəçi
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  İmtahan
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tarix
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {revokedEnrollments.map((enrollment) => (
                <tr key={enrollment._id} className="opacity-60">
                  <td className="px-6 py-4">
                    {enrollment.user ? (
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {enrollment.user.firstName} {enrollment.user.lastName}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{enrollment.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">{enrollment.userId}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-700">{enrollment.exam?.title ?? "—"}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {enrollment.createdAt
                      ? new Date(enrollment.createdAt).toLocaleDateString("az-AZ", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
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

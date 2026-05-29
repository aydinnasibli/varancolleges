import { getAllUsers, getAllExams, getManualEnrollments } from "@/app/actions/exam-admin";
import { EnrollmentClient } from "./EnrollmentClient";

export const dynamic = "force-dynamic";

export default async function EnrollmentsPage() {
  const [usersResult, examsResult, enrollmentsResult] = await Promise.all([
    getAllUsers(),
    getAllExams(),
    getManualEnrollments(),
  ]);

  const users = usersResult.success ? (usersResult.users ?? []) : [];
  const exams = examsResult.success ? (examsResult.exams ?? []) : [];
  const enrollments = enrollmentsResult.success ? (enrollmentsResult.enrollments ?? []) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kassa Qeydiyyat</h1>
        <p className="text-sm text-slate-500 mt-1">
          Nağd ödəniş etmiş tələbələrə imtahana giriş verin
        </p>
      </div>
      <EnrollmentClient
        users={users as { _id: string; clerkId: string; email: string; firstName: string; lastName: string }[]}
        exams={exams as { _id: string; title: string; type: string; price: number }[]}
        enrollments={enrollments}
      />
    </div>
  );
}

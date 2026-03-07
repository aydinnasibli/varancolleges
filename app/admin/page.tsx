import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import Contact from "@/models/Contact";
import { FileText, Mail, Activity, Eye, Users } from "lucide-react";
import { getCloudflareAnalytics } from "@/lib/cloudflare";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectToDatabase();

  // Fetch counts from DB (handling DB offline errors gracefully for local dev)
  let blogCount = 0;
  let applicationCount = 0;

  try {
    blogCount = await Post.countDocuments();
    applicationCount = await Contact.countDocuments();
  } catch (error) {
    console.warn("Could not fetch counts, DB might be offline", error);
  }

  const analytics = await getCloudflareAnalytics();

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome to the VaranColleges admin dashboard.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Blog Posts Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Blog Posts</p>
            <p className="text-2xl font-bold text-slate-900">{blogCount}</p>
          </div>
        </div>

        {/* Applications Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Applications</p>
            <p className="text-2xl font-bold text-slate-900">{applicationCount}</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-slate-200 flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Website Analytics (Last 30 Days)</h2>
        </div>

        <div className="p-6">
          {analytics.error ? (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-lg border border-amber-200">
              <p className="font-medium text-sm">Analytics Notice: {analytics.error.includes('configured') ? 'Integration Pending' : 'Data Unavailable'}</p>
              <p className="text-xs mt-1">
                {analytics.error === 'Cloudflare credentials not configured' ? (
                  <>To view website analytics here, add <code className="font-mono bg-amber-100 px-1 rounded">CLOUDFLARE_API_TOKEN</code> and <code className="font-mono bg-amber-100 px-1 rounded">CLOUDFLARE_ACCOUNT_ID</code> to your environment variables.</>
                ) : (
                  <>Unable to load analytics data: <strong>{analytics.error}</strong></>
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pageviews */}
              <div className="flex flex-col gap-2 p-6 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Page Views</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {analytics.data?.pageViews?.toLocaleString() || 0}
                </div>
              </div>

              {/* Visitors */}
              <div className="flex flex-col gap-2 p-6 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Unique Visitors</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {analytics.data?.visits?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <a
              href="https://dash.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1152d4] hover:text-[#1152d4]/80 text-sm font-medium flex items-center gap-1"
            >
              View detailed dashboard on Cloudflare &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

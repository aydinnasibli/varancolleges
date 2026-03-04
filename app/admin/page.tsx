import Link from "next/link";
import {
  Plus,
  Users,
  ArrowUp,
  FileText,
  Mail,
  ArrowDown,
  MoreHorizontal,
  Edit2,
  FileEdit,
  Filter,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-slate-900 text-3xl font-bold leading-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <button className="flex items-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-[#1152d4] text-white text-sm font-medium leading-normal hover:bg-[#1152d4]/90 transition-colors shadow-sm shadow-[#1152d4]/20">
          <Plus className="h-[20px] w-[20px]" />
          <span>New Post</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Users className="h-[20px] w-[20px]" />
            <p className="text-sm font-medium">Total Students</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-slate-900 text-3xl font-bold leading-none">
              1,250
            </p>
            <p className="text-green-600 text-sm font-medium flex items-center bg-green-50 px-2 py-1 rounded">
              <ArrowUp className="h-[16px] w-[16px]" />
              5.2%
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <FileText className="h-[20px] w-[20px]" />
            <p className="text-sm font-medium">Active Blogs</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-slate-900 text-3xl font-bold leading-none">45</p>
            <p className="text-green-600 text-sm font-medium flex items-center bg-green-50 px-2 py-1 rounded">
              <ArrowUp className="h-[16px] w-[16px]" />
              2.1%
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Mail className="h-[20px] w-[20px]" />
            <p className="text-sm font-medium">New Inquiries</p>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="text-slate-900 text-3xl font-bold leading-none">12</p>
            <p className="text-red-600 text-sm font-medium flex items-center bg-red-50 px-2 py-1 rounded">
              <ArrowDown className="h-[16px] w-[16px]" />
              1.5%
            </p>
          </div>
        </div>
      </div>

      {/* Charts and Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistika Chart (Span 2 cols on lg) */}
        <div className="lg:col-span-2 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h2 className="text-slate-900 text-lg font-bold">Statistika</h2>
              <p className="text-slate-500 text-sm mt-1">
                Student growth over the last 6 months
              </p>
            </div>
            <select className="form-select text-sm border border-slate-200 rounded-lg bg-[#f6f6f8] text-slate-700 py-1.5 pl-3 pr-8 focus:ring-[#1152d4] focus:border-[#1152d4] outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="p-6 relative">
            <div className="absolute inset-0 flex flex-col justify-between p-6 pb-12 pointer-events-none">
              <div className="border-b border-slate-100 w-full h-0"></div>
              <div className="border-b border-slate-100 w-full h-0"></div>
              <div className="border-b border-slate-100 w-full h-0"></div>
              <div className="border-b border-slate-100 w-full h-0"></div>
            </div>
            <div className="h-[240px] w-full mt-4">
              {/* Simulated Chart SVG */}
              <svg
                className="text-[#1152d4] overflow-visible"
                fill="none"
                height="100%"
                preserveAspectRatio="none"
                viewBox="0 0 480 200"
                width="100%"
              >
                {/* Gradient Fill */}
                <path
                  d="M0 160 C 40 160, 60 120, 100 120 C 140 120, 160 140, 200 140 C 240 140, 260 80, 300 80 C 340 80, 360 40, 400 40 C 440 40, 460 20, 480 20 L 480 200 L 0 200 Z"
                  fill="url(#chart-gradient)"
                  opacity="0.2"
                ></path>
                {/* Line */}
                <path
                  d="M0 160 C 40 160, 60 120, 100 120 C 140 120, 160 140, 200 140 C 240 140, 260 80, 300 80 C 340 80, 360 40, 400 40 C 440 40, 460 20, 480 20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                ></path>
                <defs>
                  <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="1"></stop>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex justify-between mt-4 px-2">
              <span className="text-slate-400 text-xs font-semibold">Jan</span>
              <span className="text-slate-400 text-xs font-semibold">Feb</span>
              <span className="text-slate-400 text-xs font-semibold">Mar</span>
              <span className="text-slate-400 text-xs font-semibold">Apr</span>
              <span className="text-slate-400 text-xs font-semibold">May</span>
              <span className="text-slate-400 text-xs font-semibold">Jun</span>
            </div>
          </div>
        </div>

        {/* Blog İdarəetmə (Span 1 col on lg) */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden h-[400px]">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-slate-900 text-lg font-bold">Blog İdarəetmə</h2>
            <button className="text-[#1152d4] hover:text-[#1152d4]/80 transition-colors">
              <MoreHorizontal className="h-[20px] w-[20px]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {/* Blog Item 1 */}
            <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div
                className="w-12 h-12 rounded bg-slate-200 bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=60')",
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 truncate">
                  Top 10 Universities in Europe
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Published 2 days ago
                </p>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-[#1152d4] transition-colors">
                  <Edit2 className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            {/* Blog Item 2 */}
            <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div
                className="w-12 h-12 rounded bg-slate-200 bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400&auto=format&fit=crop&q=60')",
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 truncate">
                  Guide to Student Visas
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  Published 5 days ago
                </p>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-[#1152d4] transition-colors">
                  <Edit2 className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            {/* Blog Item 3 */}
            <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div className="w-12 h-12 rounded bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 border border-slate-200">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 truncate">
                  How to Write a Personal Statement
                </h3>
                <p className="text-xs text-amber-500 truncate mt-0.5 flex items-center gap-1">
                  <FileEdit className="h-[12px] w-[12px]" /> Draft
                </p>
              </div>
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-[#1152d4] transition-colors">
                  <Edit2 className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-slate-200">
            <button className="w-full py-2 text-sm text-center text-[#1152d4] font-medium hover:bg-[#1152d4]/5 rounded transition-colors">
              View All Posts
            </button>
          </div>
        </div>
      </div>

      {/* Müraciətlər Table */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-slate-900 text-lg font-bold">
              Müraciətlər (Recent Inquiries)
            </h2>
          </div>
          <button className="text-sm text-slate-500 hover:text-[#1152d4] transition-colors flex items-center gap-1">
            <Filter className="h-[18px] w-[18px]" /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold first:pl-6">Name</th>
                <th className="p-4 font-semibold">Subject</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right last:pr-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      AS
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Ali Samadov</p>
                      <p className="text-xs text-slate-500">
                        ali.s@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-700">
                  Admission Process Inquiry
                </td>
                <td className="p-4 text-slate-500">Today, 10:42 AM</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                    PENDING
                  </span>
                </td>
                <td className="p-4 text-right last:pr-6">
                  <button className="text-slate-400 hover:text-[#1152d4] transition-colors p-1">
                    <Eye className="h-[20px] w-[20px]" />
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                      LQ
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        Leyla Qasimova
                      </p>
                      <p className="text-xs text-slate-500">
                        leyla99@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-700">Scholarship Information</td>
                <td className="p-4 text-slate-500">Yesterday</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                    REPLIED
                  </span>
                </td>
                <td className="p-4 text-right last:pr-6">
                  <button className="text-slate-400 hover:text-[#1152d4] transition-colors p-1">
                    <Eye className="h-[20px] w-[20px]" />
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 first:pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs">
                      MN
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        Murad Novruzov
                      </p>
                      <p className="text-xs text-slate-500">
                        m.novruzov@example.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-700">Campus Tour Request</td>
                <td className="p-4 text-slate-500">Oct 24, 2023</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                    REPLIED
                  </span>
                </td>
                <td className="p-4 text-right last:pr-6">
                  <button className="text-slate-400 hover:text-[#1152d4] transition-colors p-1">
                    <Eye className="h-[20px] w-[20px]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
          <span>Showing 1 to 3 of 12 entries</span>
          <div className="flex gap-1">
            <button
              className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-50"
              disabled
            >
              Prev
            </button>
            <button className="px-2 py-1 rounded bg-[#1152d4] text-white">
              1
            </button>
            <button className="px-2 py-1 rounded hover:bg-slate-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

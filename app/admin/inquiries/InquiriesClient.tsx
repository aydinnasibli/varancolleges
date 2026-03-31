"use client";

import { useState, useEffect } from "react";
import { markInquiryAsRead } from "@/app/actions/contact-actions";
import { Eye, CheckCircle2, Clock, Mail, Phone, User, Calendar, MessageSquare } from "lucide-react";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
};

export function InquiriesClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  const handleOpenDetails = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);

    // Automatically mark as read if it isn't
    if (!inquiry.isRead) {
      setIsLoading(true);
      try {
        const result = await markInquiryAsRead(inquiry._id);
        if (result.success) {
          // Update local state
          setInquiries(prev =>
            prev.map(item =>
              item._id === inquiry._id ? { ...item, isRead: true } : item
            )
          );
        }
      } catch (error) {
        console.error("Failed to mark as read:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setSelectedInquiry(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 font-medium text-slate-600 text-sm">Status</th>
              <th className="p-4 font-medium text-slate-600 text-sm">Ad, Soyad</th>
              <th className="p-4 font-medium text-slate-600 text-sm">Əlaqə</th>
              <th className="p-4 font-medium text-slate-600 text-sm">Tarix</th>
              <th className="p-4 font-medium text-slate-600 text-sm text-right">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Heç bir müraciət tapılmadı.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr
                  key={inquiry._id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    !inquiry.isRead ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="p-4">
                    {inquiry.isRead ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Oxunub
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Clock className="w-3.5 h-3.5" />
                        Yeni
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className={`text-sm ${!inquiry.isRead ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                      {inquiry.name}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        {inquiry.phone}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        {inquiry.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {new Date(inquiry.createdAt).toLocaleDateString('az-AZ')}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDetails(inquiry)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-[#1152d4] hover:bg-blue-50 transition-colors"
                      title="Ətraflı bax"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Heç bir müraciət tapılmadı.
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className={`p-4 flex flex-col gap-3 ${!inquiry.isRead ? "bg-blue-50/30" : ""}`}
            >
              <div className="flex justify-between items-start">
                <p className={`text-sm ${!inquiry.isRead ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                  {inquiry.name}
                </p>
                {inquiry.isRead ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                    <CheckCircle2 className="w-3 h-3" />
                    Oxunub
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">
                    <Clock className="w-3 h-3" />
                    Yeni
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-600">{inquiry.phone}</p>
                <p className="text-xs text-slate-500">{inquiry.email}</p>
              </div>
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {new Date(inquiry.createdAt).toLocaleDateString('az-AZ')}
                </span>
                <button
                  onClick={() => handleOpenDetails(inquiry)}
                  className="text-xs font-medium text-[#1152d4] flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ətraflı
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">Müraciət Detalları</h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6">
              {/* User Info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Ad, Soyad</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedInquiry.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Telefon Nömrəsi</p>
                    <p className="text-sm font-medium text-slate-900">
                      <a href={`tel:${selectedInquiry.phone}`} className="hover:text-blue-600 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">E-poçt Ünvanı</p>
                    <p className="text-sm font-medium text-slate-900">
                      <a href={`mailto:${selectedInquiry.email}`} className="hover:text-blue-600 hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Tarix və Saat</p>
                    <p className="text-sm font-medium text-slate-900">{formatDate(selectedInquiry.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Mesaj</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message || <span className="text-slate-400 italic">Mesaj daxil edilməyib</span>}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

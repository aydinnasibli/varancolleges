import { Link } from "@/i18n/routing";
import Image from "next/image";
import { CreditCard, ArrowRight } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const tNav = await getTranslations("Navigation");
  const tFoot = await getTranslations("Footer");
  const tGen = await getTranslations("General");

  return (
    <footer className="bg-navy pt-[72px] border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1.4fr_1fr] gap-12 pb-14 border-b border-white/[0.07]">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Link href="/">
                <Image
                  src="/images/logo-light.png"
                  alt="Varan Colleges"
                  width={800}
                  height={450}
                  className="h-9 w-auto object-contain opacity-90"
                />
              </Link>
            </div>
            <p className="text-[13px] leading-[1.8] text-white/45 max-w-[260px] mb-6">
              {tFoot("brandDesc")}
            </p>
            <p className="text-xs text-white/28 leading-[1.7]">
              137A Samad Vurgun, Baku 1022<br />
              +994 77 188 50 50
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[10px] font-bold text-white/50 tracking-[0.16em] uppercase mb-5">
              {tNav("home")}
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: tNav("home"), href: "/" },
                { label: tNav("services"), href: "/services" },
                { label: tNav("about"), href: "/about" },
                { label: tNav("studyAbroad"), href: "/study-abroad" },
                { label: tNav("blog"), href: "/blog" },
                { label: tNav("mockExams"), href: "/exam" },
                { label: tNav("contact"), href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-white/45 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold text-white/50 tracking-[0.16em] uppercase mb-5">
              {tNav("services")}
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: tFoot("ielts"), href: "/services/ielts" },
                { label: tFoot("sat"), href: "/services/sat" },
                { label: tNav("studyAbroad"), href: "/study-abroad" },
                { label: tNav("services"), href: "/services" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-white/45 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-white/50 tracking-[0.16em] uppercase mb-5">
              {tNav("contact")}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@varancolleges.com" className="text-[13px] text-white/45 hover:text-white transition-colors">
                info@varancolleges.com
              </a>
              <a href="tel:+994771885050" className="text-[13px] text-white/45 hover:text-white transition-colors">
                +994 77 188 50 50
              </a>
              <p className="text-[13px] text-white/45 leading-[1.65]">
                {tGen("workingHours")}
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <a
                href="https://wa.me/994771885050"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] border border-white/10 rounded-[5px] flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white/80 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/varancollegesltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] border border-white/10 rounded-[5px] flex items-center justify-center text-white/40 hover:border-white/30 hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment CTA */}
        <div className="my-8 rounded-lg border border-white/10 bg-white/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-white/60" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{tFoot("paymentCta")}</p>
              <p className="text-white/40 text-xs mt-0.5">{tFoot("paymentCtaDesc")}</p>
            </div>
          </div>
          <Link
            href="/payment"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-navy font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            {tFoot("paymentCta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="py-[22px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} VaranColleges. {tFoot("rights")}</p>
          <div className="flex gap-6 text-xs text-white/25">
            <span>{tFoot("privacy")}</span>
            <span>{tFoot("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

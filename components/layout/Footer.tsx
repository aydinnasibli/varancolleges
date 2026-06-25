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
    <footer className="bg-navy pt-16 lg:pt-20 border-t border-white/5">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1.4fr_1fr] gap-10 lg:gap-8 pb-12 border-b border-white/6">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Link href="/">
                <Image
                  src="/images/logo-light.png"
                  alt="Varan Colleges"
                  width={800}
                  height={450}
                  className="h-8 w-auto object-contain opacity-90"
                />
              </Link>
            </div>
            <p className="text-[13px] leading-[1.8] text-white/55 max-w-[260px] mb-5">
              {tFoot("brandDesc")}
            </p>
            <p className="text-[12px] text-white/50 leading-[1.7]">
              137A Samad Vurgun, Baku 1022<br />
              +994 77 188 50 50
            </p>
          </div>

          {/* Pages */}
          <nav aria-label="Footer navigation">
            <h3 className="text-[10px] font-bold text-white/60 tracking-[0.16em] uppercase mb-4">
              {tNav("home")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: tNav("home"), href: "/" },
                { label: tNav("services"), href: "/services" },
                { label: tNav("about"), href: "/about" },
                { label: tNav("studyAbroad"), href: "/study-abroad" },
                { label: tNav("blog"), href: "/blog" },
                { label: tNav("mockExams"), href: "/exam" },
                { label: tNav("contact"), href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/55 hover:text-white/75 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-[10px] font-bold text-white/60 tracking-[0.16em] uppercase mb-4">
              {tNav("services")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: tFoot("ielts"), href: "/services/ielts" },
                { label: tFoot("sat"), href: "/services/sat" },
                { label: tNav("studyAbroad"), href: "/study-abroad" },
                { label: tNav("services"), href: "/services" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/55 hover:text-white/75 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold text-white/60 tracking-[0.16em] uppercase mb-4">
              {tNav("contact")}
            </h3>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:info@varancolleges.com" className="text-[13px] text-white/55 hover:text-white/75 transition-colors">
                info@varancolleges.com
              </a>
              <a href="tel:+994771885050" className="text-[13px] text-white/55 hover:text-white/75 transition-colors">
                +994 77 188 50 50
              </a>
              <p className="text-[13px] text-white/55 leading-[1.65]">
                {tGen("workingHours")}
              </p>
            </div>
            <div className="flex gap-2 mt-5">
              <a
                href="https://wa.me/994771885050"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 rounded-md flex items-center justify-center text-white/55 hover:border-white/25 hover:text-white/70 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/varancollegesltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 rounded-md flex items-center justify-center text-white/55 hover:border-white/25 hover:text-white/70 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment CTA */}
        <div className="my-7 rounded-lg border border-white/8 bg-white/3 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center shrink-0">
              <CreditCard className="w-4.5 h-4.5 text-white/50" />
            </div>
            <div>
              <p className="text-white font-semibold text-[13px]">{tFoot("paymentCta")}</p>
              <p className="text-white/55 text-[12px] mt-0.5">{tFoot("paymentCtaDesc")}</p>
            </div>
          </div>
          <Link
            href="/payment"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-navy font-semibold text-[13px] px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors"
          >
            {tFoot("paymentCta")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/50">© {new Date().getFullYear()} VaranColleges. {tFoot("rights")}</p>
          <div className="flex gap-5 text-[11px] text-white/50">
            <span>{tFoot("privacy")}</span>
            <span>{tFoot("terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

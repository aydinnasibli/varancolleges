import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Footer = () => {
  const tNav = useTranslations("Navigation");
  const tFoot = useTranslations("Footer");

  return (
    <footer className="bg-background-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-8">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Varan Colleges"
                  width={800}
                  height={450}
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light">
              {tFoot("brandDesc")}
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/varancollegesltd/" className="transform hover:scale-110 duration-300 text-slate-500 hover:text-accent" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://wa.me/994771885050" className="transform hover:scale-110 duration-300 text-slate-500 hover:text-accent" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-serif font-medium mb-8">{tNav("services")}</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              {[
                { label: tNav("studyAbroad"), href: "/study-abroad" },
                { label: "IELTS Hazırlığı", href: "#" },
                { label: "SAT Hazırlığı", href: "#" },
                { label: "Yay Məktəbləri", href: "#" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-serif font-medium mb-8">{tNav("about")}</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              {[
                { label: tNav("about"), href: "/about" },
                { label: "Komandamız", href: "#" },
                { label: "Vakansiyalar", href: "#" },
                { label: "Blog", href: "/blog" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-serif font-medium mb-8">{tNav("contact")}</h4>
            <ul className="space-y-6 text-sm text-slate-500 font-light">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-white mb-1 font-medium">Ünvan</p>
                  <p className="group-hover:text-white transition-colors leading-relaxed">137A Samad Vurgun,<br/>Baku 1022, Azerbaijan</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Phone className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-white mb-1 font-medium">Telefon</p>
                  <a href="tel:+994771885050" className="group-hover:text-white transition-colors block hover:translate-x-1 transition-transform">+994 77 188 50 50</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Mail className="w-4 h-4 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-white mb-1 font-medium">Email</p>
                  <a href="mailto:info@varancolleges.com" className="group-hover:text-white transition-colors block hover:translate-x-1 transition-transform">info@varancolleges.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2026 VaranColleges. {tFoot("rights")}</p>
          <div className="flex items-center space-x-8 text-xs text-slate-600">
            <LanguageSwitcher />
            <Link href="#" className="hover:text-white transition-colors">Məxfilik Siyasəti</Link>
            <Link href="#" className="hover:text-white transition-colors">İstifadə Şərtləri</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

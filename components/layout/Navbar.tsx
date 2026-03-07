"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import Image from "next/image";
import { Menu, X, Phone, MapPin } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/custom-icons";
import { Button } from "@/components/ui/button";
import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const tGen = useTranslations("General");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-primary/90 backdrop-blur-md py-3 shadow-lg border-white/10"
            : "bg-transparent py-5 border-white/5"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/images/logo.png"
                  alt="Varan Colleges"
                  width={600}
                  height={300}
                  className="h-14 w-auto object-contain drop-shadow-lg"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <ul className="flex space-x-8">
                {[
                  { name: t("home"), href: "/" },
                  { name: t("services"), href: "/services" },
                  { name: t("studyAbroad"), href: "/study-abroad" },
                  { name: t("about"), href: "/about" },
                  { name: t("blog"), href: "/blog" },
                  { name: t("contact"), href: "/contact" },
                ].map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 relative group px-2 py-1 ${
                          isActive ? "text-accent" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                        <span
                          className={`absolute -bottom-1 left-0 w-full h-[2px] bg-accent transform origin-left transition-transform duration-300 ease-out ${
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4 border-r border-white/10 pr-6">
                <LanguageSwitcher />
                <a href="https://wa.me/994771885050" className="text-white/80 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/varancollegesltd/" className="text-white/80 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
              <ApplicationModal />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-accent transition-colors p-2 bg-white/5 rounded-lg border border-white/10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full pt-28 pb-8 px-6 overflow-y-auto">
          <nav className="flex-1">
            <ul className="space-y-4">
              {[
                { name: t("home"), href: "/" },
                { name: t("services"), href: "/services" },
                { name: t("studyAbroad"), href: "/study-abroad" },
                { name: t("about"), href: "/about" },
                { name: t("blog"), href: "/blog" },
                { name: t("contact"), href: "/contact" },
              ].map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.name}
                    className={`transform transition-all duration-300 ${
                      isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`block py-3 text-2xl font-serif border-b border-white/10 ${
                        isActive ? "text-accent" : "text-white/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={`mt-8 space-y-8 transform transition-all duration-500 delay-300 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
             <div className="space-y-4">
                <a href="tel:+994771885050" className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span>+994 77 188 50 50</span>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm">137A Samad Vurgun, Baku 1022</span>
                </div>
             </div>

             <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <a href="https://wa.me/994771885050" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/varancollegesltd/" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-6 h-6" />
                </a>
             </div>

             <div onClick={closeMobileMenu}>
                 <ApplicationModal>
                     <Button variant="accent" className="w-full h-14 text-lg">{tGen("applyNow")}</Button>
                 </ApplicationModal>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

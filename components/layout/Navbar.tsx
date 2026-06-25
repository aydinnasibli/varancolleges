"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Phone, Mail, Clock, CreditCard } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import { cn } from "@/lib/utils";
import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const tGen = useTranslations("General");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: t("studyAbroad"), href: "/study-abroad" },
    { name: t("about"), href: "/about" },
    { name: t("blog"), href: "/blog" },
    { name: t("mockExams"), href: "/exam" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy hidden lg:block">
        <div className="container-main h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+994771885050"
              className="flex items-center gap-2 text-[11px] text-white/50 tracking-wide hover:text-white/75 transition-colors"
            >
              <Phone className="w-3 h-3" />
              +994 77 188 50 50
            </a>
            <a
              href="mailto:info@varancolleges.com"
              className="flex items-center gap-2 text-[11px] text-white/50 tracking-wide hover:text-white/75 transition-colors"
            >
              <Mail className="w-3 h-3" />
              info@varancolleges.com
            </a>
            <span className="flex items-center gap-2 text-[11px] text-white/50 tracking-wide">
              <Clock className="w-3 h-3" />
              {tGen("workingHours")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/payment"
              className="flex items-center gap-2 text-[11px] text-white/60 font-semibold tracking-wide hover:text-white/85 transition-colors"
            >
              <CreditCard className="w-3 h-3" />
              {tGen("payOnline")}
            </Link>
            <span className="w-px h-3 bg-white/10" aria-hidden="true" />
            <a
              href="https://wa.me/994771885050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/75 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/varancollegesltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/75 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 h-16",
          isScrolled
            ? "bg-white/[0.97] backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-border/60"
            : "bg-white border-b border-border"
        )}
        aria-label="Main navigation"
      >
        <div className="container-main h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <span className="font-serif text-[22px] font-bold text-navy tracking-tight">
                Varan<span className="font-normal ml-0.5 text-navy/70">Colleges</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-medium tracking-[0.01em] transition-colors px-3 py-2 rounded-md",
                    pathname === item.href
                      ? "text-navy bg-navy/[0.04]"
                      : "text-text-secondary hover:text-navy hover:bg-navy/[0.03]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side: Language + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <ApplicationModal>
                <button className="bg-navy text-white px-5 py-2 rounded-md text-[13px] font-semibold tracking-[0.02em] hover:bg-navy-mid transition-colors">
                  {tGen("applyNow")}
                </button>
              </ApplicationModal>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-navy p-1.5 -mr-1.5"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/30 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "lg:hidden fixed top-0 right-0 z-50 w-[min(320px,85vw)] h-full bg-white shadow-xl transition-transform duration-300 ease-out overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <span className="font-serif text-lg font-bold text-navy">
            Varan<span className="font-normal ml-0.5 text-navy/70">Colleges</span>
          </span>
          <button
            onClick={closeMobileMenu}
            className="text-navy p-1.5 -mr-1.5"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-6 flex flex-col gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[15px] font-medium py-3 px-3 rounded-md transition-colors",
                pathname === item.href
                  ? "text-navy bg-navy/[0.05]"
                  : "text-text-secondary hover:text-navy hover:bg-navy/[0.03]"
              )}
              onClick={closeMobileMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="px-5 pt-2 pb-6 mt-auto border-t border-border">
          <div className="mb-4 pt-4">
            <LanguageSwitcher />
          </div>
          <div onClick={closeMobileMenu}>
            <ApplicationModal>
              <button className="w-full bg-navy text-white py-3 rounded-md text-[13px] font-semibold hover:bg-navy-mid transition-colors">
                {tGen("applyNow")}
              </button>
            </ApplicationModal>
          </div>

          <div className="mt-5 flex flex-col gap-2 text-[13px] text-text-muted">
            <a href="tel:+994771885050" className="flex items-center gap-2 hover:text-navy transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +994 77 188 50 50
            </a>
            <a href="mailto:info@varancolleges.com" className="flex items-center gap-2 hover:text-navy transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@varancolleges.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

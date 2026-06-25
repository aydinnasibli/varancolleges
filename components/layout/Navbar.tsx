"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="bg-navy border-b border-white/6 hidden lg:block">
        <div className="max-w-[1280px] mx-auto px-8 h-10 flex items-center justify-between">
          <div className="flex items-center gap-7">
            <a href="tel:+994771885050" className="flex items-center gap-[7px] text-xs text-white/50 tracking-wide hover:text-text-faint transition-colors">
              <Phone className="w-3 h-3" />
              +994 77 188 50 50
            </a>
            <a href="mailto:info@varancolleges.com" className="flex items-center gap-[7px] text-xs text-white/50 tracking-wide hover:text-text-faint transition-colors">
              <Mail className="w-3 h-3" />
              info@varancolleges.com
            </a>
            <span className="flex items-center gap-[7px] text-xs text-white/32 tracking-wide">
              <Clock className="w-3 h-3" />
              {tGen("workingHours")}
            </span>
          </div>
          <div className="flex items-center gap-[18px]">
            <Link href="/payment" className="flex items-center gap-[7px] text-xs text-text-faint font-semibold tracking-wide hover:text-white/80 transition-colors">
              <CreditCard className="w-3 h-3" />
              {tGen("payOnline")}
            </Link>
            <span className="w-px h-3.5 bg-white/10"></span>
            <a href="https://wa.me/994771885050" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-text-faint transition-colors" aria-label="WhatsApp">
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.instagram.com/varancollegesltd/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-text-faint transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 h-[68px]",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border"
            : "bg-white border-b border-border"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center cursor-pointer">
              <span className="font-serif text-2xl font-bold text-navy tracking-tight">
                Varan<span className="font-normal ml-1">Colleges</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-[26px]">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-medium tracking-[0.01em] transition-colors whitespace-nowrap",
                    pathname === item.href ? "text-navy" : "text-text-secondary hover:text-navy"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side: Language + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <ApplicationModal>
                <button className="bg-navy text-white border-none cursor-pointer px-[22px] py-[10px] rounded text-[13px] font-semibold tracking-[0.04em] hover:bg-navy-light transition-colors">
                  {tGen("applyNow")}
                </button>
              </ApplicationModal>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-navy hover:text-navy-light focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border py-4 px-4 flex flex-col space-y-1 shadow-lg animate-in slide-in-from-top-2">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-navy hover:text-navy-light py-3 px-2 border-b border-border/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 pb-1 px-2">
              <LanguageSwitcher />
            </div>
            <div className="w-full pt-2 px-2" onClick={() => setIsMobileMenuOpen(false)}>
              <ApplicationModal>
                <Button variant="accent" className="w-full">{tGen("applyNow")}</Button>
              </ApplicationModal>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

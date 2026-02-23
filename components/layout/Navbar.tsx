"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/custom-icons";
import { cn } from "@/lib/utils";
import { ApplicationModal } from "@/components/ui/ApplicationModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-primary border-b border-white/5 py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-slate-400 font-medium tracking-wide">
          <div className="flex items-center space-x-6">
            <a href="tel:+994771885050" className="flex items-center hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2 text-accent" />
              +994 77 188 50 50
            </a>
            <a href="mailto:info@varancolleges.com" className="flex items-center hover:text-accent transition-colors">
              <Mail className="w-4 h-4 mr-2 text-accent" />
              info@varancolleges.com
            </a>
            <span className="flex items-center text-slate-500">
              <Clock className="w-4 h-4 mr-2 text-accent" />
              B.e - C.ə: 09:00 - 18:00
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/994771885050"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://www.instagram.com/varancollegesltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b border-white/5",
          isScrolled ? "glass-panel h-20" : "bg-transparent h-24 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
              <Image
                src="/images/logo.png"
                alt="Varan Colleges"
                width={666}
                height={375}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-10 items-center">
              {[
                { name: "Ana Səhifə", href: "/" },
                { name: "Xidmətlər", href: "/services" },
                { name: "Xaricdə Təhsil", href: "/study-abroad" },
                { name: "Haqqımızda", href: "/about" },
                { name: "Blog", href: "/blog" },
                { name: "Əlaqə", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative group py-2",
                    pathname === item.href ? "text-white" : "text-slate-300 hover:text-accent"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="h-8 w-[1px] bg-white/10"></div>
              <ApplicationModal />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-accent focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-xl border-b border-white/10 py-4 px-4 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top-5">
            {[
              { name: "Ana Səhifə", href: "/" },
              { name: "Xidmətlər", href: "/services" },
              { name: "Xaricdə Təhsil", href: "/study-abroad" },
              { name: "Haqqımızda", href: "/about" },
              { name: "Blog", href: "/blog" },
              { name: "Əlaqə", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-white hover:text-accent py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="w-full mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              <ApplicationModal>
                 <Button variant="accent" className="w-full">Müraciət et</Button>
              </ApplicationModal>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

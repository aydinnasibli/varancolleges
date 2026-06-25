"use client";

import { useState, useEffect } from "react";
import { Link2, Facebook, Linkedin, Twitter, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/custom-icons";
import { toast } from "sonner";

export default function ShareButtons({ title, text }: { title: string, text?: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link kopyalandı");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Link kopyalana bilmədi");
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon className="w-4 h-4" />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366]/20 hover:text-[#25D366] text-text-secondary",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] text-text-secondary",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] text-text-secondary",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] text-text-secondary",
    },
  ];

  if (!url) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-text-secondary font-medium mr-2">Paylaş:</span>
      <div className="flex items-center gap-2 bg-surface border border-border p-1.5 rounded-full backdrop-blur-sm">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${link.color}`}
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <div className="w-px h-6 bg-border mx-1"></div>
        <button
          onClick={handleCopy}
          className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
            copied ? "bg-green-100 text-green-600" : "hover:bg-navy/10 hover:text-navy-light text-text-secondary"
          }`}
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

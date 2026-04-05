'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-3.5 h-3.5 text-slate-500" />
      <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
        <button
          disabled={isPending}
          onClick={() => handleLanguageChange('az')}
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
            locale === 'az'
              ? 'bg-accent text-primary font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          AZ
        </button>
        <button
          disabled={isPending}
          onClick={() => handleLanguageChange('en')}
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
            locale === 'en'
              ? 'bg-accent text-primary font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}

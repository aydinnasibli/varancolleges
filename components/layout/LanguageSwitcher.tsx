'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

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
    <div className="flex items-center space-x-2">
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange('az')}
        className={`text-sm ${
          locale === 'az' ? 'text-accent font-bold' : 'text-slate-400 hover:text-white'
        } transition-colors`}
      >
        AZ
      </button>
      <span className="text-slate-600">|</span>
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange('en')}
        className={`text-sm ${
          locale === 'en' ? 'text-accent font-bold' : 'text-slate-400 hover:text-white'
        } transition-colors`}
      >
        EN
      </button>
    </div>
  );
}

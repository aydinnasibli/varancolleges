import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

const Hero = async () => {
  const t = await getTranslations("StudyAbroad");
  const tGen = await getTranslations("General");

  return (
    <section className="bg-navy min-h-[520px] grid grid-cols-1 lg:grid-cols-2">
      {/* Left: text */}
      <div className="px-8 sm:px-12 lg:px-14 py-16 lg:py-20 flex flex-col justify-center lg:border-r border-white/[0.07]">
        <p className="text-[11px] font-bold tracking-[0.22em] text-white/50 uppercase mb-7">
          {t("subtitle")}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-bold text-white leading-[0.92] mb-6 tracking-tight">
          {t("heroTitle")}<br />
          <em className="italic">{t("heroSubtitle")}</em>
        </h1>
        <p className="text-[15px] text-white/55 leading-[1.8] max-w-[360px] mb-10">
          {t("heroDesc")}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-white text-navy border-none cursor-pointer px-9 py-3.5 rounded text-sm font-semibold tracking-[0.02em] hover:bg-surface-hover transition-colors"
          >
            {tGen("applyNow")}
          </Link>
          <a href="#destinations" className="bg-transparent text-white/35 border-none cursor-pointer text-[13px] font-medium px-0 py-3.5 hover:text-white/75 transition-colors">
            {t("destinations")} ↓
          </a>
        </div>
      </div>

      {/* Right: Globe SVG */}
      <div className="hidden lg:flex items-center justify-center p-10 relative overflow-hidden">
        <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" className="w-[330px] h-[330px] shrink-0" aria-hidden="true">
          <defs>
            <clipPath id="gc">
              <circle cx="180" cy="180" r="158"/>
            </clipPath>
            <radialGradient id="sph" cx="36%" cy="32%" r="68%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.07)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>
          </defs>

          <circle cx="180" cy="180" r="158" fill="rgba(255,255,255,0.018)"/>
          <circle cx="180" cy="180" r="158" fill="url(#sph)"/>

          <g clipPath="url(#gc)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" fill="none">
            <ellipse cx="180" cy="180" rx="158" ry="28"/>
            <ellipse cx="180" cy="150" rx="140" ry="22"/>
            <ellipse cx="180" cy="210" rx="140" ry="22"/>
            <ellipse cx="180" cy="120" rx="94"  ry="13"/>
            <ellipse cx="180" cy="240" rx="94"  ry="13"/>
            <ellipse cx="180" cy="94"  rx="46"  ry="7"/>
            <ellipse cx="180" cy="266" rx="46"  ry="7"/>
            <ellipse cx="180" cy="180" rx="22"  ry="158"/>
            <ellipse cx="180" cy="180" rx="65"  ry="158"/>
            <ellipse cx="180" cy="180" rx="112" ry="158"/>
            <ellipse cx="180" cy="180" rx="148" ry="158"/>
          </g>

          <circle cx="180" cy="180" r="158" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>

          <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
            <path d="M255,138 Q163,88  70,118"/>
            <path d="M255,138 Q162,80  66,92"/>
            <path d="M255,138 Q210,82  160,103"/>
            <path d="M255,138 Q224,100 192,115"/>
            <path d="M255,138 Q246,124 232,148"/>
            <path d="M255,138 Q266,210 306,244"/>
          </g>

          <g fill="rgba(255,255,255,0.32)">
            <circle cx="176" cy="101" r="2.2"/>
            <circle cx="174" cy="92"  r="2.2"/>
            <circle cx="208" cy="90"  r="2.2"/>
            <circle cx="222" cy="104" r="2.2"/>
            <circle cx="245" cy="127" r="2.2"/>
            <circle cx="269" cy="200" r="2.2"/>
          </g>

          <circle cx="70"  cy="118" r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="56"  y="110" fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">USA</text>

          <circle cx="66"  cy="92"  r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="52"  y="83"  fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">CANADA</text>

          <circle cx="160" cy="103" r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="160" y="94"  fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">UK</text>

          <circle cx="192" cy="115" r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="201" y="110" fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em">EU</text>

          <circle cx="232" cy="148" r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="244" y="143" fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em">TUR</text>

          <circle cx="306" cy="244" r="4.5" fill="rgba(255,255,255,0.8)"/>
          <text x="306" y="260" fill="rgba(255,255,255,0.38)" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.07em" textAnchor="middle">AUS</text>

          <circle cx="255" cy="138" r="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <circle cx="255" cy="138" r="5.5" fill="#fff"/>
          <text x="272" y="132" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.1em">BAKU</text>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

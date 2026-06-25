import Image from "next/image";
import { ApplicationModal } from "@/components/ui/ApplicationModal";
import { useTranslations } from "next-intl";

const StudyAbroad = () => {
  const t = useTranslations("StudyAbroad");
  const tGen = useTranslations("General");

  return (
    <section className="py-24 bg-surface relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div>
            <h2 className="text-navy-light font-medium tracking-[0.2em] uppercase text-sm mb-3">{t("subtitle")}</h2>
            <h3 className="text-4xl font-serif text-navy">{t("title")}</h3>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-border mt-12"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="group relative bg-white border border-border rounded-2xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full flex flex-col md:flex-row gap-6 p-8 items-center md:items-start">
              <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  alt="University Campus"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7p664vBGLYJcwQm6wHyALmUWmEctdyRayS9raqr6C82rmxOiaDoNCSzT1ysK68suwWLhgDgY-QtVhb8QElG1PyrFE8X4W3twPb-xRsjSWjlAm6trq4qOPa3PDdilTmHuJqPaZcwkFDqYH7ST3XKaSDUfLKao7NoAi_-Kc7AI2ZIzve0vW_DI3cNSxuwRqA0C07t5d1ugB9k-lkLZ0ERCI3LqfOX5Su34bk0Nl8m62zBRHrGkYfHOHjJG8ZtIWVNwKL2_Tfm2CgygK"
                  fill
                />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-serif text-navy mb-3 group-hover:text-navy-light transition-colors">
                  {t("service1Title")}
                </h4>
                <p className="text-text-muted text-sm mb-6 leading-relaxed font-light">
                  {t("service1Desc")}
                </p>
                <ul className="text-sm text-text-secondary space-y-2 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service1Feat1")}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service1Feat2")}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service1Feat3")}</li>
                </ul>
                <ApplicationModal>
                  <button className="inline-flex items-center px-6 py-3 border-[1.5px] border-border text-navy text-sm font-medium rounded-sm hover:border-navy transition-all duration-300">
                    {tGen("applyNow")}
                  </button>
                </ApplicationModal>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="group relative bg-white border border-border rounded-2xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full flex flex-col md:flex-row gap-6 p-8 items-center md:items-start">
              <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  alt="Students with documents"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7hFWkFEt8rghcjqHaTvPKWl7zHwvPblRsjKpHjyUJb62IiO0r1Ks6ATo3LIyYoJLqf2PzkLNmiuu3ndp6iAj73hWxR5FLnstHlRnhD-SVJF_Pc6BDUjb7GD_d98r0e7t1sLZuVz1mjReZdFqOVxWldHeT8qKDtETYxv7vJiQDOTkvSzRLpUXd7y8owLRE_8swEj-CR8E1F8IQo1jHm_hSMT0i9NJdHoEf-YqiGloKzkgsswGlyAgJbGO0_bE3m1czLkdlHji-_r8e"
                  fill
                />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-serif text-navy mb-3 group-hover:text-navy-light transition-colors">
                  {t("service2Title")}
                </h4>
                <p className="text-text-muted text-sm mb-6 leading-relaxed font-light">
                  {t("service2Desc")}
                </p>
                <ul className="text-sm text-text-secondary space-y-2 mb-6">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service2Feat1")}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service2Feat2")}</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-navy-light rounded-full"></span> {t("service2Feat3")}</li>
                </ul>
                <ApplicationModal>
                  <button className="inline-flex items-center px-6 py-3 border-[1.5px] border-border text-navy text-sm font-medium rounded-sm hover:border-navy transition-all duration-300">
                    {tGen("applyNow")}
                  </button>
                </ApplicationModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyAbroad;

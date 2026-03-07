import { getTranslations } from "next-intl/server";

export async function getStudyAbroadData(locale: string) {
  const t = await getTranslations({ locale, namespace: "StudyAbroadData" });

  return {
    hero: {
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      description: t("hero.description")
    },
    academicAdvice: {
      title: t("academicAdvice.title"),
      items: [
        t("academicAdvice.items.0"),
        t("academicAdvice.items.1"),
        t("academicAdvice.items.2"),
        t("academicAdvice.items.3"),
        t("academicAdvice.items.4")
      ]
    },
    admissionProcess: {
      title: t("admissionProcess.title"),
      description: t("admissionProcess.description"),
      items: [
        t("admissionProcess.items.0"),
        t("admissionProcess.items.1"),
        t("admissionProcess.items.2"),
        t("admissionProcess.items.3"),
        t("admissionProcess.items.4")
      ]
    },
    visaSupport: {
      title: t("visaSupport.title"),
      description: t("visaSupport.description"),
      items: [
        t("visaSupport.items.0"),
        t("visaSupport.items.1"),
        t("visaSupport.items.2"),
        t("visaSupport.items.3")
      ]
    },
    additionalServices: {
      title: t("additionalServices.title"),
      items: [
        t("additionalServices.items.0"),
        t("additionalServices.items.1"),
        t("additionalServices.items.2"),
        t("additionalServices.items.3")
      ]
    },
    countries: [
      {
        slug: "usa",
        name: t("countries.usa.name"),
        code: "us",
        flagUrl: "https://flagcdn.com/w1280/us.png",
        description: t("countries.usa.description"),
        features: [
          t("countries.usa.features.0"),
          t("countries.usa.features.1"),
          t("countries.usa.features.2"),
          t("countries.usa.features.3")
        ]
      },
      {
        slug: "canada",
        name: t("countries.canada.name"),
        code: "ca",
        flagUrl: "https://flagcdn.com/w1280/ca.png",
        description: t("countries.canada.description"),
        features: [
          t("countries.canada.features.0"),
          t("countries.canada.features.1"),
          t("countries.canada.features.2"),
          t("countries.canada.features.3")
        ]
      },
      {
        slug: "australia",
        name: t("countries.australia.name"),
        code: "au",
        flagUrl: "https://flagcdn.com/w1280/au.png",
        description: t("countries.australia.description"),
        features: [
          t("countries.australia.features.0"),
          t("countries.australia.features.1"),
          t("countries.australia.features.2")
        ]
      },
      {
        slug: "europe",
        name: t("countries.europe.name"),
        code: "eu",
        flagUrl: "https://flagcdn.com/w1280/eu.png",
        description: t("countries.europe.description"),
        features: [
          t("countries.europe.features.0"),
          t("countries.europe.features.1"),
          t("countries.europe.features.2"),
          t("countries.europe.features.3")
        ]
      },
      {
        slug: "turkey",
        name: t("countries.turkey.name"),
        code: "tr",
        flagUrl: "https://flagcdn.com/w1280/tr.png",
        description: t("countries.turkey.description"),
        features: [
          t("countries.turkey.features.0"),
          t("countries.turkey.features.1"),
          t("countries.turkey.features.2")
        ]
      },
      {
        slug: "uk",
        name: t("countries.uk.name"),
        code: "gb",
        flagUrl: "https://flagcdn.com/w1280/gb.png",
        description: t("countries.uk.description"),
        features: [
          t("countries.uk.features.0"),
          t("countries.uk.features.1"),
          t("countries.uk.features.2"),
          t("countries.uk.features.3")
        ]
      }
    ]
  };
}

export function getStudyAbroadDataClient(t: any) {
  return {
    hero: {
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      description: t("hero.description")
    },
    academicAdvice: {
      title: t("academicAdvice.title"),
      items: [
        t("academicAdvice.items.0"),
        t("academicAdvice.items.1"),
        t("academicAdvice.items.2"),
        t("academicAdvice.items.3"),
        t("academicAdvice.items.4")
      ]
    },
    admissionProcess: {
      title: t("admissionProcess.title"),
      description: t("admissionProcess.description"),
      items: [
        t("admissionProcess.items.0"),
        t("admissionProcess.items.1"),
        t("admissionProcess.items.2"),
        t("admissionProcess.items.3"),
        t("admissionProcess.items.4")
      ]
    },
    visaSupport: {
      title: t("visaSupport.title"),
      description: t("visaSupport.description"),
      items: [
        t("visaSupport.items.0"),
        t("visaSupport.items.1"),
        t("visaSupport.items.2"),
        t("visaSupport.items.3")
      ]
    },
    additionalServices: {
      title: t("additionalServices.title"),
      items: [
        t("additionalServices.items.0"),
        t("additionalServices.items.1"),
        t("additionalServices.items.2"),
        t("additionalServices.items.3")
      ]
    },
    countries: [
      {
        slug: "usa",
        name: t("countries.usa.name"),
        code: "us",
        flagUrl: "https://flagcdn.com/w1280/us.png",
        description: t("countries.usa.description"),
        features: [
          t("countries.usa.features.0"),
          t("countries.usa.features.1"),
          t("countries.usa.features.2"),
          t("countries.usa.features.3")
        ]
      },
      {
        slug: "canada",
        name: t("countries.canada.name"),
        code: "ca",
        flagUrl: "https://flagcdn.com/w1280/ca.png",
        description: t("countries.canada.description"),
        features: [
          t("countries.canada.features.0"),
          t("countries.canada.features.1"),
          t("countries.canada.features.2"),
          t("countries.canada.features.3")
        ]
      },
      {
        slug: "australia",
        name: t("countries.australia.name"),
        code: "au",
        flagUrl: "https://flagcdn.com/w1280/au.png",
        description: t("countries.australia.description"),
        features: [
          t("countries.australia.features.0"),
          t("countries.australia.features.1"),
          t("countries.australia.features.2")
        ]
      },
      {
        slug: "europe",
        name: t("countries.europe.name"),
        code: "eu",
        flagUrl: "https://flagcdn.com/w1280/eu.png",
        description: t("countries.europe.description"),
        features: [
          t("countries.europe.features.0"),
          t("countries.europe.features.1"),
          t("countries.europe.features.2"),
          t("countries.europe.features.3")
        ]
      },
      {
        slug: "turkey",
        name: t("countries.turkey.name"),
        code: "tr",
        flagUrl: "https://flagcdn.com/w1280/tr.png",
        description: t("countries.turkey.description"),
        features: [
          t("countries.turkey.features.0"),
          t("countries.turkey.features.1"),
          t("countries.turkey.features.2")
        ]
      },
      {
        slug: "uk",
        name: t("countries.uk.name"),
        code: "gb",
        flagUrl: "https://flagcdn.com/w1280/gb.png",
        description: t("countries.uk.description"),
        features: [
          t("countries.uk.features.0"),
          t("countries.uk.features.1"),
          t("countries.uk.features.2"),
          t("countries.uk.features.3")
        ]
      }
    ]
  };
}

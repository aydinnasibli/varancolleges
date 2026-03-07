export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order?: number;
}

// We'll expose a function that accepts 't' (the translation function) to return dynamic FAQs
export const getGeneralFaqs = (t: any): FAQ[] => {
  return [
    { _id: "1", question: t("general.0.q"), answer: t("general.0.a"), order: 1 },
    { _id: "2", question: t("general.1.q"), answer: t("general.1.a"), order: 2 },
    { _id: "3", question: t("general.2.q"), answer: t("general.2.a"), order: 3 },
    { _id: "4", question: t("general.3.q"), answer: t("general.3.a"), order: 4 },
  ];
};

export const getCountryFaqs = (slug: string, t: any): FAQ[] => {
  if (slug === "usa") {
    return [
      { _id: "usa-1", question: t("usa.0.q"), answer: t("usa.0.a") },
      { _id: "usa-2", question: t("usa.1.q"), answer: t("usa.1.a") },
      { _id: "usa-3", question: t("usa.2.q"), answer: t("usa.2.a") },
      { _id: "usa-4", question: t("usa.3.q"), answer: t("usa.3.a") },
      { _id: "usa-5", question: t("usa.4.q"), answer: t("usa.4.a") },
      { _id: "usa-6", question: t("usa.5.q"), answer: t("usa.5.a") },
      { _id: "usa-7", question: t("usa.6.q"), answer: t("usa.6.a") },
    ];
  }
  if (slug === "canada") {
    return [
      { _id: "can-1", question: t("canada.0.q"), answer: t("canada.0.a") },
      { _id: "can-2", question: t("canada.1.q"), answer: t("canada.1.a") },
      { _id: "can-3", question: t("canada.2.q"), answer: t("canada.2.a") },
      { _id: "can-4", question: t("canada.3.q"), answer: t("canada.3.a") },
      { _id: "can-5", question: t("canada.4.q"), answer: t("canada.4.a") },
      { _id: "can-6", question: t("canada.5.q"), answer: t("canada.5.a") },
      { _id: "can-7", question: t("canada.6.q"), answer: t("canada.6.a") },
      { _id: "can-8", question: t("canada.7.q"), answer: t("canada.7.a") },
    ];
  }
  if (slug === "europe") {
    return [
      { _id: "eu-1", question: t("europe.0.q"), answer: t("europe.0.a") },
      { _id: "eu-2", question: t("europe.1.q"), answer: t("europe.1.a") },
      { _id: "eu-3", question: t("europe.2.q"), answer: t("europe.2.a") },
      { _id: "eu-4", question: t("europe.3.q"), answer: t("europe.3.a") },
      { _id: "eu-5", question: t("europe.4.q"), answer: t("europe.4.a") },
      { _id: "eu-6", question: t("europe.5.q"), answer: t("europe.5.a") },
      { _id: "eu-7", question: t("europe.6.q"), answer: t("europe.6.a") },
    ];
  }
  if (slug === "turkey") {
    return [
      { _id: "tr-1", question: t("turkey.0.q"), answer: t("turkey.0.a") },
      { _id: "tr-2", question: t("turkey.1.q"), answer: t("turkey.1.a") },
      { _id: "tr-3", question: t("turkey.2.q"), answer: t("turkey.2.a") },
      { _id: "tr-4", question: t("turkey.3.q"), answer: t("turkey.3.a") },
      { _id: "tr-5", question: t("turkey.4.q"), answer: t("turkey.4.a") },
      { _id: "tr-6", question: t("turkey.5.q"), answer: t("turkey.5.a") },
      { _id: "tr-7", question: t("turkey.6.q"), answer: t("turkey.6.a") },
      { _id: "tr-8", question: t("turkey.7.q"), answer: t("turkey.7.a") },
      { _id: "tr-9", question: t("turkey.8.q"), answer: t("turkey.8.a") },
      { _id: "tr-10", question: t("turkey.9.q"), answer: t("turkey.9.a") },
      { _id: "tr-11", question: t("turkey.10.q"), answer: t("turkey.10.a") },
      { _id: "tr-12", question: t("turkey.11.q"), answer: t("turkey.11.a") },
    ];
  }
  return [];
};

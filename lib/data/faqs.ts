export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order?: number;
}

export const generalFaqs: FAQ[] = [
  {
    _id: "1",
    question: "Xaricdə təhsil üçün hansı sənədlər tələb olunur?",
    answer: "Əsas tələb olunan sənədlərə pasport, attestat və ya diplom, transkript, dil sertifikatı (IELTS/TOEFL/Duolingo), motivasiya məktubu və tövsiyə məktubları daxildir.",
    order: 1,
  },
  {
    _id: "2",
    question: "Təqaüd proqramlarına necə müraciət edə bilərəm?",
    answer: "Təqaüd proqramlarına müraciət üçün yüksək akademik göstəricilər və dil bilikləri tələb olunur. Komandamız sizin profilinizə uyğun təqaüd proqramlarını tapmağa və müraciət prosesində köməklik göstərməyə hazırdır.",
    order: 2,
  },
  {
    _id: "3",
    question: "Viza prosesi nə qədər çəkir?",
    answer: "Viza prosesinin müddəti seçdiyiniz ölkədən asılı olaraq dəyişir. Adətən bu proses 2-8 həftə arası çəkir. Viza sənədlərinin düzgün hazırlanmasında sizə tam dəstək göstəririk.",
    order: 3,
  },
  {
    _id: "4",
    question: "Dil bilikləri olmadan xaricdə təhsil almaq mümkündürmü?",
    answer: "Bəli, mümkündür. Bir çox universitetlər tədris proqramından əvvəl dil hazırlığı (Foundation və ya Pre-Sessional) kursları təklif edir. Həmçinin, bəzi ölkələrdə imtahansız qəbul proqramları da mövcuddur.",
    order: 4,
  }
];

export const usaFaqs: FAQ[] = [
  { _id: "usa-1", question: "Community college ilə university fərqi nədir?", answer: "Community college 2 illikdir və daha ucuzdur. Sonra university-yə transfer mümkündür." },
  { _id: "usa-2", question: "Scholarship realdır yoxsa sadəcə reklamdır?", answer: "Bəli, amma tam təqaüd çox nadirdir. Qismən scholarship daha realdır." },
  { _id: "usa-3", question: "SAT mütləqdirmi?", answer: "Bir çox universitet tələb etmir, amma güclü universitetlər üçün yenə üstünlükdür." },
  { _id: "usa-4", question: "OPT nədir?", answer: "Məzun olduqdan sonra 12 ay işləmə icazəsi (STEM ixtisaslarda 36 aya qədər)." },
  { _id: "usa-5", question: "F-1 müsahibədə nə soruşurlar?", answer: "• Niyə bu universitet?\n• Kim maliyyələşdirir?\n• Niyə ABŞ?\n• Məzun olduqdan sonra planın nədir?" },
  { _id: "usa-6", question: "Bank balansı nə qədər olmalıdır?", answer: "I-20 sənədində yazılan illik məbləğ qədər - yəni bu məbləği universitet bəlirləyir." },
  { _id: "usa-7", question: "ABŞ vizası niyə tez rədd olur?", answer: "Ən əsas səbəb: geri qayıtma niyyətinin zəif görünməsi." }
];

export const canadaFaqs: FAQ[] = [
  { _id: "can-1", question: "College ilə University fərqi nədir?", answer: "College daha praktik və iş yönümlüdür (2–3 il). University akademikdir (4 il bakalav, 1–2 il master). İş tapmaq baxımından college daha sürətli nəticə verir, amma akademik karyera üçün university lazımdır." },
  { _id: "can-2", question: "IELTS mütləqdirmi?", answer: "Əksər hallarda bəli. Bəzi kolleclər son zamanlar Duolingo qəbul edir." },
  { _id: "can-3", question: "PGWP hər proqram üçün keçərlidir?", answer: "Xeyr. Proqram DLI siyahısında olmalıdır və minimum 8 ay olmalıdır. Özəl məktəblərin hamısı uyğun deyil.\nPGWP nədir? Dövlət kollec və universitetlərinim bitirdikdən sonra 3 ilə qədər iş icazəsi." },
  { _id: "can-4", question: "Magistr üçün iş təcrübəsi lazımdır?", answer: "MBA üçün demək olar ki, həmişə lazımdır (minimum 1–2 il). Digər master proqramlarında şərt deyil." },
  { _id: "can-5", question: "Bank hesabında nə qədər pul göstərilməlidir?", answer: "Təhsil haqqı + illik yaşayış xərci (təxminən 20,000–25,000 CAD və yuxarı). Rəqəm ildən-ilə dəyişir." },
  { _id: "can-6", question: "Study permit ilə işləmək olar?", answer: "Bəli. Tədris dövründə həftədə 20 saat, tətil dövründə full-time." },
  { _id: "can-7", question: "Ən çox refusal səbəbi nədir?", answer: "• Maliyyə zəifliyi\n• Study plan inandırıcı olmaması\n• Geri qayıtma niyyətinin zəif göstərilməsi" },
  { _id: "can-8", question: "Ailə birlikdə gedə bilər?", answer: "Bəli. Yoldaş open work permit ala bilər, uşaq məktəbə pulsuz gedə bilər (əyalətə görə dəyişir)." }
];

export const europeFaqs: FAQ[] = [
  { _id: "eu-1", question: "Almaniyada təhsil pulsuzdur?", answer: "Dövlət universitetlərində təhsil haqqı yoxdur, amma semestr ödənişi var alman dilində (təxminən 300–500 EUR)." },
  { _id: "eu-2", question: "IELTS olmadan mümkündür?", answer: "Bəzi hallarda mümkündür (müsahibə və ya daxili testlə), amma risklidir." },
  { _id: "eu-3", question: "Foundation ili kimə lazımdır?", answer: "12 illik təhsil sistemi uyğun gəlməyənlərə. Almaniya, İngiltərədə foundation lazımdır." },
  { _id: "eu-4", question: "Yaş limiti varmı?", answer: "Rəsmi limit yoxdur, amma 30+ yaşda viza risk artır." },
  { _id: "eu-5", question: "Bloklu hesab nədir?", answer: "Məsələn Almaniyada tələb olunan illik yaşayış xərci əvvəlcədən xüsusi hesaba yatırılır (təxminən 12,000 EUR)." },
  { _id: "eu-6", question: "İş icazəsi varmı?", answer: "Adətən həftədə 20 saat." },
  { _id: "eu-7", question: "Refusal olsa yenidən müraciət etmək olar?", answer: "Bəli, amma səbəbi düzəltmədən təkrar müraciət etmək mənasızdır." }
];

export const turkeyFaqs: FAQ[] = [
  { _id: "tr-1", question: "İmtahansız Türkiyədə oxumaq mümkündür?", answer: "Bəli bir çox özəl və dövlət universitetlərində heç bir imtahan nəticəsi tələb edilmədən tək 11 illik attestla və ya kollec diplomu ilə mümkündür." },
  { _id: "tr-2", question: "9 illik attestatla qəbul varmı?", answer: "Xeyr kollec və ya 11 illik olmalıdır." },
  { _id: "tr-3", question: "Qiyabi tibb təhsili varmı?", answer: "Xeyr, tibb və stomatologiya ixtisaslarında qiyabi təhsil yoxdur. Çünki bu sahələr praktik dərslər, laboratoriya və xəstəxana təcrübəsi tələb edir. Türkiyədə də, Azərbaycanda da tibb yalnız əyani formada tədris olunur." },
  { _id: "tr-4", question: "Təqaüd almaq mümkündür?", answer: "Bəli, universitet daxili endirim və dövlət təqaüdləri var." },
  { _id: "tr-5", question: "Tezli təhsil nədir?", answer: "Tezli magistratura təhsili aldıqdan sonra doktorantura oxumaq olur diplom işi yazırsınız Və 2 ildir" },
  { _id: "tr-6", question: "Tezsiz təhsil nədir?", answer: "Tezsiz magistr oxuyanda tələbə doktora oxuya bilmir və 1 il 6 ay olur oxuma süreci." },
  { _id: "tr-7", question: "Yaşam xərcləri Türkiyədə necədi?", answer: "Yaşam xərcləri şəhərə və qalınacaq yerə görə fərqlənir. Kirayə, yemək, şəxsi xərclərlə birlikdə aylıq 400–500$ arası tələb olunur. İstanbul digər şəhərlərdən daha bahalıdır, Ankara və Eskişehir daha sərfəlidir məsələn. Tələbə yataqxanası seçməkdə köməklik göstəririk." },
  { _id: "tr-8", question: "Burs almaq üçün nə lazımdır?", answer: "• Yaxşı attestat ortalaması\n• Motivasiya məktubu\n• Sertifikatlar\n• Bəzən müsahibə" },
  { _id: "tr-9", question: "Türkiyənin diplomları Azərbaycanda tanınırmı?", answer: "Bəli Türkiyədə universitetlərindən alınan diplomlar Azərbaycanda rəsmi olaraq tanınır. Diplomların tanınması prosesi nostrifikasiya adlanır və bunu həyata keçirən qurum Azərbaycan Respublikasının Elm və Təhsil Nazirliyi-dir." },
  { _id: "tr-10", question: "Təhsil haqqı nə qədərdir?", answer: "Təhsil haqqı universitet, ixtisas və ölkəyə görə dəyişir. Orta hesabla illik 1500$-dən 12000$-ə qədər olur, tibb və mühəndislik daha baha ola bilir." },
  { _id: "tr-11", question: "Xaricdə iş imkanları necədir?", answer: "Tələbələr həftədə müəyyən saat part-time işləyə bilərlər. İş imkanları daha çox təcrübə proqramlarında olur. Tələbə işləyərək həm təcrübə qazanır, həm də xərclərini azalda bilir." },
  { _id: "tr-12", question: "Qiyabi təhsil harada mümkündür?", answer: "Qiyabi proqramlar əsasən biznes, idarəetmə və marketing və.s sahələrdə mövcuddur. Tibb və praktik laboratoriya tələb edən sahələrdə yoxdur. Qiyabi təhsil işləyən tələbələr üçün uyğundur dərslər online olur." }
];

export const getCountryFaqs = (slug: string): FAQ[] => {
  switch (slug) {
    case 'usa':
      return usaFaqs;
    case 'canada':
      return canadaFaqs;
    case 'europe':
      return europeFaqs;
    case 'turkey':
      return turkeyFaqs;
    default:
      return [];
  }
};

const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

// Only add basic translation object for FAQs to be used dynamically.
az.FAQData = {
  general: [
    {
      q: "Xaricdə təhsil üçün hansı sənədlər tələb olunur?",
      a: "Əsas tələb olunan sənədlərə pasport, attestat və ya diplom, transkript, dil sertifikatı (IELTS/TOEFL/Duolingo), motivasiya məktubu və tövsiyə məktubları daxildir."
    },
    {
      q: "Təqaüd proqramlarına necə müraciət edə bilərəm?",
      a: "Təqaüd proqramlarına müraciət üçün yüksək akademik göstəricilər və dil bilikləri tələb olunur. Komandamız sizin profilinizə uyğun təqaüd proqramlarını tapmağa və müraciət prosesində köməklik göstərməyə hazırdır."
    },
    {
      q: "Viza prosesi nə qədər çəkir?",
      a: "Viza prosesinin müddəti seçdiyiniz ölkədən asılı olaraq dəyişir. Adətən bu proses 2-8 həftə arası çəkir. Viza sənədlərinin düzgün hazırlanmasında sizə tam dəstək göstəririk."
    },
    {
      q: "Dil bilikləri olmadan xaricdə təhsil almaq mümkündürmü?",
      a: "Bəli, mümkündür. Bir çox universitetlər tədris proqramından əvvəl dil hazırlığı (Foundation və ya Pre-Sessional) kursları təklif edir. Həmçinin, bəzi ölkələrdə imtahansız qəbul proqramları da mövcuddur."
    }
  ],
  usa: [
    { q: "Community college ilə university fərqi nədir?", a: "Community college 2 illikdir və daha ucuzdur. Sonra university-yə transfer mümkündür." },
    { q: "Scholarship realdır yoxsa sadəcə reklamdır?", a: "Bəli, amma tam təqaüd çox nadirdir. Qismən scholarship daha realdır." },
    { q: "SAT mütləqdirmi?", a: "Bir çox universitet tələb etmir, amma güclü universitetlər üçün yenə üstünlükdür." },
    { q: "OPT nədir?", a: "Məzun olduqdan sonra 12 ay işləmə icazəsi (STEM ixtisaslarda 36 aya qədər)." },
    { q: "F-1 müsahibədə nə soruşurlar?", a: "• Niyə bu universitet?\n• Kim maliyyələşdirir?\n• Niyə ABŞ?\n• Məzun olduqdan sonra planın nədir?" },
    { q: "Bank balansı nə qədər olmalıdır?", a: "I-20 sənədində yazılan illik məbləğ qədər - yəni bu məbləği universitet bəlirləyir." },
    { q: "ABŞ vizası niyə tez rədd olur?", a: "Ən əsas səbəb: geri qayıtma niyyətinin zəif görünməsi." }
  ],
  canada: [
    { q: "College ilə University fərqi nədir?", a: "College daha praktik və iş yönümlüdür (2–3 il). University akademikdir (4 il bakalav, 1–2 il master). İş tapmaq baxımından college daha sürətli nəticə verir, amma akademik karyera üçün university lazımdır." },
    { q: "IELTS mütləqdirmi?", a: "Əksər hallarda bəli. Bəzi kolleclər son zamanlar Duolingo qəbul edir." },
    { q: "PGWP hər proqram üçün keçərlidir?", a: "Xeyr. Proqram DLI siyahısında olmalıdır və minimum 8 ay olmalıdır. Özəl məktəblərin hamısı uyğun deyil.\nPGWP nədir? Dövlət kollec və universitetlərinim bitirdikdən sonra 3 ilə qədər iş icazəsi." },
    { q: "Magistr üçün iş təcrübəsi lazımdır?", a: "MBA üçün demək olar ki, həmişə lazımdır (minimum 1–2 il). Digər master proqramlarında şərt deyil." },
    { q: "Bank hesabında nə qədər pul göstərilməlidir?", a: "Təhsil haqqı + illik yaşayış xərci (təxminən 20,000–25,000 CAD və yuxarı). Rəqəm ildən-ilə dəyişir." },
    { q: "Study permit ilə işləmək olar?", a: "Bəli. Tədris dövründə həftədə 20 saat, tətil dövründə full-time." },
    { q: "Ən çox refusal səbəbi nədir?", a: "• Maliyyə zəifliyi\n• Study plan inandırıcı olmaması\n• Geri qayıtma niyyətinin zəif göstərilməsi" },
    { q: "Ailə birlikdə gedə bilər?", a: "Bəli. Yoldaş open work permit ala bilər, uşaq məktəbə pulsuz gedə bilər (əyalətə görə dəyişir)." }
  ],
  europe: [
    { q: "Almaniyada təhsil pulsuzdur?", a: "Dövlət universitetlərində təhsil haqqı yoxdur, amma semestr ödənişi var alman dilində (təxminən 300–500 EUR)." },
    { q: "IELTS olmadan mümkündür?", a: "Bəzi hallarda mümkündür (müsahibə və ya daxili testlə), amma risklidir." },
    { q: "Foundation ili kimə lazımdır?", a: "12 illik təhsil sistemi uyğun gəlməyənlərə. Almaniya, İngiltərədə foundation lazımdır." },
    { q: "Yaş limiti varmı?", a: "Rəsmi limit yoxdur, amma 30+ yaşda viza risk artır." },
    { q: "Bloklu hesab nədir?", a: "Məsələn Almaniyada tələb olunan illik yaşayış xərci əvvəlcədən xüsusi hesaba yatırılır (təxminən 12,000 EUR)." },
    { q: "İş icazəsi varmı?", a: "Adətən həftədə 20 saat." },
    { q: "Refusal olsa yenidən müraciət etmək olar?", a: "Bəli, amma səbəbi düzəltmədən təkrar müraciət etmək mənasızdır." }
  ],
  turkey: [
    { q: "İmtahansız Türkiyədə oxumaq mümkündür?", a: "Bəli bir çox özəl və dövlət universitetlərində heç bir imtahan nəticəsi tələb edilmədən tək 11 illik attestla və ya kollec diplomu ilə mümkündür." },
    { q: "9 illik attestatla qəbul varmı?", a: "Xeyr kollec və ya 11 illik olmalıdır." },
    { q: "Qiyabi tibb təhsili varmı?", a: "Xeyr, tibb və stomatologiya ixtisaslarında qiyabi təhsil yoxdur. Çünki bu sahələr praktik dərslər, laboratoriya və xəstəxana təcrübəsi tələb edir. Türkiyədə də, Azərbaycanda da tibb yalnız əyani formada tədris olunur." },
    { q: "Təqaüd almaq mümkündür?", a: "Bəli, universitet daxili endirim və dövlət təqaüdləri var." },
    { q: "Tezli təhsil nədir?", a: "Tezli magistratura təhsili aldıqdan sonra doktorantura oxumaq olur diplom işi yazırsınız Və 2 ildir" },
    { q: "Tezsiz təhsil nədir?", a: "Tezsiz magistr oxuyanda tələbə doktora oxuya bilmir və 1 il 6 ay olur oxuma süreci." },
    { q: "Yaşam xərcləri Türkiyədə necədi?", a: "Yaşam xərcləri şəhərə və qalınacaq yerə görə fərqlənir. Kirayə, yemək, şəxsi xərclərlə birlikdə aylıq 400–500$ arası tələb olunur. İstanbul digər şəhərlərdən daha bahalıdır, Ankara və Eskişehir daha sərfəlidir məsələn. Tələbə yataqxanası seçməkdə köməklik göstəririk." },
    { q: "Burs almaq üçün nə lazımdır?", a: "• Yaxşı attestat ortalaması\n• Motivasiya məktubu\n• Sertifikatlar\n• Bəzən müsahibə" },
    { q: "Türkiyənin diplomları Azərbaycanda tanınırmı?", a: "Bəli Türkiyədə universitetlərindən alınan diplomlar Azərbaycanda rəsmi olaraq tanınır. Diplomların tanınması prosesi nostrifikasiya adlanır və bunu həyata keçirən qurum Azərbaycan Respublikasının Elm və Təhsil Nazirliyi-dir." },
    { q: "Təhsil haqqı nə qədərdir?", a: "Təhsil haqqı universitet, ixtisas və ölkəyə görə dəyişir. Orta hesabla illik 1500$-dən 12000$-ə qədər olur, tibb və mühəndislik daha baha ola bilir." },
    { q: "Xaricdə iş imkanları necədir?", a: "Tələbələr həftədə müəyyən saat part-time işləyə bilərlər. İş imkanları daha çox təcrübə proqramlarında olur. Tələbə işləyərək həm təcrübə qazanır, həm də xərclərini azalda bilir." },
    { q: "Qiyabi təhsil harada mümkündür?", a: "Qiyabi proqramlar əsasən biznes, idarəetmə və marketing və.s sahələrdə mövcuddur. Tibb və praktik laboratoriya tələb edən sahələrdə yoxdur. Qiyabi təhsil işləyən tələbələr üçün uyğundur dərslər online olur." }
  ]
};

en.FAQData = {
  general: [
    {
      q: "What documents are required to study abroad?",
      a: "The main required documents include a passport, certificate or diploma, transcript, language certificate (IELTS/TOEFL/Duolingo), motivation letter, and recommendation letters."
    },
    {
      q: "How can I apply for scholarship programs?",
      a: "High academic performance and language skills are required to apply for scholarship programs. Our team is ready to help you find scholarship programs suitable for your profile and assist in the application process."
    },
    {
      q: "How long does the visa process take?",
      a: "The duration of the visa process varies depending on the country you choose. Usually, this process takes between 2-8 weeks. We fully support you in the proper preparation of visa documents."
    },
    {
      q: "Is it possible to study abroad without language skills?",
      a: "Yes, it is possible. Many universities offer language preparation (Foundation or Pre-Sessional) courses before the academic program. Additionally, admission programs without exams are also available in some countries."
    }
  ],
  usa: [
    { q: "What is the difference between community college and university?", a: "Community college is 2-year and cheaper. Afterwards, a transfer to a university is possible." },
    { q: "Are scholarships real or just advertising?", a: "Yes, but full scholarships are very rare. Partial scholarships are more realistic." },
    { q: "Is SAT mandatory?", a: "Many universities do not require it, but it is still an advantage for competitive universities." },
    { q: "What is OPT?", a: "Permission to work for 12 months after graduation (up to 36 months for STEM majors)." },
    { q: "What do they ask in the F-1 interview?", a: "• Why this university?\n• Who is financing?\n• Why the USA?\n• What are your plans after graduation?" },
    { q: "How much should be in the bank balance?", a: "As much as the annual amount stated on the I-20 document - meaning the university determines this amount." },
    { q: "Why is the US visa rejected quickly?", a: "The main reason: showing a weak intention to return back." }
  ],
  canada: [
    { q: "What is the difference between College and University?", a: "College is more practical and job-oriented (2-3 years). University is academic (4 years bachelor's, 1-2 years master's). College yields faster results in terms of finding a job, but university is needed for an academic career." },
    { q: "Is IELTS mandatory?", a: "In most cases, yes. Some colleges have recently been accepting Duolingo." },
    { q: "Is PGWP valid for every program?", a: "No. The program must be on the DLI list and must be a minimum of 8 months. Private schools are not all eligible.\nWhat is PGWP? A work permit for up to 3 years after completing public college and universities." },
    { q: "Is work experience needed for a Master's?", a: "For an MBA, it is almost always necessary (minimum 1-2 years). For other master's programs, it's not a strict requirement." },
    { q: "How much money should be shown in the bank account?", a: "Tuition fee + annual living expenses (approximately 20,000-25,000 CAD and above). The amount varies year by year." },
    { q: "Can I work with a study permit?", a: "Yes. 20 hours a week during studies, full-time during holidays." },
    { q: "What is the most common reason for refusal?", a: "• Financial weakness\n• Unconvincing study plan\n• Weak demonstration of intention to return" },
    { q: "Can the family go together?", a: "Yes. The spouse can get an open work permit, and the child can go to school for free (varies by province)." }
  ],
  europe: [
    { q: "Is education free in Germany?", a: "There are no tuition fees in public universities, but there is a semester fee for programs in German (approximately 300-500 EUR)." },
    { q: "Is it possible without IELTS?", a: "In some cases, it is possible (via interview or internal test), but it is risky." },
    { q: "Who needs a foundation year?", a: "Those whose 12-year education system does not match. Foundation is required in Germany and the UK." },
    { q: "Is there an age limit?", a: "There is no official limit, but visa risk increases at age 30+." },
    { q: "What is a blocked account?", a: "For example, in Germany, the required annual living expenses are deposited into a special account in advance (approximately 12,000 EUR)." },
    { q: "Is there a work permit?", a: "Usually 20 hours a week." },
    { q: "If refused, can I apply again?", a: "Yes, but applying again without fixing the reason is pointless." }
  ],
  turkey: [
    { q: "Is it possible to study in Turkey without an exam?", a: "Yes, it is possible in many private and public universities without requiring any exam results, just with an 11-year high school diploma or college diploma." },
    { q: "Is there admission with a 9-year certificate?", a: "No, it must be college or 11 years." },
    { q: "Is there part-time/distance medical education?", a: "No, there is no distance learning in medicine and dentistry. Because these fields require practical classes, laboratory, and hospital experience. In Turkey as well as in Azerbaijan, medicine is only taught in a full-time face-to-face format." },
    { q: "Is it possible to get a scholarship?", a: "Yes, there are internal university discounts and state scholarships." },
    { q: "What is education with a thesis?", a: "After obtaining a master's degree with a thesis, you can study for a doctorate and write a thesis. It takes 2 years." },
    { q: "What is non-thesis education?", a: "When a student does a non-thesis master's, they cannot proceed to a doctorate, and the study duration is 1 year and 6 months." },
    { q: "How are living expenses in Turkey?", a: "Living expenses differ depending on the city and accommodation. Around $400-500 per month is required, including rent, food, and personal expenses. Istanbul is more expensive than other cities, while Ankara and Eskisehir are more affordable, for example. We help with choosing student dormitories." },
    { q: "What is needed to get a scholarship?", a: "• Good high school diploma average\n• Motivation letter\n• Certificates\n• Sometimes an interview" },
    { q: "Are Turkish diplomas recognized in Azerbaijan?", a: "Yes, diplomas obtained from universities in Turkey are officially recognized in Azerbaijan. The process of recognizing diplomas is called nostrification, and it is carried out by the Ministry of Science and Education of the Republic of Azerbaijan." },
    { q: "How much is the tuition fee?", a: "Tuition fees vary depending on the university, major, and country. On average, it ranges from $1500 to $12000 per year; medicine and engineering can be more expensive." },
    { q: "How are work opportunities abroad?", a: "Students can work a certain number of hours part-time a week. Job opportunities are mostly found in internship programs. By working, the student gains experience and can reduce their expenses." },
    { q: "Where is distance learning possible?", a: "Distance programs are mainly available in business, management, marketing, etc. There are none in medicine and fields requiring practical labs. Distance education is suitable for working students as classes are online." }
  ]
};

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

// Inject actual content from lib/services-data.ts into messages/en.json and messages/az.json
// Keys must match the slug: 'sat-hazirligi', 'ielts-hazirligi', etc.

const servicesDataObjAz = {
  "sat-hazirligi": {
    "title": "SAT Hazırlığı",
    "description": "ABŞ və digər dünya universitetlərinə qəbul üçün əsas standartlaşdırılmış test. Riyaziyyat və İngilis dili bacarıqlarınızı maksimuma çatdırın.",
    "examInfo": "SAT (Scholastic Assessment Test) ABŞ və bir çox digər ölkələrin ali təhsil müəssisələrinə qəbul üçün əsas imtahandır. Bu imtahan tələbənin kollec səviyyəsində akademik yüklənməyə nə dərəcədə hazır olduğunu ölçür. İmtahanın əsas məqsədi tələbənin tənqidi düşüncə və problem həlletmə bacarıqlarını qiymətləndirməkdir.",
    "format": "Yeni rəqəmsal (Digital) SAT iki əsas bölmədən ibarətdir: Oxuma/Yazma (Reading and Writing) və Riyaziyyat (Math). Hər iki bölmə iki modula ayrılır. İmtahanın ümumi müddəti təxminən 2 saat 14 dəqiqədir.",
    "grading": "Hər bir bölmə (Oxuma/Yazma və Riyaziyyat) 200-800 balla qiymətləndirilir. Ümumi SAT balı 400-1600 aralığında dəyişir. Səhv cavablar düzgün cavablardan bal çıxmır (cərimə yoxdur).",
    "whyUs": "Bizimlə SAT hazırlığı zamanı siz hər həftə sınaq imtahanlarında iştirak edir, fərdi zəiflikləriniz üzərində işləyir və süni intellekt dəstəkli tədris proqramı ilə öyrənirsiniz. Təcrübəli müəllimlərimiz hər bir tələbəyə fərdi yanaşaraq onların potensialını maksimuma çatdırır."
  },
  "ielts-hazirligi": {
    "title": "IELTS Hazırlığı",
    "description": "Dünyanın ən populyar ingilis dili testi. Qlobal təhsil və miqrasiya üçün 4 bacarıq üzrə peşəkar inkişaf.",
    "examInfo": "IELTS (International English Language Testing System) dünyada ən populyar ingilis dili testidir. 140-dan çox ölkədə 11,000-dən çox təşkilat tərəfindən tanınır. İmtahanın iki növü var: Academic (təhsil üçün) və General Training (iş və miqrasiya üçün).",
    "format": "Test dörd bacarığı yoxlayır: Dinləmə (30 dəqiqə), Oxuma (60 dəqiqə), Yazma (60 dəqiqə) və Danışma (11-14 dəqiqə). Danışma imtahanı digər bölmələrdən fərqli gündə keçirilə bilər. Ümumi imtahan müddəti fasiləsiz olaraq təxminən 2 saat 45 dəqiqədir.",
    "grading": "Hər bölmə 0-9 aralığında tam və ya yarım ballarla qiymətləndirilir (məs. 6.5, 7.0). Ümumi (Overall) bal bu dörd bölmənin ədədi ortasıdır.",
    "whyUs": "Təcrübəli IELTS ekspertlərimizlə sınaq imtahanları və fərdi analizlərlə hədəflədiyiniz bala zəmanət veririk."
  },
  "gmat-hazirligi": {
    "title": "GMAT Hazırlığı",
    "description": "Biznes dünyasının liderləri üçün ilk addım. MBA və idarəetmə proqramlarına qəbulun açarı.",
    "examInfo": "GMAT (Graduate Management Admission Test) dünyanın aparıcı biznes məktəbləri tərəfindən tələb olunan kompüter əsaslı adaptiv testdir. Bu imtahan real biznes mühitində uğur qazanmaq üçün vacib olan bacarıqları ölçür.",
    "format": "GMAT Focus Edition dörd bölmədən ibarətdir: Kəmiyyət (Quantitative), Şifahi (Verbal) və Data Insights. Hər bölmə 45 dəqiqə davam edir. Yazı (AWA) bölməsi yeni formatda çıxarılmışdır. Ümumi müddət 2 saat 15 dəqiqədir.",
    "grading": "Ümumi bal 205-805 aralığında hesablanır. Bütün üç bölmənin nəticələri ümumi bala bərabər çəkidə təsir edir. İmtahan adaptiv olduğu üçün ilk sualların düzgün cavablandırılması balın yüksək olmasına böyük təsir göstərir.",
    "whyUs": "GMAT hazırlığında riyazi və məntiqi təfəkkürün inkişafına xüsusi önəm veririk. Çətin sual tipləri üzərində intensiv işləyərək tələbələrimizin analitik bacarıqlarını artırırıq."
  },
  "toefl-hazirligi": {
    "title": "TOEFL Hazırlığı",
    "description": "Amerika və Kanada başda olmaqla qlobal akademik mühitə tam inteqrasiya.",
    "examInfo": "TOEFL (Test of English as a Foreign Language) akademik mühitdə ingilis dili bacarıqlarını ölçən ən mötəbər testlərdən biridir. Xüsusilə ABŞ və Kanada universitetləri üçün əvəzolunmazdır.",
    "format": "Yenilənmiş TOEFL iBT formatı daha qısadır və təxminən 2 saat davam edir. Oxuma, Dinləmə, Danışma və Yazma bölmələrini əhatə edir. 'Writing for an Academic Discussion' adlı yeni tapşırıq növü əlavə edilib.",
    "grading": "Hər bölmə 0-30 bal aralığında qiymətləndirilir. Maksimum ümumi bal 120-dir. Rəqabətli universitetlər üçün adətən 90-100+ bal tələb olunur.",
    "whyUs": "Kompüter əsaslı test mühitinə tam adaptasiya və akademik lüğət bazasının gücləndirilməsi üzrə ixtisaslaşmışıq."
  },
  "yos-hazirligi": {
    "title": "TR YÖS Hazırlığı",
    "description": "Türkiyənin ən yaxşı dövlət və özəl universitetlərində təhsil almaq üçün vahid imtahan.",
    "examInfo": "TR YÖS (Yabancı Uyruklu Öğrenci Sınavı) Türkiyədə ali təhsil almaq istəyən əcnəbilər üçün keçirilən mərkəzləşdirilmiş qəbul imtahanıdır. Bu imtahan ÖSYM tərəfindən təşkil olunur və Türkiyənin əksər universitetləri tərəfindən qəbul edilir.",
    "format": "İmtahan əsasən Məntiq (IQ), Riyaziyyat və Həndəsə suallarından ibarətdir. TR YÖS formatında 80 sual təqdim olunur və 100 dəqiqə vaxt verilir.",
    "grading": "Maksimum bal 500 üzərindən hesablanır. Adətən səhv cavablar düzgün cavablara təsir etmir (4 səhv 1 düzü aparmır), lakin qaydalar dəyişə bilər.",
    "whyUs": "TR YÖS proqramımız Türkiyə təhsil sisteminə və yeni imtahan formatına tam uyğundur. Riyaziyyat və məntiq üzrə mütəxəssislərimiz sizə ən qısa həll yollarını öyrədir."
  },
  "gre-hazirligi": {
    "title": "GRE Hazırlığı",
    "description": "Magistratura və doktorantura təhsili üçün qapıları açan universal qəbul imtahanı.",
    "examInfo": "GRE (Graduate Record Examinations) texniki, humanitar və dəqiq elmlər üzrə magistratura və PhD proqramlarına qəbul üçün tələb olunan əsas testdir.",
    "format": "GRE General Test 3 hissədən ibarətdir: Verbal Reasoning (Şifahi məntiq), Quantitative Reasoning (Riyazi məntiq) və Analytical Writing (Analitik yazı). İmtahan müddəti 1 saat 58 dəqiqəyə endirilmişdir.",
    "grading": "Verbal və Kəmiyyət bölmələri 130-170, Yazı isə 0-6 bal arasında qiymətləndirilir. Rəqabətli nəticə üçün hər iki əsas bölmədən 160+ bal hədəflənməlidir.",
    "whyUs": "GRE söz ehtiyatının (vocabulary) zənginləşdirilməsi və mürəkkəb mətnlərin analizi üzrə xüsusi metodikamız var. Riyazi hissədə isə vaxta qənaət edən həll üsulları öyrədilir."
  },
  "ab-hazirligi": {
    "title": "AP (Advanced Placement)",
    "description": "Məktəb illərində kollec səviyyəsində təhsil və universitetdə kredit qazanmaq imkanı.",
    "examInfo": "Advanced Placement (AP) proqramı College Board tərəfindən idarə olunur. Bu proqram şagirdlərə hələ məktəb illərində kollec səviyyəsində fənləri öyrənmək və kredit qazanmaq imkanı verir.",
    "format": "İmtahanlar fənnə görə dəyişir (Calculus, Physics, Biology, History və s.). Adətən çoxseçimli (multiple-choice) və sərbəst cavablı (free-response) suallardan ibarətdir.",
    "grading": "AP imtahanları 1-dən 5-ə qədər olan şkala ilə qiymətləndirilir. Əksər universitetlər kredit vermək üçün minimum 3 və ya 4 bal tələb edir.",
    "whyUs": "Bizim tədris proqramımız şagirdlərin məktəb yükünü nəzərə alaraq hazırlanmışdır. Təcrübəli müəllimlərimiz AP kurikulumuna tam bələddir."
  },
  "ib-hazirligi": {
    "title": "IB (International Baccalaureate)",
    "description": "Hərtərəfli inkişaf və qlobal vətəndaşlıq üçün beynəlxalq bakalavriat proqramı.",
    "examInfo": "Beynəlxalq Bakalavriat (IB) Diplom Proqramı 16-19 yaşlı şagirdlər üçün nəzərdə tutulmuş nüfuzlu təhsil proqramıdır. Şagirdlərin intellektual, sosial, emosional və fiziki inkişafını hədəfləyir.",
    "format": "Tələbələr 6 fənn qrupundan dərslər alır. Əlavə olaraq TOK (Theory of Knowledge), CAS (Creativity, Activity, Service) və Extended Essay tələblərini yerinə yetirməlidirlər.",
    "grading": "Maksimum bal 45-dir. Hər fənn 7 balla qiymətləndirilir (6x7=42), əlavə 3 bal isə nüvə komponentlərindən (TOK, EE) gəlir. Diplom almaq üçün minimum 24 bal lazımdır.",
    "whyUs": "IB proqramının çətinliklərini başa düşürük və tələbələrə həm akademik, həm də psixoloji dəstək veririk. Internal Assessment (IA) və Extended Essay yazımında mentorluq edirik."
  },
  "general-english": {
    "title": "General English",
    "description": "Sərhədsiz ünsiyyət azadlığı. İngilis dilini doğma diliniz kimi danışın.",
    "examInfo": "General English kurslarımız CEFR (Common European Framework of Reference for Languages) standartlarına tam uyğundur. A1 (Beginner) səviyyəsindən C2 (Proficiency) səviyyəsinə qədər bütün mərhələləri əhatə edir.",
    "format": "Dərslər kommunikativ metodika əsasında qurulub. Qrammatika, lüğət, oxu, yazı, dinləmə və ən əsası danışıq bacarıqları kompleks şəkildə inkişaf etdirilir.",
    "grading": "Səviyyənin bitməsi hər mərhələnin sonunda keçirilən Final İmtahanı və dərslərdəki aktivlik əsasında müəyyən edilir.",
    "whyUs": "Biz sadəcə qrammatika öyrətmirik, dilin real həyatda tətbiqinə önəm veririk. Danışıq klubları və əcnəbi müəllimlərlə dil mühitini sizə gətiririk."
  }
};

const servicesDataObjEn = {
  "sat-hazirligi": {
    "title": "SAT Preparation",
    "description": "The main standardized test for admission to US and other global universities. Maximize your Math and English skills.",
    "examInfo": "The SAT (Scholastic Assessment Test) is a standardized test widely used for college admissions in the United States. It evaluates how students apply the knowledge they've learned in school to university-level tasks. The main purpose is to assess students' critical thinking and problem-solving skills.",
    "format": "The new Digital SAT consists of two main sections: Reading and Writing, and Math. Both sections are divided into two modules. The total exam duration is about 2 hours and 14 minutes.",
    "grading": "Each section (Reading/Writing and Math) is scored on a scale of 200-800. The total SAT score ranges from 400 to 1600. There is no penalty for guessing (incorrect answers do not deduct points).",
    "whyUs": "During SAT preparation with us, you will take weekly mock exams, work on individual weaknesses, and learn through an AI-supported curriculum. Our experienced teachers apply an individual approach to maximize every student's potential."
  },
  "ielts-hazirligi": {
    "title": "IELTS Preparation",
    "description": "The world's most popular English language test for global education and migration. Professional development across 4 skills.",
    "examInfo": "IELTS (International English Language Testing System) is the most popular English language test in the world. It is recognized by over 11,000 organizations in more than 140 countries. There are two types: Academic (for study) and General Training (for work and migration).",
    "format": "The test evaluates four skills: Listening (30 minutes), Reading (60 minutes), Writing (60 minutes), and Speaking (11-14 minutes). The Speaking test may be held on a different day. Total continuous exam time is about 2 hours and 45 minutes.",
    "grading": "Each section is graded from 0 to 9 in half or full bands (e.g., 6.5, 7.0). The Overall score is the average of these four sections.",
    "whyUs": "With our experienced IELTS experts, mock exams, and individual analyses, we guarantee your target score."
  },
  "gmat-hazirligi": {
    "title": "GMAT Preparation",
    "description": "The first step for business world leaders. The key to admission into MBA and management programs.",
    "examInfo": "The GMAT (Graduate Management Admission Test) is a computer adaptive test required by leading business schools globally. It measures skills crucial for success in the real business environment.",
    "format": "The GMAT Focus Edition consists of four sections: Quantitative, Verbal, and Data Insights. Each section takes 45 minutes. The Analytical Writing (AWA) section has been removed in the new format. Total duration is 2 hours 15 minutes.",
    "grading": "The total score is calculated on a scale of 205-805. All three sections weigh equally on the total score. Because the test is adaptive, correctly answering the initial questions significantly impacts getting a high score.",
    "whyUs": "In GMAT preparation, we pay special attention to the development of mathematical and logical thinking. We intensively work on difficult question types to enhance our students' analytical skills."
  },
  "toefl-hazirligi": {
    "title": "TOEFL Preparation",
    "description": "Complete integration into the global academic environment, particularly in the US and Canada.",
    "examInfo": "TOEFL (Test of English as a Foreign Language) is one of the most respected tests that measures English language skills in an academic setting. It is indispensable especially for US and Canadian universities.",
    "format": "The updated TOEFL iBT format is shorter and lasts about 2 hours. It includes Reading, Listening, Speaking, and Writing sections. A new task type called 'Writing for an Academic Discussion' has been added.",
    "grading": "Each section is graded on a scale of 0-30. The maximum total score is 120. Competitive universities usually require a score of 90-100+.",
    "whyUs": "We specialize in complete adaptation to the computer-based testing environment and strengthening the academic vocabulary base."
  },
  "yos-hazirligi": {
    "title": "TR YÖS Preparation",
    "description": "The unified exam to study at Turkey's best public and private universities.",
    "examInfo": "TR YÖS (Foreign Student Examination) is a centralized admission exam for foreigners wishing to pursue higher education in Turkey. This exam is organized by ÖSYM and accepted by most universities in Turkey.",
    "format": "The exam mainly consists of Logic (IQ), Math, and Geometry questions. The TR YÖS format features 80 questions to be answered in 100 minutes.",
    "grading": "The maximum score is calculated out of 500. Generally, wrong answers do not affect correct ones (4 wrongs do not cancel 1 right), though rules can change.",
    "whyUs": "Our TR YÖS program is fully aligned with the Turkish education system and the new exam format. Our math and logic experts teach you the shortest solution methods."
  },
  "gre-hazirligi": {
    "title": "GRE Preparation",
    "description": "The universal admission test opening doors to master's and doctoral education.",
    "examInfo": "The GRE (Graduate Record Examinations) is the main test required for admission to master's and PhD programs in engineering, humanities, and exact sciences.",
    "format": "The GRE General Test consists of 3 parts: Verbal Reasoning, Quantitative Reasoning, and Analytical Writing. The exam duration has been reduced to 1 hour and 58 minutes.",
    "grading": "The Verbal and Quantitative sections are scored between 130-170, and Writing from 0-6. For a competitive result, one should aim for 160+ in both main sections.",
    "whyUs": "We have a special methodology for enriching GRE vocabulary and analyzing complex texts. For the mathematical section, time-saving solution methods are taught."
  },
  "ab-hazirligi": {
    "title": "AP (Advanced Placement)",
    "description": "Opportunity to study at the college level and earn university credits during school years.",
    "examInfo": "The Advanced Placement (AP) program is managed by the College Board. This program allows students to study college-level subjects and earn college credits while still in high school.",
    "format": "Exams vary by subject (Calculus, Physics, Biology, History, etc.). They usually consist of multiple-choice and free-response questions.",
    "grading": "AP exams are scored on a scale from 1 to 5. Most universities require a minimum score of 3 or 4 to grant credit.",
    "whyUs": "Our teaching program is designed considering students' school workloads. Our experienced teachers are fully familiar with the AP curriculum."
  },
  "ib-hazirligi": {
    "title": "IB (International Baccalaureate)",
    "description": "The International Baccalaureate for comprehensive development and global citizenship.",
    "examInfo": "The International Baccalaureate (IB) Diploma Programme is a prestigious educational program for 16-19 year olds. It aims at the intellectual, social, emotional, and physical development of students.",
    "format": "Students take courses from 6 subject groups. Additionally, they must fulfill the requirements for TOK (Theory of Knowledge), CAS (Creativity, Activity, Service), and the Extended Essay.",
    "grading": "The maximum score is 45. Each subject is graded out of 7 (6x7=42), and an additional 3 points come from the core components (TOK, EE). A minimum of 24 points is required to earn the diploma.",
    "whyUs": "We understand the challenges of the IB program and provide both academic and psychological support to students. We offer mentorship in writing Internal Assessments (IA) and the Extended Essay."
  },
  "general-english": {
    "title": "General English",
    "description": "Freedom of borderless communication. Speak English like your native language.",
    "examInfo": "Our General English courses fully comply with CEFR (Common European Framework of Reference for Languages) standards. They cover all stages from A1 (Beginner) to C2 (Proficiency).",
    "format": "Classes are based on communicative methodology. Grammar, vocabulary, reading, writing, listening, and most importantly, speaking skills are developed comprehensively.",
    "grading": "Progression to the next level is determined by the Final Exam held at the end of each level and active participation throughout the course.",
    "whyUs": "We don't just teach grammar; we emphasize the application of language in real life. We bring the language environment to you with our Conversation Clubs and foreign teachers."
  }
};


// Update the json structures without overwriting global ServicesData shared keys
en.ServicesData = { ...en.ServicesData, ...servicesDataObjEn };
az.ServicesData = { ...az.ServicesData, ...servicesDataObjAz };

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

// Adding missing top-level translation keys for ServicesData
const topLevelAz = {
  "tableOfContents": "Mündəricat",
  "haveQuestion": "Sualınız var?",
  "expertsReady": "Mütəxəssislərimiz sizə kömək etməyə hazırdır.",
  "contactUs": "Əlaqə Saxlayın",
  "duration": "Müddət",
  "personalPlan": "Fərdi Plan",
  "lessons": "Dərslər",
  "twiceAWeek": "Həftədə 2-3 dəfə",
  "result": "Nəticə",
  "guaranteed": "Zəmanətli",
  "mockExam": "Sınaq",
  "free": "Ödənişsiz",
  "generalInfo": "Ümumi Məlumat",
  "aboutExam": "İmtahan Haqqında",
  "format": "Format",
  "grading": "Qiymətləndirmə",
  "whyUs": "Niyə Varan Colleges?",
  "process": "Hazırlıq Prosesi",
  "whyUsFeats": [
    "Sertifikatlı Müəllimlər",
    "Fərdi Yanaşma",
    "İmtahan Strateqiyaları",
    "Zəmanətli Nəticə"
  ],
  "processSteps": [
    {
      "title": "Diaqnostik Qiymətləndirmə",
      "desc": "Mövcud dil biliklərinizin yoxlanılması və zəif tərəflərin müəyyənləşdirilməsi."
    },
    {
      "title": "Fərdi Plan",
      "desc": "Zəif və güclü tərəflərinizə uyğun xüsusi dərs proqramının hazırlanması."
    },
    {
      "title": "İntensiv Tədris",
      "desc": "Bütün bölmələr üzrə intensiv dərslər və mütəmadi sınaq imtahanları."
    },
    {
      "title": "Nəticə",
      "desc": "İmtahan günü üçün psixoloji hazırlıq və uğurlu nəticə."
    }
  ],
  "ctaTitle": "Hədəfinizə Çatmağa Hazırsınız?",
  "ctaDesc": "Vaxt itirmədən hazırlıqlara başlayın. Mütəxəssislərimiz sizə ən uyğun proqramı seçməkdə kömək etsin.",
  "freeConsultation": "Ödənişsiz Konsultasiya"
};

const topLevelEn = {
  "tableOfContents": "Table of Contents",
  "haveQuestion": "Have a question?",
  "expertsReady": "Our experts are ready to help you.",
  "contactUs": "Contact Us",
  "duration": "Duration",
  "personalPlan": "Personal Plan",
  "lessons": "Lessons",
  "twiceAWeek": "2-3 times a week",
  "result": "Result",
  "guaranteed": "Guaranteed",
  "mockExam": "Mock Exam",
  "free": "Free",
  "generalInfo": "General Information",
  "aboutExam": "About Exam",
  "format": "Format",
  "grading": "Grading",
  "whyUs": "Why Varan Colleges?",
  "process": "Preparation Process",
  "whyUsFeats": [
    "Certified Teachers",
    "Individual Approach",
    "Exam Strategies",
    "Guaranteed Result"
  ],
  "processSteps": [
    {
      "title": "Diagnostic Assessment",
      "desc": "Checking your current language skills and identifying weak points."
    },
    {
      "title": "Personal Plan",
      "desc": "Preparation of a special lesson program according to your weak and strong points."
    },
    {
      "title": "Intensive Teaching",
      "desc": "Intensive classes and regular mock exams across all sections."
    },
    {
      "title": "Result",
      "desc": "Psychological preparation for the exam day and a successful result."
    }
  ],
  "ctaTitle": "Ready to Reach Your Goal?",
  "ctaDesc": "Start preparations without wasting time. Let our experts help you choose the most suitable program.",
  "freeConsultation": "Free Consultation"
};

en.ServicesData = { ...en.ServicesData, ...topLevelEn };
az.ServicesData = { ...az.ServicesData, ...topLevelAz };

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

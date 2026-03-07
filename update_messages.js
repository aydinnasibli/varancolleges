const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

const studyAbroadDataAz = {
  "hero": {
    "title": "Xaricdə Təhsil",
    "subtitle": "Gələcəyinizi bizimlə planlayın",
    "description": "Varan Colleges olaraq tələbələrimizi ABŞ, Kanada, Avstraliya, Avropa ölkələri və Türkiyədə yerləşən universitet və kolleclərə yönləndiririk. Məqsədimiz yalnız qəbul almaq deyil, tələbənin düzgün ölkə, düzgün ixtisas və düzgün universitet seçməsinə peşəkar şəkildə dəstək olmaqdır."
  },
  "academicAdvice": {
    "title": "Akademik Məsləhət və Karyera Planlaması",
    "items": [
      "Tələbənin akademik göstəricilərinin təhlili",
      "Maraqlarına və gələcək planlarına uyğun ixtisas seçimi",
      "Ölkə və universitet müqayisəsi",
      "Büdcəyə uyğun seçimlərin təqdim olunması",
      "Biz qərarı tələbənin əvəzinə vermirik – düzgün qərar verməsi üçün real və obyektiv məlumat təqdim edirik."
    ]
  },
  "admissionProcess": {
    "title": "Qəbul Prosesi və Sənədləşmə",
    "description": "Biz bakalavr, magistr, doktorantura, foundation və dil proqramları üzrə müraciətləri həyata keçiririk.",
    "items": [
      "Universitet və kolleclərə müraciət",
      "Motivasiya məktubunun hazırlanması",
      "CV və tövsiyə məktublarının redaktəsi",
      "Sənədlərin düzgün şəkildə toplanması və göndərilməsi",
      "Şərti və ya birbaşa qəbul prosesinin idarə olunması"
    ]
  },
  "visaSupport": {
    "title": "Viza Dəstəyi",
    "description": "Biz viza qərarını verən tərəf deyilik, lakin sənədlərin düzgün təqdim olunması üçün prosesi tam şəkildə idarə edirik.",
    "items": [
      "Sənədlərin düzgün hazırlanması",
      "Bank sənədləri və maliyyə sübutu üzrə istiqamət",
      "Viza formalarının doldurulması",
      "Müsahibəyə hazırlıq"
    ]
  },
  "additionalServices": {
    "title": "Əlavə Xidmətlər",
    "items": [
      "Yaşayış seçimi (kampus və ya rezidensiya)",
      "Hava limanı qarşılanma istiqamətləndirilməsi",
      "Sığorta və qeydiyyat dəstəyi",
      "Təhsil müddətində konsultasiya"
    ]
  },
  "countries": {
    "usa": {
      "name": "ABŞ",
      "description": "Qlobal təhsil və innovasiya mərkəzi.",
      "features": [
        "Universitet və kolleclərə qəbul",
        "Community college və transfer proqramları",
        "Şərti qəbul imkanları",
        "F1 viza prosesi üzrə tam dəstək"
      ]
    },
    "canada": {
      "name": "Kanada",
      "description": "Yüksək həyat keyfiyyəti və karyera.",
      "features": [
        "Dövlət və özəl kolleclər",
        "Post-Graduation Work Permit (PGWP) uyğun proqram seçimi",
        "Universitet transfer imkanları",
        "Study Permit sənədlərinin hazırlanması"
      ]
    },
    "australia": {
      "name": "Avstraliya",
      "description": "Macəra dolu akademik təcrübə.",
      "features": [
        "Universitet və TAFE proqramları",
        "İngilis dili kursları",
        "Viza müraciəti və sənəd hazırlığı"
      ]
    },
    "europe": {
      "name": "Avropa",
      "description": "Müxtəlif mədəniyyətlər və yüksək keyfiyyətli təhsil.",
      "features": [
        "Almaniya, İtaliya, Macarıstan, Fransa, Niderland və digər ölkələr",
        "Dövlət və özəl universitetlər",
        "İngilis və yerli dildə proqramlar",
        "Hazırlıq (foundation) və birbaşa qəbul imkanları"
      ]
    },
    "turkey": {
      "name": "Türkiyə",
      "description": "Bizə ən yaxın keyfiyyətli təhsil.",
      "features": [
        "Dövlət və özəl universitetlər",
        "YÖS və beynəlxalq qəbul sistemləri",
        "Tibb, mühəndislik və digər ixtisaslar üzrə müraciət"
      ]
    },
    "uk": {
      "name": "Böyük Britaniya",
      "description": "Əsrlərin təhsil ənənəsi.",
      "features": [
        "Russell Group universitetlərinə qəbul",
        "Foundation və Pre-Master proqramları",
        "Tier 4 viza dəstəyi",
        "IELTS hazırlığı və imtahan qeydiyyatı"
      ]
    }
  }
};

const studyAbroadDataEn = {
  "hero": {
    "title": "Study Abroad",
    "subtitle": "Plan your future with us",
    "description": "As Varan Colleges, we direct our students to universities and colleges located in the USA, Canada, Australia, European countries, and Turkey. Our goal is not just to get admission, but to provide professional support to the student in choosing the right country, the right major, and the right university."
  },
  "academicAdvice": {
    "title": "Academic Counseling and Career Planning",
    "items": [
      "Analysis of student's academic performance",
      "Choice of major according to interests and future plans",
      "Country and university comparison",
      "Presenting budget-friendly options",
      "We do not make decisions for the student - we provide real and objective information to make the right decision."
    ]
  },
  "admissionProcess": {
    "title": "Admission Process and Documentation",
    "description": "We process applications for bachelor's, master's, doctoral, foundation, and language programs.",
    "items": [
      "Application to universities and colleges",
      "Preparation of motivation letter",
      "Editing CV and recommendation letters",
      "Proper collection and submission of documents",
      "Management of conditional or direct admission process"
    ]
  },
  "visaSupport": {
    "title": "Visa Support",
    "description": "We are not the visa decision makers, but we fully manage the process for proper submission of documents.",
    "items": [
      "Proper preparation of documents",
      "Direction on bank documents and proof of funds",
      "Filling out visa forms",
      "Interview preparation"
    ]
  },
  "additionalServices": {
    "title": "Additional Services",
    "items": [
      "Accommodation selection (campus or residence)",
      "Airport pickup guidance",
      "Insurance and registration support",
      "Consultation during studies"
    ]
  },
  "countries": {
    "usa": {
      "name": "USA",
      "description": "Global center for education and innovation.",
      "features": [
        "Admission to universities and colleges",
        "Community college and transfer programs",
        "Conditional admission opportunities",
        "Full support for F1 visa process"
      ]
    },
    "canada": {
      "name": "Canada",
      "description": "High quality of life and career.",
      "features": [
        "Public and private colleges",
        "Post-Graduation Work Permit (PGWP) eligible program selection",
        "University transfer opportunities",
        "Preparation of Study Permit documents"
      ]
    },
    "australia": {
      "name": "Australia",
      "description": "Adventurous academic experience.",
      "features": [
        "University and TAFE programs",
        "English language courses",
        "Visa application and document preparation"
      ]
    },
    "europe": {
      "name": "Europe",
      "description": "Diverse cultures and high-quality education.",
      "features": [
        "Germany, Italy, Hungary, France, Netherlands and other countries",
        "Public and private universities",
        "Programs in English and local languages",
        "Preparation (foundation) and direct admission opportunities"
      ]
    },
    "turkey": {
      "name": "Turkey",
      "description": "Quality education closest to us.",
      "features": [
        "Public and private universities",
        "YÖS and international admission systems",
        "Applications for medicine, engineering, and other majors"
      ]
    },
    "uk": {
      "name": "United Kingdom",
      "description": "Centuries of education tradition.",
      "features": [
        "Admission to Russell Group universities",
        "Foundation and Pre-Master programs",
        "Tier 4 visa support",
        "IELTS preparation and exam registration"
      ]
    }
  }
};

const appModalAz = {
  "title": "Müraciət et",
  "desc": "Təhsiliniz üçün ilk addımı atın. Məlumatlarınızı daxil edin, sizinlə əlaqə saxlayaq.",
  "nameLabel": "Ad və Soyad",
  "namePlaceholder": "Adınız Soyadınız",
  "emailLabel": "Email",
  "emailPlaceholder": "nümunə@mail.com",
  "phoneLabel": "Əlaqə Nömrəsi",
  "phonePlaceholder": "+994 50 123 45 67",
  "messageLabel": "Əlavə Qeydlər (İstəyə bağlı)",
  "messagePlaceholder": "Sizi maraqlandıran suallar...",
  "submit": "Göndər",
  "submitting": "Göndərilir...",
  "success": "Müraciətiniz qəbul edildi!",
  "error": "Xəta baş verdi.",
  "unexpectedError": "Gözlənilməz xəta baş verdi."
};

const appModalEn = {
  "title": "Apply Now",
  "desc": "Take the first step for your education. Enter your details, let us contact you.",
  "nameLabel": "Full Name",
  "namePlaceholder": "Your Full Name",
  "emailLabel": "Email",
  "emailPlaceholder": "example@mail.com",
  "phoneLabel": "Phone Number",
  "phonePlaceholder": "+994 50 123 45 67",
  "messageLabel": "Additional Notes (Optional)",
  "messagePlaceholder": "Questions you are interested in...",
  "submit": "Submit",
  "submitting": "Submitting...",
  "success": "Your application has been accepted!",
  "error": "An error occurred.",
  "unexpectedError": "An unexpected error occurred."
};

const servicesPageAz = {
  "heroTitle": "Xidmətlərimiz",
  "heroDesc": "Keyfiyyətli təhsil və parlaq gələcək üçün ehtiyacınız olan hər şey bir ünvanda. VaranColleges olaraq hədəflərinizə çatmağınız üçün yanınızdayıq.",
  "home": "Ana Səhifə",
  "services": "Xidmətlər",
  "borderlessEducation": "Sərhədsiz Təhsil",
  "worldIsYourCampus": "Dünya Sizin Kampusunuzdur"
};

const servicesPageEn = {
  "heroTitle": "Our Services",
  "heroDesc": "Everything you need for quality education and a bright future in one place. As VaranColleges, we are by your side to help you reach your goals.",
  "home": "Home",
  "services": "Services",
  "borderlessEducation": "Borderless Education",
  "worldIsYourCampus": "The World Is Your Campus"
};

const servicesDataAz = {
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
  "free": "Ödənişsiz"
};

const servicesDataEn = {
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
  "free": "Free"
};

en.StudyAbroadData = studyAbroadDataEn;
az.StudyAbroadData = studyAbroadDataAz;

en.ApplicationModal = appModalEn;
az.ApplicationModal = appModalAz;

en.ServicesPage = servicesPageEn;
az.ServicesPage = servicesPageAz;

en.ServicesData = { ...en.ServicesData, ...servicesDataEn };
az.ServicesData = { ...az.ServicesData, ...servicesDataAz };

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

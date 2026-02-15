import { LucideIcon } from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  content: {
    examInfo: string;
    format: string;
    grading: string;
    whyUs: string;
    preparationProcess: string;
  };
}

export const servicesData: ServiceData[] = [
  {
    slug: "sat",
    title: "SAT Hazırlığı",
    description: "Dünyanın top universitetlərinə açılan qapı. Riyaziyyat və İngilis dili biliklərinizi beynəlxalq standartlara uyğunlaşdırın.",
    heroImage: "https://images.unsplash.com/photo-1544931170-3ca1337cce88?q=80&w=2675&auto=format&fit=crop",
    content: {
      examInfo: "SAT (Scholastic Assessment Test) ABŞ və bir çox digər ölkələrin ali təhsil müəssisələrinə qəbul üçün əsas imtahandır. Bu imtahan tələbənin kollec səviyyəsində akademik yüklənməyə nə dərəcədə hazır olduğunu ölçür. İmtahanın əsas məqsədi tələbənin tənqidi düşüncə və problem həlletmə bacarıqlarını qiymətləndirməkdir.",
      format: "Rəqəmsal SAT iki əsas bölmədən ibarətdir: Oxu və Yazı (Reading and Writing) və Riyaziyyat (Math). Hər bir bölmə iki moduldan ibarətdir. İmtahan adaptivdir, yəni birinci moduldakı performansınız ikinci modulun çətinlik dərəcəsini müəyyən edir. Ümumi müddət təxminən 2 saat 14 dəqiqədir. Suallar daha qısa və kontekstli mətnlərə əsaslanır.",
      grading: "SAT 400-1600 bal aralığında qiymətləndirilir. Hər iki bölmə (Oxu/Yazı və Riyaziyyat) 200-800 bal verir. Səhv cavablar ümumi baldan çıxılmır, bu səbəbdən heç bir sualı cavabsız qoymamaq tövsiyə olunur. 1400+ nəticə top universitetlər üçün rəqabətli hesab olunur.",
      whyUs: "Bizimlə SAT hazırlığı zamanı siz hər həftə sınaq imtahanlarında iştirak edir, fərdi zəiflikləriniz üzərində işləyir və süni intellekt dəstəkli tədris proqramı ilə öyrənirsiniz. Təcrübəli müəllimlərimiz hər bir tələbəyə fərdi yanaşaraq onların potensialını maksimuma çatdırır.",
      preparationProcess: "Hazırlıq prosesi diaqnostik imtahanla başlayır. Nəticəyə uyğun olaraq fərdi dərs planı hazırlanır. Həftəlik dərslər, ev tapşırıqları və aylıq tərəqqi hesabatları ilə inkişafınız daim nəzarətdə saxlanılır.",
    },
  },
  {
    slug: "ielts",
    title: "IELTS Hazırlığı",
    description: "Qlobal imkanlar üçün ingilis dili pasportunuz. İş, təhsil və miqrasiya üçün beynəlxalq sertifikat.",
    heroImage: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "IELTS (International English Language Testing System) dünyada ən populyar ingilis dili testidir. 140-dan çox ölkədə 11,000-dən çox təşkilat tərəfindən tanınır. İmtahanın iki növü var: Academic (təhsil üçün) və General Training (iş və miqrasiya üçün).",
      format: "Test dörd bacarığı yoxlayır: Dinləmə (30 dəqiqə), Oxuma (60 dəqiqə), Yazma (60 dəqiqə) və Danışma (11-14 dəqiqə). Danışma imtahanı digər bölmələrdən fərqli gündə keçirilə bilər. Ümumi imtahan müddəti fasiləsiz olaraq təxminən 2 saat 45 dəqiqədir.",
      grading: "Qiymətləndirmə 9 ballıq şkala (Band Score) əsasında aparılır. Hər bir bacarıq ayrılıqda qiymətləndirilir və bunların ədədi ortası ümumi balı təşkil edir. Bir çox universitet magistratura üçün 6.5 və ya 7.0 bal tələb edir.",
      whyUs: "VaranColleges olaraq biz rəsmi IELTS materiallarından istifadə edirik. Müəllimlərimiz sertifikatlı mütəxəssislərdir və hər biri yüksək IELTS balına sahibdir. Speaking və Writing üzrə detallı feedback sessiyaları təşkil edirik.",
      preparationProcess: "Dərslər hər dörd bacarıq üzrə paralel aparılır. Mütəmadi Mock Exam-lər vasitəsilə real imtahan təcrübəsi yaşayırsınız. Xüsusi strategiyalar və 'time management' texnikaları öyrədilir.",
    },
  },
  {
    slug: "gmat",
    title: "GMAT Hazırlığı",
    description: "Biznes dünyasının liderləri üçün ilk addım. MBA və idarəetmə proqramlarına qəbul açarı.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    content: {
      examInfo: "GMAT (Graduate Management Admission Test) dünyanın aparıcı biznes məktəbləri tərəfindən tələb olunan kompüter əsaslı adaptiv testdir. Bu imtahan real biznes mühitində uğur qazanmaq üçün vacib olan bacarıqları ölçür.",
      format: "GMAT Focus Edition dörd bölmədən ibarətdir: Kəmiyyət (Quantitative), Şifahi (Verbal) və Data Insights. Hər bölmə 45 dəqiqə davam edir. Yazı (AWA) bölməsi yeni formatda çıxarılmışdır. Ümumi müddət 2 saat 15 dəqiqədir.",
      grading: "Ümumi bal 205-805 aralığında dəyişir. Hər bölmə bərabər çəkiyə malikdir. Nəticələr imtahan bitdikdən dərhal sonra (rəsmi olmayan şəkildə) təqdim olunur.",
      whyUs: "GMAT hazırlığında riyazi və məntiqi təfəkkürün inkişafına xüsusi önəm veririk. Çətin sual tipləri üzərində intensiv işləyərək tələbələrimizin analitik bacarıqlarını artırırıq.",
      preparationProcess: "Kurs proqramı həm nəzəri bilikləri, həm də praktiki həll yollarını əhatə edir. Kompüter əsaslı sınaq imtahanları ilə adaptiv test mühitinə tam uyğunlaşma təmin edilir.",
    },
  },
  {
    slug: "toefl",
    title: "TOEFL Hazırlığı",
    description: "Şimali Amerika təhsil standartlarına uyğun akademik ingilis dili.",
    heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "TOEFL (Test of English as a Foreign Language) akademik mühitdə ingilis dili bacarıqlarını ölçən ən mötəbər testlərdən biridir. Xüsusilə ABŞ və Kanada universitetləri üçün əvəzolunmazdır.",
      format: "Yenilənmiş TOEFL iBT formatı daha qısadır və təxminən 2 saat davam edir. Oxuma, Dinləmə, Danışma və Yazma bölmələrini əhatə edir. 'Writing for an Academic Discussion' adlı yeni tapşırıq növü əlavə edilib.",
      grading: "Hər bölmə 30 bal, ümumi imtahan isə 120 bal üzərindən qiymətləndirilir. Yüksək reytinqli universitetlər adətən 100+ bal tələb edir.",
      whyUs: "TOEFL imtahanının spesifik strukturu və qiymətləndirmə meyarlarına bələd olan komandamızla yüksək nəticə əldə etmək daha asandır. Fərdi səhvlərin analizi bizim əsas üstünlüyümüzdür.",
      preparationProcess: "Dərslərdə akademik mətnlərin oxunması, mühazirələrin dinlənilməsi və akademik esselərin yazılması üzrə intensiv təcrübələr aparılır.",
    },
  },
  {
    slug: "yos",
    title: "YÖS Hazırlığı",
    description: "Türkiyənin prestijli universitetlərində təhsil almaq xəyalınızı gerçəkləşdirin.",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "YÖS (Yabancı Uyruklu Öğrenci Sınavı) Türkiyədə ali təhsil almaq istəyən əcnəbilər üçün keçirilən qəbul imtahanıdır. TR-YÖS mərkəzi imtahanı ilə yanaşı, bəzi universitetlər daxili imtahanlarını da keçirirlər.",
      format: "İmtahan əsasən Məntiq (IQ), Riyaziyyat və Həndəsə suallarından ibarətdir. TR-YÖS formatında 80 sual təqdim olunur və 100 dəqiqə vaxt verilir.",
      grading: "Maksimum nəticə 100 bal və ya 500 bal (universitetə görə dəyişir) qəbul edilir. Səhv cavablar adətən düzgün cavablara təsir etmir, lakin bəzi universitetlərdə 4 səhv 1 düzü apara bilər.",
      whyUs: "YÖS proqramımız Türkiyə təhsil sisteminə və imtahan proqramına tam uyğundur. Riyaziyyat və məntiq üzrə mütəxəssislərimiz sizə ən qısa həll yollarını öyrədir.",
      preparationProcess: "Sıfırdan başlayanlar və təkrar edənlər üçün fərqli qruplarımız mövcuddur. Hər mövzu bitdikdən sonra sınaq imtahanları ilə biliklər möhkəmləndirilir.",
    },
  },
  {
    slug: "gre",
    title: "GRE Hazırlığı",
    description: "Akademik karyeranızın növbəti pilləsi. Magistr və doktorantura üçün qızıl standart.",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "GRE (Graduate Record Examinations) texniki, humanitar və biznes sahələrində magistratura təhsili üçün tələb olunur. Dünyanın minlərlə universiteti tərəfindən qəbul edilir.",
      format: "GRE General Test 3 hissədən ibarətdir: Verbal Reasoning (Şifahi məntiq), Quantitative Reasoning (Riyazi məntiq) və Analytical Writing (Analitik yazı). İmtahan müddəti 1 saat 58 dəqiqəyə endirilmişdir.",
      grading: "Verbal və Quantitative bölmələri 130-170 bal, Writing isə 0-6 bal aralığında qiymətləndirilir. Yaxşı bir nəticə üçün hər iki əsas bölmədən 160+ bal hədəflənməlidir.",
      whyUs: "GRE söz ehtiyatının (vocabulary) zənginləşdirilməsi və mürəkkəb mətnlərin analizi üzrə xüsusi metodikamız var. Riyazi hissədə isə vaxta qənaət edən həll üsulları öyrədilir.",
      preparationProcess: "Kurs müddətində rəsmi ETS materiallarından istifadə olunur. Tələbələrə həmçinin minlərlə sözdən ibarət rəqəmsal flashkartlar təqdim edilir.",
    },
  },
  {
    slug: "ab",
    title: "AB Proqramı",
    description: "Orta məktəbdə universitet səviyyəsində təhsil. Qlobal uğurun təməli.",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2732&auto=format&fit=crop",
    content: {
      examInfo: "Advanced Placement (AP) proqramı College Board tərəfindən idarə olunur. Bu proqram şagirdlərə hələ məktəb illərində kollec səviyyəsində fənləri öyrənmək və kredit qazanmaq imkanı verir.",
      format: "İmtahanlar hər fənn üzrə fərqlidir, lakin adətən çoxseçimli suallar və açıq tipli (free-response) tapşırıqlardan ibarət olur. İmtahanlar may ayında keçirilir.",
      grading: "Nəticələr 1-5 bal şkalasında qiymətləndirilir. 3 'qualified', 4 'well qualified', 5 'extremely well qualified' hesab olunur. Bir çox universitet 3 və yuxarı balı kredit kimi qəbul edir.",
      whyUs: "Bizim tədris proqramımız şagirdlərin məktəb yükünü nəzərə alaraq hazırlanmışdır. Təcrübəli müəllimlərimiz AP kurikulumuna tam bələddir.",
      preparationProcess: "Fənn üzrə dərinləşdirilmiş dərslər, keçmiş imtahan suallarının analizi və imtahan strategiyaları tədrisin əsasını təşkil edir.",
    },
  },
  {
    slug: "ib",
    title: "IB Proqramı",
    description: "Hərtərəfli inkişaf və qlobal vətəndaşlıq üçün Beynəlxalq Bakalavriat.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "International Baccalaureate (IB) Diploma Programme 16-19 yaşlılar üçün nəzərdə tutulmuş nüfuzlu təhsil proqramıdır. Tələbələrin intellektual, sosial, emosional və fiziki inkişafını hədəfləyir.",
      format: "Tələbələr 6 fənn qrupundan dərslər alır. Əlavə olaraq TOK (Theory of Knowledge), CAS (Creativity, Activity, Service) və Extended Essay tələblərini yerinə yetirməlidirlər.",
      grading: "Maksimum bal 45-dir. Hər fənn 7 balla qiymətləndirilir (6x7=42), əlavə 3 bal isə nüvə komponentlərindən (TOK, EE) gəlir. Diplom almaq üçün minimum 24 bal lazımdır.",
      whyUs: "IB proqramının çətinliklərini başa düşürük və tələbələrə həm akademik, həm də psixoloji dəstək veririk. Internal Assessment (IA) və Extended Essay yazımında mentorluq edirik.",
      preparationProcess: "Dərslər tənqidi düşüncə və araşdırma bacarıqlarının inkişafına yönəlib. Hər fənn üzrə xüsusi materiallar və past paper-lər istifadə olunur.",
    },
  },
  {
    slug: "general-english",
    title: "General English",
    description: "Sərhədsiz ünsiyyət azadlığı. İngilis dilini doğma diliniz kimi danışın.",
    heroImage: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=2670&auto=format&fit=crop",
    content: {
      examInfo: "General English kurslarımız CEFR (Common European Framework of Reference for Languages) standartlarına tam uyğundur. A1 (Beginner) səviyyəsindən C2 (Proficiency) səviyyəsinə qədər bütün mərhələləri əhatə edir.",
      format: "Dərslər kommunikativ metodika əsasında qurulub. Qrammatika, lüğət, oxu, yazı, dinləmə və ən əsası danışıq bacarıqları kompleks şəkildə inkişaf etdirilir.",
      grading: "Hər səviyyənin sonunda keçirilən yekun imtahan (Final Exam) və kurs boyu göstərilən aktivlik əsasında tələbənin növbəti səviyyəyə keçidi müəyyənləşdirilir.",
      whyUs: "Yalnız qrammatika öyrənməklə kifayətlənmirik, dilin real həyatda tətbiqinə önəm veririk. Danışıq klublarımız (Conversation Clubs) və xarici müəllimlərimizlə dil mühitini sizə gətiririk.",
      preparationProcess: "İnteraktiv dərslər, video və audio materiallar, rol oyunları və müzakirələr tədrisin ayrılmaz hissəsidir. Hər tələbəyə fərdi inkişaf planı hazırlanır.",
    },
  },
];

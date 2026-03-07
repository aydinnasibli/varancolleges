const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

// Updates to ServicesPage section in JSON
az.ServicesPage = {
  ...az.ServicesPage,
  "academicDevelopment": "Akademik İnkişaf",
  "languageCourses": "Dil Kursları və İmtahanlar",
  "coursesDesc": "Beynəlxalq sertifikatlar və xarici dil biliklərinizi təkmilləşdirmək üçün peşəkar proqramlar."
};

en.ServicesPage = {
  ...en.ServicesPage,
  "academicDevelopment": "Academic Development",
  "languageCourses": "Language Courses & Exams",
  "coursesDesc": "Professional programs to improve your international certificates and foreign language skills."
};

az.ServicesData = {
  ...az.ServicesData,
  "details": "Ətraflı"
}

en.ServicesData = {
  ...en.ServicesData,
  "details": "Details"
}

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

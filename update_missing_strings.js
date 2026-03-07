const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

// StudyAbroadData updates
const newAzStrings = {
  "goBack": "Geri Qayıt",
  "advantages": "Üstünlüklər",
  "individualApproach": "Fərdi Yanaşma",
  "individualApproachDesc": "Hər bir tələbənin potensialını maksimuma çatdırmaq üçün fərdi strategiya hazırlayırıq.",
  "fullSupport": "Tam Dəstək",
  "fullSupportDesc": "Qəbul prosesindən etibarən universitetə yerləşənə qədər hər addımda yanınızdayıq."
};

const newEnStrings = {
  "goBack": "Go Back",
  "advantages": "Advantages",
  "individualApproach": "Individual Approach",
  "individualApproachDesc": "We prepare an individual strategy to maximize every student's potential.",
  "fullSupport": "Full Support",
  "fullSupportDesc": "We are with you every step of the way, from the admission process to university placement."
};

az.StudyAbroadData = { ...az.StudyAbroadData, ...newAzStrings };
en.StudyAbroadData = { ...en.StudyAbroadData, ...newEnStrings };

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

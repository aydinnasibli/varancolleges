const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const az = JSON.parse(fs.readFileSync('messages/az.json', 'utf8'));

az.ServicesData["gmat"] = az.ServicesData["gmat-hazirligi"];
az.ServicesData["toefl"] = az.ServicesData["toefl-hazirligi"];
az.ServicesData["yos"] = az.ServicesData["yos-hazirligi"];
az.ServicesData["gre"] = az.ServicesData["gre-hazirligi"];
az.ServicesData["ab"] = az.ServicesData["ab-hazirligi"];
az.ServicesData["ib"] = az.ServicesData["ib-hazirligi"];
az.ServicesData["ielts"] = az.ServicesData["ielts-hazirligi"];
az.ServicesData["sat"] = az.ServicesData["sat-hazirligi"];

en.ServicesData["gmat"] = en.ServicesData["gmat-hazirligi"];
en.ServicesData["toefl"] = en.ServicesData["toefl-hazirligi"];
en.ServicesData["yos"] = en.ServicesData["yos-hazirligi"];
en.ServicesData["gre"] = en.ServicesData["gre-hazirligi"];
en.ServicesData["ab"] = en.ServicesData["ab-hazirligi"];
en.ServicesData["ib"] = en.ServicesData["ib-hazirligi"];
en.ServicesData["ielts"] = en.ServicesData["ielts-hazirligi"];
en.ServicesData["sat"] = en.ServicesData["sat-hazirligi"];


fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('messages/az.json', JSON.stringify(az, null, 2));

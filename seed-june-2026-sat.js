/**
 * Seed script: June 2026 Digital SAT Mock Test
 * Run: node seed-june-2026-sat.js
 *
 * Creates the exam document + all 98 questions (RW x2 modules + Math x2 modules).
 * If the exam slug already exists, the script exits without inserting duplicates.
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  console.error("MONGODB_URL not found in .env.local");
  process.exit(1);
}

// ── Schemas ──────────────────────────────────────────────────────────────────

const ExamSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    type: { type: String, default: "SAT" },
    price: Number,
    isActive: { type: Boolean, default: false },
    coverImage: { type: String, default: "" },
    totalDuration: { type: Number, default: 134 },
    examDate: Date,
    examPassword: { type: String, default: "" },
  },
  { timestamps: true }
);

const QuestionSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    section: String,
    module: Number,
    questionNumber: Number,
    questionType: { type: String, default: "multiple_choice" },
    passageText: { type: String, default: "" },
    questionText: String,
    options: { A: String, B: String, C: String, D: String },
    correctAnswer: String,
    explanation: { type: String, default: "" },
    domain: { type: String, default: "" },
    difficulty: { type: String, default: "medium" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);
QuestionSchema.index(
  { examId: 1, section: 1, module: 1, questionNumber: 1 },
  { unique: true }
);

const Exam =
  mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

// ── Exam data ─────────────────────────────────────────────────────────────────

const EXAM = {
  title: "June 2026 Digital SAT",
  slug: "june-2026-digital-sat",
  description:
    "Full-length Digital SAT Mock Test — June 2026. Reading & Writing (2 modules × 27 questions) and Math (2 modules × 22 questions).",
  type: "SAT",
  price: 1000, // 10.00 AZN  — change as needed
  isActive: false,
  totalDuration: 134,
  examDate: new Date("2026-06-01"),
  examPassword: "",
};

// ── Reading & Writing — Module 1 (27 questions) ───────────────────────────────

const RW_M1 = [
  {
    qn: 1,
    domain: "Vocabulary in Context",
    difficulty: "easy",
    passage:
      "The unexpected economic downturn proved that the corporation's massive capital reserves were far from a guarantee of long-term viability; instead, its bloated operational cost structure left it highly _______ to sudden contractions in global consumer demand.",
    question:
      'Which choice completes the text with the most logical and precise word or phrase?',
    options: { A: "impervious", B: "susceptible", C: "resilient", D: "indifferent" },
    answer: "B",
    explanation:
      "\"Far from a guarantee\" signals the capital reserves did NOT protect the corporation—its high costs left it open to damage. Susceptible (vulnerable) fits perfectly. A, C, D all imply safety or indifference.",
  },
  {
    qn: 2,
    domain: "Vocabulary in Context",
    difficulty: "easy",
    passage:
      "Critics initially dismissed the young director's low-budget sci-fi film as mere camp, but a closer look at the script reveals a deeply moving, _______ subtext that quietly explores the devastating emotional impact of forced migration and cultural exile.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "superficial", B: "poignant", C: "strident", D: "whimsical" },
    answer: "B",
    explanation:
      '"But a closer look reveals" signals a contrast with "mere camp." The subtext is described as "moving" and about "devastating emotional impact"—poignant (deeply moving) is the best fit.',
  },
  {
    qn: 3,
    domain: "Vocabulary in Context",
    difficulty: "easy",
    passage:
      "The primary drawback of the newly proposed transit law is that its financial provisions are entirely _______: while it outlines an ambitious infrastructure expansion, it fails to appropriate any actual tax revenue or municipal bonds to fund the construction.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "substantive", B: "toothless", C: "auspicious", D: "definitive" },
    answer: "B",
    explanation:
      "The colon introduces an explanation: the law outlines a plan but provides no funding. This means it has no real power—toothless. A and D imply substance; C (promising) contradicts the lack of funding.",
  },
  {
    qn: 4,
    domain: "Vocabulary in Context",
    difficulty: "easy",
    passage:
      "While the previous supervisor was notorious for her rigid micromanagement, the new department head has adopted a much more _______ managerial style, allowing individual researchers to set their own hours and choose their own methodology.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "dogmatic", B: "permissive", C: "draconian", D: "steadfast" },
    answer: "B",
    explanation:
      '"While" signals contrast with "rigid micromanagement." The new head allows researchers to set their own hours—permissive (lenient/flexible) is correct. A, C, D all describe strictness.',
  },
  {
    qn: 5,
    domain: "Vocabulary in Context",
    difficulty: "easy",
    passage:
      "The lead architect's attention to the building's historical restoration was incredibly _______: he spent weeks tracking down original 19th-century manufacturing receipts to guarantee that the chemical composition of the new mortar perfectly matched the old.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "meticulous", B: "perfunctory", C: "haphazard", D: "listless" },
    answer: "A",
    explanation:
      "Spending weeks tracking down receipts to ensure a perfect chemical match reflects extreme precision—meticulous. B, C, D all imply carelessness or lack of effort.",
  },
  {
    qn: 6,
    domain: "Craft and Structure",
    difficulty: "medium",
    passage:
      "Many classical music critics argue that the composer's late symphonies represent a radical departure from his early work. Where his youth was defined by a strict adherence to traditional sonata forms, his final pieces display a fluid, almost chaotic structural freedom. However, to label these later compositions as formless is to misunderstand his ultimate artistic aim; he did not abandon structure, but rather sought to subvert it, forcing listeners to find cohesion in thematic recurrence rather than predictable key changes.",
    question: 'As used in the text, what does the word "subvert" most nearly mean?',
    options: { A: "destroy", B: "replicate", C: "overturn", D: "simplify" },
    answer: "C",
    explanation:
      "He did not abandon structure but worked against traditional expectations to flip them. Overturn fits. A is too destructive (he kept structure); B and D miss the rebellious nature.",
  },
  {
    qn: 7,
    domain: "Craft and Structure",
    difficulty: "medium",
    passage:
      "Traditional political models assume that voters act as purely rational economic agents, choosing candidates whose proposed fiscal policies maximize the voter's personal net worth. However, behavioral data often complicates this assumption. For instance, studies show that individuals frequently vote against their own immediate financial self-interest if a candidate's rhetoric aligns strongly with the voter's cultural identity or moral convictions. This suggests that psychological alignment and a sense of social belonging can easily override quantifiable economic incentives in the voting booth.",
    question:
      "Which choice best describes the function of the underlined sentence in the text as a whole? [Underlined: 'For instance, studies show that individuals frequently vote against their own immediate financial self-interest if a candidate's rhetoric aligns strongly with the voter's cultural identity or moral convictions.']",
    options: {
      A: "It introduces a theory that the rest of the passage attempts to disprove.",
      B: "It provides specific empirical evidence that challenges the traditional assumption mentioned earlier.",
      C: "It summarizes the final conclusion reached by the behavioral data analysts.",
      D: "It acknowledges a flaw in the researcher's own experimental methodology.",
    },
    answer: "B",
    explanation:
      'The sentence begins "For instance" and shows data where people vote against financial self-interest—directly challenging the classical rational-actor model. A is wrong (the passage supports this data); C is wrong (it is an example, not the conclusion); D is wrong (no methodology flaw is discussed).',
  },
  {
    qn: 8,
    domain: "Craft and Structure",
    difficulty: "medium",
    passage:
      "The Pre-Raphaelite Brotherhood is frequently framed as a reactionary artistic movement, a group of 19th-century English painters who simply wished to clone the styles of the early Italian Renaissance. Their detailed canvases and focus on mythological themes certainly separated them from their industrial-era contemporaries. However, to view them merely as nostalgic copyists is an oversimplification. Later analyses reveal that their obsession with hyper-realistic nature was a radical critique of academic painting, designed to force viewers to confront the raw, unidealized realities of the human condition.",
    question: "Which choice best describes the overall structure of the text?",
    options: {
      A: "It presents an artistic style, outlines its historical origins, and then argues that it was inferior to contemporary movements.",
      B: "It outlines a common historical interpretation of an art movement, acknowledges the basis for that view, and then introduces a perspective that complicates it.",
      C: "It traces the chronological progression of a painter's career from his early training to his final masterpiece.",
      D: "It compares the works of two rival artistic groups and explains why one ultimately achieved greater commercial success.",
    },
    answer: "B",
    explanation:
      "The text states the common view (nostalgic copyists), acknowledges why people hold it (detailed canvases/mythological themes), then shifts with \"However\" to reveal a more complex, radical interpretation.",
  },
  {
    qn: 9,
    domain: "Cross-Text Connections",
    difficulty: "medium",
    passage:
      "Text 1: For decades, marine biologists operated under the assumption that deep-sea whale falls—the carcasses of whales that sink to the ocean floor—served as localized, temporary food sources that supported scavenger populations for only a few months. This model positioned these events as minor ecological blips rather than structural pillars of the benthic ecosystem.\n\nText 2: Recent deep-sea telemetry has revolutionized our understanding of whale falls by showing that these carcasses initiate complex ecological successions that persist for decades. Chemosynthetic bacteria quickly colonize the bones, breaking down lipids to generate sulfur compounds that sustain entire communities of specialized crabs, clams, and tubeworms for up to fifty years, showing that these dead mammals anchor long-term deep-sea biodiversity hotspots.",
    question:
      "Based on the texts, how would the author of Text 2 most likely respond to the old assumption described in Text 1?",
    options: {
      A: "By arguing that whale falls are actually harmful to deep-sea ecosystems because of the toxic sulfur compounds they release.",
      B: "By suggesting that while the old model correctly identified the immediate scavengers, it drastically underestimated the lifespan and structural impact of whale fall ecosystems.",
      C: "By asserting that the model is entirely correct for shallow waters but completely fails when applied to the benthic zone.",
      D: "By claiming that whale falls only support bacterial life and have no impact on larger organisms like crabs or clams.",
    },
    answer: "B",
    explanation:
      "Text 1 said whale falls last months; Text 2 shows they last up to 50 years—so the old model underestimated their lifespan. A is wrong (the sulfur compounds are beneficial). C invents a shallow/deep water distinction. D contradicts Text 2's mention of crabs and clams.",
  },
  {
    qn: 10,
    domain: "Information and Ideas",
    difficulty: "easy",
    passage:
      "Dr. Marcus Vance's unexpected research trip to the Great Rift Valley was sparked not by a hunt for hominid fossils, but by the rediscovery of the 'Kipengere Records'—a collection of climate journals kept by a German missionary outpost in the late 1800s. To Vance, these were more than historical notes; they were dense data points on an undocumented ecological shift. By comparing these journals with modern satellite vegetation maps, Vance challenged the dominant scientific theory that regional desertification was a modern phenomenon, instead demonstrating that severe dry cycles had been altering the landscape over a century ago.",
    question: "According to the text, what is true about Dr. Marcus Vance?",
    options: {
      A: "He believes the Kipengere Records are inaccurate because they were written by missionaries rather than trained climatologists.",
      B: "His analysis of the historical journals led him to conclude that regional dry spells have a longer history than previously assumed.",
      C: "He initially traveled to the Great Rift Valley to search for ancient human fossils.",
      D: "He discovered that regional desertification has accelerated rapidly due to modern industrial practices.",
    },
    answer: "B",
    explanation:
      "The text directly states Vance demonstrated that dry cycles had been altering the landscape over a century ago—showing dry spells have a longer history. A contradicts his use of the logs. C is explicitly contradicted (he was not hunting fossils). D is not supported.",
  },
  {
    qn: 11,
    domain: "Information and Ideas",
    difficulty: "easy",
    passage:
      "The introduction of 'hyper-accumulating' plants—species genetically modified to extract heavy metals from polluted industrial soil—has been hailed as a triumph for eco-engineering. Proponents argue that these plants provide a cheap, non-invasive method for cleaning brownfield sites. However, critics point out that these plants store the toxic metals directly in their leaves and stems, which can then be eaten by local herbivores. Consequently, they warn that this remediation technique risks introducing highly concentrated toxins directly into the local food web.",
    question: "According to the text, what is a potential danger of hyper-accumulating plants?",
    options: {
      A: "They can deplete the soil of essential organic nutrients, making it impossible for other plants to grow.",
      B: "The toxins they absorb can poison the animals that consume them, threatening the wider ecosystem.",
      C: "They are highly sensitive to weather changes, which can cause them to die before cleaning the soil.",
      D: "They require an excessive amount of water to process the heavy metals they extract.",
    },
    answer: "B",
    explanation:
      "The text states the plants store toxins in leaves, which herbivores eat, introducing concentrated poisons into the food web. A (nutrient depletion), C (weather sensitivity), and D (water requirement) are all invented.",
  },
  {
    qn: 12,
    domain: "Command of Evidence",
    difficulty: "medium",
    passage:
      "A linguistic researcher is investigating the structural evolution of the written Cherokee syllabary created by Sequoyah in the early 19th century. While traditional accounts claim that Sequoyah modeled his symbols entirely on English letters he saw in books, the researcher hypothesizes that his primary design focus was actually \"phonetic efficiency.\" The researcher argues that the shapes of the characters were systematically chosen based on how quickly they could be hand-inked onto printing presses, rather than a desire to mimic European styles.",
    question: "Which finding, if true, would most directly support the researcher's hypothesis?",
    options: {
      A: "Sequoyah's syllabary contains several characters that look identical to Greek and Latin symbols he had never been exposed to.",
      B: "Historical records show that Cherokee characters representing the most frequently used sounds require the fewest pen strokes to write.",
      C: "Newspapers printed in the Cherokee nation during the 1830s sold more copies than English-language papers in neighboring states.",
      D: "Early drafts of the syllabary reveal that Sequoyah originally used a pictographic system before switching to a phonetic alphabet.",
    },
    answer: "B",
    explanation:
      "The hypothesis is that characters were chosen for writing speed (phonetic efficiency). B directly proves this: common sounds = fewest strokes = maximum efficiency. A supports accidental mimicry. C is about sales. D is about an early draft stage.",
  },
  {
    qn: 13,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "An evolutionary biologist is studying the unusual hunting behaviors of the New Caledonian crow. The biologist hypothesizes that these crows manufacture hooked tools from twigs primarily due to localized social learning within specific family groups, rather than an innate genetic instinct shared by all members of the species.",
    question: "Which finding, if true, would most directly support the biologist's hypothesis?",
    options: {
      A: "Crows raised completely in isolation from other birds still attempt to pick up twigs, but they never fashion them into hooks.",
      B: "New Caledonian crows have larger brain-to-body mass ratios than most other bird species found in the region.",
      C: "Fossil evidence indicates that ancestral crow populations used primitive tools millions of years before migrating to New Caledonia.",
      D: "The specific bending techniques used to make the hooks vary wildly from one forest valley to another, but remain identical within family nests.",
    },
    answer: "D",
    explanation:
      "The hypothesis is family-level localized social learning (not universal genetics). D proves it: techniques differ between valleys (not genetic) but are identical within family nests (socially transmitted). A supports learning being required but doesn't prove family-level transmission. B is about brain size; C is about ancestry.",
  },
  {
    qn: 14,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "Dr. Helena Silva is investigating the 'Snyders-Omohundro Paradox'—the fact that early agricultural societies in the Fertile Crescent suffered from widespread malnutrition even though their crop yields provided more calories per acre than foraging did. Silva hypothesizes that the transition to farming forced populations to rely almost exclusively on a single staple crop, creating a catastrophic drop in dietary diversity.",
    question: "Which finding, if true, would most directly undermine Silva's hypothesis?",
    options: {
      A: "Skeletal remains from early farming villages show clear signs of iron-deficiency anemia and stunted bone growth.",
      B: "Chemical analysis of ancient pottery reveals that early farmers regularly supplemented their grain diets with dozens of wild fruits, nuts, and hunted game.",
      C: "Climate models indicate that the region experienced a minor prolonged drought during the transition to agriculture.",
      D: "Written records from later civilizations show that crop failures often led to mass famines.",
    },
    answer: "B",
    explanation:
      "Silva's hypothesis requires that early farmers relied on a single staple crop causing dietary diversity to drop. B directly disproves this—if they regularly ate dozens of wild foods, dietary diversity did NOT drop. A strengthens her theory. C and D are about droughts and famines.",
  },
  {
    qn: 15,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "Biochemists monitored the structural degradation rate of a newly engineered synthetic enzyme across increasing thermal thresholds. The team hypothesized that while the enzyme would remain completely stable at baseline environments, it would exhibit a non-linear breakdown pattern once it crossed a specific thermal boundary, with degradation accelerating rapidly before hitting a maximum saturation plateau where further temperature increases yield no additional structural change.",
    question:
      "Which choice most effectively uses data from the table to support the biochemists' hypothesis?",
    options: {
      A: "The percentage of intact enzyme structure dropped by a mere 5% during the initial heating phase between 20°C and 50°C.",
      B: "The enzyme experienced its most severe single-interval collapse between 50°C and 65°C, dropping by 53%, before stabilizing entirely at a 10% structural baseline between 80°C and 95°C.",
      C: "At 80°C, the total amount of remaining intact enzyme structure was lower than the total structural damage recorded at 95°C.",
      D: "The degradation rate demonstrated a perfectly linear trajectory, with uniform structural losses recorded across all five testing intervals.",
    },
    answer: "B",
    explanation:
      "The hypothesis requires: stability at baseline, rapid acceleration after a boundary, then a plateau. B captures all three: minimal change at first (stable), 53% drop after 50°C (acceleration), 0% change from 80–95°C (plateau). A only covers the initial phase. C is mathematically false. D directly contradicts the non-linear pattern.",
  },
  {
    qn: 16,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "An agricultural science team monitored three distinct varieties of drought-resistant wheat across varying soil moisture levels. The team hypothesized that while a drop in soil moisture would cause a reduction in crop yield across all varieties, Variety Y would demonstrate a higher level of environmental resilience (a lower percentage decrease in yield) than either Variety X or Variety Z under severe water stress.",
    question:
      "Which choice most effectively uses data from the table to support the team's hypothesis?",
    options: {
      A: "Under optimal conditions with 85% soil moisture, Variety Z achieved the highest overall grain yield (130), while Variety Y produced the lowest yield (90).",
      B: "At 45% soil moisture, the yield of Variety Y (78) surpassed the yields of both Variety X (75) and Variety Z (65), making it the top producer under moderate stress.",
      C: "Between optimal conditions and severe stress, Variety X and Variety Z suffered dramatic yield drops of roughly 90%, whereas the yield of Variety Y fell by only 30%.",
      D: "When soil moisture dropped to 25%, the yield of Variety Y remained above 60 bushels per acre, while Variety X and Variety Z both saw their yields fall below 15 bushels per acre.",
    },
    answer: "C",
    explanation:
      "The hypothesis is about relative percentage decrease. C directly compares rates: X and Z fell ~90% (120→12, 130→13) while Y fell only ~30% (90→63). A looks at control conditions only. B examines moderate stress without showing relative rates. D uses absolute values, not percentage decreases.",
  },
  {
    qn: 17,
    domain: "Information and Ideas",
    difficulty: "medium",
    passage:
      "The Chaco Anasazi culture, which flourished in the American Southwest between 900 and 1150 C.E., was famous for constructing massive, multi-story stone complexes known as 'great houses.' These structures suddenly ceased construction around 1130 C.E., a timeline that directly coincides with a catastrophic, fifty-year mega-drought in the region. Traditional archaeological models have long cited this drought as the primary driver of a sudden, chaotic population collapse. However, a recent analysis of trash mounds in the surrounding areas revealed no spike in infant mortality or signs of violence during the drought years; instead, the data shows an orderly, phased abandonment of the valley over several decades, with families leaving in small, planned waves. This discovery strongly suggests that ______",
    question: "Which choice most logically completes the text?",
    options: {
      A: "the great houses were actually destroyed by invading nomadic tribes rather than environmental factors.",
      B: "the Chaco Anasazi managed to discover massive underground aquifers that insulated them from the effects of the drought.",
      C: "the regional abandonment was a calculated, organized migration strategy rather than a sudden social collapse brought on by starvation.",
      D: "the population of the valley actually increased during the fifty-year mega-drought due to immigration.",
    },
    answer: "C",
    explanation:
      "No spike in violence or mortality + orderly phased departure = a planned migration, not a chaotic collapse. A (nomadic tribes) and B (aquifer discovery) have no basis in the passage. D contradicts the abandonment.",
  },
  {
    qn: 18,
    domain: "Standard English Conventions",
    difficulty: "easy",
    passage:
      "Hidden deep within the limestone caverns of New Zealand, millions of tiny glowworms (Arachnocampa luminosa) emit a brilliant blue-green light that ______ flying insects into sticky silk threads hanging from the cave ceiling, providing a steady food source for the colony.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "lure", B: "luring", C: "lures", D: "has lured" },
    answer: "C",
    explanation:
      "The relative pronoun \"that\" refers to \"light\" (singular). The verb must be singular present tense: lures. A is plural; B is a participle; D uses present perfect unnecessarily.",
  },
  {
    qn: 19,
    domain: "Standard English Conventions",
    difficulty: "easy",
    passage:
      "During geological subduction, tectonic plates collide, a process where the heavier oceanic crust slides beneath the lighter continental crust and ______ into the Earth's mantle, recycling surface rock into molten magma.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "melts", B: "melted", C: "will melt", D: "melting" },
    answer: "A",
    explanation:
      "The passage describes an ongoing geological process requiring simple present tense. The singular subject (heavier oceanic crust) takes the singular verb melts. B is past tense; C is future; D creates a fragment.",
  },
  {
    qn: 20,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The remarkable commercial success of the 1908 Model T, which involved the deployment of the world's first moving assembly line for automobile production, ______ entirely to Henry Ford's determination to build an affordable car for the average worker.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "to attribute",
      B: "was attributed",
      C: "attributing",
      D: "having attributed",
    },
    answer: "B",
    explanation:
      "The subject \"The remarkable commercial success\" has no finite verb. \"Was attributed\" provides the required main predicate. A, C, and D are non-finite forms that produce a sentence fragment.",
  },
  {
    qn: 21,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The installation of the transatlantic telegraph cable in 1858 revolutionized global communication ______ it allowed message delivery times between North America and Europe to drop from ten days to a matter of minutes.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "systems;",
      B: "systems",
      C: "systems and",
      D: "systems,",
    },
    answer: "A",
    explanation:
      "Two independent clauses joined without a coordinating conjunction require a semicolon. B creates a fused sentence; C is missing a comma before \"and\" (or changes meaning); D creates a comma splice.",
  },
  {
    qn: 22,
    domain: "Standard English Conventions",
    difficulty: "hard",
    passage:
      "While the delicate, hand-painted porcelain vases produced by the imperial artisans of the Ming Dynasty are celebrated for their vivid cobalt-blue glazes and intricate dragon motifs, ______; this distinction in historical production origins remains a central focus for museum curators studying trade networks.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "the mass-produced earthenware vessels imported from European factories during the late eighteenth century featured simple, repetitive designs.",
      B: "late eighteenth-century European factories and their mass-produced earthenware vessels featured simple, repetitive designs.",
      C: "the simple, repetitive designs of mass-produced earthenware vessels imported from European factories during the late eighteenth century were quite different.",
      D: "European factories produced earthenware vessels in the late eighteenth century that featured simple, repetitive designs.",
    },
    answer: "A",
    explanation:
      "To maintain parallel comparison (vases vs. vessels), the contrasting clause must open with a matching noun (vessels/earthenware). A correctly contrasts vases with mass-produced earthenware vessels. B, C, D shift focus to factories or motifs.",
  },
  {
    qn: 23,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The preservation of the fragile papyrus scrolls in the Herculaneum library—a highly volatile and dangerous undertaking involving the use of multi-spectral imaging and the delicate removal of charred volcanic crust—______ the combined skills of computer scientists and papyrologists.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "have required", B: "require", C: "requires", D: "requiring" },
    answer: "C",
    explanation:
      "Ignore the em-dash phrase (appositive). The primary subject is \"The preservation\" (singular), requiring the singular verb requires. A and B are plural. D is a participle that creates a fragment.",
  },
  {
    qn: 24,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The use of targeted chemical dispersants during marine oil spills represents a rapid, direct intervention, as it breaks up oil slicks into microscopic droplets that can be naturally degraded by ocean bacteria. This technique prevents large quantities of oil from washing ashore and destroying fragile coastal marshes. ______ the application of bioremediation floating mats presents a slower, organic strategy that relies on introducing cultured bacterial colonies directly to the open water, a variable that is highly vulnerable to shifting ocean currents and water temperatures.",
    question: "Which choice completes the text with the most logical transition?",
    options: {
      A: "Specifically,",
      B: "Consequently,",
      C: "In addition,",
      D: "By contrast,",
    },
    answer: "D",
    explanation:
      "The first paragraph describes a rapid, direct chemical intervention; the second describes a slow, organic biological approach. This is a relationship of contrast. A implies elaboration; B implies consequence; C implies addition.",
  },
  {
    qn: 25,
    domain: "Expression of Ideas",
    difficulty: "medium",
    passage:
      "Notes:\n• The 'Acoustic Niche' hypothesis: animals alter vocalizations to avoid frequency competition.\n• Dr. Thomas Green studied avian calls in Ecuador's cloud forests.\n• Local cicadas emit high-frequency buzz during the afternoon.\n• Green used directional microphones and audio spectrograms to track three bird species over five years.\n• When cicadas were active, birds raised their song pitch or shifted singing schedules to early morning.\n• Green concluded that environmental noise forces animals to modify communication strategies.",
    question:
      "The student wants to emphasize the specific scientific tools used and the concrete vocal changes observed during the study. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: {
      A: "By utilizing directional microphones and audio spectrograms, Green discovered that cloud forest birds raised their song pitch or shifted their singing schedules when cicadas were active.",
      B: "The local cicadas emit a high-frequency buzz, leading Thomas Green to conclude that environmental noise forces birds to change their communication strategies.",
      C: "Through a five-year study in Ecuador, Green proved that the acoustic niche hypothesis is a valid concept that applies to all rainforest animals.",
      D: "Directional microphones were used by Thomas Green to track bird species whose songs were being drowned out by the continuous buzz of cicadas.",
    },
    answer: "A",
    explanation:
      "A mentions both tools (directional microphones and spectrograms) AND the specific vocal changes (raised pitch or shifted schedules). B drops the tools. C drops both tools and specific changes. D mentions only one tool and omits the vocal shift data.",
  },
  {
    qn: 26,
    domain: "Craft and Structure",
    difficulty: "medium",
    passage:
      "For decades, historical biographers treated the diaries of political figures as unassailable records of factual truth, utilizing them to reconstruct behind-the-scenes legislative negotiations. Modern historiography, however, views these personal texts with a far more critical eye. Recent scholarship emphasizes that diaries are often curated performance pieces, written with an eye toward posterity; the authors frequently alter timelines and embellish their roles to varnish their historical legacies.",
    question: 'As used in the text, what does the word "varnish" most nearly mean?',
    options: { A: "protect", B: "enhance", C: "expose", D: "document" },
    answer: "B",
    explanation:
      "Authors embellish their roles to improve how they appear to future generations. \"Varnish\" here means to enhance or gloss over. A (protect) is too neutral. C (expose) is the opposite. D (document) is too neutral.",
  },
  {
    qn: 27,
    domain: "Craft and Structure",
    difficulty: "medium",
    passage:
      "Many urban planners advocate for the widespread installation of green roofs—rooftops covered with living vegetation—as a primary strategy for mitigating the urban heat island effect. These green spaces are designed to absorb sunlight and cool buildings through evapotranspiration. However, engineering evaluations suggest that the net benefits of these structures are highly variable. Specifically, in regions that experience frequent, prolonged droughts, the energy required to pump supplemental irrigation water to the roofs can completely erase the cooling efficiency of the plants. This reality forces city designers to look toward passive reflective cool roofs as a more stable alternative in arid climates.",
    question:
      "Which choice best describes the function of the underlined sentence in the text as a whole? [Underlined: 'Specifically, in regions that experience frequent, prolonged droughts, the energy required to pump supplemental irrigation water to the roofs can completely erase the cooling efficiency of the plants.']",
    options: {
      A: "It introduces a new environmental problem that green roofs were explicitly designed to solve.",
      B: "It offers a specific counter-example that explains why the technology's effectiveness depends heavily on location.",
      C: "It outlines the exact mechanical steps involved in the process of evapotranspiration.",
      D: "It summarizes the unanimous consensus shared by urban planners and environmental engineers.",
    },
    answer: "B",
    explanation:
      "The sentence provides a specific scenario (drought regions) where green roofs fail, illustrating that performance depends on geography. A is wrong (it shows failure, not a problem the roofs solve). C is wrong (no mechanism described). D invents a consensus that contradicts the text.",
  },
];

// ── Reading & Writing — Module 2 (27 questions) ───────────────────────────────

const RW_M2 = [
  {
    qn: 1,
    domain: "Vocabulary in Context",
    difficulty: "hard",
    passage:
      "The investigative journalist's latest exposé was defined by its uncompromising _______; though she anticipated backlash from the political establishment, her refusal to omit verified allegations of corruption provided a raw look at municipal misconduct.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "duplicity", B: "candor", C: "urbanity", D: "complacency" },
    answer: "B",
    explanation:
      "The journalist refused to omit verified truths despite backlash—this is uncompromising candor (honesty/frankness). A (duplicity) means deceit, the opposite. C (sophistication) and D (apathy) miss the target.",
  },
  {
    qn: 2,
    domain: "Vocabulary in Context",
    difficulty: "hard",
    passage:
      "The financial analyst argued that the tech startup's valuation was fundamentally _______: while its promotional materials claimed a massive global user base, its internal ledgers revealed that over ninety percent of its accounts were inactive automated bots.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "comprehensive", B: "nugatory", C: "auspicious", D: "resilient" },
    answer: "B",
    explanation:
      "The colon explains: 90% of accounts are fake bots, rendering the valuation worthless/invalid—nugatory. A, C, D all imply the valuation has real weight or value.",
  },
  {
    qn: 3,
    domain: "Vocabulary in Context",
    difficulty: "hard",
    passage:
      "Because the ancient papyrus scrolls had been buried for centuries in damp soil, their structure had become incredibly _______; the slightest vibration from scanning equipment threatened to reduce the artifacts to dust, requiring immediate chemical stabilization.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "malleable", B: "friable", C: "resilient", D: "dynamic" },
    answer: "B",
    explanation:
      "The slightest vibration could reduce the scrolls to dust—this describes the property of being easily crumbled: friable. A (malleable) and D (dynamic) don't fit. C (resilient) is the opposite.",
  },
  {
    qn: 4,
    domain: "Vocabulary in Context",
    difficulty: "hard",
    passage:
      "In direct contrast to the highly speculative metrics favored by day traders, the conservative pension fund adopted a strictly _______ framework, committing capital solely to corporations with audited asset balances and decades of consistent revenue growth.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "empirical", B: "ephemeral", C: "arbitrary", D: "esoteric" },
    answer: "A",
    explanation:
      '"In direct contrast to speculative" signals the fund avoids guesswork and uses verified, hard metrics—an empirical approach. B means short-lived; C means random; D means understood by few.',
  },
  {
    qn: 5,
    domain: "Vocabulary in Context",
    difficulty: "hard",
    passage:
      "The clinical director's oversight of the pharmaceutical trial was exceptionally _______: she required that all raw telemetry charts be audited manually across multiple independent shifts to guarantee total systemic compliance.",
    question:
      "Which choice completes the text with the most logical and precise word or phrase?",
    options: { A: "cursory", B: "scrupulous", C: "desultory", D: "erratic" },
    answer: "B",
    explanation:
      "Requiring manual audits across multiple independent shifts to guarantee compliance reflects painstaking attention to accuracy—scrupulous. A, C, D all imply carelessness or unpredictability.",
  },
  {
    qn: 6,
    domain: "Craft and Structure",
    difficulty: "hard",
    passage:
      "The legal scholar argued that the original constitutional amendment was never meant to be a static decree, but rather a living text framework. While conservative jurists insist on a literal interpretation of its centuries-old phrasing, historical records show that the framers intentionally chose broad language to allow future generations to adapt the law to changing societal norms. To tie modern jurisprudence strictly to the specific cultural boundaries of the 18th century is to stultify the very growth and adaptability that the document was engineered to preserve.",
    question: 'As used in the text, what does the word "stultify" most nearly mean?',
    options: { A: "accelerate", B: "stifle", C: "validate", D: "clarify" },
    answer: "B",
    explanation:
      "Tying the constitution to 18th-century limits would crush its ability to grow. Stifle (to choke or suppress growth) is the best fit. A (accelerate) is the opposite; C and D imply aiding or clarifying.",
  },
  {
    qn: 7,
    domain: "Craft and Structure",
    difficulty: "hard",
    passage:
      "Standard economic theory relies heavily on the concept of information symmetry, assuming that all participants in a market have equal access to relevant data when making financial transactions. However, real-world sectors routinely violate this idealized baseline. In the used-car market, for example, sellers possess detailed knowledge about a vehicle's hidden defects that buyers cannot easily detect before a purchase. This fundamental imbalance creates a 'market failure,' driving down overall vehicle quality as buyers lower their offers to hedge against the risk of purchasing a defective asset.",
    question:
      "Which choice best describes the function of the underlined sentence in the text as a whole? [Underlined: 'In the used-car market, for example, sellers possess detailed knowledge about a vehicle's hidden defects that buyers cannot easily detect before a purchase.']",
    options: {
      A: "It introduces a legislative policy designed to fix information asymmetry.",
      B: "It serves as a concrete illustration of how the information imbalance mentioned earlier operates in a specific industry.",
      C: "It outlines a mathematical model used to predict used-car pricing trends.",
      D: "It contradicts the author's primary argument about real-world market failures.",
    },
    answer: "B",
    explanation:
      "\"For example\" signals this is a concrete case study showing how information asymmetry works in a specific sector. A (legislation), C (mathematical model), and D (contradiction) are all unsupported.",
  },
  {
    qn: 8,
    domain: "Craft and Structure",
    difficulty: "hard",
    passage:
      "Mid-century concrete civic plazas are frequently celebrated by architectural historians as monuments of egalitarian design, built without decorative elite flourishes to maximize open public utility. City planners originally designed these spaces to foster democratic gatherings and open community interaction. However, focusing solely on this design intent overlooks their lived social outcomes. Decades later, these vast, unshaded expanses often became landscapes of alienation, as their massive scale and lack of human-centric design isolated visitors within sterile environments that actively discouraged comfortable social lingering.",
    question: "Which choice best describes the overall structure of the text?",
    options: {
      A: "It critiques the materials used in modern construction and advocates for a return to traditional timber architecture.",
      B: "It profiles the democratic ideals behind a design movement, notes its structural objectives, and then asserts that its real-world results contradicted those goals.",
      C: "It details the chronological restoration of an urban plaza and evaluates the financial costs of the project.",
      D: "It presents a biography of a famous urban planner and analyzes his artistic disputes with contemporary rivals.",
    },
    answer: "B",
    explanation:
      "The text presents the democratic ideals (egalitarian design), notes the structural objectives (foster community), then pivots with \"However\" to show the real social outcome (alienation). A, C, D are all unsupported.",
  },
  {
    qn: 9,
    domain: "Cross-Text Connections",
    difficulty: "hard",
    passage:
      "Text 1: For generations, planetary geologists operated under a localized volcanic model for Mars, asserting that the planet's massive shield volcanoes were fueled exclusively by isolated magma pockets trapped directly beneath the structures. This paradigm framed the Martian mantle as a static, cooling interior that lacked the large-scale convective currents seen on Earth.\n\nText 2: Recent seismic data collected by Mars landers has overturned these localized assumptions by showing deep mantle activity. The detection of distinct low-velocity seismic zones points to an active mantle plume rising from the core-mantle boundary, feeding multiple volcanic systems across thousands of miles. This global convective process implies a dynamic, interconnected interior that localized models cannot explain.",
    question:
      "Based on the texts, how would the researchers of Text 2 most likely characterize the old localized model described in Text 1?",
    options: {
      A: "As an overly simplistic view that underestimates the scale and interconnected nature of Martian internal activity.",
      B: "As a useful framework for predicting eruptions that lacks the mathematical precision to map core boundaries.",
      C: "As a reliable system that only fails when crustal tectonic plates shift unexpectedly.",
      D: "As a temporary phase in Martian history that was accurate billions of years ago but has no relevance to the modern planet.",
    },
    answer: "A",
    explanation:
      "Text 2 shows the localized model missed global convective plumes spanning thousands of miles—it was overly simplistic and underestimated the interior's interconnected nature. B (eruption predictor) and C (tectonic plates) have no basis. D is not supported.",
  },
  {
    qn: 10,
    domain: "Information and Ideas",
    difficulty: "medium",
    passage:
      "Dr. Elena Rostova's unexpected research trip to the Atacama Basin was prompted not by a desire to find commercial lithium reserves, but by the discovery of the 'Atacama Hydro-Registry'—a series of detailed water level records compiled by a British nitrate mining collective in the early 1900s. To Rostova, these were more than corporate notes; they were chemical snapshots of a lost hydrologic era. By systematically matching these old records with modern satellite aquifer measurements, Rostova challenged the long-standing scientific consensus that the basin's water recharge rates were completely isolated, instead proving a massive underground water network that fundamentally shifted her team's climate models.",
    question: "According to the text, what is true about Dr. Elena Rostova?",
    options: {
      A: "She believes early 20th-century mining logs are chemically compromised and should be left out of modern studies.",
      B: "She conducted her research trip primarily to secure private mining concessions for her university team.",
      C: "Her analysis of the historical mining records forced a reevaluation of the physical scale of the region's underground water systems.",
      D: "She discovered that the Atacama Basin's water supply has been completely depleted by modern industrial mining.",
    },
    answer: "C",
    explanation:
      "The text states Rostova proved a massive underground water network, forcing reevaluation of the scale of water systems. A contradicts her use of the logs. B is unsupported. D is unsupported.",
  },
  {
    qn: 11,
    domain: "Information and Ideas",
    difficulty: "medium",
    passage:
      "While the impact of the asteroid at the K-Pg boundary is universally recognized as the primary trigger for the rise of mammalian dominance, some macro-evolutionary biologists suggest that this event was an accelerant for an ecological group already experiencing structural contraction. These analysts point to fossil data indicating that prolonged climate cooling from the Deccan Traps volcanic eruptions had been fracturing specialized food chains for millions of years prior to the bolide impact. Consequently, they argue that the asteroid locked in a mass extinction trajectory that was already well underway due to long-term volcanic stress.",
    question:
      "Which statement best reflects the view of the 'some macro-evolutionary biologists' mentioned in the text?",
    options: {
      A: "The asteroid impact was an isolated, self-contained event that initiated the entire mammalian expansion line.",
      B: "The mass extinction was driven by a combination of pre-existing volcanic disruptions and a sudden, catastrophic impact.",
      C: "The Deccan Traps volcanic activity was globally insignificant compared to the physical damage of the asteroid impact.",
      D: "Target ecological populations were highly stable and expanding until the sudden arrival of the asteroid.",
    },
    answer: "B",
    explanation:
      "The biologists argue the asteroid accelerated an extinction already underway due to volcanic stress—a combination of both causes. A (asteroid alone) and C (volcanism insignificant) both contradict the dual-cause argument. D directly contradicts \"already experiencing structural contraction.\"",
  },
  {
    qn: 12,
    domain: "Information and Ideas",
    difficulty: "medium",
    passage:
      "The deployment of engineered 'mycelial networks'—fungal matrices designed to absorb and break down toxic hydrocarbons from contaminated industrial runoff—has been hailed as a breakthrough for green engineering. Proponents argue that these living filters safely lock away heavy metals and process complex organic pollutants. However, skeptics caution that the heavy metabolic cost of isolating highly toxic compounds forces the fungi to divert energy away from structural growth. This resource diversion can cause the fungal matrix to collapse before long-term decontamination is achieved.",
    question:
      "According to the text, what is a potential vulnerability of engineered mycelial networks?",
    options: {
      A: "The filtering process can become inefficient during freezing temperatures, rendering the fungus inactive.",
      B: "The toxins absorbed by the network can leak into deep groundwater supplies through secondary biological breakdown.",
      C: "The energy cost of processing toxins can compromise the structural stability and survival of the fungal network.",
      D: "The matrices require artificial chemical supplements to remain alive in industrial settings.",
    },
    answer: "C",
    explanation:
      "Skeptics say the metabolic cost of processing toxins forces the fungi to divert energy from growth, potentially causing collapse. A (freezing), B (groundwater leaks), and D (chemical supplements) are all invented details not in the text.",
  },
  {
    qn: 13,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "A researcher is studying the structural purpose of ancient tiered stone platforms in the Andean highlands. While current theories state that these platforms were built exclusively to expand agricultural growing space, the researcher hypothesizes that their primary function was actually 'seismic damping.' The engineer claims that the loose gravel filling and staggered step geometry were calculated to absorb tectonic shear waves, protecting elite temples built on the summits.",
    question: "Which finding, if true, would most directly support the engineer's hypothesis?",
    options: {
      A: "Physical scale models demonstrate that seismic shear waves traveling through the gravel terrace layers lose up to 60% of their energy before reaching the top platform.",
      B: "Chemical analysis shows that the topsoil layers on the stone platforms contain high concentrations of ancient domesticated grain variants.",
      C: "Inscriptions found on nearby monuments detail the local population's tribute payments to regional political leaders.",
      D: "Excavations have revealed that the terraces are built from locally sourced granite blocks that match neighboring structures.",
    },
    answer: "A",
    explanation:
      "The hypothesis is seismic damping (shear wave absorption). A directly proves this: waves lose 60% energy in the gravel layers. B supports agriculture theory. C is about tribute. D is about building materials.",
  },
  {
    qn: 14,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "A literary scholar is studying the sudden adoption of 'first-person plural' ('we') narrators in post-war novels about factory towns. The critic suggests that authors used this collective perspective intentionally to reflect the loss of individual identity within automated assembly-line environments, rather than as a mere stylistic exercise to emulate classical theatre choruses.",
    question: "Which finding, if true, would most directly support the scholar's hypothesis?",
    options: {
      A: "Most authors who used the 'we' narrative had academic backgrounds in classical literature and ancient drama.",
      B: "Reviews from the era indicate that contemporary critics found collective narratives difficult to read.",
      C: "Textual analysis shows that the collective voice is dropped and replaced by an individual 'I' only when characters escape the factory environment or lose their jobs.",
      D: "Archival letters reveal that publishers offered higher financial advances for experimental manuscripts that departed from standard narration.",
    },
    answer: "C",
    explanation:
      "The hypothesis is that the 'we' voice reflects identity loss in factory settings. C directly proves it: the collective voice disappears precisely when characters leave the factory—showing the voice is tied to the industrial environment, not mere stylistic choice. A supports the classical-chorus alternative. B and D are irrelevant.",
  },
  {
    qn: 15,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "Climatologist Dr. Sarah Vance is examining the 'Late Ordovician Glaciation Paradox'—the occurrence of a massive global ice age during a period when atmospheric CO₂ was estimated to be eight times higher than pre-industrial levels. Vance suggests that rapid tectonic activity created vast expanses of newly exposed silicate rocks, causing an intense burst of global weathering that stripped CO₂ from the atmosphere faster than volcanic systems could replenish it.",
    question: "Which finding, if true, would most directly undermine Vance's weathering hypothesis?",
    options: {
      A: "Deep-mantle models indicate that volcanic activity peaked during the Late Ordovician, releasing massive volumes of greenhouse gases.",
      B: "Analysis of carbonate strata from the era confirms that global silicate weathering rates dropped to historic lows immediately before the glaciation event.",
      C: "Fossilized marine samples suggest that global ocean temperatures dropped uniformly across equatorial regions during the crisis.",
      D: "Stratigraphic records show that the total land area exposed to weathering was larger than previously estimated.",
    },
    answer: "B",
    explanation:
      "Vance's hypothesis requires rapid weathering to have stripped CO₂. B directly contradicts this: if weathering rates dropped to historic lows before glaciation, her core mechanism is disproven. A supports her model (volcanoes couldn't replenish fast enough). C is consistent with an ice age. D would strengthen her model.",
  },
  {
    qn: 16,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "Macroeconomists tracked the Capital Flight Volatility Index (CFVI) of emerging economies across several external sovereign debt ratios. The principal investigator hypothesized that while low-to-moderate debt levels display an isolated, negligible relationship with capital flight, countries enter a 'contagion-accelerated spiral' once their debt-to-GDP ratio crosses a critical 60% threshold, rendering financial outflows highly sensitive to even minor global market shocks.",
    question:
      "Which choice best describes data from the table that supports the researcher's hypothesis?",
    options: {
      A: "Tier 1 economies maintained a CFVI below 2.0 even when subjected to a severe global market shock, confirming their insulation from macro volatility.",
      B: "When moving from Tier 1 to Tier 2 under a mild global shock, the volatility index increased by less than 1.0 point, whereas crossing into Tier 3 caused the index to surge by 3.9 points under the exact same shock conditions.",
      C: "The baseline CFVI values across all four tiers display a perfectly flat, uniform trajectory, proving that sovereign debt has no impact on capital flight in the absence of external shocks.",
      D: "Under severe global shock conditions, Tier 4 economies achieved the maximum observed CFVI of 14.2, proving that debt ratios and capital flight are perfectly linear variables.",
    },
    answer: "B",
    explanation:
      "The hypothesis requires a sudden spike after the 60% threshold. B provides proof: below threshold (Tier 1→2) the mild shock barely increases CFVI (+0.5), but crossing into Tier 3 (the 60% threshold) causes the same shock to trigger a 3.9-point surge—a dramatic non-linear jump.",
  },
  {
    qn: 17,
    domain: "Command of Evidence",
    difficulty: "hard",
    passage:
      "A sociological research panel compiled urbanization metrics across distinct municipal networks to measure the impact of transit modernization projects. The team hypothesized that while all systems experienced population centralization following transit expansion, Network C would display a markedly lower rate of core density inflation relative to Network A or Network B due to zoning policies that favored horizontal suburban distribution over vertical residential development.",
    question:
      "Which choice most effectively uses data from the table to support the panel's hypothesis?",
    options: {
      A: "At Phase 3, the population density of Network B escalated to 11,200 people/km², confirming its status as the most compact municipality in the comparative study.",
      B: "Across the entire operational timeline from baseline to Phase 3, Network A experienced a densification trajectory that resulted in a total increase of 8,400 people/km².",
      C: "Between the initial baseline and Phase 3 infrastructure deployment, Network A and Network B saw their core population densities scale by over 200%, whereas the density within Network C increased by only 30%.",
      D: "Throughout all expansion intervals, the core population metrics of Network C consistently lagged behind the values recorded for Network B.",
    },
    answer: "C",
    explanation:
      "The hypothesis is about RATE of density inflation. C directly compares rates: A scaled 700% (1,200→9,600), B scaled ~220% (3,500→11,200), C scaled only 30% (1,500→1,950). This perfectly proves Network C's markedly lower rate. A and B use absolute values only. D doesn't calculate rate changes.",
  },
  {
    qn: 18,
    domain: "Information and Ideas",
    difficulty: "hard",
    passage:
      "The Clovis culture, long identified by archaeologists as the definitive founding population of the Americas, was characterized by its iconic fluted stone projectile points. These artifacts disappear abruptly from the North American stratigraphic record approximately 12,800 years ago, an interval that aligns with the onset of the Younger Dryas cooling period and a widespread megafaunal extinction event. Traditional models attribute this cultural erasure to systemic population collapse triggered by environmental stress. However, a recent deep-site investigation in the Southeast uncovered a continuous sequence of lithic tools showing a gradual morphological transition from Clovis fluting to smaller, un-fluted variants that date precisely to the mid-Younger Dryas. Because these intermediate tools were recovered from uninterrupted sediment profiles containing unbroken evidence of localized hearth use, researchers concluded that ______",
    question: "Which choice most logically completes the text?",
    options: {
      A: "the Clovis population was entirely replaced by an unrelated migratory group that brought an independent tool kit into the region.",
      B: "the disappearance of Clovis points reflects a localized technical adaptation and technological evolution rather than a complete demographic extinction.",
      C: "the hunting strategies of early Americans were completely unaffected by the extinction of megafauna during the Younger Dryas.",
      D: "the Southeast region was entirely insulated from the climatic disruptions that impacted the rest of the continent.",
    },
    answer: "B",
    explanation:
      "Continuous uninterrupted sediment profiles with a gradual tool transition show the same people adapted their technology rather than disappearing. A (replaced by outsiders), C (hunting unaffected), and D (climate insulation) all contradict or are unsupported by the evidence.",
  },
  {
    qn: 19,
    domain: "Information and Ideas",
    difficulty: "hard",
    passage:
      "In his foundational work on public economics, Arthur Pigou argued that when private market actions generate negative externalities—such as industrial pollution that damages public health—the state should levy targeted taxes equal to the social cost to restore economic efficiency. Pigou's framework assumed that administrative regulatory bodies could accurately calculate these costs and enforce compliance objectively. However, public choice theorists like James Buchanan later countered that regulatory agencies are themselves composed of self-interested actors prone to bureaucratic expansion and political capture by the very industries they oversee. If Buchanan's critique is valid, it would most directly suggest that ______",
    question: "Which choice most logically completes the text?",
    options: {
      A: "state-enforced corrective taxes can systematically fail to achieve optimal economic efficiency due to institutional distortions.",
      B: "market forces left entirely unregulated will naturally eliminate negative externalities without legislative assistance.",
      C: "industrial pollution is an unavoidable prerequisite for economic growth that states should not attempt to regulate.",
      D: "regulatory bureaucrats are intentionally attempting to dismantle public health standards to optimize corporate profits.",
    },
    answer: "A",
    explanation:
      "If regulators are captured by self-interest and industry, they will fail to calculate/enforce Pigouvian taxes correctly—causing the taxes to fail at achieving efficiency. B (markets self-correct) is the opposite of Pigou's premise. C (pollution unavoidable) is extreme. D (intentional dismantling) goes far beyond Buchanan's argument.",
  },
  {
    qn: 20,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "Deep within the sub-glacial lakes of Antarctica, where solar radiation cannot penetrate, the metabolic activity of isolated micro-ecosystems ______ entirely on chemical synthesis, transforming elemental sulfur and dissolved iron into cellular energy.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "relies", B: "relying", C: "rely", D: "have relied" },
    answer: "A",
    explanation:
      "The singular subject \"the metabolic activity\" requires the singular verb relies. The prepositional phrase \"of isolated micro-ecosystems\" is a modifier. B is a participle; C and D are plural forms.",
  },
  {
    qn: 21,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "During high-pressure metamorphic transformations, deep-crustal shale undergoes intense recrystallization, a process where platy minerals realign perpendicularly to stress fields and ______ coarse-grained schist, changing the rock's structural integrity.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "formed", B: "forms", C: "forming", D: "will form" },
    answer: "B",
    explanation:
      "The passage describes a constant geological process in simple present tense. The singular subject \"shale\" (via the relative clause) takes the singular verb forms. A is past tense; C creates a fragment; D is future.",
  },
  {
    qn: 22,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The unprecedented integration of machine-learning models into macroeconomic forecasting, which allowed financial institutions to parse massive non-linear datasets across global trading desks, ______ primarily to the development of neural networks capable of processing real-time adjustments.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "to attribute",
      B: "was attributed",
      C: "attributing",
      D: "having attributed",
    },
    answer: "B",
    explanation:
      "\"The unprecedented integration\" is the subject but has no finite verb. \"Was attributed\" supplies the required main predicate. A, C, D are non-finite and produce fragments.",
  },
  {
    qn: 23,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The adoption of deep-trench agricultural techniques fundamentally altered Mesoamerican water management ______ it permitted community farmers to maintain stable crop hydration across prolonged dry cycles independent of seasonal precipitation.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "complexes;",
      B: "complexes",
      C: "complexes and",
      D: "complexes,",
    },
    answer: "A",
    explanation:
      "Two independent clauses without a coordinating conjunction require a semicolon. B creates a fused sentence; C needs a comma before 'and'; D is a comma splice.",
  },
  {
    qn: 24,
    domain: "Standard English Conventions",
    difficulty: "hard",
    passage:
      "While the complex, multi-layered vocalizations generated by isolated pods of apex orcas are celebrated for their regional dialects and unique acoustic syntax, ______; this structural divergence in communication protocols remains a core focus for biologists researching the evolution of non-human cultural transmission.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: {
      A: "the hunting calls utilized by transient migratory packs were characterized by simplified, unmodulated frequencies.",
      B: "transient migratory packs and their hunting calls utilized simplified, unmodulated frequencies.",
      C: "the simplified, unmodulated frequencies of hunting calls utilized by transient migratory packs were a stark contrast.",
      D: "transient migratory packs produced acoustic patterns that were characterized by simplified, unmodulated frequencies.",
    },
    answer: "A",
    explanation:
      "The text opens with \"vocalizations\" as the subject; the comparison must contrast with a matching noun. A correctly contrasts orca pod vocalizations with the hunting calls of transient packs. B, C, D shift focus to packs or frequencies, breaking parallel structure.",
  },
  {
    qn: 25,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The preservation of the ancient silk manuscripts in the Dunhuang Caves—a complex and hazardous undertaking involving the controlled dehydration of fragile organic sheets and the neutralization of acidic fungal spores—______ the expertise of an elite international consortium of archivists.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: { A: "have required", B: "require", C: "requires", D: "requiring" },
    answer: "C",
    explanation:
      "Ignore the em-dash appositive. The primary subject is \"The preservation\" (singular), requiring the singular verb requires. A and B are plural. D is a participle that creates a fragment.",
  },
  {
    qn: 26,
    domain: "Standard English Conventions",
    difficulty: "medium",
    passage:
      "The deployment of targeted carbon capture systems at industrial centers represents a direct, technological intervention against atmospheric emissions, as it isolates point-source greenhouse gases before they can enter the global carbon cycle. This approach allows existing manufacturing hubs to reduce their immediate ecological footprint without requiring a total overhaul of their core machinery. ______ current strategies focused on large-scale reforestation present an indirect, biological intervention that relies on long-term ecological growth and stable land usage, variables that are highly susceptible to climate-induced wildfires and shifting political jurisdictions.",
    question: "Which choice completes the text with the most logical transition?",
    options: {
      A: "Specifically,",
      B: "Consequently,",
      C: "In addition,",
      D: "By contrast,",
    },
    answer: "D",
    explanation:
      "The first half describes a direct, technological intervention; the second describes an indirect, biological one. This is contrast. A (elaboration), B (consequence), C (addition) all misrepresent the relationship.",
  },
  {
    qn: 27,
    domain: "Expression of Ideas",
    difficulty: "hard",
    passage:
      "Notes:\n• 'Phonetic Drift' hypothesis: native language pronunciation shifts when acquiring a second language.\n• Dr. Kenji Sato conducted acoustic analysis of native Japanese speakers who moved to Anglophone regions.\n• Japanese lacks a distinction between /l/ and /r/.\n• Sato used high-resolution speech spectrographs to measure changes in first and second formant frequencies over three years.\n• Long-term Japanese residents showed a measurable shift in native vowel production after sustained English immersion.\n• Sato concluded that adult phonetic systems remain plastic and are continuously reconfigured.",
    question:
      "The student wants to emphasize the specific analytical instrument and the study's primary data evidence. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: {
      A: "By utilizing speech spectrographs, Sato tracked native Japanese speakers to prove that adult phonetic systems are plastic and subject to change.",
      B: "Through high-resolution speech spectrographs, Kenji Sato demonstrated that long-term Japanese residents exhibited a measurable shift in their native vowel frequencies following sustained immersion.",
      C: "The Japanese language lacks distinctions between /l/ and /r/, leading Kenji Sato to conclude that language acquisition reconfigures human phonetic systems.",
      D: "Dr. Kenji Sato's study of vowel frequencies among Japanese immigrants proved that linguistic relativity impacts pronunciation.",
    },
    answer: "B",
    explanation:
      "B names the specific instrument (high-resolution speech spectrographs) AND the primary data evidence (measurable shift in native vowel frequencies). A omits 'high-resolution' and the specific vowel shift. C omits the instrument. D omits the instrument and the vowel frequency data.",
  },
];

// ── Math — Module 1 (22 questions) ──────────────────────────────────────────

const MATH_M1 = [
  {
    qn: 1,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "The perimeter of an equilateral triangle with sides of length s is p. What is the perimeter of a square with sides of length 3s, in terms of p?",
    options: { A: "p²", B: "12p", C: "4p", D: "3p" },
    answer: "C",
    explanation:
      "Equilateral triangle: 3s = p → s = p/3. Square side = 3s = p. Square perimeter = 4p.",
  },
  {
    qn: 2,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "easy",
    passage: "",
    question: "For what value of x does f(x) = 3x² − 6x + 5 equal its minimum value?",
    options: { A: "-6", B: "1", C: "3", D: "5" },
    answer: "B",
    explanation: "Vertex x = −b/(2a) = 6/6 = 1.",
  },
  {
    qn: 3,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "Which of the following ordered pairs (x, y) satisfies the system of equations below?\n3x + 2y = 15\n5x − y = 12",
    options: { A: "(3, 3)", B: "(2, 3)", C: "(4, 8)", D: "(5, 0)" },
    answer: "A",
    explanation:
      "From the 2nd equation: y = 5x − 12. Substituting: 3x + 2(5x−12) = 15 → 13x = 39 → x = 3, y = 3.",
  },
  {
    qn: 4,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question: "If k = 3 in the equation (k + 7)/(x + 1) = 5/2, and x > 0, what is the value of x?",
    options: { A: "2", B: "3", C: "4", D: "5" },
    answer: "B",
    explanation:
      "Substituting k=3: 10/(x+1) = 5/2 → cross-multiply: 20 = 5(x+1) → x = 3.",
  },
  {
    qn: 5,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "Which ordered pair (x, y) satisfies the system of equations below?\nx + 2y = 7\n2x + 3y = 11",
    options: { A: "(1, -3)", B: "(1, 3)", C: "(-1, 3)", D: "(-1, -3)" },
    answer: "B",
    explanation:
      "From 1st equation: x = 7 − 2y. Substituting: 2(7−2y) + 3y = 11 → 14 − y = 11 → y = 3, x = 1.",
  },
  {
    qn: 6,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question: "What is the x-intercept of y = 5x − 20?",
    options: { A: "-20", B: "-4", C: "4", D: "5" },
    answer: "C",
    explanation: "Set y=0: 0 = 5x − 20 → x = 4.",
  },
  {
    qn: 7,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "If a line has a slope of −2 and it passes through the point (−3, 2), what is its y-intercept?",
    options: { A: "6", B: "0", C: "-4", D: "-6" },
    answer: "C",
    explanation: "y = −2x + b → 2 = −2(−3) + b = 6 + b → b = −4.",
  },
  {
    qn: 8,
    type: "free_response",
    domain: "Algebra",
    difficulty: "medium",
    passage:
      "In the table below, k and m are unknown values of the functions f and g, respectively.",
    question:
      "If f(4) = m + 9 and g(4) = 2k − 4, what is the value of f(3) + g(1)?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "8",
    explanation:
      "f(4) = −29 = m + 9 → m = −38. g(4) = 88 = 2k − 4 → k = 46. f(3) + g(1) = 46 + (−38) = 8.",
  },
  {
    qn: 9,
    type: "free_response",
    domain: "Algebra",
    difficulty: "medium",
    passage: "",
    question: "If (m + n)² = m² + n², what is the value of (3^m)^n?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "1",
    explanation:
      "Expanding: m² + 2mn + n² = m² + n² → 2mn = 0 → mn = 0. Therefore (3^m)^n = 3^(mn) = 3^0 = 1.",
  },
  {
    qn: 10,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question: "Which of the following is the solution set for the equation below?\n(x + 3)(x − 4) = 8",
    options: { A: "{−3, 4}", B: "{−4, 3}", C: "{−5, 4}", D: "{−4, 5}" },
    answer: "D",
    explanation:
      "Expand: x² − x − 12 = 8 → x² − x − 20 = 0 → (x−5)(x+4) = 0 → x = 5 or x = −4.",
  },
  {
    qn: 11,
    type: "free_response",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question:
      "What is the slope of the line that contains the vertex and the y-intercept of the parabola with the equation below?\ny = 2(x + 1)² + 3",
    options: { A: "", B: "", C: "", D: "" },
    answer: "2",
    explanation:
      "Vertex: (−1, 3). y-intercept (x=0): y = 2(1)² + 3 = 5, so (0, 5). Slope = (5−3)/(0−(−1)) = 2.",
  },
  {
    qn: 12,
    type: "multiple_choice",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "easy",
    passage: "",
    question: "What is 500% of 45% of 22% of n?",
    options: { A: "0.0495n", B: "0.495n", C: "4.95n", D: "49.5n" },
    answer: "B",
    explanation: "5 × 0.45 × 0.22 × n = 5 × 0.099n = 0.495n.",
  },
  {
    qn: 13,
    type: "free_response",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "medium",
    passage: "",
    question:
      "11 is both the median and the mode of a set of five positive integers. What is the least possible value of the average (arithmetic mean) of the set?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "7",
    explanation:
      "Median is 11 (3rd value) and mode is 11 (appears at least twice). Minimize by choosing: {1, 1, 11, 11, 11}. Mean = 35/5 = 7.",
  },
  {
    qn: 14,
    type: "free_response",
    domain: "Geometry and Trigonometry",
    difficulty: "medium",
    passage: "",
    question:
      "In triangle DEF, the measure of angle E is 90°, and the tangent of angle D equals 3/4. What is the value of cos F?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "3/5",
    explanation:
      "tan D = EF/DE = 3/4. By Pythagorean theorem: DF = 5k. cos F = EF/DF = 3k/5k = 3/5.",
  },
  {
    qn: 15,
    type: "free_response",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question:
      "The equation r² + qr = 8r − 69 has no solution, where q is an integer constant. Find the largest possible value of q.",
    options: { A: "", B: "", C: "", D: "" },
    answer: "24",
    explanation:
      "Rewrite: r² + (q−8)r + 69 = 0. No solution when discriminant < 0: (q−8)² < 276 → |q−8| < 16.61 → q < 24.61. Largest integer: q = 24.",
  },
  {
    qn: 16,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question:
      "A pool with a length of 27 feet and a width of 11 feet has a concrete sidewalk around it on all sides with a width of x feet. The total area of sidewalk is 168 square feet. How wide is the sidewalk in feet?",
    options: { A: "2", B: "4", C: "15", D: "31" },
    answer: "A",
    explanation:
      "Total area: (27+2x)(11+2x) = 168 + 297 = 465. Expanding: 4x² + 76x − 168 = 0 → x² + 19x − 42 = 0 → (x+21)(x−2) = 0 → x = 2.",
  },
  {
    qn: 17,
    type: "free_response",
    domain: "Algebra",
    difficulty: "hard",
    passage: "",
    question:
      "Four consecutive odd integers are ordered from smallest to greatest. Twenty-three times the third integer is no more than 40 less than the sum of the first and fourth integers. What is the greatest possible value of the smallest integer?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "-7",
    explanation:
      "Let integers be n, n+2, n+4, n+6. Condition: 23(n+4) ≤ (n + n+6) − 40 → 23n+92 ≤ 2n−34 → 21n ≤ −126 → n ≤ −6. Greatest odd n ≤ −6 is n = −7.",
  },
  {
    qn: 18,
    type: "multiple_choice",
    domain: "Geometry and Trigonometry",
    difficulty: "medium",
    passage: "",
    question: "In the figure below, m∥n. What is the value of x?",
    options: { A: "128", B: "167", C: "171", D: "173" },
    answer: "D",
    explanation:
      "The interior angle at the middle vertex (opposite 59°) = 180−59 = 121°. The interior angle at line n = 180−128 = 52°. By the exterior angle theorem: x = 121 + 52 = 173°.",
    image: "",
  },
  {
    qn: 19,
    type: "free_response",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "A local bakery requires 140 ounces of flour to fulfill a large bread order. If the baker currently has 86 ounces of flour, how many additional ounces of flour, x, does the baker need to fulfill the order?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "54",
    explanation: "x = 140 − 86 = 54.",
  },
  {
    qn: 20,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    passage: "(x² − 9)/(x − 3) = 2x − 7",
    question: "What is the solution to the given equation?",
    options: { A: "4", B: "7", C: "10", D: "13" },
    answer: "C",
    explanation:
      "Factor: (x−3)(x+3)/(x−3) = x+3 = 2x−7 (x≠3) → x = 10. Check: 10 ≠ 3 ✓.",
  },
  {
    qn: 21,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question: "If 3(2x − 5) + 4 = 2x + 9, what is the value of 4x?",
    options: { A: "5", B: "10", C: "15", D: "20" },
    answer: "D",
    explanation:
      "6x − 15 + 4 = 2x + 9 → 4x = 20. So 4x = 20.",
  },
  {
    qn: 22,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    question:
      "A technician charges a one-time service fee of $75 plus $6 per hour for labor. If the total charge for a repair was $207, how many hours of labor were charged?",
    options: { A: "126", B: "47", C: "22", D: "132" },
    answer: "C",
    explanation: "75 + 6h = 207 → 6h = 132 → h = 22.",
  },
];

// ── Math — Module 2 (22 questions) ──────────────────────────────────────────

const MATH_M2 = [
  {
    qn: 1,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "medium",
    passage: "",
    question: "For what value of y is |y − 3| + 3 equal to 2?",
    options: { A: "0", B: "2", C: "3", D: "There is no such value of y." },
    answer: "D",
    explanation: "|y−3| + 3 = 2 → |y−3| = −1. Absolute value cannot be negative—no solution exists.",
  },
  {
    qn: 2,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question:
      "Which of the following sets of ordered pairs (x, y) contains ALL ordered pairs that satisfy the system of equations below?\ny = x² + 4\n4x − y = −1",
    options: {
      A: "{(1, 5), (3, 13)}",
      B: "{(1, 5)}",
      C: "{(3, 13)}",
      D: "{(−1, 3)(5, 13)}",
    },
    answer: "A",
    explanation:
      "From 2nd: y = 4x+1. Setting equal: x²+4 = 4x+1 → x²−4x+3 = 0 → (x−1)(x−3) = 0. Both (1,5) and (3,13) satisfy the system.",
  },
  {
    qn: 3,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question:
      "In the xy-plane, where a and b are positive constants, the graphs of y = a(x − 5)² + 6 and y = b(x − 5)² + 5 never intersect. Which of the following could be true?\n\nI. a > b\nII. a = b\nIII. a < b",
    options: { A: "I only", B: "III only", C: "I and II only", D: "II and III only" },
    answer: "C",
    explanation:
      "At x=5: y₁=6, y₂=5. For never intersecting, y₁ > y₂ always: (a−b)(x−5)² > −1. This holds for all x when a ≥ b (I and II). If a < b, the difference can become very negative for large |x−5|, so the curves would intersect.",
  },
  {
    qn: 4,
    type: "multiple_choice",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "easy",
    passage:
      "The table below represents the money Debbie earned, by month, for the last five months.",
    question: "When was the percent change in her income the greatest?",
    options: {
      A: "From March to April",
      B: "From April to May",
      C: "From May to June",
      D: "From June to July",
    },
    answer: "B",
    explanation:
      "March→April: 20%. April→May: 600/2400 = 25%. May→June: ≈16.7%. June→July: ≈22.9%. April to May has the greatest percent change.",
  },
  {
    qn: 5,
    type: "free_response",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "easy",
    passage: "",
    question:
      "If r and s are directly proportional and r = 18 when s = 15, what is the value of r when s = 20?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "24",
    explanation: "k = 18/15 = 6/5. r = (6/5)(20) = 24.",
  },
  {
    qn: 6,
    type: "multiple_choice",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "medium",
    passage: "",
    question:
      "A researcher is trying to estimate the average weight of the population of wild salmon in a certain river. She catches 100 salmon in a net, weighing each before releasing it back into the river. The researcher's conclusion is a 95% confidence interval of 3.3 to 3.8 pounds. Which of the following conclusions is most appropriate given that confidence interval?",
    options: {
      A: "95% of the wild salmon in the river weigh between 3.3 and 3.8 pounds.",
      B: "95% of all wild salmon weigh between 3.3 and 3.8 pounds.",
      C: "The true average weight of all wild salmon is likely to be between 3.3 and 3.8 pounds.",
      D: "The true average weight of the wild salmon in the river is likely to be between 3.3 and 3.8 pounds.",
    },
    answer: "D",
    explanation:
      "The sample was taken from one specific river; conclusions should only be drawn about that population. A and B confuse a confidence interval with a proportion. C generalizes to all wild salmon worldwide.",
  },
  {
    qn: 7,
    type: "multiple_choice",
    domain: "Geometry and Trigonometry",
    difficulty: "medium",
    passage: "",
    question:
      "If a circle is divided evenly into 12 arcs, each measuring 3 cm long, what is the measure, in degrees, of an arc on the same circle that is 8 cm long?",
    options: { A: "64°", B: "72°", C: "80°", D: "112°" },
    answer: "C",
    explanation:
      "Circumference = 12 × 3 = 36 cm. Each cm = 360/36 = 10°. 8 cm arc = 80°.",
  },
  {
    qn: 8,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question:
      "The volume of a certain cube is v cubic inches, and its surface area is a square inches. If v = 8p³, which of the following is NOT a value of p for which a > v?",
    options: { A: "0.5", B: "1", C: "2", D: "4" },
    answer: "D",
    explanation:
      "Side = 2p, a = 6(2p)² = 24p². a > v means 24p² > 8p³ → 3 > p → p < 3. Values p < 3: {0.5, 1, 2} satisfy a > v. p = 4 does NOT satisfy a > v.",
  },
  {
    qn: 9,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question: "What is the value of x that satisfies the equation 1/x + 4/(2x) = 27/(3x²)?",
    options: { A: "-3", B: "-2", C: "2", D: "3" },
    answer: "D",
    explanation:
      "Simplify: 4/(2x) = 2/x. So 1/x + 2/x = 27/(3x²) → 3/x = 9/x². Multiply both sides by x²: 3x = 9 → x = 3.",
  },
  {
    qn: 10,
    type: "free_response",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question:
      "In the function f(x) = ab^x, a and b are positive constants. If f(0) = 8 and f(3) = 1, what is the value of f(4)?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "1/2",
    explanation:
      "f(0) = a = 8. f(3) = 8b³ = 1 → b³ = 1/8 → b = 1/2. f(4) = 8(1/2)⁴ = 8/16 = 1/2.",
  },
  {
    qn: 11,
    type: "multiple_choice",
    domain: "Geometry and Trigonometry",
    difficulty: "medium",
    passage: "",
    question:
      "In the xy-coordinate plane, the point (2, r) is a distance of 13 from the point (14, 2). Which of the following could equal r?",
    options: { A: "15", B: "5", C: "-1", D: "-3" },
    answer: "D",
    explanation:
      "(14−2)² + (2−r)² = 169 → 144 + (2−r)² = 169 → (2−r)² = 25 → r = 7 or r = −3. From the choices, r = −3.",
  },
  {
    qn: 12,
    type: "free_response",
    domain: "Algebra",
    difficulty: "hard",
    passage: "",
    question:
      "What value of x satisfies the system of equations below?\n(1/5)x + (3/4)y = 3\nx − 15y = 5",
    options: { A: "", B: "", C: "", D: "" },
    answer: "13",
    explanation:
      "From 2nd equation: x = 5 + 15y. Substituting: (1/5)(5+15y) + (3/4)y = 3 → 1 + 3y + (3/4)y = 3 → (15/4)y = 2 → y = 8/15. x = 5 + 8 = 13.",
  },
  {
    qn: 13,
    type: "free_response",
    domain: "Geometry and Trigonometry",
    difficulty: "hard",
    passage: "",
    question:
      "In the figure below, a circle with center (−5, 2) passes through the point (−1, 1). Line l, not shown, is tangent to the circle at (−1, 1). What is the y-intercept of line l?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "5",
    explanation:
      "Radius slope = (1−2)/(−1−(−5)) = −1/4. Tangent slope = 4 (perpendicular). y − 1 = 4(x+1) → y = 4x + 5. y-intercept = 5.",
  },
  {
    qn: 14,
    type: "free_response",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question: "If ab = 19 and a − b = 7, what is the value of a² + b²?",
    options: { A: "", B: "", C: "", D: "" },
    answer: "87",
    explanation:
      "(a−b)² = a² − 2ab + b² = 49 → a² + b² = 49 + 2(19) = 87.",
  },
  {
    qn: 15,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "hard",
    passage: "",
    question:
      "The expression x² − kx + 36 can be rewritten as (x − h)², where k and h are positive constants. What is the value of k + h?",
    options: { A: "6", B: "12", C: "18", D: "24" },
    answer: "C",
    explanation:
      "(x−h)² = x² − 2hx + h². So h² = 36 → h = 6, k = 2h = 12. k + h = 18.",
  },
  {
    qn: 16,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "easy",
    passage: "",
    question:
      "The graph of y = f(x) is shown in the xy-plane. If the graph is shifted 3 units to the right and 2 units down, which of the following equations represents the new graph?",
    options: {
      A: "y = f(x − 3) − 2",
      B: "y = f(x + 3) − 2",
      C: "y = f(x − 3) + 2",
      D: "y = f(x + 3) + 2",
    },
    answer: "A",
    explanation:
      "Shift right by 3: replace x with (x−3). Shift down by 2: subtract 2. Result: y = f(x−3) − 2.",
  },
  {
    qn: 17,
    type: "multiple_choice",
    domain: "Geometry and Trigonometry",
    difficulty: "medium",
    passage: "",
    passage: "x² + y² − 6x + 8y = 11",
    question: "In the xy-plane, the graph of the equation above is a circle. What is the radius of the circle?",
    options: { A: "√11", B: "5", C: "6", D: "36" },
    answer: "C",
    explanation:
      "Complete the square: (x−3)² + (y+4)² = 11 + 9 + 16 = 36. Radius = √36 = 6.",
  },
  {
    qn: 18,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question: "What is the solution set of the equation √(2x + 7) = x − 4?",
    options: { A: "{1}", B: "{9}", C: "{1, 9}", D: "∅" },
    answer: "B",
    explanation:
      "Square both sides: 2x+7 = x²−8x+16 → x²−10x+9 = 0 → (x−1)(x−9) = 0. Check x=1: √9 = 3 but 1−4 = −3 ✗. Check x=9: √25 = 5 = 9−4 ✓. Solution: {9}.",
  },
  {
    qn: 19,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "easy",
    passage: "",
    question: "The polynomial p(x) is divisible by (x + 3). Which of the following must be true?",
    options: { A: "p(−3) = 0", B: "p(3) = 0", C: "p(x) = −3", D: "p(0) = −3" },
    answer: "A",
    explanation: "By the Factor Theorem, if (x+3) divides p(x), then p(−3) = 0.",
  },
  {
    qn: 20,
    type: "multiple_choice",
    domain: "Problem-Solving and Data Analysis",
    difficulty: "medium",
    passage: "",
    question:
      "A store increased the original price of a jacket by 20%. Two weeks later, the store put the jacket on sale for 20% off the increased price. The sale price of the jacket was $144. What was the original price of the jacket?",
    options: { A: "$144", B: "$148", C: "$150", D: "$156" },
    answer: "C",
    explanation:
      "Sale price = P × 1.2 × 0.8 = 0.96P = 144 → P = 150.",
  },
  {
    qn: 21,
    type: "multiple_choice",
    domain: "Algebra",
    difficulty: "easy",
    passage: "",
    passage: "f(x) = 15x + 45",
    question:
      "The function above models the total cost, f(x), in dollars, for renting a bicycle for x hours. What is the best interpretation of 45 in this context?",
    options: {
      A: "The hourly rental fee",
      B: "The total cost for 15-hour rental",
      C: "The fixed initial insurance/deposit fee",
      D: "The maximum number of hours a bicycle can be rented",
    },
    answer: "C",
    explanation:
      "45 is the y-intercept (cost when x=0 hours), representing the fixed initial fee regardless of rental duration.",
  },
  {
    qn: 22,
    type: "multiple_choice",
    domain: "Advanced Math",
    difficulty: "medium",
    passage: "",
    question: "If x > 0 and x^(1/3) · √(x³) = x^a, what is the value of a?",
    options: { A: "5/6", B: "4/3", C: "11/6", D: "7/3" },
    answer: "C",
    explanation:
      "x^(1/3) · x^(3/2) = x^(1/3 + 3/2) = x^(2/6 + 9/6) = x^(11/6). So a = 11/6.",
  },
];

// ── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URL);
  console.log("Connected.");

  // Check for existing exam
  const existing = await Exam.findOne({ slug: EXAM.slug });
  if (existing) {
    console.log(`Exam "${EXAM.slug}" already exists (_id: ${existing._id}). Aborting to prevent duplicates.`);
    console.log("If you want to re-seed, delete the exam and its questions first.");
    await mongoose.disconnect();
    process.exit(0);
  }

  // Create exam
  console.log("Creating exam...");
  const exam = await Exam.create(EXAM);
  console.log(`Exam created: ${exam._id}`);

  // Build question docs
  const buildRW = (arr, moduleNum) =>
    arr.map((q) => ({
      examId: exam._id,
      section: "reading_writing",
      module: moduleNum,
      questionNumber: q.qn,
      questionType: "multiple_choice",
      passageText: q.passage || "",
      questionText: q.question,
      options: q.options,
      correctAnswer: q.answer,
      explanation: q.explanation || "",
      domain: q.domain || "",
      difficulty: q.difficulty || "medium",
      image: "",
    }));

  const buildMath = (arr, moduleNum) =>
    arr.map((q) => ({
      examId: exam._id,
      section: "math",
      module: moduleNum,
      questionNumber: q.qn,
      questionType: q.type || "multiple_choice",
      passageText: q.passage || "",
      questionText: q.question,
      options: q.options,
      correctAnswer: q.answer,
      explanation: q.explanation || "",
      domain: q.domain || "",
      difficulty: q.difficulty || "medium",
      image: q.image || "",
    }));

  const allQuestions = [
    ...buildRW(RW_M1, 1),
    ...buildRW(RW_M2, 2),
    ...buildMath(MATH_M1, 1),
    ...buildMath(MATH_M2, 2),
  ];

  console.log(`Inserting ${allQuestions.length} questions...`);
  await Question.insertMany(allQuestions, { ordered: true });

  console.log("✅ Done!");
  console.log(`  Reading & Writing Module 1: ${RW_M1.length} questions`);
  console.log(`  Reading & Writing Module 2: ${RW_M2.length} questions`);
  console.log(`  Math Module 1:              ${MATH_M1.length} questions`);
  console.log(`  Math Module 2:              ${MATH_M2.length} questions`);
  console.log(`  Total:                      ${allQuestions.length} questions`);
  console.log(`\nExam ID: ${exam._id}`);
  console.log(`Exam slug: ${exam.slug}`);
  console.log('\nRemember to activate the exam in the admin panel (isActive: false by default).');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});

// MABAR: Malabar Decolonial Space - Core Database and Content Models

export interface Partner {
  name: string;
  logo: string;
  role: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: 'Ethics & Jurisprudence' | 'Decolonial Geopolitics' | 'Knowledge & Technology' | 'Classical Text Tradition' | 'Indian Ocean Dispatches' | 'Reviews & Essays';
  tags: string[];
  excerpt: string;
  body: string;
  imageUrl: string;
  readTime: string;
}

export interface KitabEntry {
  id: string;
  title: string;
  author: string;
  date: string;
  language: string;
  genre: 'fiqh' | 'kalam' | 'tasawwuf' | 'mawlid' | 'history' | 'ethics' | 'anti-colonial';
  manuscriptLocation: string;
  shortIntro: string;
  textSnippetArabic: string;
  textSnippetEnglish: string;
  textSnippetMalayalam: string;
  annotations: {
    historical: string;
    jurisprudential: string;
    decolonial: string;
    indianOcean: string;
    comparativeTheory: string; // Comparison with Fanon, Mignolo, Spivak, etc.
  };
  languageScript?: string;
  subject?: string;
  period?: string;
  keywords?: string[];
  fullTextAvailable?: boolean;
  relatedEssays?: { title: string; link: string }[];
  downloadAllowed?: boolean;
  downloadUrl?: string;
  copyrightStatus?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  type: 'Working Paper' | 'Policy Brief';
  abstract: string;
  citation: string;
  keywords: string[];
  pdfSize: string;
  downloadCount: number;
}

export interface ResearchProject {
  id: string;
  title: string;
  question: string;
  team: string[];
  status: 'Active' | 'Completed' | 'Upcoming';
  timeline: string;
  description: string;
}

export interface CocoonBook {
  id: string;
  title: string;
  ageGroup: string;
  language: 'English' | 'Malayalam' | 'Trilingual';
  theme: string;
  coverImage: string;
  pdfPages: string[];
  audioNarrator: string;
  audioDuration: string;
  teacherNote: string;
}

export interface FinanceMetric {
  country: string;
  penetration: string; // Islamic banking penetration
  sukukShare: string; // Sukuk market share
  regulatoryFramework: string;
  institutionsCount: string;
  cooperativeFinance: string;
  waqfAssets: string;
  zakatModel: string;
  remittanceFlow: string;
}

export interface WaqfProperty {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'Productive' | 'Underutilized' | 'Encroached / Legal dispute';
  potential: string;
  benefit: string;
}

export interface GlossaryEntry {
  term: string;
  arabicScript?: string;
  definition: string;
  context: string;
  relevance: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  category: 'Scholarship' | 'Colonial Disruption' | 'Resistance' | 'Modern Institutions';
  description: string;
}

export interface MabarEvent {
  id: string;
  title: string;
  type: 'Lecture' | 'Reading Circle' | 'Research Workshop' | 'Finance Lab Seminar' | 'Cocoon Storytelling' | 'Dialogue';
  date: string;
  time: string;
  location: string;
  speakers: string[];
  description: string;
  registrationOpen: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  category: 'Core' | 'Research' | 'Editorial' | 'Advisory';
  imageUrl: string;
}

// ==================== DATA INSTANCES ====================

export const MABAR_PARTNERS: Partner[] = [
  {
    name: "Evident Magazine",
    logo: "evident",
    role: "Editorial Wing",
    description: "Public-facing critique, essays, decolonial geopolitics, and Islamic legal philosophy."
  },
  {
    name: "Hasanath Institute of Islamic Studies",
    logo: "hasanath",
    role: "Institutional Research Hub",
    description: "Academic working papers, policy archives, and Kitab translation coordination."
  },
  {
    name: "Cocoon",
    logo: "cocoon",
    role: "Pedagogical Intervention",
    description: "Illustrated booklets, youth-oriented histories, and multilingual learning tools."
  },
  {
    name: "World Decolonization Forum (WDF)",
    logo: "wdf",
    role: "Global Dialogue Partner",
    description: "South-South scholastic solidarity and global decolonial exchange coordinator."
  },
  {
    name: "Darul Huda Islamic University",
    logo: "darulhuda",
    role: "Affiliated Scholastic Body",
    description: "Coordinating legal scholarship and historical manuscript access in Malabar."
  },
  {
    name: "Zanzibar Historical Society",
    logo: "zanzibar",
    role: "Swahili-Malabar Research Cell",
    description: "Preserving and studying commercial ledger entries, travel accounts, and shared contract archives."
  },
  {
    name: "Tarim Manuscript Conservation Cell",
    logo: "tarim",
    role: "Hadramawt Archive Partner",
    description: "Providing digital access to rare Ba'Alawi Sufi logs and trans-oceanic migration journals."
  },
  {
    name: "Aceh Heritage Alliance",
    logo: "aceh",
    role: "Southeast Asian Research Partner",
    description: "Mapping 16th-century naval treaties and exchange correspondence between Malabar and Sumatra."
  },
  {
    name: "Cochin Jews Cultural Registry",
    logo: "cochinjews",
    role: "Inter-faith History Partner",
    description: "Documenting historical commercial partnerships and legal pluralism between Jewish and Muslim guilds."
  },
  {
    name: "Calicut Maritime Workers Union",
    logo: "calicutmaritime",
    role: "Fishery Commons Partner",
    description: "Researching modern artisanal fishing cooperatives and traditional ocean resource governance."
  }
];

export const MABAR_GLOSSARY: GlossaryEntry[] = [
  {
    term: "Kitab Tradition",
    arabicScript: "تراث الكتاب",
    definition: "The centuries-old Arabic-Malayalam textual tradition developed by Muslim scholars of southwestern India, encompassing jurisprudence, theology, poetry, and anti-colonial manuals.",
    context: "Represented a local, cosmopolitan, and autonomous epistemological space connecting Malabar to the wider Indian Ocean region without European linguistic dependency.",
    relevance: "MABAR catalogs and translates these scripts to revive marginalized legal and ethical libraries."
  },
  {
    term: "Mappila",
    arabicScript: "مابيلا",
    definition: "The Muslim community of Malabar, Kerala, tracing their ancestry to marital alliances between Arab traders and local Malayalam-speaking populations since the 7th century.",
    context: "Historically formed the backbone of Indian Ocean spice networks and later led active agrarian and armed resistance against Portuguese, British, and local landlord systems.",
    relevance: "Their intellectual, spiritual, and economic traditions represent a unique node in South-South history."
  },
  {
    term: "Waqf",
    arabicScript: "وقف",
    definition: "An inalienable charitable endowment under Islamic law, typically involving donating a building, plot of land, or other assets for Muslim religious or charitable purposes with no intention of reclaiming the assets.",
    context: "In Malabar, Waqf properties historically funded public wells, legal seminaries (pallis), travelers' lodges, and agricultural commons.",
    relevance: "MABAR Finance Lab researches how to revitalize Waqf records for community-governed micro-equity and housing projects."
  },
  {
    term: "Fiqh al-Muamalat",
    arabicScript: "فقه المعاملات",
    definition: "Islamic jurisprudence governing commercial, civil, and financial transactions.",
    context: "Contrasts with standard capital-maximizing finance by emphasizing risk-sharing, the prohibition of usury (riba), and social justice priorities.",
    relevance: "Forms the legal foundation for MABAR's alternative financial models for cooperative banking in Kerala."
  },
  {
    term: "Coloniality of Power",
    definition: "An analytical concept describing the living legacy of colonialism in modern social structures, labor division, knowledge production, and economic hierarchies, which persists long after formal decolonization.",
    context: "Coined by Latin American theorist Aníbal Quijano and expanded in Indian Ocean contexts to study how European models continue to monopolize global policy and finance.",
    relevance: "Highlights why MABAR seeks to build autonomous local financial and educational frameworks."
  },
  {
    term: "Indian Ocean Epistemology",
    definition: "A framework that views the monsoon-driven Indian Ocean not as a passive water body, but as an active highway of scholastic migration, manuscript trade, and cross-cultural sovereignty.",
    context: "Prioritizes historical networks between Hadramawt, Calicut, Cairo, Swahili coast, and Southeast Asia over Western-centered histories.",
    relevance: "The foundational perspective of the Knowledge Atlas."
  },
  {
    term: "Ba'Alawi Sufism",
    arabicScript: "الطريقة البعلوية",
    definition: "An ethical and devotional Sufi order originating in Hadramawt, Yemen, which places emphasis on scholasticism, silent spiritual retreat, family genealogies, and active community service.",
    context: "ba'Alawi scholars migrated to Malabar, integrating locally and serving as spiritual catalysts for agrarian self-defense.",
    relevance: "Defines the spiritual and community ethics of historic Malabari leaders like Sayyid Alawi Thangal."
  },
  {
    term: "Riba",
    arabicScript: "ربا",
    definition: "An unjust, compound interest or usury charged on loans, which is strictly prohibited under Islamic jurisprudence.",
    context: "Historically kept peasantry trapped in cycle of debt. Avoiding riba requires constructing asset-backed, risk-sharing finance.",
    relevance: "The core negative constraint that MABAR's cooperative banking models navigate."
  },
  {
    term: "Mudarabah",
    arabicScript: "مضاربة",
    definition: "A partnership contract where one party provides the capital (rab al-mal) and the other provides the operational labor (mudarib), sharing profits according to a pre-agreed ratio.",
    context: "Governed historic Indian Ocean commercial ventures where merchants in Calicut managed goods funded by financiers in Yemen.",
    relevance: "Proposed as a legal framework for contemporary remittance-funded local micro-venture capitals."
  },
  {
    term: "Musharakah",
    arabicScript: "مشاركة",
    definition: "A joint enterprise contract where all partners contribute capital and split profits based on agreement, while losses are shared strictly in proportion to capital contributions.",
    context: "Formed the basis for pre-colonial maritime risk-pooling systems in Calicut.",
    relevance: "Applied in MABAR's cooperative models to replace standard interest-bearing loans."
  },
  {
    term: "Qard al-Hasan",
    arabicScript: "قرض حسن",
    definition: "A benevolent, interest-free loan extended solely to help individuals or communities in need, with the borrower only required to repay the principal amount.",
    context: "Local mosque funds (Baitulmal) historically offered these to small farmers during crop cycles.",
    relevance: "The base mechanism of the proposed cooperative consumer lending pilot in Kerala."
  },
  {
    term: "Baitulmal",
    arabicScript: "بيت المال",
    definition: "Historically the public treasury of an Islamic state; in decentralized contexts, it refers to community-managed welfare funds collecting Zakat and charity.",
    context: "In Malabar, local mosque committees historically acted as local Baitulmal, funding emergency health and education needs.",
    relevance: "MABAR's Zakat allocation model structures these Baitulmal funds digitally for maximum social impact."
  },
  {
    term: "Sukuk",
    arabicScript: "صكوك",
    definition: "Islamic financial certificates similar to bonds, but structured as asset-backed, profit-sharing instruments to comply with the prohibition of interest (riba).",
    context: "Used extensively in Malaysia and GCC nations to fund sovereign infrastructure without conventional interest-bearing debt.",
    relevance: "MABAR Finance Lab explores sukuk-style cooperative bonds for funding Waqf development projects in Kerala."
  },
  {
    term: "Ijara",
    arabicScript: "إجارة",
    definition: "A leasing contract in Islamic law where a party leases an asset for a specified period at a fixed rental fee, with ownership remaining with the lessor.",
    context: "Historically used in Malabar ports for renting ships, warehouse facilities, and land plots during the trading season.",
    relevance: "A viable tool for community housing projects where occupants lease rather than own, preserving communal asset pools."
  },
  {
    term: "Decoloniality",
    definition: "A critical framework that goes beyond political independence to challenge the persistence of colonial power structures in knowledge, culture, economics, and social hierarchies.",
    context: "Distinguished from 'postcolonialism' by arguing that modernity and coloniality are two sides of the same coin — one cannot exist without the other.",
    relevance: "The core philosophical framework of MABAR, drawing on Mignolo, Quijano, and Indian Ocean epistemologies to critique Eurocentric knowledge systems."
  },
  {
    term: "Shah Bandar",
    arabicScript: "شاه بندر",
    definition: "An elected leader of a foreign merchant community in an Indian Ocean port, who served as the legal representative and mediator between visiting traders and the local ruler.",
    context: "In Calicut, the Shah Bandar system allowed Chinese, Arab, and Swahili merchants to self-govern their trade disputes using their own legal traditions within the Zamorin's pluralist port.",
    relevance: "A historical precedent for non-hegemonic, multi-legal-framework governance that MABAR cites in its cooperative governance models."
  },
  {
    term: "Silsila",
    arabicScript: "سلسلة",
    definition: "The unbroken chain of transmission connecting a Sufi disciple to the Prophet through successive masters, ensuring spiritual and legal authority across generations.",
    context: "Malabari Sufi orders maintained silsilas linked directly to Yemeni, Iraqi, and Egyptian masters, providing authority and legitimacy across the Indian Ocean.",
    relevance: "Demonstrates how non-territorial, personal networks of trust formed the infrastructure of pre-colonial Indian Ocean scholarship."
  },
  {
    term: "Zamorin",
    definition: "The title of the Hindu Nair rulers (Samoothiri in Malayalam) of the kingdom of Calicut, who governed the most powerful pre-colonial port city of Malabar from the 12th century onward.",
    context: "The Zamorins maintained a policy of radical trade openness, allowing Muslim merchants, Jewish guilds, and foreign scholars to operate with legal autonomy.",
    relevance: "Their governance of Calicut is a key historical case study in non-hegemonic, plural legal sovereignty referenced in MABAR's research."
  },
  {
    term: "Ijtihad",
    arabicScript: "اجتهاد",
    definition: "The process of independent reasoning by a qualified Islamic jurist to derive new legal rulings for situations not explicitly covered by the Quran or Hadith.",
    context: "Malabari scholars applied ijtihad to resolve novel questions of maritime commerce, cooperative risk-sharing, and resistance to colonial law.",
    relevance: "Forms the methodological engine behind MABAR Finance Lab's adaptation of classical fiqh to contemporary cooperative banking challenges."
  }
];

export const MABAR_TIMELINE: TimelineEvent[] = [
  {
    year: "1342",
    title: "Ibn Battuta Visits Calicut",
    category: "Scholarship",
    description: "The famous globetrotter documents Calicut as one of the greatest seaports of the world, highlighting the safety of foreign merchants and presence of Qadi courts."
  },
  {
    year: "1450s onward",
    title: "Ponnani Emerges as 'Little Mecca'",
    category: "Scholarship",
    description: "Ponnani Juma Masjid becomes the center of legal study in southwestern India, training jurists from Southeast Asia and Arabia."
  },
  {
    year: "1498",
    title: "Portuguese Arrival and Disruption",
    category: "Colonial Disruption",
    description: "Vasco da Gama lands in Calicut, initiating a century of naval violence, commercial monopolies, and blockades of spice shipping routes."
  },
  {
    year: "1524",
    title: "Kunjali Marakkar Naval Campaign Begins",
    category: "Resistance",
    description: "Zamorin's naval admirals shift bases to Calicut and launch strategic naval guerrilla campaigns against Portuguese fortresses."
  },
  {
    year: "1570",
    title: "Naval Treaty of Kunjali Marakkars",
    category: "Resistance",
    description: "Zamorin naval admirals launch coordinated resistance against Portuguese maritime fortresses, defending free commerce in Calicut."
  },
  {
    year: "1583",
    title: "Tuhfat al-Mujahidin Published",
    category: "Scholarship",
    description: "Zain al-Din Makhdum II completes his historical call to resistance, circulating it across Islamic networks to mobilize global anti-colonial support."
  },
  {
    year: "1663",
    title: "Dutch Forces Occupy Cochin Ports",
    category: "Colonial Disruption",
    description: "The Dutch defeat the Portuguese in Cochin, replacing one colonial monopoly with another and introducing strict shipping pass systems."
  },
  {
    year: "1792",
    title: "British Annexation of Malabar",
    category: "Colonial Disruption",
    description: "Under the Treaty of Seringapatam, the British East India Company takes direct control of Malabar, imposing rigid land settlement taxation."
  },
  {
    year: "1840s",
    title: "Mamburam Thangal Agrarian Mobilizations",
    category: "Resistance",
    description: "Sayyid Alawi Thangal of Mampuram issues legal decrees authorizing tenant farmers to resist British landlord confiscations, linking Sufi mysticism with political activism."
  },
  {
    year: "1921",
    title: "Mappila Rebellion",
    category: "Resistance",
    description: "Mass popular uprising by Muslim peasants and anti-colonial cells in Malabar against British rule, met with severe military repression."
  },
  {
    year: "1986",
    title: "Darul Huda Movement",
    category: "Modern Institutions",
    description: "Establishment of Darul Huda in Chemmad, initiating a major reform in theological pedagogy by integrating classical scholasticism with contemporary humanities."
  },
  {
    year: "2024",
    title: "MABAR Platform Inception",
    category: "Modern Institutions",
    description: "Launch of the decolonial space to coordinate multi-pillar scholarship, archive restoration, and alternative finance research."
  },
  {
    year: "1000 CE",
    title: "Arab Merchants Establish Calicut's Spice Quarter",
    category: "Scholarship",
    description: "Arab and Persian merchants establish permanent trading quarters in Calicut, bringing contract law (fiqh al-muamalat) and founding the first Juma Masjid in the port city."
  },
  {
    year: "1200s",
    title: "Ba'Alawi Sayyids Arrive in Malabar",
    category: "Scholarship",
    description: "The first Ba'Alawi Sufi lineages from Hadramawt migrate to the Malabar coast, establishing spiritual and scholarly networks that would define regional Islam for centuries."
  },
  {
    year: "1510",
    title: "Portuguese Capture Goa",
    category: "Colonial Disruption",
    description: "The Portuguese seizure of Goa as a permanent colonial capital signals the beginning of a militarized European attempt to monopolize Indian Ocean trade by force."
  },
  {
    year: "1600",
    title: "Calicut's Kunjali Marakkar IV Captured",
    category: "Resistance",
    description: "The last great Kunjali Marakkar is captured through treachery by a combined Portuguese-Zamorin alliance, marking the decline of the independent naval resistance movement."
  },
  {
    year: "1857",
    title: "First Anti-Colonial Uprising in Malabar",
    category: "Resistance",
    description: "Local Muslim peasantry launches early armed resistance against British East India Company revenue extraction, inspired by fatwas linking land defense to religious obligation."
  },
  {
    year: "2019",
    title: "Digital Archive Initiative Begins",
    category: "Modern Institutions",
    description: "Hasanath Institute launches the first systematic attempt to photograph and OCR-index privately held Arabic-Malayalam manuscripts in northern Kerala, recovering centuries of suppressed scholarship."
  }
];

export const MABAR_ESSAYS: Article[] = [
  {
    id: "ess-01",
    title: "Mappila Rebellion as Anti-Colonial Political Theology",
    subtitle: "Rereading 1921 beyond national and communal reductions",
    author: "Shaykh Dr. Zubair al-Azhari",
    date: "June 15, 2026",
    category: "Ethics & Jurisprudence",
    tags: ["1921 Rebellion", "Political Theology", "Anti-Colonial"],
    excerpt: "The 1921 Malabar uprising is often misread either as a mere agrarian riot or a communal clash. By analyzing local legal fatwas and Sufi poetry of the period, we uncover a sophisticated political theology of anti-colonial resistance.",
    body: "The historical memory of the 1921 Mappila Rebellion has been a battleground of interpretations. Colonial archives framed it as fanatical outbreaks, national historians reduced it to purely class-based economic grievances, and Hindutva groups read it as communal violence. However, local texts—written in Arabic-Malayalam and circulated secretly among mosques—reveal a deep theological framework. Under the guidance of leaders like Sayyid Alawi Thangal, resistance to colonial landlords was articulated as a spiritual duty to defend the land, establish justice, and protect public sovereignty. This essay explores how Shafi'i legal theory and Ba'Alawi Sufi ethics merged to form a cohesive political critique against British imperialism.",
    imageUrl: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&q=80&w=600",
    readTime: "8 min read"
  },
  {
    id: "ess-02",
    title: "Indian Ocean International Relations Without the West",
    subtitle: "Monsoon alliances, sovereign treaties, and maritime jurists",
    author: "Shaykh Hamza Yusuf",
    date: "May 20, 2026",
    category: "Decolonial Geopolitics",
    tags: ["Indian Ocean", "International Relations", "Sovereignty"],
    excerpt: "Mainstream IR theory assumes states are European constructs. But for centuries, the Indian Ocean was governed by non-hegemonic maritime treaties, linguistic cosmopolitanism, and legal consultations linking Calicut to Aceh and Hadramawt.",
    body: "Mainstream international relations theories—realism, liberalism, constructivism—are structurally eurocentric, tracing their origins to the Treaty of Westphalia in 1648. Yet, centuries before Westphalia, the Indian Ocean hosted an alternative system of global relations. In this space, sovereign authority was maritime and networked rather than territorial and bordered. Calicut's Zamorin rulers negotiated trade treaties with Arab merchant guilds; scholars in Cairo resolved legal queries for port magistrates in Sumatra; and Sufi networks acted as diplomatic ambassadors. By centering the Indian Ocean, we discover a cosmopolitanism that was commercial, legal, and spiritual, proving that global coordination does not require a single hegemonic center.",
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600",
    readTime: "12 min read"
  },
  {
    id: "ess-03",
    title: "Islamic Finance and Kerala’s Cooperative Economy",
    subtitle: "Working within legal constraints to build community wealth",
    author: "Prof. Asif Ali, MABAR Finance Lab",
    date: "April 18, 2026",
    category: "Knowledge & Technology",
    tags: ["Islamic Finance", "Cooperatives", "Kerala Economy"],
    excerpt: "While federal Indian banking law restricts interest-free commercial banking, Kerala's unique cooperative legal framework offers a powerful pathway to implement risk-sharing micro-equity and community wealth initiatives.",
    body: "In India, the Banking Regulation Act of 1949 requires all commercial banks to operate on interest-based frameworks, creating a legal barrier for interest-free Islamic banking. However, the federal structure of India delegates cooperative societies to state governments. Kerala has a robust history of cooperative credit societies. By structuring financial institutions under the Multi-State Cooperative Societies Act or local State cooperative laws, we can establish interest-free, asset-backed finance systems. These entities can offer partnerships (musharakah), cost-plus sales (murabaha), and operate interest-free mutual funds. This pathway offers a practical method to mobilize diaspora remittances and support small-scale local micro-enterprises.",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600",
    readTime: "10 min read"
  },
  {
    id: "ess-04",
    title: "Linguistic Sovereignty: Arabic-Malayalam as counter-hegemony",
    subtitle: "How Mappila script bypassed Sanskrit and European print cartels",
    author: "Sayyid Faisal Al-Hadrami",
    date: "July 02, 2026",
    category: "Classical Text Tradition",
    tags: ["Arabic-Malayalam", "Linguistics", "Decolonial"],
    excerpt: "The development of Arabic-Malayalam allowed the subaltern Mappila community to build a literate, mass communication system that bypassed colonial censors and high-caste Sanskrit monopolies.",
    body: "Arabic-Malayalam represents a unique sociolinguistic phenomenon. By writing the regional Malayalam language using adapted Arabic characters, the Mappila community constructed an autonomous literary sphere. This script became a vehicle for popular devotional poetry, anti-colonial war songs, medical treatises, and legal opinions. While the colonial state controlled print licenses for Latin and Malayalam characters, local lithographic presses printed Arabic-Malayalam tracts in private houses and mosque basements. This linguistic sovereignty created a highly literate peasant class capable of political organization outside colonial school systems.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600",
    readTime: "11 min read"
  }
];

export const INDIAN_OCEAN_DISPATCHES: Article[] = [
  {
    id: "disp-01",
    title: "Hadramawt to Ponnani: The Lineage of Scholar-Sailors",
    subtitle: "Indian Ocean Dispatches - Part 1",
    author: "Sayyid Faisal Al-Hadrami",
    date: "March 10, 2026",
    category: "Indian Ocean Dispatches",
    tags: ["Hadramawt", "Ponnani", "Migration"],
    excerpt: "Tracking the migration of Ba'Alawi scholars who sailed from the dry valleys of Yemen to the coconut groves of Malabar, carrying books of law and Sufi litanies.",
    body: "The Ba'Alawi Sayyids of Hadramawt represented a unique breed of scholar-sailors. Driven by trade, spiritual duty, and political turmoil, they migrated across the Indian Ocean from the 14th century onward. When they arrived on the Malabar coast, they did not act as colonial conquerors. Instead, they integrated into the local society, learned Malayalam, married into local families, and established educational centers. Their scholarly authority was accepted because it was organic and cooperative. They acted as legal consultants, spiritual guides, and eventually, as leaders of anti-colonial resistance. This dispatch tracks the manuscript paths they carried, showing how a legal ruling written in Tarim was copied, annotated, and implemented in the mosque circles of Ponnani.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
    readTime: "9 min read"
  },
  {
    id: "disp-02",
    title: "Aceh and Malabar: The Spiceline Alliance",
    subtitle: "Indian Ocean Dispatches - Part 2",
    author: "Teuku Iskandar",
    date: "April 02, 2026",
    category: "Indian Ocean Dispatches",
    tags: ["Aceh", "Malabar", "Anti-Colonial Alliance"],
    excerpt: "Exploring the military and scholastic links that bound the Sultanate of Aceh to the Zamorins of Calicut during the anti-Portuguese naval campaigns.",
    body: "When the Portuguese occupied Malacca in 1511 and Goa in 1510, they sought to strangle Muslim shipping in the Indian Ocean. In response, two major powers formed a strategic alliance: the Sultanate of Aceh in northern Sumatra and the Zamorin rulers of Calicut in southwestern India. This alliance was commercial, military, and intellectual. Acehnese ships carried spices directly to Malabar, bypassing Portuguese blockades. Scholars like Nuruddin al-Raniri traveled between India and Sumatra, carrying anti-colonial legal treatises. The naval battles of the Kunjali Marakkars were celebrated in Acehnese court poetry, proving that decolonial solidarity was a networked maritime reality long before modern political blocks.",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    readTime: "8 min read"
  },
  {
    id: "disp-03",
    title: "Zanzibar and the Malabari Merchants",
    subtitle: "Indian Ocean Dispatches - Part 3",
    author: "Prof. Engseng Ho",
    date: "April 28, 2026",
    category: "Indian Ocean Dispatches",
    tags: ["Zanzibar", "Merchant Networks", "Trade"],
    excerpt: "How monsoon winds connected Swahili maritime cities to the merchant guilds of Kerala, creating shared vocabularies of contract law.",
    body: "The monsoon winds of the Indian Ocean governed not only travel but also the calendar of contract law. Merchants from Calicut and Cochin arrived in Zanzibar during the winter monsoons, carrying spices, textiles, and building timber. They stayed for months, waiting for the winds to reverse. During this period, they negotiated joint ventures, settled trade disputes in Qadi courts, and established mutual trust. This dispatch details the financial ledgers discovered in Zanzibar archives, written in Arabic, Swahili, and Malayalam scripts, showing how the principles of risk-sharing and trade ethics (Fiqh al-Muamalat) were used to govern contracts across thousands of miles without European intervention.",
    imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&q=80&w=600",
    readTime: "11 min read"
  },
  {
    id: "disp-04",
    title: "Calicut Ports: The Sanctum of Free Trade",
    subtitle: "Indian Ocean Dispatches - Part 4",
    author: "Suhail Hussain",
    date: "June 08, 2026",
    category: "Indian Ocean Dispatches",
    tags: ["Calicut", "Free Trade", "Zamorin"],
    excerpt: "Reconstructing the port infrastructure of Calicut before the Portuguese gunboats, centering the cooperative administration of the harbor.",
    body: "Calicut was renowned in the medieval world as a port where peace was guaranteed. Unlike European trading posts which relied on fortified castles and armed garrisons to exclude competitors, the Zamorin of Calicut maintained an open harbor. The security of transactions was overseen by a cooperative partnership between the king's customs officers and the 'Shah Bandar'—the elected representative of the foreign merchant guilds. If cargo was damaged, the state shared the loss. This dispatch details the maritime ordinances that governed the harbor, showing how a non-monopolistic, cooperative trade ecosystem operated successfully for over three centuries.",
    imageUrl: "https://images.unsplash.com/photo-1473042904451-00171c6d889d?auto=format&fit=crop&q=80&w=600",
    readTime: "10 min read"
  }
];

export const KITAB_REPOSITORY: KitabEntry[] = [
  {
    id: "tuhfat",
    title: "Tuhfat al-Mujahidin fi Ba'd Akhbar al-Burtuqaliyyin",
    author: "Shaykh Zain al-Din Makhdum II",
    date: "c. 1583 CE / 991 AH",
    language: "Arabic",
    genre: "history",
    manuscriptLocation: "Hasanath Institute Manuscript Cell (Copy), British Library (Original)",
    shortIntro: "The first written history of Malabar, dedicated to the Sultan of Bijapur as a call for strategic alliance and global solidarity against Portuguese colonial aggression.",
    textSnippetArabic: "الحمد لله الذي فرض الجهاد على عباده... وبعد، فإن هذه تحفة لطيفة في بيان بعض أحوال الفرنجة البُرتغاليين الذين استولوا على بلاد مليبار وعاثوا فيها فساداً...",
    textSnippetEnglish: "Praise be to God who has ordained struggle for His servants... This is a brief gift detailing the actions of the Portuguese Franks who occupied Malabar and spread corruption in the land...",
    textSnippetMalayalam: "അല്ലാഹുവിനാണ് സ്തുതി, അവൻ തന്റെ ദാസന്മാർക്ക് സമരം നിർബന്ധമാക്കി... മലബാറിലെ തുറമുഖങ്ങളിൽ അതിക്രമിച്ചു കയറി നാശനഷ്ടങ്ങൾ വരുത്തിയ പോർച്ചുഗീസുകാരുടെ വിവരണം നൽകുന്ന ലഘു ഗ്രന്ഥമാണിത്...",
    annotations: {
      historical: "Written during the height of the Portuguese naval blockade. Makhdum II studied in Mecca and witnessed the fall of trade routes. The text acts as a geo-strategic analysis of naval warfare, spy networks, and merchant diplomacy.",
      jurisprudential: "Contains specific legal definitions regarding defensive warfare. It argues that defense of coastal territories is an individual obligation (fard ayn) when maritime blockades threaten food security and free pilgrimage paths.",
      decolonial: "Unlike colonial chroniclers who frame conquest as civilizing missions, Makhdum II analyzes Portuguese expansion as an economic cartel operating through religious terror.",
      indianOcean: "Highlights Ponnani, Calicut, Cochin, and Cannur as interconnected ports. It mentions correspondence sent to the Ottoman Empire and regional kings (Zamorin, Adil Shah) to show a unified diplomatic front.",
      comparativeTheory: "Aligns with Frantz Fanon's critique of colonial violence in 'The Wretched of the Earth'—defining colonial occupation as structural violence that can only be resisted through sovereign defensive action. Synthesizes with Walter Mignolo's concept of 'border thinking' by showing how Islamic jurisprudence was used at the colonial border to construct an autonomous critique."
    },
    languageScript: "Arabic script with regional Arabic-Malayalam annotations",
    subject: "Anti-Colonial Resistance & Indian Ocean Geopolitics",
    period: "1500-1700",
    keywords: ["Tuhfat", "Portuguese", "Naval Warfare", "Anti-Colonial", "Malabar", "Makhdum", "Resistance"],
    fullTextAvailable: true,
    relatedEssays: [
      { title: "Mappila Rebellion as Anti-Colonial Political Theology", link: "ess-01" },
      { title: "Indian Ocean International Relations Without the West", link: "ess-02" }
    ],
    downloadAllowed: true,
    downloadUrl: "/downloads/tuhfat_al_mujahidin.pdf",
    copyrightStatus: "Public Domain (Historic Manuscript)"
  },
  {
    id: "fathul-mueen",
    title: "Fath al-Mu'in bi Sharh Qurrat al-'Ayn bi-Muhimmat al-Din",
    author: "Shaykh Zain al-Din Makhdum II",
    date: "c. 1575 CE",
    language: "Arabic",
    genre: "fiqh",
    manuscriptLocation: "Darul Huda Central Library",
    shortIntro: "A seminal commentary on Shafi'i jurisprudence, taught in Islamic universities across East Africa, Malaysia, Indonesia, and Yemen.",
    textSnippetArabic: "هذا شرح لطيف على كتابي المسمى بقرّة العين بمهمّات الدين، يبين مرادها ويتمم مفادها ويحصل مقاصدها...",
    textSnippetEnglish: "This is a concise commentary on my book named Qurrat al-Ayn, clarifying its meanings, completing its benefits, and achieving its legal objectives...",
    textSnippetMalayalam: "എന്റെ 'ഖുർറത്തുൽ ഐൻ' എന്ന കൃതിക്ക് ഞാൻ എഴുതിയ ലഘു വ്യാഖ്യാനമാണിത്. അതിന്റെ ആശയങ്ങൾ വ്യക്തമാക്കാനും ലക്ഷ്യങ്ങൾ പൂർത്തീകരിക്കാനും ഇത് സഹായിക്കുന്നു...",
    annotations: {
      historical: "Composed in Ponnani. The text became so foundational that scholars in Hadramawt and Java wrote extensive marginal notes (hashiyah) on it, transforming Malabar into an exporter of legal theory.",
      jurisprudential: "Provides legal rulings on contracts (muamalat), maritime shipping salvage, custom duties, and the rights of non-Muslim subjects under the Zamorin's pagan rule, showing a highly adaptive legal pluralism.",
      decolonial: "Demonstrates an autonomous educational curriculum that survived without British or Mughal codification.",
      indianOcean: "Indicates how a legal manual created on the Malabar coast became the standard textbook in Java and Zanzibar, mapping the intellectual unity of the oceanic community.",
      comparativeTheory: "Can be analyzed alongside Gayatri Spivak's 'Can the Subaltern Speak?' by showing that subaltern legal structures were not silent, but spoke in complex Arabic juridical terminologies that European legal systems deliberately ignored."
    },
    languageScript: "Arabic script",
    subject: "Shafi'i Jurisprudence (Fiqh al-Muamalat)",
    period: "1500-1700",
    keywords: ["Fathul Mueen", "Fiqh", "Jurisprudence", "Islamic Law", "Contracts", "Ponnani", "Makhdum"],
    fullTextAvailable: true,
    relatedEssays: [
      { title: "Islamic Finance and Kerala’s Cooperative Economy", link: "ess-03" }
    ],
    downloadAllowed: true,
    downloadUrl: "/downloads/fath_al_muin.pdf",
    copyrightStatus: "Public Domain (Historic Manuscript)"
  },
  {
    id: "muhiyyuddin-mala",
    title: "Muhiyyuddin Mala",
    author: "Qadi Muhammad of Calicut",
    date: "1607 CE / 1016 AH",
    language: "Arabic-Malayalam",
    genre: "mawlid",
    manuscriptLocation: "Calicut Archival Center",
    shortIntro: "The earliest surviving Arabic-Malayalam devotional poem, celebrating the spiritual path of Muhiyyuddin Abdul Qadir al-Jilani and serving as a liturgical memory for Malabar Mappilas.",
    textSnippetArabic: "حمداً لرب عظيم دائم الأبدِ... صلاةً وسلاماً على النبي محمدِ... هذا كتابُ ملا محيي الدينِ كنزُ الفقرِ والمددِ...",
    textSnippetEnglish: "Praise be to the Lord, Great and Eternal... Blessings and peace upon the Prophet Muhammad... This is the ode of Muhiyyuddin, a treasure of spiritual poverty and divine aid...",
    textSnippetMalayalam: "അനന്തമായ സ്തുതികൾ ജഗന്നിയന്താവായ അല്ലാഹുവിന്... അവിടുത്തെ പ്രവാചകരായ മുഹമ്മദ് നബിക്ക് സ്വലാത്തും സലാമും... ഇത് ശൈഖ് മുഹിയുദ്ദീൻ തങ്ങളുടെ മാലപ്പാട്ടാകുന്നു, ആത്മീയ ധന്യതയുടെ കലവറയാണ് ഇത്...",
    annotations: {
      historical: "Composed in 1607 CE by Qadi Muhammad of Calicut during the consolidation of Mappila identity. The text is the oldest extant written record of Arabic-Malayalam literature.",
      jurisprudential: "While primarily devotional, it integrates legal ethics, reminding readers of spiritual discipline, honesty in trade, and the preservation of community welfare.",
      decolonial: "By using the native Malayalam tongue written in the holy Arabic script, Qadi Muhammad established a linguistic medium that bypassed European printing press licensing and Sanskrit/hegemonic scripts, creating an autonomous mass communication network.",
      indianOcean: "Highlights how Sufi networks linked Malabar to Baghdad (the resting place of al-Jilani) and Yemen, creating a shared mystical vocabulary across port towns.",
      comparativeTheory: "Synthesizes with Ngũgĩ wa Thiong'o's 'Decolonising the Mind'—by reclaiming the native language for high literary and devotional expression, refusing the linguistic hegemony of colonial languages."
    },
    languageScript: "Arabic-Malayalam script (Malayalam language written in adapted Arabic letters)",
    subject: "Devotional Poetry & Sufi Liturgy",
    period: "1500-1700",
    keywords: ["Mala", "Devotional", "Qadi Muhammad", "Sufism", "Arabic-Malayalam", "Calicut", "Poetry"],
    fullTextAvailable: true,
    relatedEssays: [
      { title: "Hadramawt to Ponnani: The Lineage of Scholar-Sailors", link: "disp-01" }
    ],
    downloadAllowed: true,
    downloadUrl: "/downloads/muhiyyuddin_mala.pdf",
    copyrightStatus: "Public Domain"
  },
  {
    id: "sayf-al-battar",
    title: "Sayf al-Battar li-Man Yuwali al-Kuffar",
    author: "Sayyid Alawi Thangal of Mampuram",
    date: "c. 1840 CE",
    language: "Arabic",
    genre: "anti-colonial",
    manuscriptLocation: "Mampuram Maqam Archive",
    shortIntro: "A legal and ethical fatwa on agrarian resistance against British land tax policies and landlord oppressions, establishing the religious duty of tenant self-defense.",
    textSnippetArabic: "وجوب الدفاع عن النفس والأرض فرض عين على كل مسلم ومسلمة ضد جور الكفار والظلمة الذين يسعون في تخريب الديار وسلب أقوات العباد بالضرائب الجائرة...",
    textSnippetEnglish: "The obligation of defending oneself and one's land is an individual duty (fard ayn) upon every Muslim man and woman against the tyranny of colonial invaders and oppressors who corrupt the land and steal livelihoods through unfair taxes...",
    textSnippetMalayalam: "അധിനിവേശ ശക്തികൾക്കും അവരുടെ കുഴലൂത്തുകാരായ ജന്മികൾക്കുമെതിരെ സ്വന്തം ജീവനും സ്വത്തും സംരക്ഷിക്കുന്നത് ഓരോ മുസ്ലിമിനും നിർബന്ധ ബാധ്യതയാകുന്നു. നികുതികൊള്ളക്കെതിരായ പോരാട്ടം ഇതിന്റെ ഭാഗമാണ്...",
    annotations: {
      historical: "Composed during the early 19th-century agrarian clashes. The Mampuram Thangals issued this fatwa to authorize regional tenant resistance against British-backed landlord confiscations.",
      jurisprudential: "Applies classical rules of defensive war (jihad al-daf') to economic exploitation, establishing that excessive taxation and tenant eviction by force constitute hostilities that legally justify self-defense.",
      decolonial: "Directly challenges the colonial division between 'spiritual' religion and 'political' rebellion. It constructs an alternative authority that delegitimizes British courts and colonial land laws.",
      indianOcean: "Demonstrates Hadrami diasporic activism, connecting Yemeni scholarly lineages to active political struggles in South Asia.",
      comparativeTheory: "Parallels Frantz Fanon's analysis of the colonial land system in 'The Wretched of the Earth,' where the native land is systematically stolen, and resistance is shown to be a necessary, sovereign reclamation of dignity. Synthesizes with Aníbal Quijano's 'Coloniality of Power' by identifying how colonial land laws create racialized labor hierarchies."
    },
    languageScript: "Arabic",
    subject: "Agrarian Ethics, Anti-Colonial Resistance & Legal Decrees (Fatwas)",
    period: "1700-1900",
    keywords: ["Sayf al-Battar", "Mampuram Thangal", "Agrarian Resistance", "Fatwa", "British Empire", "Hadramawt", "Taxation"],
    fullTextAvailable: true,
    relatedEssays: [
      { title: "Mappila Rebellion as Anti-Colonial Political Theology", link: "ess-01" }
    ],
    downloadAllowed: false,
    downloadUrl: "",
    copyrightStatus: "Restricted Access - Manuscript Preservation Cell (Hasanath Research Hub)"
  },
  {
    id: "qawaid-al-tawhid",
    title: "Qawa'id al-Tawhid",
    author: "Shaykh Zain al-Din Makhdum I",
    date: "c. 1510 CE",
    language: "Arabic",
    genre: "kalam",
    manuscriptLocation: "Ponnani Juma Masjid Library",
    shortIntro: "A foundational text on Ash'ari theology and creed, detailing the intellectual arguments for the Unity of God in response to regional philosophical dialogues.",
    textSnippetArabic: "اعلم أن قواعد التوحيد أصول مبنية على البراهين العقلية والنصوص السمعية في تنزيه الباري عز وجل عن شوب النقص وإثبات صفات الكمال...",
    textSnippetEnglish: "Know that the principles of Unity are foundations built upon rational proofs and transmitted texts in establishing the transcendence of the Creator, Exalted and Majestic, from any deficiency and confirming attributes of perfection...",
    textSnippetMalayalam: "അറിയുക, ഏകദൈവ വിശ്വാസത്തിന്റെ അടിസ്ഥാനങ്ങൾ ബുദ്ധിപരമായ തെളിവുകളിലും പ്രമാണങ്ങളിലും അധിഷ്ഠിതമാണ്. ദൈവത്തിന് എല്ലാവിധ പൂർണ്ണതകളും കൽപിക്കുന്നതാണത്...",
    annotations: {
      historical: "Composed by Makhdum I (founder of Ponnani Juma Masjid) during the early decades of Portuguese entry. It sought to stabilize the intellectual and theological foundations of the local community.",
      jurisprudential: "Examines the legal definitions of belief (iman) and rational inquiry, arguing that basic rational understanding of faith is a general obligation.",
      decolonial: "Maintains theological autonomy against Portuguese missionizing efforts, keeping the philosophical vocabulary of the region rooted in Islamic rationalism.",
      indianOcean: "Shows the trans-oceanic circulation of Ash'ari theology, referencing Al-Ghazali and Egyptian Kalam texts, which were imported to Malabar via the spice routes.",
      comparativeTheory: "Can be contrasted with Edward Said's 'Orientalism'—by showcasing a highly advanced local tradition of philosophical and rational argumentation that refutes the orientalist stereotype of the 'passive, non-rational Easterner'."
    },
    languageScript: "Arabic script",
    subject: "Islamic Theology & Rational Dialectics (Kalam)",
    period: "1500-1700",
    keywords: ["Tawhid", "Kalam", "Creed", "Ash'ari", "Makhdum I", "Ponnani"],
    fullTextAvailable: true,
    relatedEssays: [],
    downloadAllowed: true,
    downloadUrl: "/downloads/qawaid_al_tawhid.pdf",
    copyrightStatus: "Public Domain (Manuscript Scan Available)"
  },
  {
    id: "adab-al-muridin",
    title: "Adab al-Muridin",
    author: "Shaykh Mamukkoya",
    date: "c. 1650 CE",
    language: "Arabic",
    genre: "tasawwuf",
    manuscriptLocation: "Chaliyam Sufi Tekke Archive",
    shortIntro: "A practical guide to the spiritual path (tariqah) and character development, highlighting the integration of daily labor with contemplation.",
    textSnippetArabic: "طريق الصوفية مبني على تصفية القلوب ولزوم الخدمة لخلق الله، والتوكل عليه سبحانه في كسب المعاش وربط الجوارح بالشرع الشريف...",
    textSnippetEnglish: "The path of Sufism is built upon purifying the heart, committing to the service of God's creation, relying on Him, Glory be to Him, in earning a lawful livelihood, and aligning actions with the sacred law...",
    textSnippetMalayalam: "ഹൃദയശുദ്ധി വരുത്തുക, സൃഷ്ടികൾക്ക് സേവനം ചെയ്യുക, ഉപജീവനമാർഗത്തിൽ ഏർപ്പെടുമ്പോൾ ദൈവത്തിൽ ഭരമേൽപ്പിക്കുക, ശരീരാവയവങ്ങളെ ധർമ്മത്തിൽ അധിഷ്ഠിതമാക്കുക എന്നിവയിലാണ് സൂഫി മാർഗം നിലകൊള്ളുന്നത്...",
    annotations: {
      historical: "Written during the post-Portuguese reconstruction period. It reflects the local institutionalization of Sufi orders (Qadiriyya and Chishtiyya) as hubs of social support.",
      jurisprudential: "Discusses the spiritual dimensions of daily activities, explaining how work (kasb) becomes an act of devotion under Sufi ethics.",
      decolonial: "Asserts an alternative model of self-development and ethics that emphasizes community service (khidmah) over individual capital accumulation.",
      indianOcean: "Maps spiritual genealogies (silsilah) linking Malabar Sufis directly to masters in Yemen, Iraq, and Central Asia.",
      comparativeTheory: "Can be read alongside Gayatri Spivak's critiques of subaltern ethics, demonstrating how marginalized communities built robust systems of ethical subjectivity outside the colonial-capitalist framework."
    },
    languageScript: "Arabic script",
    subject: "Sufi Ethics & Character Refinement (Tasawwuf)",
    period: "1500-1700",
    keywords: ["Tasawwuf", "Sufism", "Ethics", "Adab", "Mamukkoya", "Chaliyam"],
    fullTextAvailable: true,
    relatedEssays: [
      { title: "Hadramawt to Ponnani: The Lineage of Scholar-Sailors", link: "disp-01" }
    ],
    downloadAllowed: true,
    downloadUrl: "/downloads/adab_al_muridin.pdf",
    copyrightStatus: "Public Domain (Open Archival Access)"
  },
  {
    id: "khulasat-al-kalam",
    title: "Khulasat al-Kalam fi Bayan Aqaid al-Islam",
    author: "Qadi Muhammad of Calicut",
    date: "c. 1612 CE",
    language: "Arabic",
    genre: "kalam",
    manuscriptLocation: "Calicut Archival Center",
    shortIntro: "A systematic compilation of Ash'ari theology answering local philosophical challenges and outlining the rational defense of spiritual realities.",
    textSnippetArabic: "فهذه خلاصة الكلام في تبيين عقائد الإسلام التي أجمع عليها السلف الصالح وعلماء التوحيد بالبراهين الساطعة والمدارك العقلية...",
    textSnippetEnglish: "This is the summary of discourse in clarifying the creeds of Islam agreed upon by the righteous predecessors and theologians, utilizing bright proofs and rational insights...",
    textSnippetMalayalam: "വിശുദ്ധ പൂർവ്വികരും ഏകദൈവ പണ്ഡിതന്മാരും ബുദ്ധിപരമായ തെളിവുകളുടെ അടിസ്ഥാനത്തിൽ യോജിച്ച ഇസ്‌ലാമിക വിശ്വാസ സംഹിത വ്യക്തമാക്കുന്ന ലഘു ഗ്രന്ഥമാണിത്...",
    annotations: {
      historical: "Composed in the early 17th century to provide a concise syllabus for students studying in Calicut's congregational mosque.",
      jurisprudential: "Defines the intellectual threshold of individual responsibility (mukallaf) in rational validation of theological principles.",
      decolonial: "Stabilizes regional philosophical vocabularies, preventing cognitive capture by Portuguese Catholic proselytizers who controlled printer cartels along the coast.",
      indianOcean: "Throws deep textual references to Imam al-Ghazali and Al-Taftazani, verifying manuscript circulation from Cairo and Baghdad to Malabar.",
      comparativeTheory: "Demonstrates a rigorous subaltern rationalist structure that directly challenges standard orientalist dichotomies of Western rationality versus Eastern mysticism."
    },
    languageScript: "Arabic script",
    subject: "Ash'ari Rational Theology (Kalam)",
    period: "1500-1700",
    keywords: ["Khulasat", "Kalam", "Theology", "Qadi Muhammad", "Calicut"],
    fullTextAvailable: true,
    downloadAllowed: true,
    downloadUrl: "/downloads/khulasat_al_kalam.pdf",
    copyrightStatus: "Public Domain (Archived Scans)"
  },
  {
    id: "fath-al-samad",
    title: "Fath al-Samad fi Ahkam al-Aqd wa-al-Sanad",
    author: "Shaykh Zain al-Din Makhdum I",
    date: "c. 1515 CE",
    language: "Arabic",
    genre: "fiqh",
    manuscriptLocation: "Ponnani Juma Masjid Library",
    shortIntro: "A highly specialized treatise on commercial contract law, focusing on the legal status of maritime shipping documents and cooperative ventures in pluralistic societies.",
    textSnippetArabic: "بيان الأحكام الفقهية المتعلقة بعقود التجارة البحرية والضمانات المالية وتوزيع الأرباح بالعدل وفق الشريعة الغراء...",
    textSnippetEnglish: "Elucidating the jurisprudential rulings related to maritime trade contracts, financial guarantees, and the just distribution of profits according to sacred law...",
    textSnippetMalayalam: "സമുദ്ര വ്യാപാര കരാറുകൾ, ധനകാര്യ ഗ്യാരണ്ടികൾ, നീതിയുക്തമായ ലാഭവിഹിതം എന്നിവയെ സംബന്ധിച്ച കർമ്മശാസ്ത്ര നിയമങ്ങൾ വ്യക്തമാക്കുന്ന കൃതി...",
    annotations: {
      historical: "Composed during the early Portuguese blockades when local Muslim merchant guilds had to reorganize joint shipping ventures with Hindu Zamorin subjects.",
      jurisprudential: "Formulates rulings on marine salvage, cargo insurance under cooperative risk-sharing formulas, and the legal enforceability of ocean bills of lading.",
      decolonial: "Reflects a highly advanced, indigenous commercial code that functioned autonomously without European mercantilist courts.",
      indianOcean: "Addresses the legal queries raised by merchants sailing between Calicut, Aden, and Malacca.",
      comparativeTheory: "Synthesizes with post-colonial critiques of Westphalian legal hegemony by presenting a functional model of cross-border legal coordination based on moral obligation rather than imperial military enforcement."
    },
    languageScript: "Arabic script",
    subject: "Maritime Commerce Law (Fiqh al-Muamalat)",
    period: "1500-1700",
    keywords: ["Fath al-Samad", "Contracts", "Maritime Law", "Makhdum I", "Commerce", "Ponnani"],
    fullTextAvailable: true,
    downloadAllowed: true,
    downloadUrl: "/downloads/fath_al_samad.pdf",
    copyrightStatus: "Public Domain (Historic Manuscript)"
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "wp-01",
    title: "Islamic Finance and Kerala’s Cooperative Economy: Riba-Free Pathways",
    author: "Dr. Faisal K.P., Hasanath Institute",
    type: "Working Paper",
    abstract: "This paper analyzes the regulatory constraints of interest-free banking under India's Reserve Bank act and explores state-level cooperative models as viable alternatives. It provides a structural blueprint for interest-free cooperative credit societies utilizing remittance deposits for local micro-enterprise funding.",
    citation: "Faisal, K.P. (2026). 'Islamic Finance and Kerala’s Cooperative Economy: Riba-Free Pathways.' Hasanath Institute Working Paper Series, No. 12.",
    keywords: ["Cooperative Law", "Islamic Finance", "Remittances", "Kerala Economy"],
    pdfSize: "1.4 MB",
    downloadCount: 342
  },
  {
    id: "wp-02",
    title: "Indian Ocean IR without the West: Monsoon Alliances and Maritime Jurisprudence",
    author: "Prof. Najiya Rahman, Dept. of International Relations, Hasanath",
    type: "Working Paper",
    abstract: "Mainstream International Relations theory remains bound to the Westphalian nation-state. By studying maritime alliances between the Zamorin rulers of Calicut and the Sultanate of Aceh in the 16th century, this paper proposes an alternative framework of networked maritime sovereignty grounded in Islamic contract law and mutual trade autonomy.",
    citation: "Rahman, N. (2026). 'Indian Ocean IR without the West: Monsoon Alliances and Maritime Jurisprudence.' Hasanath Working Papers in Decolonial Theory, No. 8.",
    keywords: ["Decolonial IR", "Maritime Sovereignty", "Aceh-Malabar Alliance"],
    pdfSize: "2.1 MB",
    downloadCount: 512
  },
  {
    id: "pb-01",
    title: "Revitalizing Waqf Land Records for Community Wealth Building in Malabar",
    author: "MABAR Finance Lab Taskforce",
    type: "Policy Brief",
    abstract: "A policy brief aimed at state Waqf Boards, legal advocates, and community leaders. It identifies legal loopholes in Waqf asset registration, proposes digital GIS mapping templates, and suggests productive investment models (e.g., hybrid cooperative housing, solar farms) under current Indian Waqf legislation.",
    citation: "MABAR Finance Lab. (2026). 'Revitalizing Waqf Land Records for Community Wealth Building.' Policy Brief, No. 3.",
    keywords: ["Waqf Reform", "Property Law", "Community Asset Management"],
    pdfSize: "850 KB",
    downloadCount: 689
  },
  {
    id: "wp-03",
    title: "Legal Pluralisms in Pre-Colonial Malabar: Customary Law and Shafi'i Fiqh",
    author: "Shaykh Dr. Bahauddeen Nadwi, Hasanath Research Hub",
    type: "Working Paper",
    abstract: "This paper analyzes the historical coexistence and mutual adaptation between local Hindu customary laws (Maryada) and Islamic jurisprudence (Fiqh) in the port city-state of Calicut. Through court registries, the study reconstructs how cross-communal trade disputes were resolved peacefully in multi-centric arbitration councils.",
    citation: "Sulaiman, R. (2026). 'Legal Pluralisms in Pre-Colonial Malabar: Customary Law and Shafi'i Fiqh.' Hasanath Law Working Papers, No. 15.",
    keywords: ["Legal Pluralism", "Customary Law", "Calicut", "Maryada"],
    pdfSize: "1.8 MB",
    downloadCount: 198
  },
  {
    id: "pb-02",
    title: "Diaspora Remittances and Cooperative Housing: A Post-Capitalist Blueprint",
    author: "Prof. Asif Ali, MABAR Finance Lab",
    type: "Policy Brief",
    abstract: "Proposes an institutional model to channel Gulf diaspora remittances into community-owned cooperative housing trusts rather than speculative land purchases. Outlines legal structures to operate mudarabah housing developments under Kerala's Cooperative Societies Act.",
    citation: "MABAR Finance Lab. (2026). 'Diaspora Remittances and Cooperative Housing: A Post-Capitalist Blueprint.' Policy Brief, No. 5.",
    keywords: ["Remittances", "Cooperative Housing", "Mudarabah", "Land Specs"],
    pdfSize: "920 KB",
    downloadCount: 456
  }
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "proj-01",
    title: "Arabic-Malayalam Digital Archive Project",
    question: "How can we digitize, translate, and perform NLP semantic indexing on privately held Kitab manuscripts in Malabar's old families?",
    team: ["Dr. Zubair al-Azhari", "Suhail Hussain (Tech Lead)", "Farooq Nizar (Manuscript Conservator)"],
    status: "Active",
    timeline: "2025 - 2027",
    description: "Collaborating with local mosque committees and families to digitize rare legal texts, letters, and anti-colonial pamphlets, creating a public-access digital repository with OCR translation layers."
  },
  {
    id: "proj-02",
    title: "Waqf Asset Mapping and GIS Visualisation",
    question: "What is the productive potential of underutilized Waqf lands in northern Kerala, and how can they be legally mapped without political exploitation?",
    team: ["Prof. Asif Ali", "Nihal Sharaf (GIS Analyst)", "Shaykh Dr. Bahauddeen Nadwi"],
    status: "Upcoming",
    timeline: "Sept 2026 - Aug 2027",
    description: "Developing a secure database and mapping tool to catalog Waqf property boundaries, legal status, and proposed developmental projects for community education and health support."
  },
  {
    id: "proj-03",
    title: "Hadrami Diaspora Trade Ledgers Indexing",
    question: "How did Ba'Alawi merchant networks structure commercial contracts across Yemen, India, and East Africa between 1700-1900?",
    team: ["Sayyid Faisal Al-Hadrami", "Prof. Engseng Ho", "Farooq Nizar"],
    status: "Active",
    timeline: "2026 - 2028",
    description: "Translating and analyzing trade ledgers, custom records, and correspondence files scattered in private holdings in Tarim, Zanzibar, and Calicut to reconstruct oceanic financial contract history."
  }
];

export const COCOON_BOOKS: CocoonBook[] = [
  {
    id: "coc-01",
    title: "Zain al-Din al-Malabar: The Sea and the Pen",
    ageGroup: "Ages 8-12",
    language: "Trilingual",
    theme: "Scholastic History",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200",
    pdfPages: [
      "Page 1: Long ago, the ocean was not a divider, but a highway of ships, ideas, and stories. In the port of Ponnani, a young boy named Zain al-Din sat with books under coconut trees...",
      "Page 2: Zain al-Din watched the giant dhows sailing in from Yemen and Sumatra. He realized that knowledge, like the wind, belongs to everyone. He wrote a book called Tuhfat to tell the world how to defend their free sea...",
      "Page 3: Today, we remember Zain al-Din not just as a writer, but as a defender of freedom who showed us that our local history is connected to the entire world."
    ],
    audioNarrator: "Dr. Mahmood Kooria (English) & Anas Makhdum (Malayalam)",
    audioDuration: "4:35 mins",
    teacherNote: "Use this booklet to introduce children to the concept of pre-colonial globalization and intellectual resistance without Eurocentric timelines."
  },
  {
    id: "coc-02",
    title: "The Monsoon Merchants of Calicut",
    ageGroup: "Ages 6-10",
    language: "English",
    theme: "Maritime Trade",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=200",
    pdfPages: [
      "Page 1: Zoom! The monsoon wind blows east. The sea captain checks the stars. He is sailing from Hadramawt to Calicut, carrying books and dates to trade for ginger and black gold (pepper)...",
      "Page 2: In Calicut, the Zamorin king welcomes everyone. The merchants have a system called risk-sharing. If a ship sinks, everyone helps. No single person loses everything. This is how the ocean stayed peaceful...",
      "Page 3: When we share risk, we share trust. Let's learn how our ancestors traded without greed, building schools and public wells from their spice profits."
    ],
    audioNarrator: "Prof. Salim K. (English)",
    audioDuration: "3:50 mins",
    teacherNote: "Great for introducing elementary mathematics (fractions and sharing) through pre-modern commercial trade sharing formulas."
  },
  {
    id: "coc-03",
    title: "Arakkal Beevi: Queen of the Spice Seas",
    ageGroup: "Ages 7-11",
    language: "Trilingual",
    theme: "Women in History",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200",
    pdfPages: [
      "Page 1: In the coastal city of Kannur stood the palace of the Arakkal Kingdom. The rulers here were queens, known as Arakkal Beevis. Queen Harrabian Beevi sat at a polished wooden desk, reviewing sea routes...",
      "Page 2: When colonial gunboats demanded that Kannur stop trading with other free ports, Harrabian Beevi said no! She sent her ships loaded with spices directly to Zanzibar and Sumatra, keeping the sea commons open...",
      "Page 3: Learning about Arakkal Beevi teaches us that women have always guided our political sovereignty, trade, and oceanic history with courage and wisdom."
    ],
    audioNarrator: "Dr. Mahmood Kooria (English) & Farooq Nizar (Malayalam)",
    audioDuration: "5:10 mins",
    teacherNote: "Perfect for discussing gender, sovereignty, and regional maritime history in the classroom."
  }
];

export const FINANCE_MODELS: FinanceMetric[] = [
  {
    country: "Malaysia",
    penetration: "41.5% (High)",
    sukukShare: "38.2% (Global Leader)",
    regulatoryFramework: "Centralized Islamic Financial Services Act (IFSA 2013), Bank Negara Malaysia Shariah Advisory Council.",
    institutionsCount: "16 dedicated Islamic Banks, over 50 window operators.",
    cooperativeFinance: "Highly integrated with state credit unions and Islamic cooperative banks.",
    waqfAssets: "State-managed corporate Waqf trusts (e.g., Johor Waqf) funding hospitals and commercial estates.",
    zakatModel: "Institutionalized state collection boards with digital payment apps and payroll deductions.",
    remittanceFlow: "Major hub receiving labor remittances from South/Southeast Asia and exporting Islamic capital."
  },
  {
    country: "Russia",
    penetration: "0.2% (Nascent)",
    sukukShare: "<0.1% (Minimal)",
    regulatoryFramework: "Pilot law passed in Sept 2023 for partner financing in 4 Muslim-majority republics (Dagestan, Chechnya, Tatarstan, Bashkortostan).",
    institutionsCount: "4 registered partner financing organizations, 2 bank windows.",
    cooperativeFinance: "Operating through Consumer Cooperatives (CPC) utilizing share-based investment pools.",
    waqfAssets: "Legally unrecognized as public trust; operates as private non-profit holdings.",
    zakatModel: "Voluntary regional charity funds (e.g., Zakat Fund Tatarstan) linked to mosques.",
    remittanceFlow: "Outward remittance corridor to Central Asian republics; emerging pilot for trade clearing."
  },
  {
    country: "Gulf (GCC)",
    penetration: "82.0% (Dominant)",
    sukukShare: "34.5% (established)",
    regulatoryFramework: "Dual banking system. Fully integrated Shariah governance within national central banks (e.g., Saudi Central Bank, UAE Central Bank).",
    institutionsCount: "Over 40 full-fledged Islamic banks and corporate finance houses.",
    cooperativeFinance: "Limited role; economy dominated by large state-backed corporate Islamic banks.",
    waqfAssets: "Managed by dedicated Ministries of Waqf, major commercial landholders in Dubai, Riyadh, Doha.",
    zakatModel: "State-enforced corporate zakat in Saudi Arabia; voluntary but highly institutionalized elsewhere.",
    remittanceFlow: "Primary source of labor remittances supporting the Indian Ocean rim and Malabar Coast."
  },
  {
    country: "Kerala / India",
    penetration: "<0.5% (Legally Constrained)",
    sukukShare: "0% (Prohibited under current law)",
    regulatoryFramework: "Banking Regulation Act 1949 prohibits commercial banks from interest-free trading. Capital market options limited to mutual funds and NBFCs.",
    institutionsCount: "No commercial Islamic banks. 1 State-backed NBFC (Cheraman Financial Services), regional cooperatives.",
    cooperativeFinance: "Pioneering model: interest-free cooperative credit societies functioning under local state cooperative laws.",
    waqfAssets: "Over 40,000 registered properties under Kerala State Waqf Board. High potential, but plagued by legal disputes and documentation gaps.",
    zakatModel: "De-centralized community committees (e.g., local Baitulmal) distributing funds for healthcare and education.",
    remittanceFlow: "Receives over $12 Billion annually in diaspora remittances, largely from the Gulf, funding local infrastructure."
  },
  {
    country: "Zanzibar / East Africa",
    penetration: "12.4% (Growing)",
    sukukShare: "2.1% (Emerging)",
    regulatoryFramework: "Bank of Tanzania Shariah advisory regulations, customized Islamic window rules (2020).",
    institutionsCount: "2 dedicated Islamic banks, 6 window operators.",
    cooperativeFinance: "Growing networks of community Savings and Credit Cooperative Societies (SACCOS).",
    waqfAssets: "Administered by the Zanzibar Waqf and Trust Commission, historically significant but undergoing digitization.",
    zakatModel: "Decentralized voluntary mosque boards and independent national Waqf channels.",
    remittanceFlow: "Receives diaspora funds from the Gulf and Europe, which support school building programs."
  },
  {
    country: "Java / Indonesia",
    penetration: "15.8% (Stable)",
    sukukShare: "18.5% (Large Sovereign Sukuk issuer)",
    regulatoryFramework: "Centralized Islamic Banking Act (2008), Shariah advisory oversight by national Majelis Ulama Indonesia.",
    institutionsCount: "13 Shariah banks, over 100 rural Shariah banks.",
    cooperativeFinance: "Highly successful Baitul Maal wat Tamwil (BMT) micro-credit cooperatives serving millions of traders.",
    waqfAssets: "Corporate cash Waqf models managed by Badan Wakaf Indonesia (BWI).",
    zakatModel: "National Zakat Agency (BAZNAS) collecting via digital payment and distributed for poverty alleviation.",
    remittanceFlow: "High remittance flows from laborers in East Asia and Middle East supporting rural farming."
  }
];

export const WAQF_PROPERTIES: WaqfProperty[] = [
  {
    id: "wq-01",
    name: "Ponnani Juma Masjid Waqf Lands",
    location: "Ponnani Coast, Malappuram",
    type: "Agricultural land & Commercial shops",
    status: "Productive",
    potential: "High yield spice agriculture and local market leases.",
    benefit: "Directly funds the scholarship stipend of 45 students in local legal seminaries."
  },
  {
    id: "wq-02",
    name: "Kozhikode Beach Qadi Trust",
    location: "Beach Road, Calicut",
    type: "Public Well & Lodging building",
    status: "Underutilized",
    potential: "Conversion of old lodge into a decolonial study center and community clinic.",
    benefit: "Could provide free medical checkups for maritime laborers and fishermen families."
  },
  {
    id: "wq-03",
    name: "Kannur Arakkal Dynastic Endowment",
    location: "Arakkal Palace Ground, Kannur",
    type: "Palace properties & Coastal coconut groves",
    status: "Encroached / Legal dispute",
    potential: "Restoration of dynastic library and maritime museum.",
    benefit: "Educational tourism revenue owned and distributed by local community trust."
  },
  {
    id: "wq-04",
    name: "Tirurangadi Orphanage Agricultural Commons",
    location: "Kacheri Road, Tirurangadi",
    type: "Coconut Groves & Paddy Field",
    status: "Productive",
    potential: "Organic vegetable farming and poultry cooperative.",
    benefit: "Supplies fresh milk and food to 120 boarding school children, reducing administration costs."
  },
  {
    id: "wq-05",
    name: "Chaliyam Sufi Tekke Rest House",
    location: "Chaliyam Estuary, Kozhikode",
    type: "Historical travelers lodge",
    status: "Underutilized",
    potential: "Renovation as an ecological tourism lodge and local manuscript museum.",
    benefit: "Provides vocational training in wood carving and hospitality for local youths."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Shaykh Dr. Zubair al-Azhari",
    role: "Project Lead & Manuscript Conservator",
    bio: "Ph.D. in Islamic Legal Philosophy from Al-Azhar University. Specializes in Shafi'i jurisprudential networks of the Indian Ocean.",
    category: "Core",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Prof. Asif Ali",
    role: "Director, MABAR Finance Lab",
    bio: "Former financial advisor and economist. Researches cooperative banking models and Waqf digitization structures under Indian federalism.",
    category: "Core",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Shaykh Hamza Yusuf",
    role: "President, Zaytuna College",
    bio: "Classical Islamic sciences authority researching South-South theological paradigms, traditional schooling models, and decolonial critiques.",
    category: "Advisory",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Mahmood Kooria",
    role: "Senior Indian Ocean Historian",
    bio: "Historian researching Shafi'i legal text circulation, pre-colonial maritime trade law, and traditional educational paths across Maritime Asia.",
    category: "Research",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Sayyid Faisal Al-Hadrami",
    role: "Senior Archival Consultant",
    bio: "Archivist specializing in Indian Ocean manuscript routes. Leading tracking and transcription operations in private family vaults.",
    category: "Advisory",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Shaykh Dr. Bahauddeen Nadwi",
    role: "Vice Chancellor & Islamic Law Expert",
    bio: "Vice Chancellor of Darul Huda Islamic University. Specializes in Shafi'i legal theory, classical commentaries, and traditional educational systems.",
    category: "Research",
    imageUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200"
  }
];

export const MABAR_EVENTS: MabarEvent[] = [
  {
    id: "evt-01",
    title: "Defensive War and Maritime Treaties in 16th Century Malabar",
    type: "Lecture",
    date: "July 12, 2026",
    time: "2:00 PM - 4:00 PM IST",
    location: "Hasanath College Seminar Hall & Zoom",
    speakers: ["Shaykh Dr. Zubair al-Azhari", "Prof. Cemil Aydın"],
    description: "An in-depth lecture analyzing the legal consultations between Zain al-Din Makhdum II and scholars in Mecca regarding the Portuguese naval blockades.",
    registrationOpen: true
  },
  {
    id: "evt-02",
    title: "Interest-Free Cooperatives: Practical Pathways under Indian Law",
    type: "Finance Lab Seminar",
    date: "July 28, 2026",
    time: "10:30 AM - 1:00 PM IST",
    location: "MABAR Hub, Tirurangadi",
    speakers: ["Prof. Asif Ali", "Adv. Rasha Sulaiman"],
    description: "A workshop for community organizers on how to establish interest-free credit cooperative societies in Kerala without violating RBI banking acts.",
    registrationOpen: true
  },
  {
    id: "evt-03",
    title: "Storytelling Session: The Sea and the Pen",
    type: "Cocoon Storytelling",
    date: "August 05, 2026",
    time: "4:00 PM - 5:00 PM IST",
    location: "Ponnani Public Library Garden",
    speakers: ["Safiya Rahman", "Anas Makhdum"],
    description: "An illustrated storytelling and reading circle for children ages 8-12 based on the pre-colonial ocean travels of Zain al-Din Makhdum.",
    registrationOpen: true
  },
  {
    id: "evt-04",
    title: "Hadrami Scribes Workshop: Digitization and Transcription",
    type: "Research Workshop",
    date: "August 18, 2026",
    time: "9:00 AM - 12:30 PM IST",
    location: "Manuscript Preservation Lab, Hasanath Hub",
    speakers: ["Sayyid Faisal Al-Hadrami", "Suhail Hussain"],
    description: "A training session on cataloging standards, OCR tools for Arabic-Malayalam scripts, and managing private family archives.",
    registrationOpen: true
  },
  {
    id: "evt-05",
    title: "Waqf Land Mapping: GIS Tools for Community Asset Recovery",
    type: "Finance Lab Seminar",
    date: "September 10, 2026",
    time: "11:00 AM - 2:00 PM IST",
    location: "MABAR Hub, Tirurangadi & Online",
    speakers: ["Prof. Asif Ali", "Nihal Sharaf"],
    description: "Hands-on workshop using GIS mapping tools to identify, document, and propose productive uses for underutilized Waqf properties in Malappuram and Kozhikode districts.",
    registrationOpen: true
  },
  {
    id: "evt-06",
    title: "Reading Circle: Tuhfat al-Mujahidin — A Decolonial Reading",
    type: "Reading Circle",
    date: "September 24, 2026",
    time: "6:00 PM - 8:00 PM IST",
    location: "Online (Zoom)",
    speakers: ["Shaykh Dr. Zubair al-Azhari", "Dr. Mahmood Kooria"],
    description: "A guided reading and discussion of Zain al-Din Makhdum II's 16th-century anti-colonial history, comparing its analytical framework to Fanon, Mignolo, and Spivak.",
    registrationOpen: true
  },
  {
    id: "evt-07",
    title: "Cocoon Storytelling Marathon: Ocean Heroes",
    type: "Cocoon Storytelling",
    date: "October 05, 2026",
    time: "3:00 PM - 6:00 PM IST",
    location: "Calicut Children's Library & Garden",
    speakers: ["Safiya Rahman", "Farooq Nizar", "Anas Makhdum"],
    description: "A full-afternoon multilingual storytelling marathon for children, featuring illustrated tales of Arakkal Beevi, Kunjali Marakkar, and the monsoon merchant guilds.",
    registrationOpen: false
  }
];

export interface MabarSpeaker {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  imageUrl: string;
  topics: string[];
}

export const MABAR_SPEAKERS: MabarSpeaker[] = [
  {
    id: "spk-01",
    name: "Shaykh Dr. Zubair al-Azhari",
    role: "Master Jurist & Manuscript Conservator",
    affiliation: "Al-Azhar University / Malabar",
    bio: "Ph.D. in Islamic Legal Philosophy. Specializes in Shafi'i jurisprudential networks of the Indian Ocean and manuscript restoration.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    topics: ["Oceanic Jurisprudence", "Manuscript Preservation", "Shafi'i Fiqh"]
  },
  {
    id: "spk-02",
    name: "Prof. Cemil Aydın",
    role: "Global Historian & Author",
    affiliation: "University of North Carolina / WDF",
    bio: "Renowned historian of the Ottoman Empire, pan-Islamic networks, and South-South decolonial solidarity.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    topics: ["Decolonial Geopolitics", "Pan-Islamic History", "South-South Alliances"]
  },
  {
    id: "spk-03",
    name: "Prof. Asif Ali",
    role: "Director, MABAR Finance Lab",
    affiliation: "Former Cooperative Bank Advisor",
    bio: "Expert in alternative economic systems, interest-free credit cooperatives, and Waqf GIS mapping structures under Indian federalism.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    topics: ["Cooperative Economics", "Waqf Mapping", "Islamic Finance"]
  },
  {
    id: "spk-04",
    name: "Shaykh Dr. Bahauddeen Nadwi",
    role: "Vice Chancellor & Classical Jurist",
    affiliation: "Darul Huda Islamic University / Malabar",
    bio: "Eminent scholar lecturing on Shafi'i jurisprudential developments, educational frameworks, and Indian Ocean traditional networks.",
    imageUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200",
    topics: ["Traditional Sciences", "Shafi'i Fiqh", "Decolonial Education"]
  },
  {
    id: "spk-05",
    name: "Shaykh Hamza Yusuf",
    role: "President & Traditional Scholar",
    affiliation: "Zaytuna College / California",
    bio: "Leading Islamic philosopher specializing in traditional jurisprudence, ethical paradigms, and South-West decolonial dialogues.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    topics: ["Islamic Philosophy", "Traditional Sciences", "Decolonial Paradigms"]
  },
  {
    id: "spk-06",
    name: "Dr. Mahmood Kooria",
    role: "Indian Ocean Maritime Historian",
    affiliation: "Leiden University / Kerala",
    bio: "Pioneering researcher on the circulation of Islamic legal texts, maritime trade covenants, and historical South-South linkages.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    topics: ["Maritime Shari'ah", "Oceanic Trade", "Decolonial History"]
  },
  {
    id: "spk-07",
    name: "Sayyid Faisal Al-Hadrami",
    role: "Oceanic Scribe & Archivist",
    affiliation: "Hadramawt Manuscript Cell",
    bio: "Leads digitization and transcription of family archives. Expert in Arabic-Malayalam lithographs and Hadrami ledgers.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    topics: ["Linguistic Sovereignty", "Family Archives", "Commercial Ledgers"]
  },
  {
    id: "spk-08",
    name: "Prof. Engseng Ho",
    role: "Senior Anthropologist & Genealogist",
    affiliation: "Duke University / Singapore",
    bio: "Celebrated scholar of Hadrami migration, oceanic history, and inter-Asian commercial and legal relationships.",
    imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=200",
    topics: ["Hadrami Diaspora", "Oceanic Migration", "Mercantile Law"]
  }
];

export interface AtlasNode {
  id: string;
  name: string;
  type: string;
  geography: string;
  period: string;
  themes: string[];
  x: number;
  y: number;
  importance: string;
  associatedFigures: string[];
  bio?: string;
  kitabs?: { title: string; link: string; description: string }[];
  papers?: { title: string; author: string; link: string }[];
}

export interface AtlasRoute {
  id: string;
  name: string;
  type: "manuscript" | "scholar" | "sufi" | "trade" | "remittance";
  startNode: string;
  endNode: string;
  path: string;
  period: string;
  theme: string;
  description: string;
}

export const ATLAS_NODES: AtlasNode[] = [
  {
    id: "ponnani",
    name: "Ponnani",
    type: "scholarly_centre",
    geography: "Malabar",
    period: "1500-1700",
    themes: ["fiqh", "education", "anti-colonial resistance"],
    x: 680,
    y: 345,
    importance:
      "Known as the 'Little Mecca of Malabar,' Ponnani served as a major regional node in Islamic legal scholarship and maritime anti-colonial activism against Portuguese forces.",
    associatedFigures: ["Zain al-Din Makhdum I", "Zain al-Din Makhdum II"],
    bio: "Shaykh Zain al-Din Makhdum II (1531-1583) was a master jurist and historian of Malabar. He studied in Mecca under master scholar Ibn Hajar al-Haytami. His landmark anti-colonial history 'Tuhfat al-Mujahidin' was dedicated to mobilizing the region's population and global networks to resist European colonialism.",
    kitabs: [
      {
        title: "Tuhfat al-Mujahidin",
        link: "tuhfat",
        description:
          "The landmark anti-colonial historical text detailing Portuguese aggression in Malabar.",
      },
      {
        title: "Fathul Mu'een",
        link: "fathul-mueen",
        description:
          "The widely read legal manual of Shafi'i jurisprudence taught throughout the Indian Ocean.",
      },
      {
        title: "Qawa'id al-Tawhid",
        link: "qawaid-al-tawhid",
        description:
          "A foundational theological treatise on Ash'ari creed by Zain al-Din Makhdum I.",
      },
    ],
    papers: [
      {
        title:
          "Islamic Finance and Kerala’s Cooperative Economy: Riba-Free Pathways",
        author: "Dr. Faisal K.P.",
        link: "wp-01",
      },
      {
        title:
          "Indian Ocean IR without the West: Monsoon Alliances and Maritime Jurisprudence",
        author: "Prof. Najiya Rahman",
        link: "wp-02",
      },
    ],
  },
  {
    id: "calicut",
    name: "Calicut",
    type: "port",
    geography: "Malabar",
    period: "1300-1500",
    themes: ["trade", "finance"],
    x: 680,
    y: 330,
    importance:
      "A premier international seaport, Calicut connected Chinese treasure fleets, West Asian trade vessels, and local merchant networks under the Zamorin rulers.",
    associatedFigures: ["Zamorin Rulers", "Kunjali Marakkar I"],
    bio: "The Zamorins of Calicut established a peaceful trade sanctuary, welcoming scholars and merchants. The Kunjali Marakkars served as their naval admirals, defending the free-trade ports against early European monopolies.",
    kitabs: [
      {
        title: "Muhiyyuddin Mala",
        link: "muhiyyuddin-mala",
        description:
          "The earliest surviving Arabic-Malayalam devotional poem, celebrating Sufi spiritual paths.",
      },
    ],
  },
  {
    id: "kannur",
    name: "Kannur",
    type: "port",
    geography: "Malabar",
    period: "1500-1700",
    themes: ["trade", "anti-colonial resistance"],
    x: 675,
    y: 310,
    importance:
      "Capital of the Arakkal Kingdom, Malabar's only Muslim dynasty, Kannur was crucial in defending spice shipping lanes.",
    associatedFigures: ["Arakkal Beevi", "Kunjali Marakkar II"],
  },
  {
    id: "darul_huda",
    name: "Darul Huda",
    type: "institution",
    geography: "Malabar",
    period: "1900-present",
    themes: ["education", "fiqh"],
    x: 680,
    y: 322,
    importance:
      "Darul Huda Islamic University (Chemmad) is a modern academic node pioneering a blended model of religious and contemporary secular curriculum.",
    associatedFigures: ["Bahauddeen Muhammad Nadwi"],
  },
  {
    id: "hasanath",
    name: "Hasanath",
    type: "institution",
    geography: "Malabar",
    period: "1900-present",
    themes: ["education"],
    x: 680,
    y: 327,
    importance:
      "Hasanath College in Tirurangadi is a major archival and research hub dedicated to documenting legal manuscripts and historical archives of the Malabar Coast.",
    associatedFigures: ["Hasanath Research Forum"],
    kitabs: [
      {
        title: "Adab al-Muridin",
        link: "adab-al-muridin",
        description:
          "A practical Sufi ethics manual detailing spiritual conduct and community service.",
      },
    ],
  },
  {
    id: "hadramawt",
    name: "Hadramawt",
    type: "scholarly_centre",
    geography: "Hadramawt",
    period: "1300-1500",
    themes: ["tasawwuf", "education"],
    x: 400,
    y: 280,
    importance:
      "The birthplace of Ba'Alawi Sufi lines, Hadramawt sent legal scholars and spiritual guides across the Indian Ocean, deeply shaping Malabari culture.",
    associatedFigures: ["Sayyid Alawi Thangal", "Imam Haddad"],
    bio: "Sayyid Alawi Thangal of Mampuram migrated from Hadramawt to Malabar in the 18th century, becoming a legendary spiritual leader and organizing local agrarian anti-colonial resistance.",
    kitabs: [
      {
        title: "Sayf al-Battar",
        link: "sayf-al-battar",
        description:
          "A crucial anti-colonial fatwa authorizing tenant farmers to defend themselves against British oppression.",
      },
    ],
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    type: "port",
    geography: "East Africa",
    period: "1700-1900",
    themes: ["trade", "tasawwuf"],
    x: 200,
    y: 480,
    importance:
      "A key East African commercial port connecting Hadramawt, East African Swahili trade, and maritime links to Indian markets.",
    associatedFigures: ["Shaykh Al-Amin bin Ali al-Mazru'i"],
  },
  {
    id: "aceh",
    name: "Aceh",
    type: "port",
    geography: "Southeast Asia",
    period: "1500-1700",
    themes: ["trade", "tasawwuf", "anti-colonial resistance"],
    x: 880,
    y: 430,
    importance:
      "Known as the 'Verandah of Mecca,' Aceh was a powerful sultanate resisting Portuguese conquests, maintaining strong military and scholarly ties with Malabar.",
    associatedFigures: ["Shaykh Nuruddin al-Raniri", "Hamzah Fansuri"],
    bio: "Shaykh Nuruddin al-Raniri was a dynamic Islamic scholar and Sufi guide from Gujarat who served in Aceh's court, linking South Asia, Arabia, and Southeast Asia.",
  },
  {
    id: "cairo",
    name: "Cairo",
    type: "scholarly_centre",
    geography: "Cairo",
    period: "1300-1500",
    themes: ["fiqh", "education"],
    x: 120,
    y: 180,
    importance:
      "Al-Azhar University and Egypt's legal circles represented the intellectual peaks of Shafi'i legal thought, exporting legal texts to Hadramawt and Malabar.",
    associatedFigures: ["Ibn Hajar al-Haytami"],
    bio: "Ibn Hajar al-Haytami (1509–1566) was a towering Egyptian Shafi'i jurist who wrote extensively, answering legal questions sent by scholars in Malabar.",
  },
  {
    id: "dubai",
    name: "Dubai",
    type: "port",
    geography: "Gulf",
    period: "1900-present",
    themes: ["finance", "trade"],
    x: 460,
    y: 190,
    importance:
      "A primary node in Gulf migration, representing the modern economic remittance flows that sustain Malabar's contemporary institutional and social connectivity.",
    associatedFigures: ["Malabari Diaspora Networks"],
  },
];

export const ATLAS_ROUTES: AtlasRoute[] = [
  {
    id: "route1",
    name: "Cairo to Hadramawt Manuscript Route",
    type: "manuscript",
    startNode: "cairo",
    endNode: "hadramawt",
    path: "M 120,180 Q 260,200 400,280",
    period: "1300-1500",
    theme: "fiqh",
    description:
      "Flow of classic legal commentaries from Al-Azhar University to the hubs of Hadramawt.",
  },
  {
    id: "route2",
    name: "Hadramawt to Ponnani Manuscript Route",
    type: "manuscript",
    startNode: "hadramawt",
    endNode: "ponnani",
    path: "M 400,280 Q 540,300 680,345",
    period: "1500-1700",
    theme: "fiqh",
    description:
      "Commentaries and jurisprudence manuals like the Fathul Mu'een traveling to the Little Mecca of Malabar.",
  },
  {
    id: "route3",
    name: "Ponnani to Aceh Manuscript Route",
    type: "manuscript",
    startNode: "ponnani",
    endNode: "aceh",
    path: "M 680,345 Q 780,400 880,430",
    period: "1500-1700",
    theme: "tasawwuf",
    description:
      "Circulation of mystical poetry, translations, and anti-colonial treatises across Southeast Asia.",
  },
  {
    id: "route4",
    name: "Hadramawt to Calicut Scholar Migration",
    type: "scholar",
    startNode: "hadramawt",
    endNode: "calicut",
    path: "M 400,280 Q 540,290 680,330",
    period: "1300-1500",
    theme: "education",
    description:
      "Scholars and Sayyids arriving in Calicut's ports, establishing legal posts and community leadership.",
  },
  {
    id: "route5",
    name: "Zanzibar to Hadramawt Sufi Network",
    type: "sufi",
    startNode: "zanzibar",
    endNode: "hadramawt",
    path: "M 200,480 Q 300,380 400,280",
    period: "1700-1900",
    theme: "tasawwuf",
    description:
      "Spiritual brotherhood connections linking East African ports with Hadramawt scholarly centers.",
  },
  {
    id: "route6",
    name: "Hadramawt to Kannur Sufi Network",
    type: "sufi",
    startNode: "hadramawt",
    endNode: "kannur",
    path: "M 400,280 Q 540,270 675,310",
    period: "1700-1900",
    theme: "tasawwuf",
    description:
      "The migration of spiritual leaders establishing shrines and Sufi orders in northern Malabar.",
  },
  {
    id: "route7",
    name: "Calicut to Zanzibar Trade Route",
    type: "trade",
    startNode: "calicut",
    endNode: "zanzibar",
    path: "M 680,330 Q 440,430 200,480",
    period: "1300-1500",
    theme: "trade",
    description:
      "Maritime monsoon trade routes carrying spices, timber, and goods between Southwestern India and Swahili ports.",
  },
  {
    id: "route8",
    name: "Cairo to Calicut Port Connections",
    type: "trade",
    startNode: "cairo",
    endNode: "calicut",
    path: "M 120,180 Q 400,220 680,330",
    period: "1300-1500",
    theme: "trade",
    description:
      "Monsoon trade linking the Mediterranean/Red Sea with the global spice emporium of Calicut.",
  },
  {
    id: "route9",
    name: "Dubai to Darul Huda Remittances",
    type: "remittance",
    startNode: "dubai",
    endNode: "darul_huda",
    path: "M 460,190 Q 570,230 680,322",
    period: "1900-present",
    theme: "finance",
    description:
      "Modern diaspora funding flows supporting contemporary universities and educational hubs in Malabar.",
  },
  {
    id: "route10",
    name: "Dubai to Hasanath Remittances",
    type: "remittance",
    startNode: "dubai",
    endNode: "hasanath",
    path: "M 460,190 Q 570,240 680,327",
    period: "1900-present",
    theme: "finance",
    description:
      "Economic connections funding archives, digital research projects, and legal scholarship centers.",
  },
  {
    id: "route11",
    name: "Dubai to Kannur Remittances",
    type: "remittance",
    startNode: "dubai",
    endNode: "kannur",
    path: "M 460,190 Q 570,220 675,310",
    period: "1900-present",
    theme: "finance",
    description:
      "Diaspora networks financing infrastructure and cultural institutions in northern Malabar.",
  },
];

export const getRouteColor = (type: string) => {
  switch (type) {
    case "manuscript":
      return "#0065ff"; // Heritage Blue
    case "scholar":
      return "#c5a880"; // Heritage Gold
    case "sufi":
      return "#e28a3e"; // Warm Orange
    case "trade":
      return "#b45309"; // Amber/Bronze
    case "remittance":
      return "#0b7a75"; // Muted Teal
    default:
      return "#0065ff";
  }
};

export const HOME_FAQS = [
  {
    question: "What makes Malabar a distinct node in decolonial theory?",
    answer: "Unlike Eurocentric perspectives that view decolonization as starting after 1945, Malabar's intellectual history demonstrates centuries of continuous epistemological resistance. Through the Kitab tradition and maritime networks, scholars here constructed anti-colonial legal frameworks (such as Zain al-Din Makhdum's Tuhfat) long before modern Western-dominated critiques were formulated."
  },
  {
    question: "How does the Indian Ocean geography challenge modern IR theory?",
    answer: "Mainstream International Relations (IR) centers territorial nation-states and Westphalian sovereignty. The Indian Ocean model shows that for centuries, global relations were networked, fluid, and maritime. Trade ports like Calicut functioned under non-hegemonic treaties and commercial customs without relying on militarized borders or colonial monopolization."
  },
  {
    question: "What is the relationship between Islamic finance and cooperative banking in Kerala?",
    answer: "India's federal banking laws restrict commercial interest-free banking. However, Kerala has a strong history of cooperative societies governed by state laws. By using risk-sharing partnerships (Musharakah) and cost-plus contracts (Murabaha) under cooperative legal structures, MABAR Finance Lab maps alternative pathways to mobilize community capital without usury (riba)."
  },
  {
    question: "How can community members contribute manuscripts to the Living Archive?",
    answer: "Families and mosque libraries holding historical texts can submit metadata and digitization scans via our Contributor Portal. Submissions go to a scholarly review queue where curators verify text origins and secure appropriate permissions before publishing them as open-access resources."
  },
  {
    question: "What is the role of the Cocoon pedagogical wing?",
    answer: "Cocoon translates complex pre-colonial histories and financial mutual-aid concepts into multilingual, illustrated stories for children. This ensures that the next generation grows up with a pluralistic, ocean-centric understanding of math, trade, and history rather than eurocentric textbooks."
  },
  {
    question: "How does MABAR approach the Waqf land crisis in Kerala?",
    answer: "Over 40,000 Waqf properties are registered in Kerala, yet many are encroached, under-documented, or misused. MABAR Finance Lab uses GIS mapping, legal archaeology, and community organizing to revitalize these assets. We propose hybrid models — from solar cooperatives on Waqf agricultural land to community health clinics on underused urban plots — governed transparently by local trustees."
  },
  {
    question: "What is the significance of the Arabic-Malayalam script tradition?",
    answer: "Arabic-Malayalam — writing the Malayalam language in adapted Arabic script — was a revolutionary act of linguistic sovereignty. By bypassing colonial print cartels and Sanskrit hegemony, Mappila scholars created a mass literacy system for peasants and fishermen. MABAR's Living Archive prioritizes digitization of these rare lithographic texts, many still held in private family collections."
  },
  {
    question: "How are Sufi networks relevant to contemporary decolonial politics?",
    answer: "The Ba'Alawi Sufi orders were simultaneously spiritual brotherhoods and trans-oceanic diplomatic networks. They connected Malabar to Hadramawt, Egypt, East Africa, and Southeast Asia through chains of personal trust (silsila). This model of non-territorial, relationship-based global solidarity is directly relevant to contemporary South-South political and economic cooperation beyond Western-dominated institutions."
  }
];

export const ADVISORY_BOARD = [
  { name: "Prof. Cemil Aydın", hub: "Global South Alliances", role: "Global Decolonial Historian", institution: "University of North Carolina / WDF" },
  { name: "Sayyid Faisal Al-Hadrami", hub: "Hadramawt / Yemen", role: "Manuscript Curator", institution: "Tarim Archives" },
  { name: "Prof. Engseng Ho", hub: "East Africa / Singapore", role: "Hadrami Migration Specialist", institution: "Duke University" },
  { name: "Teuku Iskandar", hub: "Southeast Asia / Aceh", role: "Sultanate Treaty Analyst", institution: "Aceh Heritage Alliance" },
  { name: "Shaykh Ahmad bin Ibrahim", hub: "Cairo / Egypt", role: "Shafi'i Fiqh Consultant", institution: "Al-Azhar University" },
  { name: "Prof. Nuruddin Zanele", hub: "East Africa / Tanzania", role: "Swahili Coast Historian", institution: "University of Dar es Salaam" },
  { name: "Dr. Amina Siddiqui", hub: "Southeast Asia / Malaysia", role: "Islamic Finance Advisor", institution: "International Islamic University Malaysia" }
];

export interface Citation {
  id: string;
  author: string;
  title: string;
  type: string;
  year: string;
  publisher: string;
  location: string;
  citation: string;
}

export const RESEARCH_CITATIONS: Citation[] = [
  { id: "cit-1", author: "Zain al-Din Makhdum II", title: "Fathul Mu'een", type: "Jurisprudence (Fiqh)", year: "1575", publisher: "Ponnani Scribal Circle", location: "Malabar / Mecca", citation: "Makhdum II, Z. (1575). Fathul Mu'een: A Shafi'i Jurisprudence Manual." },
  { id: "cit-2", author: "Zain al-Din Makhdum II", title: "Tuhfat al-Mujahidin", type: "Anti-colonial History", year: "1583", publisher: "Tarim Lithograph Press", location: "Hadramawt / Calicut", citation: "Makhdum II, Z. (1583). Tuhfat al-Mujahidin fi Akhbar al-Burtughaliyyin." },
  { id: "cit-3", author: "Sayyid Alawi Thangal", title: "Sayf al-Battar Fatwa", type: "Legal Decree", year: "1840", publisher: "Mampuram Scribes", location: "Mampuram, Malabar", citation: "Thangal, S. A. (1840). Sayf al-Battar: Decree on Landholder Resistance." },
  { id: "cit-4", author: "Zain al-Din Makhdum I", title: "Adab al-Muridin", type: "Sufi Ethics", year: "1510", publisher: "Cairo Azhar Press", location: "Cairo, Egypt", citation: "Makhdum I, Z. (1510). Adab al-Muridin: Ethical Conduct of Seekers." },
  { id: "cit-5", author: "Kunjali Marakkar II", title: "Naval Logbooks of Calicut", type: "Monsoon Treaties", year: "1570", publisher: "Zamorin Royal Court", location: "Calicut", citation: "Marakkar II, K. (1570). Naval Logbooks of Zamorin Fleet." },
  { id: "cit-6", author: "Qadi Muhammad", title: "Fathul Mubin", type: "Devotional Poetry", year: "1607", publisher: "Calicut Press", location: "Calicut, Malabar", citation: "Muhammad, Q. (1607). Fathul Mubin: The Manifest Victory Song." },
  { id: "cit-7", author: "Imam Al-Haddad", title: "Al-Nasa'ih al-Diniyyah", type: "Theology & Creed", year: "1710", publisher: "Tarim Archives", location: "Hadramawt, Yemen", citation: "Al-Haddad, A. (1710). Al-Nasa'ih al-Diniyyah: Religious Advice & Counsel." },
  { id: "cit-8", author: "Arakkal Kingdom Beevi", title: "Swahili Coast Maritime Log", type: "Trade Registry", year: "1762", publisher: "Kannur Arakkal Palace", location: "Kannur / Zanzibar", citation: "Beevi, A. (1762). Swahili Coast Customs & Shipping Registry." }
];


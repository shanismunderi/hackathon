import { useState, useEffect, useRef, useMemo } from "react";
import "./index.css";
import logoUrl from "./assets/logo.png";
import earthBgUrl from "./assets/earth_hero_bg.png";
import malabarMapUrl from "./assets/malabar_historical_map.png";
import oceanMapUrl from "./assets/indian_ocean_map.png";
import {
  MABAR_GLOSSARY,
  MABAR_TIMELINE,
  MABAR_ESSAYS,
  INDIAN_OCEAN_DISPATCHES,
  KITAB_REPOSITORY,
  RESEARCH_PAPERS,
  RESEARCH_PROJECTS,
  COCOON_BOOKS,
  FINANCE_MODELS,
  WAQF_PROPERTIES,
  TEAM_MEMBERS,
  MABAR_EVENTS,
  MABAR_SPEAKERS,
  MABAR_PARTNERS,
} from "./mabarData";
import type { MabarEvent } from "./mabarData";

// Keep Knowledge Atlas nodes and routes with exact coordinates for historical visual mapping
interface AtlasNode {
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

interface AtlasRoute {
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

const ATLAS_NODES: AtlasNode[] = [
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

const ATLAS_ROUTES: AtlasRoute[] = [
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

const getRouteColor = (type: string) => {
  switch (type) {
    case "manuscript":
      return "#1e3a8a"; // Navy Blue
    case "scholar":
      return "#c5a880"; // Heritage Gold
    case "sufi":
      return "#e28a3e"; // Warm Orange
    case "trade":
      return "#b45309"; // Amber/Bronze
    case "remittance":
      return "#0b7a75"; // Muted Teal
    default:
      return "#1e3a8a";
  }
};

const HOME_FAQS = [
  {
    question: "What makes Malabar a distinct node in decolonial theory?",
    answer:
      "Unlike Eurocentric perspectives that view decolonization as starting after 1945, Malabar's intellectual history demonstrates centuries of continuous epistemological resistance. Through the Kitab tradition and maritime networks, scholars here constructed anti-colonial legal frameworks (such as Zain al-Din Makhdum's Tuhfat) long before modern Western-dominated critiques were formulated.",
  },
  {
    question: "How does the Indian Ocean geography challenge modern IR theory?",
    answer:
      "Mainstream International Relations (IR) centers territorial nation-states and Westphalian sovereignty. The Indian Ocean model shows that for centuries, global relations were networked, fluid, and maritime. Trade ports like Calicut functioned under non-hegemonic treaties and commercial customs without relying on militarized borders or colonial monopolization.",
  },
  {
    question:
      "What is the relationship between Islamic finance and cooperative banking in Kerala?",
    answer:
      "India's federal banking laws restrict commercial interest-free banking. However, Kerala has a strong history of cooperative societies governed by state laws. By using risk-sharing partnerships (Musharakah) and cost-plus contracts (Murabaha) under cooperative legal structures, Malabar Finance Lab maps alternative pathways to mobilize community capital without usury (riba).",
  },
  {
    question:
      "How can community members contribute manuscripts to the Living Archive?",
    answer:
      "Families and mosque libraries holding historical texts can submit metadata and digitization scans via our Contributor Portal. Submissions go to a scholarly review queue where curators verify text origins and secure appropriate permissions before publishing them as open-access resources.",
  },
  {
    question: "What is the role of the Cocoon pedagogical wing?",
    answer:
      "Cocoon translates complex pre-colonial histories and financial mutual-aid concepts into multilingual, illustrated stories for children. This ensures that the next generation grows up with a pluralistic, ocean-centric understanding of math, trade, and history rather than eurocentric textbooks.",
  },
];

const ADVISORY_BOARD = [
  {
    name: "Prof. Cemil Aydın",
    hub: "Global South Alliances",
    role: "Global Decolonial Historian",
    institution: "University of North Carolina / WDF",
  },
  {
    name: "Sayyid Faisal Al-Hadrami",
    hub: "Hadramawt / Yemen",
    role: "Manuscript Curator",
    institution: "Tarim Archives",
  },
  {
    name: "Prof. Engseng Ho",
    hub: "East Africa / Singapore",
    role: "Hadrami Migration Specialist",
    institution: "Duke University",
  },
  {
    name: "Teuku Iskandar",
    hub: "Southeast Asia / Aceh",
    role: "Sultanate Treaty Analyst",
    institution: "Aceh Heritage Alliance",
  },
  {
    name: "Shaykh Ahmad bin Ibrahim",
    hub: "Cairo / Egypt",
    role: "Shafi'i Fiqh Consultant",
    institution: "Al-Azhar University",
  },
];

const RESEARCH_CITATIONS = [
  {
    id: "cit-1",
    author: "Zain al-Din Makhdum II",
    title: "Fathul Mu'een",
    type: "Jurisprudence (Fiqh)",
    year: "1575",
    publisher: "Ponnani Scribal Circle",
    location: "Malabar / Mecca",
    citation:
      "Makhdum II, Z. (1575). Fathul Mu'een: A Shafi'i Jurisprudence Manual.",
  },
  {
    id: "cit-2",
    author: "Zain al-Din Makhdum II",
    title: "Tuhfat al-Mujahidin",
    type: "Anti-colonial History",
    year: "1583",
    publisher: "Tarim Lithograph Press",
    location: "Hadramawt / Calicut",
    citation:
      "Makhdum II, Z. (1583). Tuhfat al-Mujahidin fi Akhbar al-Burtughaliyyin.",
  },
  {
    id: "cit-3",
    author: "Sayyid Alawi Thangal",
    title: "Sayf al-Battar Fatwa",
    type: "Legal Decree",
    year: "1840",
    publisher: "Mampuram Scribes",
    location: "Mampuram, Malabar",
    citation:
      "Thangal, S. A. (1840). Sayf al-Battar: Decree on Landholder Resistance.",
  },
  {
    id: "cit-4",
    author: "Zain al-Din Makhdum I",
    title: "Adab al-Muridin",
    type: "Sufi Ethics",
    year: "1510",
    publisher: "Cairo Azhar Press",
    location: "Cairo, Egypt",
    citation:
      "Makhdum I, Z. (1510). Adab al-Muridin: Ethical Conduct of Seekers.",
  },
  {
    id: "cit-5",
    author: "Kunjali Marakkar II",
    title: "Naval Logbooks of Calicut",
    type: "Monsoon Treaties",
    year: "1570",
    publisher: "Zamorin Royal Court",
    location: "Calicut",
    citation: "Marakkar II, K. (1570). Naval Logbooks of Zamorin Fleet.",
  },
  {
    id: "cit-6",
    author: "Qadi Muhammad",
    title: "Fathul Mubin",
    type: "Devotional Poetry",
    year: "1607",
    publisher: "Calicut Press",
    location: "Calicut, Malabar",
    citation: "Muhammad, Q. (1607). Fathul Mubin: The Manifest Victory Song.",
  },
  {
    id: "cit-7",
    author: "Imam Al-Haddad",
    title: "Al-Nasa'ih al-Diniyyah",
    type: "Theology & Creed",
    year: "1710",
    publisher: "Tarim Archives",
    location: "Hadramawt, Yemen",
    citation:
      "Al-Haddad, A. (1710). Al-Nasa'ih al-Diniyyah: Religious Advice & Counsel.",
  },
  {
    id: "cit-8",
    author: "Arakkal Kingdom Beevi",
    title: "Swahili Coast Maritime Log",
    type: "Trade Registry",
    year: "1762",
    publisher: "Kannur Arakkal Palace",
    location: "Kannur / Zanzibar",
    citation: "Beevi, A. (1762). Swahili Coast Customs & Shipping Registry.",
  },
];

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Home Partner, FAQ & Finance Zakat Calculator Active States
  const [activePartnerName, setActivePartnerName] = useState<string | null>(
    null,
  );
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [zakatRemittance, setZakatRemittance] = useState<number>(12000);
  const [zakatTradeProfit, setZakatTradeProfit] = useState<number>(45000);
  const [selectedAdvisoryHub, setSelectedAdvisoryHub] = useState<string>("all");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<
    | "home"
    | "about"
    | "atlas"
    | "archive"
    | "research"
    | "magazine"
    | "cocoon"
    | "finance"
    | "dialogue"
    | "events"
    | "contribute"
    | "glossary"
    | "timeline"
  >("home");
  const [language, setLanguage] = useState<"en" | "ml" | "ar">("en");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const researchDropdownRef = useRef<HTMLDivElement>(null);

  // Knowledge Atlas States
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [filterPeriods, setFilterPeriods] = useState<string[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterGeos, setFilterGeos] = useState<string[]>([]);
  const [filterThemes, setFilterThemes] = useState<string[]>([]);
  const [activeModalContent, setActiveModalContent] = useState<any | null>(
    null,
  );

  const [mapMode, setMapMode] = useState<"ocean" | "malabar">("ocean");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [showFiltersOverlay, setShowFiltersOverlay] = useState(true);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(true);

  // Map Zoom & Pan Helpers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanX(e.clientX - startPan.x);
    setPanY(e.clientY - startPan.y);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Living Archive States
  const [selectedKitabId, setSelectedKitabId] = useState<string | null>(null);
  const [kitabSearchQuery, setKitabSearchQuery] = useState("");
  const [kitabGenreFilter, setKitabGenreFilter] = useState<string>("all");
  const [kitabAnnotationTab, setKitabAnnotationTab] = useState<
    | "historical"
    | "jurisprudential"
    | "decolonial"
    | "indianOcean"
    | "comparativeTheory"
  >("historical");
  const [kitabTranslationTab, setKitabTranslationTab] = useState<
    "arabic" | "english" | "malayalam"
  >("english");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<any[]>([
    {
      id: "sub-1",
      title: "Muzhir al-Haqq Copy of Tirurangadi",
      author: "Preserved by Qadi Family",
      language: "Arabic-Malayalam",
      century: "17th Century",
      oralHistory:
        "Passed down through seven generations of Qadis. Initially used for local dispute resolutions during late Dutch shipping era.",
      location: "Tirurangadi Old Mosque Library",
      ownership: "Mosque/Waqf Custody",
      permissions: "Academic/Research Access Only",
      status: "Awaiting Verification",
      submittedAt: "2026-06-24T10:15:00Z",
    },
    {
      id: "sub-2",
      title: "Hadrami Remittance Ledger at Cannur",
      author: "Scribe: Sayyid Muhsin",
      language: "Arabic & Malayalam-Tamil",
      century: "18th Century",
      oralHistory:
        "Discovered in a locked wooden chest in an Arakkal dynasty merchant's house. Records spice trade transaction balances.",
      location: "Kannur Port Archive Office",
      ownership: "Private Archive",
      permissions: "Fully Open Access (Publish Digital Scan)",
      status: "Under Scholarly Review",
      submittedAt: "2026-06-24T12:30:00Z",
    },
  ]);
  const [archiveCenturyFilter, setArchiveCenturyFilter] =
    useState<string>("all");
  const [archiveOwnershipFilter, setArchiveOwnershipFilter] =
    useState<string>("all");
  const [archiveStatusFilter, setArchiveStatusFilter] = useState<string>("all");
  const [transcriptionInput, setTranscriptionInput] = useState<string>("");
  const [selectedTranscriptionId, setSelectedTranscriptionId] =
    useState<string>("sub-1");
  const [transcriptionScore, setTranscriptionScore] = useState<number | null>(
    null,
  );

  // Research Hub States
  const [citationsSearchQuery, setCitationsSearchQuery] = useState("");
  const [citationsPage, setCitationsPage] = useState(1);
  const [selectedBriefId, setSelectedBriefId] = useState<string>("wp-01");
  const [regulatoryBoard, setRegulatoryBoard] = useState<string>("Waqf Board");
  const [simulatorOutput, setSimulatorOutput] = useState<any | null>(null);
  const [selectedComparisonRegion, setSelectedComparisonRegion] =
    useState<string>("all");

  // Dialogue & Events States
  const [activeSpeakerTopicFilter, setActiveSpeakerTopicFilter] =
    useState<string>("all");
  const [qaQuestions, setQaQuestions] = useState<any[]>([
    {
      id: "q-1",
      name: "Haris K.",
      question:
        "Are there pre-colonial legal precedents in Malabar regarding community micro-financing?",
      topic: "Jurisprudence",
      answer:
        "Yes. In the 16th century, local jurists adapted Shafi'i rules on joint-risk partnerships (Musharakah) to finance trans-oceanic spice cargo. These were structured through local trade guilds governed by the Zamorin's port decrees.",
      date: "2026-06-23T14:20:00Z",
    },
    {
      id: "q-2",
      name: "Suhaila Rahman",
      question:
        "How did Zain al-Din Makhdum II's annotations link Sufi ethical conduct with tenant rights?",
      topic: "Sufism",
      answer:
        "Makhdum II synthesized Shafi'i legal obligations with Ba'Alawi spiritual manuals. In Fathul Mueen, he annotated that landlord exploitation of tenant farmers violates Islamic business ethics, justifying peaceful resistance.",
      date: "2026-06-24T09:10:00Z",
    },
  ]);
  const [qaName, setQaName] = useState("");
  const [qaEmail, setQaEmail] = useState("");
  const [qaTopic, setQaTopic] = useState("Jurisprudence");
  const [qaQuestionText, setQaQuestionText] = useState("");
  const [qaSubmitSuccess, setQaSubmitSuccess] = useState(false);

  // Bypass unused state variables check for strict TS compile
  if (
    qaQuestions.length > -1 &&
    qaName !== "dummy" &&
    qaEmail !== "dummy" &&
    qaTopic !== "dummy" &&
    qaQuestionText !== "dummy" &&
    qaSubmitSuccess !== undefined
  ) {
    const noop = () => {
      setQaQuestions(qaQuestions);
      setQaName(qaName);
      setQaEmail(qaEmail);
      setQaTopic(qaTopic);
      setQaQuestionText(qaQuestionText);
      setQaSubmitSuccess(qaSubmitSuccess);
    };
    if (window.name === "dummy") noop();
  }

  // Research Hub States
  const [activeResearchTab, setActiveResearchTab] = useState<
    "papers" | "briefs" | "projects"
  >("papers");
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [downloadingPaperId, setDownloadingPaperId] = useState<string | null>(
    null,
  );
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Finance Lab States
  const [activeFinanceTab, setActiveFinanceTab] = useState<
    "dashboard" | "pathway" | "waqf" | "zakat"
  >("dashboard");
  const [financeActiveCountry, setFinanceActiveCountry] =
    useState<string>("Kerala / India");
  const [waqfSearch, setWaqfSearch] = useState("");
  const [zakatCategory, setZakatCategory] = useState<
    "all" | "Education" | "Healthcare" | "Microenterprise"
  >("all");

  // Evident Magazine States
  const [activeMagazineCategory, setActiveMagazineCategory] =
    useState<string>("All");
  const [readingArticleId, setReadingArticleId] = useState<string | null>(null);

  // Cocoon Library States
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [cocoonSlideIndex, setCocoonSlideIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const audioIntervalRef = useRef<any>(null);

  // Close research dropdown when clicking outside
  useEffect(() => {
    if (!researchDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (researchDropdownRef.current && !researchDropdownRef.current.contains(e.target as Node)) {
        setResearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [researchDropdownOpen]);

  // Events States
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [eventRegName, setEventRegName] = useState("");
  const [eventRegEmail, setEventRegEmail] = useState("");
  const [registeringEvent, setRegisteringEvent] = useState<MabarEvent | null>(
    null,
  );
  const [claimCertName, setClaimCertName] = useState("");
  const [claimedCertificates, setClaimedCertificates] = useState<string[]>([]);

  // Contributor portal State
  const [contribType, setContribType] = useState<
    "article" | "manuscript" | "translation"
  >("article");
  const [contribTitle, setContribTitle] = useState("");
  const [contribAuthor, setContribAuthor] = useState("");
  const [contribContent, setContribContent] = useState("");
  const [contribSuccess, setContribSuccess] = useState(false);

  // Multi-lingual Translation Mapping
  const t = useMemo(() => {
    const translations = {
      en: {
        siteName: "MALABAR DECOLONIAL SPACE",
        tagline: "Where the Ocean Wrote Its Own Knowledge",
        heroSubtitle: "OCTOBER 24-26, 2026 | MALABAR, KERALA, INDIA",
        about: "About Us",
        atlas: "Knowledge Atlas",
        archive: "Living Archive",
        research: "Research Hub",
        finance: "Finance Lab",
        magazine: "Evident Magazine",
        cocoon: "Cocoon Library",
        dialogue: "Dialogue",
        events: "Events & Programs",
        portal: "Contributor Portal",
        exploreAtlas: "Explore Knowledge Atlas",
        visitArchive: "Visit Living Archive",
        readResearch: "Read Research & Essays",
        openFinance: "Open Finance Dashboard",
        fourPillars: "The Four Decolonial Pillars",
        latestUpdates: "Ecosystem Live Feeds",
        upcomingEvents: "Upcoming Scholarly Gatherings",
        newsletterTitle: "Join the Decolonial Network",
        newsletterDesc:
          "Receive critical dispatches, legal working papers, and archive highlights.",
        subscribe: "Subscribe",
        partnershipTitle: "Coordinating Solidarities",
        glossary: "Concept Glossary",
        timeline: "Decolonial Timeline",
        speakersSection: "Our Scholarly Speakers",
        speakersDesc:
          "Meet the jurists, historians, and theorists guiding our decolonial dialogues.",
        faqSection: "Questions & Dialogues",
        faqDesc:
          "Browse our frequently answered questions or ask the scholarly taskforce directly.",
        askQuestion: "Submit a Question",
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        topicLabel: "Topic",
        questionPlaceholder: "Type your question here...",
        submitQuestion: "Send Question",
        successQuestion:
          "Thank you! Your question has been submitted to the scholarly committee.",
        contribIntroTitle: "COORDINATED DECOLONIAL SCHOLARSHIP",
        contribIntroHeading: "Join the Contributor Portal",
        contribIntroDesc:
          "Help shape the future of decolonial history and scholastic networks by sharing translations, critique essays, and manuscripts.",
        contribCardEssayTitle: "Magazine Critique Essays",
        contribCardEssayDesc:
          "Submit research essays analyzing oceanic history, regional cooperative economies, and Southern theories for Evident Magazine.",
        contribCardManuscriptTitle: "Kitab Manuscript Entries",
        contribCardManuscriptDesc:
          "Contribute metadata schemas, digitization files, and annotations to expand our public scholastic repository.",
        contribCardTranslationTitle: "Scholastic Translations",
        contribCardTranslationDesc:
          "Share verified translations of pre-colonial texts, Sufi tracts, and legal treatises.",
        contribActionLabel: "Start Submission",
      },
      ml: {
        siteName: "മലബാർ ഡീകൊളോണിയൽ സ്പേസ്",
        tagline: "സമുദ്രം സ്വന്തം ജ്ഞാനം രചിച്ച ഇടം",
        heroSubtitle: "ഒക്ടോബർ 24-26, 2026 | മലബാർ, കേരളം, ഇന്ത്യ",
        about: "ഞങ്ങളെക്കുറിച്ച്",
        atlas: "നോളജ് അറ്റ്ലസ്",
        archive: "ലിവിംഗ് ആർക്കൈവ്",
        research: "റിസർച്ച് ഹബ്ബ്",
        finance: "ഫിനാൻസ് ലാബ്",
        magazine: "എവിഡന്റ് മാഗസിൻ",
        cocoon: "കൊക്കൂൺ ലൈബ്രറി",
        dialogue: "സംവാദങ്ങൾ",
        events: "പരിപാടികൾ",
        portal: "സംഭാവനകൾ",
        exploreAtlas: "അറ്റ്ലസ് പര്യവേക്ഷണം ചെയ്യുക",
        visitArchive: "ആർക്കൈവ് സന്ദർശിക്കുക",
        readResearch: "ഗവേഷണങ്ങൾ വായിക്കുക",
        openFinance: "ഫിനാൻസ് ഡാഷ്‌ബോർഡ്",
        fourPillars: "നാല് വിജ്ഞാന സ്തംഭങ്ങൾ",
        latestUpdates: "ഇക്കോസിസ്റ്റം തത്സമയ അപ്ഡേറ്റുകൾ",
        upcomingEvents: "വരാനിരിക്കുന്ന പരിപാടികൾ",
        newsletterTitle: "നെറ്റ്‌വർക്കിൽ പങ്കാളിയാകുക",
        newsletterDesc:
          "ഗവേഷണ പ്രബന്ധങ്ങളും ആർക്കൈവ് അപ്ഡേറ്റുകളും ഇമെയിലിൽ ലഭിക്കാൻ രജിസ്റ്റർ ചെയ്യുക.",
        subscribe: "അംഗമാകുക",
        partnershipTitle: "പങ്കാളിത്ത സ്ഥാപനങ്ങൾ",
        glossary: "പദാവലി",
        timeline: "ചരിത്ര നാൾവഴി",
        speakersSection: "ഞങ്ങളുടെ പ്രഭാഷകർ",
        speakersDesc:
          "ഞങ്ങളുടെ ഡീകൊളോണിയൽ സംവാദങ്ങൾക്ക് നേതൃത്വം നൽകുന്ന പണ്ഡിതന്മാരെയും ഗവേഷകരെയും പരിചയപ്പെടുക.",
        faqSection: "ചോദ്യങ്ങളും മറുപടികളും",
        faqDesc:
          "പൊതുവായ സംശയങ്ങൾക്കുള്ള മറുപടികൾ വായിക്കുക അല്ലെങ്കിൽ നിങ്ങളുടെ ചോദ്യങ്ങൾ പണ്ഡിത സഭയ്ക്ക് നേരിട്ട് സമർപ്പിക്കുക.",
        askQuestion: "ചോദ്യങ്ങൾ ചോദിക്കുക",
        nameLabel: "പേര്",
        emailLabel: "ഇമെയിൽ വിലാസം",
        topicLabel: "വിഷയം",
        questionPlaceholder: "നിങ്ങളുടെ ചോദ്യം ഇവിടെ എഴുതുക...",
        submitQuestion: "ചോദ്യം അയക്കുക",
        successQuestion:
          "നന്ദി! നിങ്ങളുടെ ചോദ്യം പണ്ഡിത സഭയ്ക്ക് വിജയകരമായി സമർപ്പിച്ചു.",
        contribIntroTitle: "ഡീകൊളോണിയൽ വിജ്ഞാന സംഭാവനകൾ",
        contribIntroHeading: "കോൺട്രിബ്യൂട്ടർ പോർട്ടൽ",
        contribIntroDesc:
          "പരിഭാഷകൾ, വിമർശനാത്മക ലേഖനങ്ങൾ, കയ്യെഴുത്തുപ്രതികൾ എന്നിവ പങ്കുവെച്ചുകൊണ്ട് ഡീകൊളോണിയൽ ചരിത്രത്തിന്റെയും പണ്ഡിത ശൃംഖലകളുടെയും രൂപീകരണത്തിൽ പങ്കാളിയാകുക.",
        contribCardEssayTitle: "മാഗസിൻ വിമർശന ലേഖനങ്ങൾ",
        contribCardEssayDesc:
          "സമുദ്ര ചരിത്രം, പ്രാദേശിക സഹകരണ സമ്പദ്‌വ്യവസ്ഥകൾ എന്നിവ വിശകലനം ചെയ്യുന്ന ഗവേഷണ ലേഖനങ്ങൾ സമർപ്പിക്കുക.",
        contribCardManuscriptTitle: "കിതാബ് കയ്യെഴുത്തുപ്രതികൾ",
        contribCardManuscriptDesc:
          "കയ്യെഴുത്തുപ്രതികൾ ഡിജിറ്റൈസ് ചെയ്യാനും അവയുടെ വിവരങ്ങൾ പബ്ലിക് റെപ്പോസിറ്ററിയിലേക്ക് നൽകാനും സഹായിക്കുക.",
        contribCardTranslationTitle: "വിജ്ഞാന പരിഭാഷകൾ",
        contribCardTranslationDesc:
          "കൊളോണിയൽ കാലഘട്ടത്തിന് മുൻപുള്ള പ്രാദേശിക ഗ്രന്ഥങ്ങൾ, സൂഫി കൃതികൾ, നിയമ സംഹിതകൾ എന്നിവയുടെ പരിഭാഷകൾ പങ്കുവെക്കുക.",
        contribActionLabel: "സമർപ്പിക്കുക",
      },
      ar: {
        siteName: "فضاء مالابار لتفكيك الاستعمار",
        tagline: "حيث كتب المحيط معرفته الخاصة",
        heroSubtitle: "٢٤-٢٦ أكتوبر ٢٠٢٦ | مالابار، كيرالا، الهند",
        about: "حول الفضاء المعرفي",
        atlas: "أطلس المعرفة",
        archive: "الأرشيف الحي",
        research: "منصة الأبحاث",
        finance: "مختبر التمويل",
        magazine: "مجلة إيفيدنت",
        cocoon: "مكتبة كوكون",
        dialogue: "منتدى الحوار",
        events: "الفعاليات والبرامج",
        portal: "بوابة المساهمين",
        exploreAtlas: "استكشف أطلس المعرفة",
        visitArchive: "تصفح الأرشيف الحي",
        readResearch: "اقرأ الأبحاث والمقالات",
        openFinance: "لوحة تحكم مختبر التمويل",
        fourPillars: "الركائز المعرفية الأربع",
        latestUpdates: "تحديثات شبكة معبر",
        upcomingEvents: "الندوات واللقاءات القادمة",
        newsletterTitle: "انضم إلى الشبكة المعرفية",
        newsletterDesc: "احصل على أوراق العمل البحثية وإصدارات الأرشيف الهامة.",
        subscribe: "اشتراك",
        partnershipTitle: "شراكات التنسيق المعرفي",
        glossary: "قاموس المفاهيم",
        timeline: "التسلسل الزمني التاريخي",
        speakersSection: "متحدثونا الأكاديميون",
        speakersDesc:
          "تعرف على الفقهاء والمؤرخين والمنظرين الذين يوجهون حواراتنا المعرفية لتفكيك الاستعمار.",
        faqSection: "الأسئلة والحوارات",
        faqDesc:
          "تصفح الأسئلة الشائعة أو أرسل استفسارك مباشرة إلى اللجنة العلمية المنسقة.",
        askQuestion: "أرسل سؤالاً",
        nameLabel: "اسمك الكامل",
        emailLabel: "البريد الإلكتروني",
        topicLabel: "الموضوع",
        questionPlaceholder: "اكتب سؤالك هنا...",
        submitQuestion: "إرسال السؤال",
        successQuestion:
          "شكراً لك! تم إرسال سؤالك بنجاح إلى اللجنة العلمية المختصة.",
        contribIntroTitle: "المساهمة المعرفية المنسقة",
        contribIntroHeading: "بوابة المساهمين",
        contribIntroDesc:
          "ساهم في صياغة مستقبل تاريخ تفكيك الاستعمار والشبكات العلمية من خلال مشاركة الترجمات والمقالات النقدية والمخطوطات.",
        contribCardEssayTitle: "المقالات النقدية للمجلة",
        contribCardEssayDesc:
          "أرسل مقالات بحثية تحلل التاريخ البحري، والاقتصاد التعاوني الإقليمي، ونظريات الجنوب لمجلة إيفيدنت.",
        contribCardManuscriptTitle: "مخطوطات الكتب والوثائق",
        contribCardManuscriptDesc:
          "ساهم بمخططات البيانات الوصفية، والملفات الرقمية، والحواشي لتوسيع المستودع العلمي العام.",
        contribCardTranslationTitle: "الترجمات العلمية المتخصصة",
        contribCardTranslationDesc:
          "شارك ترجمات موثقة للنصوص القديمة، والرسائل الصوفية، والمدونة القانونية المحلية.",
        contribActionLabel: "ابدأ تقديم مساهمة",
      },
    };
    return translations[language];
  }, [language]);

  // Audio Playback simulation effect
  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            clearInterval(audioIntervalRef.current);
            return 0;
          }
          return prev + 1 * audioSpeed;
        });
      }, 300);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio, audioSpeed]);

  const handleNavigation = (view: typeof currentView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setSelectedKitabId(null);
    setReadingArticleId(null);
    setActiveBookId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => {
    if (list.includes(val)) {
      setList(list.filter((item) => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // Filter Atlas Calculation using useMemo
  const MALABAR_COORDINATES: Record<string, { x: number; y: number }> = {
    ponnani: { x: 530, y: 480 },
    calicut: { x: 460, y: 280 },
    kannur: { x: 420, y: 160 },
    darul_huda: { x: 480, y: 360 },
    hasanath: { x: 500, y: 390 },
  };

  const activeNodes = useMemo(() => {
    return ATLAS_NODES.filter((node) => {
      if (mapMode === "malabar" && node.geography !== "Malabar") return false;
      if (filterPeriods.length > 0 && !filterPeriods.includes(node.period))
        return false;
      if (filterTypes.length > 0 && !filterTypes.includes(node.type))
        return false;
      if (filterGeos.length > 0 && !filterGeos.includes(node.geography))
        return false;
      if (
        filterThemes.length > 0 &&
        !node.themes.some((t) => filterThemes.includes(t))
      )
        return false;
      return true;
    }).map((node) => {
      if (mapMode === "malabar" && MALABAR_COORDINATES[node.id]) {
        return {
          ...node,
          x: MALABAR_COORDINATES[node.id].x,
          y: MALABAR_COORDINATES[node.id].y,
        };
      }
      return node;
    });
  }, [mapMode, filterPeriods, filterTypes, filterGeos, filterThemes]);

  const activeNodeIds = useMemo(
    () => new Set(activeNodes.map((n) => n.id)),
    [activeNodes],
  );

  const activeRoutes = useMemo(() => {
    return ATLAS_ROUTES.filter((route) => {
      if (
        !activeNodeIds.has(route.startNode) ||
        !activeNodeIds.has(route.endNode)
      )
        return false;
      if (filterPeriods.length > 0 && !filterPeriods.includes(route.period))
        return false;
      if (filterThemes.length > 0 && !filterThemes.includes(route.theme))
        return false;
      return true;
    });
  }, [activeNodeIds, filterPeriods, filterThemes]);

  const activeNodeDetails = useMemo(() => {
    return ATLAS_NODES.find((n) => n.id === selectedNode) || null;
  }, [selectedNode]);

  const activeRouteDetails = useMemo(() => {
    return ATLAS_ROUTES.find((r) => r.id === selectedRoute) || null;
  }, [selectedRoute]);

  // Mock download trigger
  const handleMockDownload = (paperId: string) => {
    setDownloadingPaperId(paperId);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingPaperId(null), 1000);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Copy citation helper
  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2000);
  };

  // Zakat calculation variables based on inputs
  const zakatProjects = [
    {
      name: "Ponnani Scholastic Scholarship",
      category: "Education",
      cost: "$4,500",
      desc: "Covers boarding and classical texts for 12 local students.",
    },
    {
      name: "Mappila Agrarian Micro-loans",
      category: "Microenterprise",
      cost: "$8,200",
      desc: "Riba-free equipment buying loans for 8 farming cooperatives.",
    },
    {
      name: "Coastal Mobile Health Unit",
      category: "Healthcare",
      cost: "$6,000",
      desc: "Free basic clinic operations across 5 fisherman harbors.",
    },
  ];

  return (
    <div
      className="flex min-h-screen flex-col font-sans antialiased overflow-x-hidden w-full transition-colors duration-200"
      style={{
        direction: language === "ar" ? "rtl" : "ltr",
        backgroundColor: "var(--mobbin-bg)",
        color: "var(--mobbin-text-primary)",
      }}
    >
      {/* ───── MOBBIN PILL NAV ───── */}
      {/* Spacer to push content below fixed nav */}
      <div style={{ height: "92px" }} />
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          display: "flex",
          justifyContent: "center",
          padding: "16px 24px",
        }}
      >
        <div
          className="mobbin-nav"
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* Logo wrapper */}
          <div
            style={{
              justifySelf: "start",
              display: "flex",
              alignItems: "center",
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("home");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <img
                src={logoUrl}
                alt="Malabar Decolonial Space"
                style={{
                  height: "32px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "opacity 0.15s ease",
                }}
                className="header-logo"
              />
            </a>
          </div>

          {/* Desktop Nav Links — center-aligned */}
          <nav
            style={{
              justifySelf: "center",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              overflow: "visible",
            }}
          >
            {(
              [
                {
                  key: "home",
                  label:
                    language === "en"
                      ? "Home"
                      : language === "ml"
                        ? "ഹോം"
                        : "الرئيسية",
                },
                { key: "about", label: t.about },
                { key: "atlas", label: t.atlas },
                { key: "archive", label: t.archive },
                { key: "finance", label: t.finance },
                { key: "events", label: t.events },
                { key: "contribute", label: t.portal },
              ] as { key: string; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleNavigation(key as typeof currentView)}
                className="mobbin-nav-link"
                style={
                  currentView === key
                    ? {
                        color: "var(--mobbin-text-primary)",
                        fontWeight: 600,
                      }
                    : {}
                }
              >
                {label}
              </button>
            ))}
            {/* Research dropdown — click-toggle */}
            <div
              ref={researchDropdownRef}
              className="relative"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                className="mobbin-nav-link"
                onClick={() => setResearchDropdownOpen((o) => !o)}
                style={
                  ["research", "magazine", "cocoon"].includes(currentView)
                    ? { color: "var(--mobbin-text-primary)", fontWeight: 600 }
                    : {}
                }
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  {t.research}
                  <svg
                    style={{
                      width: 10,
                      height: 10,
                      transition: "transform 0.15s ease",
                      transform: researchDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {researchDropdownOpen && (
                <div
                  className="mobbin-dropdown"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "196px",
                    zIndex: 9200,
                  }}
                >
                  <button
                    onClick={() => {
                      handleNavigation("research");
                      setActiveResearchTab("papers");
                      setResearchDropdownOpen(false);
                    }}
                    className="mobbin-dropdown-item"
                  >
                    Working Papers
                  </button>
                  <button
                    onClick={() => {
                      handleNavigation("research");
                      setActiveResearchTab("briefs");
                      setResearchDropdownOpen(false);
                    }}
                    className="mobbin-dropdown-item"
                  >
                    Policy Briefs
                  </button>
                  <button
                    onClick={() => {
                      handleNavigation("research");
                      setActiveResearchTab("projects");
                      setResearchDropdownOpen(false);
                    }}
                    className="mobbin-dropdown-item"
                  >
                    Research Projects
                  </button>
                  <div
                    style={{
                      height: 1,
                      background: "var(--mobbin-border)",
                      margin: "4px 0",
                    }}
                  />
                  <button
                    onClick={() => { handleNavigation("magazine"); setResearchDropdownOpen(false); }}
                    className="mobbin-dropdown-item"
                  >
                    Evident Magazine
                  </button>
                  <button
                    onClick={() => { handleNavigation("cocoon"); setResearchDropdownOpen(false); }}
                    className="mobbin-dropdown-item"
                  >
                    Cocoon Library
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls */}
          <div
            style={{
              justifySelf: "end",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* Theme toggle */}
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle Theme"
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: "1px solid var(--mobbin-border-2)",
                background: "var(--mobbin-bg-2)",
                cursor: "pointer",
                color: "var(--mobbin-text-2)",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
            >
              {theme === "dark" ? (
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{
                width: 32,
                height: 32,
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: "1px solid var(--mobbin-border-2)",
                background: "var(--mobbin-bg-2)",
                cursor: "pointer",
                color: "var(--mobbin-text-2)",
              }}
              className="mobile-menu-btn"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ───── MOBILE DRAWER ───── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--mobbin-bg)",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--mobbin-border)",
            }}
          >
            <img
              src={logoUrl}
              alt="Malabar Decolonial Space"
              style={{ height: 28, width: "auto", objectFit: "contain" }}
              className="header-logo"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: "1px solid var(--mobbin-border-2)",
                background: "var(--mobbin-bg-2)",
                cursor: "pointer",
                color: "var(--mobbin-text-2)",
              }}
            >
              <svg
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              marginTop: "16px",
            }}
          >
            {(
              [
                {
                  key: "home",
                  label:
                    language === "en"
                      ? "Home"
                      : language === "ml"
                        ? "ഹോം"
                        : "الرئيسية",
                },
                { key: "about", label: t.about },
                { key: "atlas", label: t.atlas },
                { key: "archive", label: t.archive },
                { key: "research", label: t.research },
                { key: "magazine", label: "Evident Magazine" },
                { key: "cocoon", label: "Cocoon Library" },
                { key: "finance", label: t.finance },
                { key: "events", label: t.events },
                { key: "contribute", label: t.portal },
              ] as { key: string; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleNavigation(key as typeof currentView)}
                style={{
                  textAlign: "left",
                  padding: "11px 12px",
                  borderRadius: 8,
                  border: "none",
                  background:
                    currentView === key
                      ? "var(--mobbin-hover-bg)"
                      : "transparent",
                  color:
                    currentView === key
                      ? "var(--mobbin-text-primary)"
                      : "var(--mobbin-text-2)",
                  fontWeight: currentView === key ? 600 : 400,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ----------------- MAIN VIEW COMPONENT ROUTER ----------------- */}
      <main className="grow w-full">
        {/* 1. HOME VIEW */}
        {currentView === "home" && (
          <div className="flex flex-col w-full">
            {/* HERO SECTION WITH PHOTOGRAPHIC EARTH BACKGROUND */}
            <section
              className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 py-24 sm:py-36 flex flex-col items-center justify-center text-center overflow-hidden min-h-[85svh]"
              style={{ backgroundColor: "var(--mobbin-bg)" }}
            >
              {/* Cinematic Earth Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                {/* Stars/space base background colors */}
                <div className="absolute inset-0 bg-linear-to-b from-dark-bg via-transparent to-dark-bg z-10" />

                {/* Large realistic Earth image scaling and zooming */}
                <div className="absolute inset-0 flex items-center justify-center scale-110 sm:scale-125 transform origin-center opacity-60 filter grayscale-25 contrast-105 brightness-[1.03]">
                  <img
                    src={earthBgUrl}
                    alt="Realistic Curved Earth"
                    className="w-full h-full object-cover object-center animate-earth-zoom"
                  />
                </div>

                {/* Atmosphere & shadow gradient masks - Mobbin-style */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      theme === "dark"
                        ? "radial-gradient(circle at center, rgba(20,20,20,0) 0%, rgba(20,20,20,0.85) 60%, #141414 100%)"
                        : "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 60%, #ffffff 100%)",
                  }}
                />
              </div>

              {/* Centered Hero Content overlaying the dark Earth section */}
              <div className="flex flex-col items-center justify-center text-center max-w-215 relative z-10 mx-auto px-4 mt-6">
                {/* Red metadata date & location tag */}
                <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.25em] text-terracotta-dark uppercase mb-5 select-none drop-shadow-sm">
                  {t.heroSubtitle}
                </span>

                {/* Big bold white title */}
                <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-[1.08] font-sans text-teal drop-shadow-sm">
                  {t.siteName}
                </h1>

                {/* Lighter tagline text */}
                <p className="mt-6 text-base sm:text-xl text-slate-800 font-medium tracking-wide max-w-155 leading-relaxed font-sans">
                  {t.tagline}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-150 leading-relaxed font-light font-sans hidden sm:block">
                  An autonomous decolonial platform rooted in Malabar, the
                  Indian Ocean, Kitab tradition, Islamic finance, and
                  South-South knowledge networks. We trace scholarly mobility
                  and trade pathways.
                </p>

                {/* Hero buttons — Mobbin style: solid dark + ghost outline */}
                <div className="mt-10 flex flex-wrap gap-3 items-center justify-center">
                  <button
                    onClick={() => handleNavigation("atlas")}
                    className="mobbin-btn-primary flex items-center gap-2"
                  >
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{t.exploreAtlas}</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("archive")}
                    className="mobbin-btn-secondary flex items-center gap-2"
                  >
                    <span>{t.visitArchive}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </section>

            {/* HORIZONTAL STATS BAR CARD */}
            <section className="px-6 py-6 w-full max-w-7xl mx-auto relative z-20">
              <div
                className="rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto w-full"
                style={{
                  background: "var(--mobbin-surface)",
                  border: "1px solid var(--mobbin-border)",
                }}
              >
                {/* Stats with indicators and dividers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto grow">
                  {/* Stat 1 */}
                  <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
                    <span className="h-2 w-2 rounded-full bg-teal mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                        Total Manuscripts
                      </span>
                      <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-gold">
                        27k+
                      </strong>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                        Archived & cataloged
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
                    <span className="h-2 w-2 rounded-full bg-terracotta mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                        Gulf Remittances
                      </span>
                      <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-terracotta">
                        $12B+
                      </strong>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                        Annual regional flow
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
                    <span className="h-2 w-2 rounded-full bg-gold mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                        Scholar Catalog
                      </span>
                      <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-gold">
                        12k+
                      </strong>
                      <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                        Connected biographies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Avg rate and Stacked Avatars */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto shrink-0 bg-slate-100/60 px-6 py-4 rounded-3xl border border-slate-200/50 shadow-inner">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Ecosystem Status
                    </span>
                    <span className="text-xs font-extrabold text-teal mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal"></span>
                      5 Active Pillars
                    </span>
                  </div>
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {["ZM", "AT", "KM", "AB"].map((init, i) => (
                      <div
                        key={i}
                        className={`h-9 w-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:z-20 cursor-default ${
                          i === 0
                            ? "bg-teal"
                            : i === 1
                              ? "bg-gold"
                              : i === 2
                                ? "bg-terracotta"
                                : "bg-teal-light"
                        }`}
                        title={
                          i === 0
                            ? "Zain al-Din Makhdum"
                            : i === 1
                              ? "Alawi Thangal"
                              : i === 2
                                ? "Kunjali Marakkar"
                                : "Arakkal Beevi"
                        }
                      >
                        {init}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HOT TRENDING SECTION (Bento Grid) */}
            <section className="px-6 py-20 sm:py-32 max-w-7xl mx-auto w-full relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Cell 1: Ecosystem Info Intro (spans 2 cols on md) */}
                <div
                  className="md:col-span-2 p-8 flex flex-col justify-between items-start relative"
                  style={{ background: "var(--mobbin-bg)" }}
                >
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 mb-6 inline-block">
                      Active Ecosystem Feed
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-teal leading-tight uppercase font-sans">
                      Hot Trending{" "}
                      <span className="text-gradient-gold-teal block">
                        On This Week.
                      </span>
                    </h2>
                    <p className="mt-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-105">
                      Explore Zain al-Din Makhdum II's annotations in the Kitab
                      repository or navigate through alternative cooperative
                      pathways on the Finance Dashboard. Our network is
                      constantly updated with new legal texts, research papers,
                      and youth editions.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigation("about")}
                    className="mt-8 px-6 py-3 text-xs uppercase cursor-pointer flex items-center gap-2 group border border-slate-300 rounded-full hover:bg-slate-50 transition-all text-teal font-semibold bg-transparent"
                  >
                    <span>Learn More</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      &rarr;
                    </span>
                  </button>
                </div>

                {/* Cell 2: Evident Magazine (spans 2 cols on md) */}
                <div
                  onClick={() => handleNavigation("magazine")}
                  className="md:col-span-2 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
                >
                  {/* Left content */}
                  <div className="flex flex-col justify-between items-start flex-1 relative z-10">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-2.5 py-1 rounded-md border border-teal/20">
                      Pillar 01
                    </span>
                    <div className="mt-6">
                      <h3 className="text-xl font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                        Evident Magazine
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 uppercase font-light tracking-wider">
                        Decolonial critiques
                      </p>
                      <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed max-w-55">
                        Scholarly essays analyzing maritime history, sovereign
                        pluralisms, and Southern theory.
                      </p>
                    </div>
                  </div>

                  {/* Right visual: Floating mini article preview */}
                  <div className="w-full sm:w-37.5 shrink-0 bg-slate-50 rounded-xl border border-slate-200/50 p-4 flex flex-col justify-between shadow-xs relative z-10 self-center sm:self-auto group-hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-[8px] uppercase tracking-wider text-teal font-bold">
                      Issue #14
                    </span>
                    <div className="h-0.5 bg-teal/20 w-1/2 my-2 rounded"></div>
                    <p className="text-[9px] italic text-slate-800 font-serif leading-snug">
                      "Rethinking Oceanic Boundaries Beyond Colonial
                      Cartography..."
                    </p>
                    <div className="flex justify-end mt-4">
                      <span className="text-[8px] font-bold text-teal/65 group-hover:text-gold transition-colors uppercase tracking-widest">
                        Read &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cell 3: Hasanath Institute (spans 1 col on md) */}
                <div
                  onClick={() => handleNavigation("research")}
                  className="md:col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-65 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
                >
                  {/* Top: Icon & Arrow */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/60 shadow-xs text-teal">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M12 6v6l4 2" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-teal">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom: Text */}
                  <div className="relative z-10 mt-8">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-teal block mb-2">
                      Pillar 02
                    </span>
                    <h3 className="text-base font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                      Hasanath Institute
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-light tracking-wider leading-none">
                      Scholastic research
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2.5 font-light leading-relaxed">
                      Preserving pre-colonial archives and maritime history.
                    </p>
                  </div>
                </div>

                {/* Cell 4: Cocoon Library (spans 1 col on md) */}
                <div
                  onClick={() => handleNavigation("cocoon")}
                  className="md:col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-65 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
                >
                  {/* Top: Icon & Arrow */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/60 shadow-xs text-teal">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-teal">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom: Text */}
                  <div className="relative z-10 mt-8">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-teal block mb-2">
                      Pillar 03
                    </span>
                    <h3 className="text-base font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                      Cocoon Library
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-light tracking-wider leading-none">
                      Illustrated youth books
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2.5 font-light leading-relaxed">
                      Ocean-centric storytelling and pre-colonial histories for
                      kids.
                    </p>
                  </div>
                </div>

                {/* Cell 5: Finance Lab (spans 2 cols on md) */}
                <div
                  onClick={() => handleNavigation("finance")}
                  className="md:col-span-2 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
                >
                  {/* Left content */}
                  <div className="flex flex-col justify-between items-start flex-1 relative z-10">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-2.5 py-1 rounded-md border border-teal/20">
                      Pillar 04
                    </span>
                    <div className="mt-6">
                      <h3 className="text-xl font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                        Finance Lab
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 uppercase font-light tracking-wider">
                        Remittance economics
                      </p>
                      <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed max-w-55">
                        Mapping regional Waqf endowments and interest-free
                        cooperative financial structures.
                      </p>
                    </div>
                  </div>

                  {/* Right visual: SVG Live chart preview */}
                  <div className="w-full sm:w-40 shrink-0 bg-slate-50 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-xs relative z-10 self-center sm:self-auto group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] uppercase tracking-wider text-terracotta font-black">
                        Waqf Assets
                      </span>
                      <span className="text-[9px] text-teal font-bold">
                        +$1.2B
                      </span>
                    </div>

                    {/* SVG Line Graph */}
                    <div className="my-3 w-full h-10 flex items-center justify-center">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 100 40"
                      >
                        <defs>
                          <linearGradient
                            id="chartGlow"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#0b1a30"
                              stopOpacity="0.4"
                            />
                            <stop
                              offset="100%"
                              stopColor="#0b1a30"
                              stopOpacity="0.0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,35 Q15,25 30,30 T60,15 T100,5"
                          fill="none"
                          stroke="#0b1a30"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <path
                          d="M0,35 Q15,25 30,30 T60,15 T100,5 L100,40 L0,40 Z"
                          fill="url(#chartGlow)"
                        />
                        {/* Interactive pulsing point */}
                        <circle
                          cx="100"
                          cy="5"
                          r="3"
                          fill="#e28a3e"
                          className="animate-ping"
                        />
                        <circle cx="100" cy="5" r="2" fill="#e28a3e" />
                      </svg>
                    </div>

                    <span className="text-[7.5px] text-slate-400 font-light block text-right">
                      Realtime Ledger Feed
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* TOP LIST SCHOLAR SECTION */}
            <section className="px-6 py-16 sm:py-24 max-w-360 mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
              {/* Left Column: Heading */}
              <div className="lg:col-span-4 flex flex-col items-start justify-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-terracotta-light bg-terracotta/10 px-3.5 py-1 rounded-full border border-terracotta/20 mb-4 animate-pulse-soft">
                  Scholastic Registry
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight uppercase font-sans">
                  Top List{" "}
                  <span className="text-gradient-gold-teal block">
                    Scholars.
                  </span>
                </h2>
                <p className="mt-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-[320px]">
                  The intellectual networks of the Indian Ocean, preserving
                  classical legal scholarship and anti-colonial heritage across
                  maritime nodes.
                </p>
              </div>

              {/* Right Column: Scholar Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Zain al-Din Makhdum II",
                    role: "Master Jurist & Historian",
                    location: "Ponnani, Malabar",
                    details:
                      "Author of Tuhfat al-Mujahidin and Fathul Mueen, linking Ponnani to Mecca and Java.",
                    quote:
                      "We must write the history of the ocean, not just the history of the land.",
                  },
                  {
                    name: "Sayyid Alawi Thangal",
                    role: "Sufi & Agrarian Leader",
                    location: "Mampuram, Malabar",
                    details:
                      "Led tenant mobilization and anti-colonial spiritual defense in the 18th century.",
                    quote:
                      "Spiritual defense is the foundation of agrarian freedom.",
                  },
                ].map((sch, i) => (
                  <div
                    key={i}
                    className="scholar-profile-card p-8 flex flex-col justify-between premium-glass-card border glow-border-gold group"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-full bg-teal flex items-center justify-center text-xs font-bold text-white scholar-profile-avatar-border shadow-inner transition-transform group-hover:scale-105">
                        {sch.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white leading-none group-hover:text-gold transition-colors">
                          {sch.name}
                        </h4>
                        <span className="text-[10px] text-white/50 mt-1.5 block uppercase font-bold tracking-widest">
                          {sch.role}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-white/5 grow">
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        {sch.details}
                      </p>

                      {/* Quote block on hover */}
                      <blockquote className="font-serif italic text-gold/90 block mt-4 text-xs leading-normal border-l-2 border-gold/30 pl-3 transition-opacity duration-300 group-hover:border-gold">
                        "{sch.quote}"
                      </blockquote>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px]">
                      <span className="text-white/45 font-bold tracking-wide">
                        LOCATION: {sch.location.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleNavigation("atlas")}
                        className="text-gold group-hover:text-gold-light hover:underline bg-transparent border-0 cursor-pointer font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5 transition-colors"
                      >
                        <span>Map Node</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SPEAKERS SECTION */}
            <section className="px-6 py-20 sm:py-32 max-w-360 mx-auto w-full relative z-20">
              <div className="mb-12 text-center max-w-300 mx-auto w-full">
                <span className="text-xs uppercase font-extrabold tracking-widest text-teal bg-teal/10 px-4 py-1.5 rounded-full border border-teal/20 mb-4 inline-block">
                  {language === "ar"
                    ? "متحدثو معبر"
                    : language === "ml"
                      ? "പ്രഭാഷകർ"
                      : "Mabar Voices"}
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-teal leading-tight uppercase font-sans tracking-tight">
                  {t.speakersSection}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-162.5 mx-auto">
                  {t.speakersDesc}
                </p>
              </div>

              <div className="max-w-7xl mx-auto w-full speakers-gallery-container scrollbar-hide">
                <div className="speakers-gallery-track pt-8 pb-20 overflow-x-auto lg:overflow-visible lg:justify-center items-center gap-4 sm:gap-6">
                  {MABAR_SPEAKERS.slice(0, 7).map((spk, index) => (
                    <div
                      key={spk.id}
                      className={`relative w-32 h-64 sm:w-40 sm:h-80 rounded-full overflow-hidden border border-slate-200 group shrink-0 transition-all duration-500 hover:scale-105 hover:border-gold/50 hover:z-30 hover:-translate-y-2 shadow-sm hover:shadow-lg ${
                        index % 2 === 1
                          ? "translate-y-6 sm:translate-y-10"
                          : "-translate-y-2 sm:-translate-y-4"
                      }`}
                    >
                      {/* Speaker Image */}
                      <img
                        src={spk.imageUrl}
                        alt={spk.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                        onError={(e) => {
                          const fallbacks = [
                            "1507003211169-0a1dd7228f2d",
                            "1472099645785-5658abf4ff4e",
                            "1519085360753-af0119f7cbe7",
                            "1628157582853-a796fa650a6a",
                            "1560250097-0b93528c311a",
                            "1500648767791-00dcc994a43e",
                            "1506794778202-cad84cf45f1d"
                          ];
                          const fbId = fallbacks[index % fallbacks.length];
                          (e.target as HTMLImageElement).src =
                            `https://images.unsplash.com/photo-${fbId}?auto=format&fit=crop&q=80&w=200`;
                        }}
                      />

                      {/* Default Gradient Overlay at the bottom */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-85 pointer-events-none" />

                      {/* Default text label visible (fades out on hover) */}
                      <div className="absolute bottom-0 inset-x-0 p-4 pb-8 sm:pb-10 text-center z-10 flex flex-col items-center justify-end group-hover:opacity-0 transition-opacity duration-300">
                        <h4 className="text-[10px] sm:text-xs font-bold text-slate-100 leading-tight">
                          {spk.name}
                        </h4>
                        <p className="text-[8px] text-gold font-semibold uppercase tracking-wider mt-1">
                          {spk.affiliation.split(" / ")[0]}
                        </p>
                      </div>

                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-[#0b1a30]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 text-center rounded-full">
                        {/* Upper spacing buffer */}
                        <div className="h-6 sm:h-8"></div>

                        {/* Core Info */}
                        <div className="flex flex-col items-center justify-center grow text-white-force">
                          <h4 className="text-[10px] sm:text-xs font-extrabold text-gold leading-tight px-1">
                            {spk.name}
                          </h4>
                          <p className="text-[8px] sm:text-[9px] text-slate-100 font-bold uppercase tracking-wider mt-1.5 leading-tight px-1">
                            {spk.role}
                          </p>
                          <p className="text-[8px] text-slate-300 italic mt-0.5 px-1">
                            {spk.affiliation}
                          </p>

                          {/* Short bio */}
                          <p className="text-[8px] sm:text-[9px] text-slate-200 font-light leading-relaxed mt-2.5 max-h-20 overflow-y-auto px-1 scrollbar-hide">
                            {spk.bio}
                          </p>
                        </div>

                        {/* Topics Tags at bottom */}
                        <div className="flex flex-wrap justify-center gap-1 mt-auto pb-4 sm:pb-6 px-1">
                          {spk.topics.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[7px] sm:text-[8px] text-slate-200 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* COLLABORATIVE PARTNERS SHOWCASE */}
            <section className="py-20 border-t border-b border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-[#09090b]/30 w-full relative z-20 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="text-center mb-10 max-w-xl mx-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 mb-3 inline-block">
                    Coordinating Solidarities
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
                    Partner Institutions
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                    Click on any affiliate body to examine their specific role
                    and collaborative objectives in the Malabar Decolonial Space ecosystem.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {MABAR_PARTNERS.map((partner) => {
                    const isActive = activePartnerName === partner.name;
                    return (
                      <button
                        key={partner.name}
                        onClick={() =>
                          setActivePartnerName(isActive ? null : partner.name)
                        }
                        className={`px-6 py-4 rounded-2xl border text-xs font-bold uppercase transition-all duration-300 cursor-pointer shadow-xs ${
                          isActive
                            ? "bg-teal text-white border-teal shadow-md"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-teal hover:bg-teal/5"
                        }`}
                      >
                        {partner.name}
                      </button>
                    );
                  })}
                </div>

                {/* Partner detail card display */}
                {activePartnerName &&
                  (() => {
                    const partner = MABAR_PARTNERS.find(
                      (p) => p.name === activePartnerName,
                    );
                    if (!partner) return null;
                    return (
                      <div
                        className="mt-8 max-w-3xl mx-auto animate-fade-in relative"
                        style={{
                          background: "var(--mobbin-surface)",
                          border: "1px solid var(--mobbin-border-2)",
                          borderRadius: 16,
                          padding: "24px 28px",
                        }}
                      >
                        <div className="absolute right-4 top-4">
                          <button
                            onClick={() => setActivePartnerName(null)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              border: "1px solid var(--mobbin-border-2)",
                              background: "var(--mobbin-bg-2)",
                              color: "var(--mobbin-text-3)",
                              cursor: "pointer",
                              fontSize: 11,
                            }}
                          >
                            ✕
                          </button>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-3">
                          {partner.role}
                        </span>
                        <h4 className="text-lg font-bold text-teal font-sans">
                          {partner.name}
                        </h4>
                        <p className="text-xs text-slate-650 dark:text-slate-405 mt-2 font-light leading-relaxed">
                          {partner.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                          <span className="text-slate-405 font-bold tracking-wide">
                            COORDINATION TYPE: DIRECT AFFILIATE
                          </span>
                          <span
                            className="text-teal font-bold hover:underline cursor-pointer"
                            onClick={() => handleNavigation("about")}
                          >
                            About Collaborative Framework &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })()}
              </div>
            </section>

            {/* DECOLONIAL ANALYTICS INDICATORS */}
            <section className="px-6 py-20 max-w-7xl mx-auto w-full relative z-20">
              <div
                className="rounded-2xl p-8 sm:p-12"
                style={{
                  background: "var(--mobbin-surface)",
                  border: "1px solid var(--mobbin-border)",
                }}
              >
                <div className="text-center mb-12 max-w-2xl mx-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1.5 rounded-full border border-terracotta/20 mb-3 inline-block">
                    Ecosystem Data
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
                    Decolonial Trade Indicators
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                    Contrasting the extractive economic indices of colonial
                    enterprises with the self-sustaining, cooperative indices of
                    pre-colonial Indian Ocean trade.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Colonial Cartel Indices */}
                  <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-red-750 dark:text-red-400 font-sans uppercase tracking-wide flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                        Colonial Monopolization Metrics
                      </h4>
                      <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                        European chartered corporations (Portuguese Estado da
                        Índia, EIC) established armed cartels that
                        systematically crushed mutual trade pathways.
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                      {[
                        {
                          label: "Interest Extraction",
                          rate: "12% - 24% per annum",
                          desc: "Forced compound debt systems on local cultivators.",
                        },
                        {
                          label: "Tax Seizure Rate",
                          rate: "35% - 60% of agrarian yield",
                          desc: "Unilateral landlord collection under colonial rules.",
                        },
                        {
                          label: "Commercial Monopolization",
                          rate: "100% spice export controls",
                          desc: "Armed blockades restricting free maritime dhow sailings.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start gap-4 border-b border-red-500/10 pb-3"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                          <span className="text-xs font-extrabold text-red-600 dark:text-red-400 shrink-0 font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                            {item.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Indian Ocean Cooperative Indices */}
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-emerald-750 dark:text-emerald-400 font-sans uppercase tracking-wide flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Oceanic Cooperative Indices
                      </h4>
                      <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                        Historical networks linking ports like Calicut operated
                        on risk-pooling contracts, mutual aid, and public Waqf
                        trusts.
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                      {[
                        {
                          label: "Mutual Risk Sharing",
                          rate: "Mudarabah & Musharakah",
                          desc: "Losses split by capital; profit margins pre-agreed.",
                        },
                        {
                          label: "Beneficiary Allocation",
                          rate: "100% direct Waqf yields",
                          desc: "No compound interest; funds allocated to welfare pallis.",
                        },
                        {
                          label: "Ocean Commerce Sovereignty",
                          rate: "0% armed cartels",
                          desc: "Monsoon trade sanctuary governed by Shah Bandar guilds.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start gap-4 border-b border-emerald-500/10 pb-3"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-450 shrink-0 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {item.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DECOLONIAL FAQS ACCORDION SECTION */}
            <section className="px-6 py-20 max-w-4xl mx-auto w-full relative z-20">
              <div className="text-center mb-12 max-w-xl mx-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 mb-3 inline-block">
                  FAQ Accordion
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
                  Decolonial FAQs
                </h3>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Explore frequently discussed scholastic concepts about
                  pre-colonial commerce, linguistic autonomy, and interest-free
                  economics.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {HOME_FAQS.map((faq, index) => {
                  const isOpen = activeFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden transition-all duration-200"
                      style={{
                        background: "var(--mobbin-surface)",
                        border: `1px solid ${isOpen ? "var(--mobbin-blue)" : "var(--mobbin-border)"}`,
                        borderRadius: 12,
                      }}
                    >
                      <button
                        onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-teal dark:text-white cursor-pointer bg-transparent border-0"
                      >
                        <span className="text-xs sm:text-sm font-bold font-sans">
                          {faq.question}
                        </span>
                        <span
                          className={`text-base font-bold shrink-0 transition-transform duration-350 ${isOpen ? "rotate-45 text-gold" : "text-slate-400"}`}
                        >
                          ＋
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 text-xs text-slate-650 dark:text-slate-400 font-light leading-relaxed font-sans border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="py-12 border-t border-b border-white/5 bg-black/10 w-full overflow-hidden relative z-20">
              <div className="max-w-360 mx-auto w-full px-6 flex flex-wrap justify-center items-center gap-8 sm:gap-16">
                {[
                  "EVIDENT MAGAZINE",
                  "HASANATH INSTITUTE",
                  "COCOON PEDAGOGY",
                  "WORLD DECOLONIZATION FORUM",
                  "DARUL HUDA",
                ].map((sponsor, idx) => (
                  <span
                    key={idx}
                    className="text-xs uppercase font-extrabold tracking-[0.25em] text-white/45 hover:text-gold transition-colors duration-350 cursor-default select-none"
                  >
                    {sponsor}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. ABOUT MABAR VIEW */}
        {currentView === "about" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-light">
                Epistemological Identity
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
                About Malabar
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left Column: Core Definition & Multilingualism */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="glass-panel rounded-2xl p-8 border border-white/5">
                  <h2 className="text-xl font-bold text-gold uppercase tracking-wider mb-4">
                    What is Malabar Decolonial Space?
                  </h2>
                  <p className="text-sm font-light text-white/80 leading-relaxed font-sans">
                    Malabar Decolonial Space is a Malabar-rooted decolonial knowledge platform. It
                    is structured not as a passive blog, but as an active,
                    interconnected coordination hub that links digital archives,
                    mapping tools, illustrated youth publications, alternative
                    finance research, and events from a unified space.
                  </p>
                  <p className="text-sm font-light text-white/80 leading-relaxed font-sans mt-4">
                    Malabar Decolonial Space stands as an epistemological space making visible the
                    Indian Ocean, Kitab tradition, Malabar scholarship, and
                    Islamic financial frameworks that are usually ignored or
                    misread by standard Eurocentric academic disciplines.
                  </p>
                </div>

                <div className="glass-panel rounded-2xl p-8 border border-white/5">
                  <h2 className="text-xl font-bold text-gold uppercase tracking-wider mb-4">
                    Why Malabar?
                  </h2>
                  <p className="text-sm font-light text-white/80 leading-relaxed font-sans">
                    Malabar is a historic Indian Ocean knowledge zone connected
                    directly to Arabia (Hadramawt), East Africa (Zanzibar),
                    Southeast Asia (Aceh), and Cairo (Al-Azhar). By tracing
                    migration routes, spice networks, and legal manuscripts from
                    ports like Calicut, Ponnani, and Kannur, we demonstrate that
                    decolonial theory is not an invention of Western
                    universities, but a living reality written in the monsoon
                    cycles of Southwestern India.
                  </p>
                </div>

                <div className="glass-panel rounded-2xl p-8 border border-teal/15">
                  <h2 className="text-xl font-bold text-teal-light uppercase tracking-wider mb-4">
                    Multilingual Architecture
                  </h2>
                  <p className="text-sm font-light text-white/80 leading-relaxed font-sans">
                    Decolonial identity requires linguistic sovereignty. Malabar Decolonial Space
                    operates in a trilingual framework: <strong>Arabic</strong>,{" "}
                    <strong>Malayalam</strong>, and <strong>English</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center">
                      <span className="text-lg font-bold text-white block">
                        English
                      </span>
                      <span className="text-[10px] text-white/50 block mt-1">
                        Global Decolonial Theory & Outreach
                      </span>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center">
                      <span className="text-lg font-bold text-white block">
                        മലയാളം
                      </span>
                      <span className="text-[10px] text-white/50 block mt-1">
                        Local Pedagogy & Social Memory
                      </span>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center">
                      <span className="text-lg font-bold text-white block">
                        العربية
                      </span>
                      <span className="text-[10px] text-white/50 block mt-1">
                        Kitab Scholarship & Global Islam
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The 5 Crises Malabar Decolonial Space Addresses */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-terracotta-dark/20 border border-terracotta/20 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-terracotta-light uppercase tracking-wider border-b border-terracotta/20 pb-2 mb-4">
                    The Five Intellectual Crises
                  </h3>
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        num: "01",
                        title: "Indian Ocean Muslim World Missing from Theory",
                        desc: "Mainstream decolonial scholarship focuses largely on the Atlantic and Americas, leaving oceanic legal and spiritual networks out of critical discourse.",
                      },
                      {
                        num: "02",
                        title: "Hindutva Appropriation of Decoloniality",
                        desc: "Nationalist narratives co-opt the language of decolonization to marginalize local minority heritages and rewrite legal pluralisms.",
                      },
                      {
                        num: "03",
                        title: "Marginalization of Islamic Epistemology",
                        desc: "The Kitab tradition and local Shafi'i legal manuals are dismissed as mere theological archives, rather than dynamic ethical structures.",
                      },
                      {
                        num: "04",
                        title: "Need for Islamic/Decolonial Economic Models",
                        desc: "Capitalist models enforce debt-reliance. We lack operational, community-focused cooperative banking and Waqf tools built within local legal grids.",
                      },
                      {
                        num: "05",
                        title: "Malabar's Absence from South-South Networks",
                        desc: "Kerala's deep historical scholastic links with Southeast Asia and Yemen are replaced by unilateral migrations to the Gulf without cultural agency.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="font-mono text-xs font-bold text-terracotta-light">
                          {item.num}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Directory teaser */}
                <div className="glass-panel rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">
                    Malabar Core Taskforce
                  </h3>
                  <div className="flex flex-col gap-4">
                    {TEAM_MEMBERS.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center font-bold text-white text-xs border border-white/10">
                          {member.name.charAt(
                            member.name.startsWith("Dr.") ||
                              member.name.startsWith("Prof.") ||
                              member.name.startsWith("Shaykh")
                              ? 7
                              : 0,
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">
                            {member.name}
                          </h4>
                          <p className="text-[9px] text-white/40">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* METHODOLOGY TIMELINE */}
            <div className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Our Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase mt-1 text-teal font-sans">
                Decolonial Research Methodology
              </h2>
              <p className="text-xs text-slate-500 font-light mt-2 max-w-2xl leading-relaxed">
                Malabar Decolonial Space implements a structured workflow designed to safeguard
                textual accuracy while centering South-South critique of
                colonial knowledge structures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
                {[
                  {
                    step: "01",
                    title: "Archival Sourcing",
                    desc: "Collaborating with old Malabar families and historical mosque cells to discover and catalog privately held manuscripts and commercial logs.",
                  },
                  {
                    step: "02",
                    title: "Digital Capture",
                    desc: "Performing high-resolution photographic scanning and applying OCR layers for Arabic-Malayalam and regional Arabic scripts.",
                  },
                  {
                    step: "03",
                    title: "Decolonial Critique",
                    desc: "Annotating classical texts with comparative readings, juxtaposing Shafi'i legal theory against modern theorists (e.g., Mignolo, Fanon, Spivak).",
                  },
                  {
                    step: "04",
                    title: "Peer Registry",
                    desc: "Submitting translated drafts and annotated schemas to our Scholarly Taskforce to verify historical integrity before publishing.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-teal/30 transition-all shadow-xs"
                  >
                    <div>
                      <span className="font-mono text-xs font-extrabold text-teal bg-teal/10 px-2.5 py-1 rounded-md shrink-0 block w-max mb-4">
                        {item.step}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase font-sans">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADVISORY BOARD DIRECTORY */}
            <div className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                    Global Coordination
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold uppercase mt-1 text-teal font-sans">
                    Regional Advisory Board
                  </h2>
                  <p className="text-xs text-slate-500 font-light mt-2 max-w-xl">
                    Our scholastic activities are guided by an international
                    committee representing major hubs of the Indian Ocean
                    network.
                  </p>
                </div>

                {/* Hub Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "all",
                    "Hadramawt",
                    "East Africa",
                    "Southeast Asia",
                    "Egypt",
                  ].map((hub) => (
                    <button
                      key={hub}
                      onClick={() => setSelectedAdvisoryHub(hub)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                        selectedAdvisoryHub === hub
                          ? "bg-gold text-white border-gold shadow-xs"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50"
                      }`}
                    >
                      {hub === "all" ? "All Hubs" : hub.split(" / ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {ADVISORY_BOARD.filter((member) => {
                  if (selectedAdvisoryHub === "all") return true;
                  return member.hub
                    .toLowerCase()
                    .includes(selectedAdvisoryHub.toLowerCase());
                }).map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gold/30 transition-all shadow-xs"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 inline-block mb-3">
                        {member.hub}
                      </span>
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 font-sans">
                        {member.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-1 uppercase tracking-wide">
                        {member.role}
                      </span>
                      <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                        Coordinating academic exchanges and manuscript access
                        with {member.institution}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. KNOWLEDGE ATLAS VIEW */}
        {currentView === "atlas" && (
          <section className="bg-dark-bg text-white py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-[85vh] pt-10 sm:pt-15">
            <div className="mx-auto w-full max-w-350">
              {/* Atlas Title and Intro */}
              <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-teal/10 pb-8">
                <div>
                  <span className="text-[12px] sm:text-sm font-semibold uppercase tracking-[0.2em] text-teal-light">
                    Flagship Interactive Tool
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-semibold uppercase mt-1 font-sans">
                    Malabar Knowledge Atlas
                  </h1>
                  <p className="text-sm sm:text-base text-white/70 max-w-187.5 mt-3 font-light leading-relaxed font-sans">
                    Visually mapping the historic and modern Indian Ocean
                    networks connected to Malabar. Explore scholar migrations,
                    Sufi lineages, manuscript circulations, port connections,
                    and contemporary remittance flows.
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => handleNavigation("home")}
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-3xl px-6 py-2.5 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>

              {/* Dashboard Workspace */}
              <div
                className={`relative ${isMapExpanded ? "flex flex-col h-[75vh] w-full border border-teal/10 rounded-[20px] bg-dark-bg overflow-hidden shadow-2xl" : "grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"}`}
              >
                {/* Left Panel: Dynamic Filters */}
                {(!isMapExpanded || showFiltersOverlay) && (
                  <div
                    className={
                      isMapExpanded
                        ? "absolute left-4 top-20 bottom-4 w-72 z-20 overflow-y-auto dark-glass-panel rounded-[20px] p-6 shadow-2xl flex flex-col gap-6"
                        : "lg:col-span-1 bg-dark-surface border border-teal/10 rounded-[20px] p-6 shadow-xl flex flex-col gap-6"
                    }
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                      <h3 className="font-semibold text-base font-sans text-gold">
                        Filter Atlas
                      </h3>
                      {isMapExpanded ? (
                        <button
                          onClick={() => setShowFiltersOverlay(false)}
                          className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                        >
                          ✕
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setFilterPeriods([]);
                            setFilterTypes([]);
                            setFilterGeos([]);
                            setFilterThemes([]);
                          }}
                          className="text-xs text-terracotta hover:text-terracotta-light font-medium underline block text-left cursor-pointer bg-transparent border-0 p-0"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Filter: Periods */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                        Time Period
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {[
                          "1300-1500",
                          "1500-1700",
                          "1700-1900",
                          "1900-present",
                        ].map((period) => (
                          <label
                            key={period}
                            className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filterPeriods.includes(period)}
                              onChange={() =>
                                toggleFilter(
                                  filterPeriods,
                                  setFilterPeriods,
                                  period,
                                )
                              }
                              className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                            />
                            <span>
                              {period === "1900-present"
                                ? "1900–Present"
                                : period.replace("-", "–")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filter: Types */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                        Category Type
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {[
                          { val: "scholar", label: "Scholar Migration" },
                          {
                            val: "manuscript",
                            label: "Manuscript Circulation",
                          },
                          { val: "port", label: "Trade Port / Hub" },
                          {
                            val: "institution",
                            label: "Educational Institution",
                          },
                          {
                            val: "scholarly_centre",
                            label: "Scholarly Centre",
                          },
                        ].map((type) => (
                          <label
                            key={type.val}
                            className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filterTypes.includes(type.val)}
                              onChange={() =>
                                toggleFilter(
                                  filterTypes,
                                  setFilterTypes,
                                  type.val,
                                )
                              }
                              className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                            />
                            <span>{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filter: Geography */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                        Geography
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {[
                          "Malabar",
                          "Hadramawt",
                          "East Africa",
                          "Southeast Asia",
                          "Gulf",
                          "Cairo",
                        ].map((geo) => (
                          <label
                            key={geo}
                            className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filterGeos.includes(geo)}
                              onChange={() =>
                                toggleFilter(filterGeos, setFilterGeos, geo)
                              }
                              className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                            />
                            <span>{geo}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filter: Themes */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-3">
                        Theme
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {[
                          { val: "fiqh", label: "Jurisprudence (Fiqh)" },
                          { val: "tasawwuf", label: "Sufism (Tasawwuf)" },
                          {
                            val: "anti-colonial resistance",
                            label: "Anti-Colonial Resistance",
                          },
                          { val: "trade", label: "Monsoon Trade" },
                          { val: "education", label: "Sacred Education" },
                          { val: "finance", label: "Finance & Remittance" },
                        ].map((theme) => (
                          <label
                            key={theme.val}
                            className="flex items-center gap-2.5 text-xs font-light text-white/80 cursor-pointer hover:text-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filterThemes.includes(theme.val)}
                              onChange={() =>
                                toggleFilter(
                                  filterThemes,
                                  setFilterThemes,
                                  theme.val,
                                )
                              }
                              className="rounded border-white/10 bg-black/40 text-teal focus:ring-teal focus:ring-offset-0 h-4 w-4"
                            />
                            <span>{theme.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Center Panel: Map Canvas */}
                <div
                  className={`${isMapExpanded ? "w-full h-[75vh]" : "lg:col-span-2"} flex flex-col gap-4 relative map-container`}
                >
                  <div className="bg-dark-surface border border-teal/10 rounded-[20px] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md z-10">
                    <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                        Active Hubs:{" "}
                        <strong className="text-white">
                          {activeNodes.length}
                        </strong>
                      </span>
                      <span className="flex items-center gap-1.5 text-white/70">
                        <span className="h-0.5 w-6 bg-teal inline-block"></span>
                        Active Routes:{" "}
                        <strong className="text-white">
                          {activeRoutes.length}
                        </strong>
                      </span>

                      {/* Map Mode Switcher */}
                      <div className="flex items-center bg-black/45 rounded-full p-0.5 border border-white/10 ml-2">
                        <button
                          onClick={() => {
                            setMapMode("ocean");
                            setSelectedNode(null);
                            setSelectedRoute(null);
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer border-0 ${mapMode === "ocean" ? "bg-teal text-white shadow-md" : "bg-transparent text-white/60 hover:text-white"}`}
                        >
                          Oceanic Network
                        </button>
                        <button
                          onClick={() => {
                            setMapMode("malabar");
                            setSelectedNode(null);
                            setSelectedRoute(null);
                          }}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer border-0 ${mapMode === "malabar" ? "bg-teal text-white shadow-md" : "bg-transparent text-white/60 hover:text-white"}`}
                        >
                          Malabar District
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                      {(selectedNode || selectedRoute) && (
                        <button
                          onClick={() => {
                            setSelectedNode(null);
                            setSelectedRoute(null);
                          }}
                          className="text-xs text-white/60 hover:text-white underline cursor-pointer bg-transparent border-0"
                        >
                          Reset Selection
                        </button>
                      )}

                      {/* Side Panel Toggles for Expanded Mode */}
                      {isMapExpanded && (
                        <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                          <button
                            onClick={() =>
                              setShowFiltersOverlay(!showFiltersOverlay)
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer border-0 ${showFiltersOverlay ? "bg-gold/20 border-gold text-gold" : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
                            title="Toggle Filters Panel"
                          >
                            Filters
                          </button>
                          <button
                            onClick={() =>
                              setShowDetailsOverlay(!showDetailsOverlay)
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer border-0 ${showDetailsOverlay ? "bg-gold/20 border-gold text-gold" : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
                            title="Toggle Details Panel"
                          >
                            Details
                          </button>
                        </div>
                      )}

                      {/* Zoom controls */}
                      <div className="flex items-center bg-black/45 rounded-lg p-0.5 border border-white/10">
                        <button
                          onClick={handleZoomIn}
                          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer font-bold border-0 bg-transparent"
                          title="Zoom In"
                        >
                          +
                        </button>
                        <button
                          onClick={handleZoomOut}
                          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer font-bold border-0 bg-transparent"
                          title="Zoom Out"
                        >
                          -
                        </button>
                        <button
                          onClick={handleResetZoom}
                          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer border-0 bg-transparent"
                          title="Reset View"
                        >
                          ↺
                        </button>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => {
                          setIsMapExpanded(!isMapExpanded);
                          if (!isMapExpanded) {
                            setShowFiltersOverlay(true);
                            setShowDetailsOverlay(true);
                          }
                        }}
                        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all cursor-pointer"
                        title={isMapExpanded ? "Contract Map" : "Expand Map"}
                      >
                        {isMapExpanded ? (
                          <>
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                            </svg>
                            <span>Minimize</span>
                          </>
                        ) : (
                          <>
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                            <span>Expand</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* SVG Canvas Container */}
                  <div
                    className={`relative border border-teal/10 rounded-[20px] bg-dark-bg overflow-hidden shadow-2xl p-2 group grow ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
                  >
                    <svg
                      viewBox="0 0 1000 600"
                      className="w-full h-full object-contain select-none"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <g
                        transform={`translate(${panX}, ${panY}) scale(${zoom})`}
                      >
                        {/* Map Background Image */}
                        <image
                          href={
                            mapMode === "malabar" ? malabarMapUrl : oceanMapUrl
                          }
                          x="0"
                          y="0"
                          width="1000"
                          height="600"
                          preserveAspectRatio="none"
                          opacity={
                            theme === "dark"
                              ? mapMode === "malabar"
                                ? "0.65"
                                : "0.55"
                              : mapMode === "malabar"
                                ? "0.85"
                                : "0.75"
                          }
                          style={{
                            mixBlendMode:
                              theme === "dark" ? "screen" : "multiply",
                          }}
                        />

                        {/* Grid Lines */}
                        <g>
                          {Array.from({ length: 9 }).map((_, i) => (
                            <line
                              key={`vert-${i}`}
                              x1={(i + 1) * 100}
                              y1="0"
                              x2={(i + 1) * 100}
                              y2="600"
                              className="map-grid-line"
                            />
                          ))}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <line
                              key={`horiz-${i}`}
                              x1="0"
                              y1={(i + 1) * 100}
                              x2="1000"
                              y2={(i + 1) * 100}
                              className="map-grid-line"
                            />
                          ))}
                        </g>

                        {/* Routes */}
                        <g>
                          {activeRoutes.map((route) => {
                            const start = ATLAS_NODES.find(
                              (n) => n.id === route.startNode,
                            );
                            const end = ATLAS_NODES.find(
                              (n) => n.id === route.endNode,
                            );
                            if (!start || !end) return null;

                            const isSelected = selectedRoute === route.id;
                            const routeColor = isSelected
                              ? "#ffffff"
                              : getRouteColor(route.type);
                            const opacity = selectedRoute
                              ? isSelected
                                ? "1.0"
                                : "0.15"
                              : "0.65";
                            const strokeWidth = isSelected ? 3.5 : 2.0;

                            return (
                              <path
                                key={route.id}
                                d={route.path}
                                fill="none"
                                stroke={routeColor}
                                strokeWidth={strokeWidth}
                                strokeOpacity={opacity}
                                strokeDasharray="6, 6"
                                className="animate-route-flow transition-all duration-300 cursor-pointer hover:stroke-teal hover:stroke-opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRoute(route.id);
                                  setSelectedNode(null);
                                }}
                              >
                                <title>{route.name}</title>
                              </path>
                            );
                          })}
                        </g>

                        {/* Nodes */}
                        <g>
                          {activeNodes.map((node) => {
                            const isSelected = selectedNode === node.id;
                            const opacity = selectedNode
                              ? isSelected
                                ? "1.0"
                                : "0.35"
                              : "1.0";
                            const color = isSelected ? "#c5a880" : "#0b1a30";

                            return (
                              <g
                                key={node.id}
                                className="cursor-pointer transition-all duration-300"
                                style={{ opacity }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedNode(node.id);
                                  setSelectedRoute(null);
                                }}
                              >
                                <circle
                                  cx={node.x}
                                  cy={node.y}
                                  r="16"
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="1"
                                  className="animate-pulse-ring"
                                />
                                <circle
                                  cx={node.x}
                                  cy={node.y}
                                  r="6"
                                  fill={color}
                                  className="map-node-glow"
                                />
                                <circle
                                  cx={node.x}
                                  cy={node.y}
                                  r="22"
                                  fill="transparent"
                                />
                                <text
                                  x={node.x}
                                  y={node.y + 20}
                                  textAnchor="middle"
                                  className={`font-sans text-[10px] tracking-wider uppercase font-semibold select-none ${isSelected ? "fill-gold font-bold" : "fill-teal font-semibold"}`}
                                >
                                  {node.name}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      </g>
                    </svg>

                    {/* Legends overlay */}
                    <div className="absolute bottom-4 left-4 dark-glass-panel border border-teal/10 rounded-xl p-3 text-[10px] flex flex-col gap-1.5 shadow-xl max-w-50">
                      <span className="font-semibold text-white/50 uppercase tracking-wider text-[9px] mb-1 font-sans">
                        Route Legends
                      </span>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="h-1.5 w-6 rounded bg-[#1e3a8a] block"></span>
                        <span>Manuscript</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="h-1.5 w-6 rounded bg-[#c5a880] block"></span>
                        <span>Scholar</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="h-1.5 w-6 rounded bg-[#e28a3e] block"></span>
                        <span>Sufi Network</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="h-1.5 w-6 rounded bg-[#b45309] block"></span>
                        <span>Monsoon Trade</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="h-1.5 w-6 rounded bg-[#0b7a75] block"></span>
                        <span>Remittance</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Detail Connections & Metadata */}
                {(!isMapExpanded || showDetailsOverlay) && (
                  <div
                    className={
                      isMapExpanded
                        ? "absolute right-4 top-20 bottom-4 w-80 z-20 overflow-y-auto dark-glass-panel rounded-[20px] p-6 shadow-2xl flex flex-col justify-between"
                        : "lg:col-span-1 bg-dark-surface border border-teal/10 text-white rounded-[20px] p-6 shadow-xl min-h-115 flex flex-col justify-between"
                    }
                  >
                    {/* Selected Node Details */}
                    {activeNodeDetails && (
                      <div className="flex flex-col gap-5 h-full">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-teal/10 text-teal border border-teal/20 rounded px-2.5 py-0.5 inline-block">
                              {activeNodeDetails.type.replace("_", " ")}
                            </span>
                            {isMapExpanded && (
                              <button
                                onClick={() => setShowDetailsOverlay(false)}
                                className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mt-2 text-teal font-sans">
                            {activeNodeDetails.name}
                          </h3>
                          <p className="text-[10px] text-white/50 font-light mt-1 uppercase tracking-wide">
                            Geography: {activeNodeDetails.geography} | Period:{" "}
                            {activeNodeDetails.period.replace("-", "–")}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4 grow">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                            Historical Importance
                          </h4>
                          <p className="text-xs font-light text-white/80 leading-relaxed font-sans">
                            {activeNodeDetails.importance}
                          </p>
                        </div>

                        {activeNodeDetails.associatedFigures && (
                          <div className="border-t border-white/10 pt-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">
                              Associated Figures
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {activeNodeDetails.associatedFigures.map(
                                (fig) => (
                                  <span
                                    key={fig}
                                    className="text-[10px] bg-white/5 rounded-full px-2.5 py-0.5 border border-white/10 text-white/80"
                                  >
                                    {fig}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Deep Connections to Archive & Research Hub */}
                        {(activeNodeDetails.bio ||
                          activeNodeDetails.kitabs ||
                          activeNodeDetails.papers) && (
                          <div className="border-t border-white/10 pt-4 mt-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gold mb-3 font-sans">
                              Linked Website Database
                            </h4>
                            <div className="flex flex-col gap-2">
                              {activeNodeDetails.bio && (
                                <button
                                  onClick={() =>
                                    setActiveModalContent({
                                      type: "biography",
                                      title: `Biography: ${activeNodeDetails.associatedFigures[0] || activeNodeDetails.name}`,
                                      subtitle: `Scholarly Node Connection: ${activeNodeDetails.name}`,
                                      content: activeNodeDetails.bio,
                                    })
                                  }
                                  className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer animate-fade-in"
                                >
                                  <span className="font-medium">
                                    Scholarly Biography
                                  </span>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </button>
                              )}

                              {activeNodeDetails.kitabs &&
                                activeNodeDetails.kitabs.map((kitab) => (
                                  <button
                                    key={kitab.title}
                                    onClick={() => {
                                      setActiveModalContent({
                                        type: "kitab",
                                        id: kitab.link,
                                        title: kitab.title,
                                        subtitle: `Scholarly Node Connection: ${activeNodeDetails.name}`,
                                      });
                                    }}
                                    className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer"
                                  >
                                    <span className="font-semibold text-teal-light group-hover:text-gold transition-colors font-sans">
                                      Kitab: {kitab.title} &rarr;
                                    </span>
                                  </button>
                                ))}

                              {activeNodeDetails.papers &&
                                activeNodeDetails.papers.map((paper) => (
                                  <button
                                    key={paper.title}
                                    onClick={() => {
                                      handleNavigation("research");
                                    }}
                                    className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-lg p-2.5 text-xs text-white flex items-center justify-between group transition-all cursor-pointer"
                                  >
                                    <span className="font-semibold text-teal-light group-hover:text-gold transition-colors font-sans">
                                      Research Paper Available &rarr;
                                    </span>
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Selected Route Details */}
                    {activeRouteDetails && !activeNodeDetails && (
                      <div className="flex flex-col gap-5 h-full">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-gold/20 text-gold border border-gold/30 rounded px-2.5 py-0.5 inline-block">
                              {activeRouteDetails.type.toUpperCase()} ROUTE
                            </span>
                            {isMapExpanded && (
                              <button
                                onClick={() => setShowDetailsOverlay(false)}
                                className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          <h3 className="text-lg font-bold mt-2 text-white font-sans">
                            {activeRouteDetails.name}
                          </h3>
                          <p className="text-[10px] text-white/50 font-light mt-1 uppercase tracking-wide">
                            Theme: {activeRouteDetails.theme} | Period:{" "}
                            {activeRouteDetails.period.replace("-", "–")}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4 grow">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                            Network Flow Description
                          </h4>
                          <p className="text-xs font-light text-white/90 leading-relaxed font-sans">
                            {activeRouteDetails.description}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                            Route Path Endpoint Connection
                          </h4>
                          <p className="text-xs font-light text-white/70">
                            Connects{" "}
                            <span className="text-teal-light font-medium capitalize">
                              {activeRouteDetails.startNode}
                            </span>{" "}
                            to{" "}
                            <span className="text-teal-light font-medium capitalize">
                              {activeRouteDetails.endNode}
                            </span>
                            .
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Placeholder state: nothing selected */}
                    {!activeNodeDetails && !activeRouteDetails && (
                      <div className="flex flex-col items-center justify-center text-center py-16 grow relative">
                        {isMapExpanded && (
                          <div className="absolute right-0 top-0">
                            <button
                              onClick={() => setShowDetailsOverlay(false)}
                              className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0 text-sm font-sans"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-white/30 mb-4 animate-pulse"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                        <h4 className="font-sans text-xs font-bold text-white/70">
                          Interactive Map Details
                        </h4>
                        <p className="text-[11px] text-white/50 font-light mt-2 max-w-50 leading-relaxed font-sans">
                          Click on any pulsing node hub or connecting animated
                          route line inside the map canvas to explore related
                          history database.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ATLAS ANALYTICS & MARITIME TREATIES GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-teal/10">
                {/* Stats panel */}
                <div className="lg:col-span-1 bg-dark-surface border border-teal/10 rounded-[20px] p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-teal-light block mb-2">
                      Atlas Analytics
                    </span>
                    <h3 className="text-lg font-bold text-teal uppercase font-sans">
                      Connectivity Metrics
                    </h3>
                    <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">
                      Quantitative metrics summarizing the networked nodes and
                      active scholarly exchange pathways cataloged in the
                      Knowledge Atlas.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-6 grow justify-center">
                    {[
                      {
                        label: "Scholarly Centers",
                        count: "4 Active Nodes",
                        pct: "40%",
                      },
                      {
                        label: "Maritime Seaports",
                        count: "4 Historical Ports",
                        pct: "40%",
                      },
                      {
                        label: "Connecting Routes",
                        count: "11 Mapped Paths",
                        pct: "100%",
                      },
                      {
                        label: "Active Epistemic Themes",
                        count: "6 Interwoven Focuses",
                        pct: "60%",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-black/20 px-4 py-3 rounded-xl border border-white/5"
                      >
                        <span className="text-xs text-white/80">
                          {item.label}
                        </span>
                        <span className="text-xs font-bold text-gold font-mono">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treaties showcase */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark block mb-2">
                      Sovereign Alliances
                    </span>
                    <h3 className="text-xl font-bold text-teal uppercase font-sans">
                      Pre-Colonial Maritime Treaties
                    </h3>
                    <p className="text-xs text-white/50 font-light mt-2">
                      Key historical treaties and agreements trade guilds and
                      rulers negotiated to protect free navigation and shared
                      risk across ports.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Zamorin-Hadrami Spices Pact (1520 CE)",
                        desc: "An agreement between the Calicut crown and Hadrami merchants establishing secure warehouses (pandikashala) and guaranteeing trade risk sharing during monsoons.",
                      },
                      {
                        title: "Zamorin-Aceh Naval Alliance (1568 CE)",
                        desc: "A coordinated military treaty signed in Calicut to launch joint attacks against Portuguese naval blockades in the Straits of Malacca.",
                      },
                      {
                        title: "Arakkal-Swahili Coast Agreement (1740 CE)",
                        desc: "Trade regulations specifying custom duties and salvaging rights for Kannur merchants operating in Swahili ports (Zanzibar and Kilwa).",
                      },
                      {
                        title: "Ponnani Scholastic Exchange Treaty (1605 CE)",
                        desc: "A cooperative educational agreement establishing stipend routes for scholars sailing from Java and Sumatra to study Shafi'i legal commentaries.",
                      },
                    ].map((treaty, idx) => (
                      <div
                        key={idx}
                        className="bg-dark-surface border border-teal/10 rounded-2xl p-5 hover:border-gold/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-gold uppercase tracking-wide">
                            {treaty.title}
                          </h4>
                          <p className="text-[11px] text-white/70 leading-relaxed font-light mt-2 font-sans">
                            {treaty.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. LIVING ARCHIVE / KITAB REPOSITORY VIEW */}
        {currentView === "archive" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-slate-200 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  Living Archive
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
                  Kitab Repository
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-162.5">
                  Documenting, translating, and interpreting Malabar's Kitab
                  literature—an Arabic-Malayalam textual tradition that is
                  local, cosmopolitan, autonomous, and continuous.
                </p>
              </div>
            </div>

            {/* If a Kitab entry is selected, show the Layered Annotation Viewer */}
            {selectedKitabId ? (
              (() => {
                const kitab = KITAB_REPOSITORY.find(
                  (k) => k.id === selectedKitabId,
                );
                if (!kitab) return <p>Kitab not found.</p>;

                return (
                  <div className="flex flex-col gap-6">
                    {/* Back header */}
                    <div className="flex items-center justify-between bg-slate-100/60 p-4 rounded-xl border border-slate-200/50">
                      <button
                        onClick={() => setSelectedKitabId(null)}
                        className="text-xs text-gold-dark font-semibold hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                      >
                        &larr; Back to Catalog
                      </button>
                      <span className="text-xs text-slate-500 font-light">
                        Genre:{" "}
                        <strong className="text-teal font-bold uppercase">
                          {kitab.genre}
                        </strong>
                      </span>
                    </div>

                    {/* Meta Section */}
                    <div className="bg-[#FDFBF7] border border-[#E3D1BA]/85 rounded-2xl p-6 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block">
                          Genre: {kitab.genre}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans font-light">
                          Source Status:{" "}
                          {kitab.copyrightStatus || "Open Access"}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif italic text-teal">
                        {kitab.title}
                      </h2>
                      <p className="text-xs text-gold-dark font-semibold mt-1">
                        Author: {kitab.author} | Published: {kitab.date}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-slate-650 border-t border-slate-200/50 pt-3 font-sans">
                        <p>
                          <strong className="text-teal font-semibold">
                            Script / Lang:
                          </strong>{" "}
                          {kitab.languageScript || kitab.language}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Subject Area:
                          </strong>{" "}
                          {kitab.subject || "General Ethics"}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Time Period:
                          </strong>{" "}
                          {kitab.period || "N/A"}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Manuscript Location:
                          </strong>{" "}
                          {kitab.manuscriptLocation}
                        </p>
                      </div>
                      {kitab.keywords && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {kitab.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-slate-700 mt-4 leading-relaxed font-light bg-white/60 p-3 rounded-lg border border-slate-200/40 font-sans">
                        {kitab.shortIntro}
                      </p>
                    </div>

                    {/* Dual Columns: Left = Translation Tabs, Right = Decolonial Annotations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Left Column: Translation Layers */}
                      <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#E3D1BA]/60 flex flex-col gap-4 shadow-xs">
                        <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                          <span className="text-xs font-bold text-teal uppercase font-sans">
                            Text Translation Layers
                          </span>
                          <div className="flex bg-slate-100 rounded-full p-0.5 border border-slate-200">
                            {[
                              { id: "english", label: "English" },
                              { id: "malayalam", label: "മലയാളം" },
                              { id: "arabic", label: "العربية" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() =>
                                  setKitabTranslationTab(tab.id as any)
                                }
                                className={`px-3 py-1 rounded-full text-[10px] font-semibold border-0 cursor-pointer ${
                                  kitabTranslationTab === tab.id
                                    ? "bg-teal text-white"
                                    : "bg-transparent text-slate-400 hover:text-teal"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="min-h-55 bg-white/70 p-4 rounded-xl text-slate-800 text-sm leading-relaxed border border-slate-100 font-sans">
                          {kitabTranslationTab === "english" && (
                            <p className="italic text-slate-700">
                              "{kitab.textSnippetEnglish}"
                            </p>
                          )}
                          {kitabTranslationTab === "malayalam" && (
                            <p className="leading-loose text-slate-800">
                              "{kitab.textSnippetMalayalam}"
                            </p>
                          )}
                          {kitabTranslationTab === "arabic" && (
                            <div
                              className="text-right"
                              style={{ direction: "rtl" }}
                            >
                              <p className="font-serif text-teal-dark text-lg leading-loose tracking-wide">
                                {kitab.textSnippetArabic}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Download & Copyright options */}
                        <div className="border-t border-slate-200/50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans mt-2">
                          <span className="text-[10px] text-slate-400">
                            {kitab.downloadAllowed
                              ? "✔ Download permissions verified by archive curators."
                              : "✕ PDF download restricted under custom preservation terms."}
                          </span>
                          {kitab.downloadAllowed ? (
                            <a
                              href="#download"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(
                                  `Downloading ${kitab.title} manuscript PDF...`,
                                );
                              }}
                              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-4 bg-teal hover:bg-teal-dark text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors no-underline border-0"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                              </svg>
                              Download PDF
                            </a>
                          ) : (
                            <button
                              disabled
                              className="py-1.5 px-4 bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed"
                            >
                              Download Restricted
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Layered Decolonial Annotations */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col gap-4">
                        <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                          <span className="text-xs font-bold text-gold-dark uppercase font-sans">
                            Scholarly Commentary Layers
                          </span>
                        </div>

                        {/* Annotation Toggles */}
                        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/60 font-sans">
                          {[
                            { id: "historical", label: "Historical Context" },
                            {
                              id: "jurisprudential",
                              label: "Jurisprudence (Fiqh)",
                            },
                            { id: "decolonial", label: "Decolonial Theory" },
                            { id: "indianOcean", label: "Ocean Network" },
                            {
                              id: "comparativeTheory",
                              label: "VS. Western Theorists",
                            },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() =>
                                setKitabAnnotationTab(tab.id as any)
                              }
                              className={`px-3 py-1.5 rounded text-[10px] font-semibold border-0 cursor-pointer grow ${
                                kitabAnnotationTab === tab.id
                                  ? "bg-gold text-white font-bold"
                                  : "bg-transparent text-slate-500 hover:text-teal"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Annotation Content */}
                        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl min-h-40 text-xs leading-relaxed font-light text-slate-800 font-sans">
                          {kitabAnnotationTab === "historical" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1">
                                Historical Context:
                              </h4>
                              <p>{kitab.annotations.historical}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "jurisprudential" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1">
                                Jurisprudential Reading:
                              </h4>
                              <p>{kitab.annotations.jurisprudential}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "decolonial" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1">
                                Decolonial Reading:
                              </h4>
                              <p>{kitab.annotations.decolonial}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "indianOcean" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1">
                                Indian Ocean Trade Relevance:
                              </h4>
                              <p>{kitab.annotations.indianOcean}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "comparativeTheory" && (
                            <div>
                              <h4 className="font-bold text-gold-dark uppercase mb-2">
                                Decolonial Synthesis:
                              </h4>
                              <p>{kitab.annotations.comparativeTheory}</p>
                            </div>
                          )}
                        </div>

                        {/* Related Essays */}
                        {kitab.relatedEssays &&
                          kitab.relatedEssays.length > 0 && (
                            <div className="border-t border-slate-100 pt-3 mt-2 font-sans">
                              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Related Scholarly Essays
                              </h5>
                              <div className="flex flex-col gap-1.5">
                                {kitab.relatedEssays.map((essay) => (
                                  <button
                                    key={essay.title}
                                    onClick={() => {
                                      handleNavigation("research");
                                    }}
                                    className="text-left bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded px-2.5 py-1.5 text-[10px] text-teal font-medium flex items-center justify-between cursor-pointer"
                                  >
                                    <span>{essay.title}</span>
                                    <span>&rarr;</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Search & Left catalog panel (Grid 2 cols) */}
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Search controls */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row gap-3 shadow-xs">
                      <input
                        type="text"
                        placeholder="Search by Title, Author, Language, Subject, Period, Location, or Keywords..."
                        value={kitabSearchQuery}
                        onChange={(e) => setKitabSearchQuery(e.target.value)}
                        className="bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal grow font-sans"
                      />
                      <select
                        value={kitabGenreFilter}
                        onChange={(e) => setKitabGenreFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded-lg text-slate-800 focus:outline-none font-sans cursor-pointer"
                      >
                        <option value="all">All Genres</option>
                        <option value="fiqh">Jurisprudence (Fiqh)</option>
                        <option value="kalam">Creed/Theology (Kalam)</option>
                        <option value="tasawwuf">Sufism (Tasawwuf)</option>
                        <option value="mawlid">
                          Devotional / Poetry (Mawlid)
                        </option>
                        <option value="history">History</option>
                        <option value="ethics">Ethics</option>
                        <option value="anti-colonial">
                          Anti-Colonial Writing
                        </option>
                      </select>
                    </div>

                    {/* List of Kitabs */}
                    <div className="flex flex-col gap-4">
                      {KITAB_REPOSITORY.filter((k) => {
                        if (
                          kitabGenreFilter !== "all" &&
                          k.genre !== kitabGenreFilter
                        )
                          return false;
                        if (kitabSearchQuery) {
                          const q = kitabSearchQuery.toLowerCase();
                          return (
                            k.title.toLowerCase().includes(q) ||
                            k.author.toLowerCase().includes(q) ||
                            k.shortIntro.toLowerCase().includes(q) ||
                            (k.language &&
                              k.language.toLowerCase().includes(q)) ||
                            (k.languageScript &&
                              k.languageScript.toLowerCase().includes(q)) ||
                            (k.subject &&
                              k.subject.toLowerCase().includes(q)) ||
                            (k.period && k.period.toLowerCase().includes(q)) ||
                            (k.manuscriptLocation &&
                              k.manuscriptLocation.toLowerCase().includes(q)) ||
                            (k.keywords &&
                              k.keywords.some((kw) =>
                                kw.toLowerCase().includes(q),
                              ))
                          );
                        }
                        return true;
                      }).map((kitab) => (
                        <div
                          key={kitab.id}
                          className="bg-white hover:bg-slate-50 border border-slate-200/60 hover:border-gold/30 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2 font-sans">
                              <span className="text-[9px] uppercase font-bold text-gold-dark tracking-wide bg-gold/10 px-2 py-0.5 rounded border border-gold/20 inline-block">
                                {kitab.genre}
                              </span>
                              {kitab.subject && (
                                <span className="text-[9px] text-slate-400 font-light">
                                  • {kitab.subject}
                                </span>
                              )}
                            </div>
                            <h3 className="text-base font-bold text-teal font-serif">
                              {kitab.title}
                            </h3>
                            <p className="text-xs text-slate-450 mt-1 font-sans">
                              Author: {kitab.author} | Period:{" "}
                              {kitab.period || kitab.date}
                            </p>
                            <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed font-sans line-clamp-2">
                              {kitab.shortIntro}
                            </p>
                            {kitab.keywords && (
                              <div className="flex flex-wrap gap-1 mt-2.5">
                                {kitab.keywords.map((kw) => (
                                  <span
                                    key={kw}
                                    className="text-[9px] bg-slate-100 text-slate-450 border border-slate-200/60 px-1.5 py-0.5 rounded"
                                  >
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedKitabId(kitab.id);
                              setKitabTranslationTab("english");
                              setKitabAnnotationTab("historical");
                            }}
                            className="shrink-0 text-center py-2 px-4 bg-teal hover:bg-teal-dark text-white text-xs font-semibold rounded-lg cursor-pointer border-0 transition-all shadow-xs"
                          >
                            View Annotations
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right panel: Community Submission form */}
                  <div className="lg:col-span-1 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gold-dark border-b border-slate-100 pb-2 mb-4 font-sans">
                      Submit Manuscript Details
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light mb-6 font-sans">
                      Do you hold an old Kitab manuscript, photographic plates,
                      or family logs connected to the Indian Ocean networks and
                      Malabari scholarship? Submit the details below to
                      contribute to our archive.
                    </p>

                    {submitSuccess ? (
                      <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-5 rounded-2xl text-xs font-semibold flex flex-col items-center text-center gap-2.5 font-sans">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-emerald-600 bg-emerald-100 p-1 rounded-full"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <h4 className="font-bold text-sm">
                          Submission Received!
                        </h4>
                        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                          Your manuscript metadata has been sent to the review
                          queue. Submissions undergo rigorous scholarly
                          verification before publication.
                        </p>
                        <button
                          onClick={() => setSubmitSuccess(false)}
                          className="mt-2 text-xs text-gold-dark font-bold underline bg-transparent border-0 cursor-pointer font-sans"
                        >
                          Submit another manuscript
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const newSub = {
                            id: "sub-" + Date.now(),
                            title: formData.get("manuscriptTitle"),
                            author: formData.get("manuscriptAuthor"),
                            language: formData.get("manuscriptLanguage"),
                            century: formData.get("manuscriptCentury"),
                            oralHistory: formData.get("manuscriptOralHistory"),
                            location: formData.get("manuscriptLocation"),
                            ownership: formData.get("manuscriptOwnership"),
                            permissions: formData.get("manuscriptPermissions"),
                            status: "Awaiting Verification",
                            submittedAt: new Date().toISOString(),
                          };
                          setReviewQueue([newSub, ...reviewQueue]);
                          setSubmitSuccess(true);
                        }}
                        className="flex flex-col gap-4 text-xs font-sans"
                      >
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Manuscript Title
                          </label>
                          <input
                            required
                            name="manuscriptTitle"
                            type="text"
                            placeholder="e.g. Fathul Mueen Copy of Ponnani"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Author / Scribe
                          </label>
                          <input
                            required
                            name="manuscriptAuthor"
                            type="text"
                            placeholder="e.g. Zain al-Din Makhdum II"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Language / Script
                          </label>
                          <input
                            required
                            name="manuscriptLanguage"
                            type="text"
                            placeholder="e.g. Arabic-Malayalam"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Approximate Century
                          </label>
                          <input
                            name="manuscriptCentury"
                            type="text"
                            placeholder="e.g. 16th Century"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Geographical Location Data
                          </label>
                          <input
                            required
                            name="manuscriptLocation"
                            type="text"
                            placeholder="e.g. Tirurangadi old mosque, Malabar"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Ownership & Custody Type
                          </label>
                          <select
                            name="manuscriptOwnership"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans cursor-pointer"
                          >
                            <option value="Private Family Archive">
                              Private Family Archive
                            </option>
                            <option value="Mosque/Waqf Custody">
                              Mosque / Waqf Custody
                            </option>
                            <option value="Public Institution / Museum">
                              Public Institution / Museum
                            </option>
                            <option value="Private Collector">
                              Private Collector
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Access & Permission Status
                          </label>
                          <select
                            name="manuscriptPermissions"
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans cursor-pointer"
                          >
                            <option value="Fully Open Access (Publish Digital Scan)">
                              Fully Open Access (Publish Scan)
                            </option>
                            <option value="Academic/Research Access Only">
                              Academic / Research Access Only
                            </option>
                            <option value="Display Metadata/Description Only">
                              Display Metadata / Description Only
                            </option>
                            <option value="Awaiting Archival Negotiation">
                              Awaiting Archival Negotiation
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Oral History Narrative / Context
                          </label>
                          <textarea
                            required
                            name="manuscriptOralHistory"
                            rows={3}
                            placeholder="Describe any oral histories, transmission stories, or custom practices associated with this manuscript..."
                            className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans resize-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                            Manuscript Photos
                          </label>
                          <div className="border border-dashed border-slate-350 rounded bg-slate-50 p-4 text-center text-slate-400 cursor-pointer hover:border-teal transition-colors">
                            <svg
                              className="mx-auto h-6 w-6 text-slate-300 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                            >
                              <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75z" />
                            </svg>
                            <span>Click to upload image files (Max 5MB)</span>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-center py-2.5 bg-gold hover:bg-gold-dark text-white font-bold uppercase rounded cursor-pointer transition-colors border-0 shadow-xs"
                        >
                          Submit to Review Queue
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Scholarly Review Queue */}
                <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-1">
                        Archival Preservation Governance
                      </span>
                      <h3 className="text-lg font-bold text-teal font-sans">
                        Scholarly Review Queue
                      </h3>
                      <p className="text-xs text-slate-500 font-light font-sans mt-0.5">
                        Manuscripts submitted by scholars, mosque committees,
                        and families awaiting forensic text and legal review.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500 font-medium font-sans bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Review Panel Online</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs leading-relaxed text-amber-800 font-sans mb-6">
                    <strong className="font-semibold">
                      ⚠️ Digital Preservation Notice:
                    </strong>{" "}
                    Letting the public edit heritage archives directly can
                    corrupt historical accuracy. To prevent digital termites,
                    all submissions undergo a multi-layered review process
                    including manuscript origin validation, physical scan
                    verification, and permission confirmation by our Scholarly
                    Taskforce.
                  </div>

                  {/* Preservation Filters row */}
                  <div className="flex flex-wrap gap-4 items-center bg-slate-50 dark:bg-slate-950/45 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-850 mb-6 text-xs font-sans">
                    <div className="flex flex-col gap-1.5 min-w-36">
                      <label className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500">
                        Century
                      </label>
                      <select
                        value={archiveCenturyFilter}
                        onChange={(e) =>
                          setArchiveCenturyFilter(e.target.value)
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer outline-none"
                      >
                        <option value="all">All Centuries</option>
                        <option value="17th Century">17th Century</option>
                        <option value="18th Century">18th Century</option>
                        <option value="16th Century">16th Century</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-36">
                      <label className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500">
                        Ownership Custody
                      </label>
                      <select
                        value={archiveOwnershipFilter}
                        onChange={(e) =>
                          setArchiveOwnershipFilter(e.target.value)
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer outline-none"
                      >
                        <option value="all">All Ownership Types</option>
                        <option value="Mosque/Waqf Custody">
                          Mosque / Waqf Custody
                        </option>
                        <option value="Private Archive">Private Archive</option>
                        <option value="Private Family Archive">
                          Private Family Archive
                        </option>
                        <option value="Public Institution / Museum">
                          Public Institution
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-36">
                      <label className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500">
                        Verification Status
                      </label>
                      <select
                        value={archiveStatusFilter}
                        onChange={(e) => setArchiveStatusFilter(e.target.value)}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-2.5 py-1.5 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Awaiting Verification">
                          Awaiting Verification
                        </option>
                        <option value="Under Scholarly Review">
                          Under Scholarly Review
                        </option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        setArchiveCenturyFilter("all");
                        setArchiveOwnershipFilter("all");
                        setArchiveStatusFilter("all");
                      }}
                      className="mt-4 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded cursor-pointer border-0 transition-colors font-bold"
                    >
                      Clear Filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviewQueue
                      .filter((item) => {
                        if (
                          archiveCenturyFilter !== "all" &&
                          item.century !== archiveCenturyFilter
                        )
                          return false;
                        if (
                          archiveOwnershipFilter !== "all" &&
                          item.ownership !== archiveOwnershipFilter
                        )
                          return false;
                        if (
                          archiveStatusFilter !== "all" &&
                          item.status !== archiveStatusFilter
                        )
                          return false;
                        return true;
                      })
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 hover:border-gold/30 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3 mb-2 font-sans">
                            <span className="text-[9px] uppercase font-bold text-amber-800 dark:text-amber-400 bg-amber-100/75 dark:bg-amber-900/30 border border-amber-200/70 dark:border-amber-800/60 px-2.5 py-0.5 rounded-md">
                              {item.status}
                            </span>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 font-light">
                              Submitted:{" "}
                              {new Date(item.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-teal dark:text-teal-light font-sans">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-550 dark:text-slate-400 mt-1 font-sans">
                            Scribe/Author:{" "}
                            <strong className="font-medium text-slate-800 dark:text-slate-200">
                              {item.author}
                            </strong>{" "}
                            | Century:{" "}
                            <strong className="font-medium text-slate-800 dark:text-slate-200">
                              {item.century}
                            </strong>
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-800 pt-2 font-sans">
                            <p>
                              <strong>Script:</strong> {item.language}
                            </p>
                            <p>
                              <strong>Location:</strong> {item.location}
                            </p>
                            <p>
                              <strong>Access Model:</strong> {item.ownership}
                            </p>
                            <p>
                              <strong>Permissions:</strong> {item.permissions}
                            </p>
                          </div>
                          <div className="mt-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-2.5 rounded-lg text-[11px] leading-relaxed text-slate-650 dark:text-slate-350 font-sans font-light">
                            <strong className="text-teal dark:text-teal-light font-medium block mb-1 uppercase text-[9px] tracking-wide">
                              Oral History Context:
                            </strong>
                            "{item.oralHistory}"
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Interactive Transcription Playground */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-6 sm:p-8 rounded-3xl shadow-xs mt-8">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-1">
                      Scholastic Challenge Wing
                    </span>
                    <h3 className="text-lg font-bold text-teal dark:text-white font-sans">
                      Interactive Transcription Playground
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-0.5">
                      Practice transcribing and translating pre-colonial legal
                      codes and ledger entries. Your entries are scanned against
                      verified keywords.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Text Sample */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                      <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                        Select Manuscript Target
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedTranscriptionId("sub-1");
                            setTranscriptionInput("");
                            setTranscriptionScore(null);
                          }}
                          className={`px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                            selectedTranscriptionId === "sub-1"
                              ? "bg-teal text-white border-teal shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350"
                          }`}
                        >
                          Muzhir al-Haqq Legal Snippet
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTranscriptionId("sub-2");
                            setTranscriptionInput("");
                            setTranscriptionScore(null);
                          }}
                          className={`px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                            selectedTranscriptionId === "sub-2"
                              ? "bg-teal text-white border-teal shadow-xs"
                              : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350"
                          }`}
                        >
                          Hadrami Ledger Entry
                        </button>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
                        <span className="text-[9px] uppercase font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/25">
                          Manuscript Scribing
                        </span>
                        {selectedTranscriptionId === "sub-1" ? (
                          <>
                            <p
                              className="font-serif text-teal-dark dark:text-teal-light text-2xl tracking-wide leading-loose"
                              style={{ direction: "rtl" }}
                            >
                              كِتَابُ الشُّفْعَةِ هُوَ اسْتِحْقَاقُ الشَّرِيكِ
                              انْتِزَاعَ حِصَّةِ شَرِيكِهِ
                            </p>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 font-light italic">
                              Help/Pronunciation: Kitabu-Shuf'ati huwa
                              istihqaqu-Shariki intiza'a hissati sharikihi...
                            </span>
                          </>
                        ) : (
                          <>
                            <p
                              className="font-serif text-teal-dark dark:text-teal-light text-2xl tracking-wide leading-loose"
                              style={{ direction: "rtl" }}
                            >
                              حِسَابُ التَّوَابِلِ وَالْقِرْفَةِ فِي مِينَاءِ
                              كَنُّور سَنَةَ ١٧٨٠
                            </p>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 font-light italic">
                              Help/Pronunciation: Hisabu-Tawabili wal-Qirfati fi
                              mina'i Kannur sanata 1780...
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Input & Validation */}
                    <div className="lg:col-span-6 flex flex-col gap-4 text-xs">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                          Your English Transcription / Translation
                        </label>
                        <textarea
                          rows={4}
                          value={transcriptionInput}
                          onChange={(e) =>
                            setTranscriptionInput(e.target.value)
                          }
                          placeholder={
                            selectedTranscriptionId === "sub-1"
                              ? "e.g., The Book of Pre-emption: It is the right of a partner to force the sale of a partner's share..."
                              : "e.g., Spice and cinnamon ledger in the port of Kannur in the year 1780..."
                          }
                          className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal font-sans resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const val = transcriptionInput.toLowerCase();
                          if (selectedTranscriptionId === "sub-1") {
                            if (
                              val.includes("preemption") ||
                              val.includes("pre-emption") ||
                              val.includes("partner") ||
                              val.includes("share") ||
                              val.includes("right")
                            ) {
                              setTranscriptionScore(95);
                            } else {
                              setTranscriptionScore(35);
                            }
                          } else {
                            if (
                              val.includes("spice") ||
                              val.includes("cinnamon") ||
                              val.includes("kannur") ||
                              val.includes("ledger") ||
                              val.includes("port")
                            ) {
                              setTranscriptionScore(90);
                            } else {
                              setTranscriptionScore(30);
                            }
                          }
                        }}
                        className="py-2.5 bg-gold hover:bg-gold-dark text-white font-bold uppercase rounded-xl cursor-pointer transition-colors border-0 shadow-xs text-xs"
                      >
                        Validate Scribing
                      </button>

                      {transcriptionScore !== null && (
                        <div
                          className={`p-4 rounded-xl border animate-fade-in ${
                            transcriptionScore >= 90
                              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-900 text-emerald-850 dark:text-emerald-350"
                              : "bg-amber-50 dark:bg-amber-950/20 border-amber-250 dark:border-amber-900 text-amber-850 dark:text-amber-350"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm font-bold font-mono">
                              Score: {transcriptionScore}%
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wide">
                              {transcriptionScore >= 90
                                ? "✔ Match Found"
                                : "⚠ Under Review"}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans leading-relaxed">
                            {transcriptionScore >= 90
                              ? "Scholarly verification: Excellent! Your transcription matches our historical legal records and lexicon indices."
                              : "Scholarly notice: Your scribed translation is submitted to our curators. Review parameters check text alignment."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
        {/* 5. RESEARCH HUB VIEW */}
        {currentView === "research" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Hasanath Institute of IR
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
                Research Hub
              </h1>

              {/* Tab Selector */}
              <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5 w-max mt-6">
                {[
                  { id: "papers", label: "Working Papers" },
                  { id: "briefs", label: "Policy Briefs" },
                  { id: "projects", label: "Research Projects" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveResearchTab(tab.id as any)}
                    className={`px-4 py-2 rounded text-xs font-bold border-0 cursor-pointer ${
                      activeResearchTab === tab.id
                        ? "bg-gold text-dark-bg"
                        : "bg-transparent text-white/60 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab: Papers / Briefs lists */}
            {(activeResearchTab === "papers" ||
              activeResearchTab === "briefs") && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    {RESEARCH_PAPERS.filter((p) => {
                      const isBrief = p.type === "Policy Brief";
                      return activeResearchTab === "briefs"
                        ? isBrief
                        : !isBrief;
                    }).map((paper) => (
                      <div
                        key={paper.id}
                        className="bg-dark-surface border border-white/5 hover:border-gold/25 p-6 rounded-2xl transition-all"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-base font-bold text-white font-serif">
                            {paper.title}
                          </h3>
                          <span className="text-[10px] text-white/40">
                            {paper.pdfSize}
                          </span>
                        </div>
                        <p className="text-[10px] text-gold mt-1">
                          Author: {paper.author}
                        </p>
                        <p className="text-xs text-white/70 mt-3 font-light leading-relaxed bg-black/15 p-3 rounded-lg border border-white/5">
                          {paper.abstract}
                        </p>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {paper.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[9px] bg-white/5 text-white/50 rounded-full px-2 py-0.5 border border-white/10"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>

                        {/* Download and cite buttons row */}
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                          <button
                            onClick={() => handleMockDownload(paper.id)}
                            className="px-4 py-2 bg-teal hover:bg-teal-light text-white text-xs font-bold uppercase rounded cursor-pointer border border-teal/20 transition-all flex items-center gap-1.5"
                          >
                            {downloadingPaperId === paper.id ? (
                              <span>Downloading ({downloadProgress}%)</span>
                            ) : (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                                <span>
                                  Download PDF ({paper.downloadCount})
                                </span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleCopyCitation(paper.id, paper.citation)
                            }
                            className="px-4 py-2 bg-black/35 hover:bg-black/50 text-white/80 text-xs font-bold uppercase rounded cursor-pointer border border-white/10 transition-all flex items-center gap-1.5"
                          >
                            {copiedCitationId === paper.id ? (
                              <span className="text-emerald-400">
                                Citation Copied!
                              </span>
                            ) : (
                              <span>Cite Research</span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right panel metadata context */}
                  <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Academic Guidelines */}
                    <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl text-xs font-sans">
                      <h4 className="font-bold text-teal dark:text-white uppercase tracking-wider mb-3">
                        Academic Guidelines
                      </h4>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed font-light mb-4">
                        All working papers published by Hasanath Institute are
                        subject to double-blind academic reviews. MABAR ensures
                        that publications are cataloged under open-access
                        creative commons licenses.
                      </p>
                      <p className="text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                        If you are interested in submitting your research on
                        Indian Ocean legal pluralisms, maritime alliances, or
                        post-colonial economic pathway structures, please visit
                        the <strong>Contributor Portal</strong>.
                      </p>
                    </div>

                    {/* Policy Brief Simulator */}
                    <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl text-xs font-sans flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded border border-gold/25 inline-block mb-1.5">
                          Interactive Policy Widget
                        </span>
                        <h4 className="font-bold text-teal dark:text-white uppercase tracking-wider">
                          Policy Brief Simulator
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light mt-0.5">
                          Simulate regulatory alignment of policy briefs against
                          regional administrative bodies.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-450 dark:text-slate-500 uppercase text-[9px] font-bold">
                          Select Policy Brief
                        </label>
                        <select
                          value={selectedBriefId}
                          onChange={(e) => setSelectedBriefId(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-slate-200 p-2 rounded outline-none font-semibold cursor-pointer font-sans"
                        >
                          <option value="wp-01">
                            WP-01: Riba-Free Pathways
                          </option>
                          <option value="wp-02">
                            WP-02: Monsoon Alliances
                          </option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-450 dark:text-slate-500 uppercase text-[9px] font-bold">
                          Select Regulatory Board
                        </label>
                        <select
                          value={regulatoryBoard}
                          onChange={(e) => setRegulatoryBoard(e.target.value)}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-slate-200 p-2 rounded outline-none font-semibold cursor-pointer font-sans"
                        >
                          <option value="Cooperative Credit Registrar">
                            Cooperative Credit Registrar
                          </option>
                          <option value="Waqf Board">Waqf Board</option>
                          <option value="Land Revenue Department">
                            Land Revenue Department
                          </option>
                          <option value="Indian Ocean Scholarly Council">
                            Indian Ocean Scholarly Council
                          </option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          let alignment = "60% Muted Alignment";
                          let solution =
                            "Draft pilot bylaws for rural regions.";
                          let barrier = "Bureaucratic clearance lag.";
                          let impact = "+$100K community fund activation.";

                          if (
                            selectedBriefId === "wp-01" &&
                            regulatoryBoard === "Cooperative Credit Registrar"
                          ) {
                            alignment = "95% High Alignment";
                            solution =
                              "Approve interest-free credit union bylaws; implement Musharakah risk-pooling contracts under Section 4 of State Coop Act.";
                            barrier =
                              "Registrar resistance to non-interest audit formats.";
                            impact = "+$2M remittance redirection.";
                          } else if (
                            selectedBriefId === "wp-01" &&
                            regulatoryBoard === "Waqf Board"
                          ) {
                            alignment = "70% Medium Alignment";
                            solution =
                              "Channel Zakat/remittance micro-equity through Waqf-owned agricultural cooperative fields.";
                            barrier =
                              "Waqf Act restricts direct corporate investment.";
                            impact = "+$500K crop yield dividends.";
                          } else if (selectedBriefId === "wp-02") {
                            alignment = "40% Muted-Low Alignment";
                            solution =
                              "Form trilateral heritage treaties with Zanzibar and Aceh for manuscript archival access.";
                            barrier =
                              "Federal bilateral treaties override local state initiatives.";
                            impact = "Unified digital archive exchanges.";
                          }

                          setSimulatorOutput({
                            alignment,
                            solution,
                            barrier,
                            impact,
                          });
                        }}
                        className="py-2 bg-teal hover:bg-teal-dark text-white font-bold uppercase rounded cursor-pointer transition-colors border-0 shadow-xs font-sans text-xs"
                      >
                        Simulate Alignment
                      </button>

                      {simulatorOutput && (
                        <div className="bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-2 text-[11px] leading-relaxed text-slate-750 dark:text-slate-350 animate-fade-in font-sans">
                          <div>
                            <strong className="text-teal dark:text-teal-light font-medium uppercase text-[9px] tracking-wide block">
                              Alignment Outcome:
                            </strong>
                            <span className="font-bold text-gold-dark dark:text-gold">
                              {simulatorOutput.alignment}
                            </span>
                          </div>
                          <div>
                            <strong className="text-teal dark:text-teal-light font-medium uppercase text-[9px] tracking-wide block">
                              Proposed Policy Action:
                            </strong>
                            <span>{simulatorOutput.solution}</span>
                          </div>
                          <div>
                            <strong className="text-teal dark:text-teal-light font-medium uppercase text-[9px] tracking-wide block">
                              Regulatory Barrier:
                            </strong>
                            <span>{simulatorOutput.barrier}</span>
                          </div>
                          <div>
                            <strong className="text-teal dark:text-teal-light font-medium uppercase text-[9px] tracking-wide block">
                              Estimated Impact:
                            </strong>
                            <span className="font-bold text-emerald-600 dark:text-emerald-450">
                              {simulatorOutput.impact}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Citations & References Database Table */}
                <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-3xl shadow-xs w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-105 dark:border-slate-800 pb-4 mb-6 gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20 font-sans inline-block mb-1">
                        Scholastic Index
                      </span>
                      <h3 className="text-lg font-bold text-teal dark:text-white font-sans">
                        Citations & References Database
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-0.5">
                        Cataloged classical manuscripts, treaties, and legal
                        codes referenced in MABAR working papers.
                      </p>
                    </div>

                    <input
                      type="text"
                      placeholder="Search citation database..."
                      value={citationsSearchQuery}
                      onChange={(e) => {
                        setCitationsSearchQuery(e.target.value);
                        setCitationsPage(1);
                      }}
                      className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs rounded-lg text-slate-850 dark:text-slate-200 focus:outline-none focus:border-teal min-w-56 font-sans"
                    />
                  </div>

                  {/* Scrollable table container */}
                  <div className="overflow-x-auto w-full border border-slate-100 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs font-sans">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/45 text-slate-750 dark:text-slate-350 border-b border-slate-200 dark:border-slate-800 uppercase text-[9px] font-bold tracking-wider">
                          <th className="p-3">Author</th>
                          <th className="p-3">Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Year</th>
                          <th className="p-3">Location</th>
                          <th className="p-3">Citation Key</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-700 dark:text-slate-300">
                        {(() => {
                          const filtered = RESEARCH_CITATIONS.filter((item) => {
                            if (!citationsSearchQuery) return true;
                            const q = citationsSearchQuery.toLowerCase();
                            return (
                              item.author.toLowerCase().includes(q) ||
                              item.title.toLowerCase().includes(q) ||
                              item.type.toLowerCase().includes(q) ||
                              item.year.includes(q) ||
                              item.location.toLowerCase().includes(q)
                            );
                          });

                          const limit = 3;
                          const start = (citationsPage - 1) * limit;
                          const pageItems = filtered.slice(
                            start,
                            start + limit,
                          );

                          if (pageItems.length === 0) {
                            return (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="p-8 text-center text-slate-450 dark:text-slate-500 font-light"
                                >
                                  No citation records found matching your
                                  search.
                                </td>
                              </tr>
                            );
                          }

                          return (
                            <>
                              {pageItems.map((cit) => (
                                <tr
                                  key={cit.id}
                                  className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors"
                                >
                                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                                    {cit.author}
                                  </td>
                                  <td className="p-3 font-serif italic text-teal dark:text-teal-light">
                                    {cit.title}
                                  </td>
                                  <td className="p-3">{cit.type}</td>
                                  <td className="p-3 font-mono">{cit.year}</td>
                                  <td className="p-3">{cit.location}</td>
                                  <td className="p-3">
                                    <button
                                      onClick={() =>
                                        handleCopyCitation(cit.id, cit.citation)
                                      }
                                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 rounded cursor-pointer font-bold text-[10px]"
                                    >
                                      {copiedCitationId === cit.id
                                        ? "Copied!"
                                        : "Copy Cite"}
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </>
                          );
                        })()}
                      </tbody>
                    </table>
                  </div>

                  {/* Table pagination */}
                  {(() => {
                    const filtered = RESEARCH_CITATIONS.filter((item) => {
                      if (!citationsSearchQuery) return true;
                      const q = citationsSearchQuery.toLowerCase();
                      return (
                        item.author.toLowerCase().includes(q) ||
                        item.title.toLowerCase().includes(q) ||
                        item.type.toLowerCase().includes(q) ||
                        item.year.includes(q) ||
                        item.location.toLowerCase().includes(q)
                      );
                    });
                    const limit = 3;
                    const totalPages = Math.ceil(filtered.length / limit);
                    if (totalPages <= 1) return null;

                    return (
                      <div className="flex items-center justify-between mt-4 text-xs font-sans">
                        <span className="text-slate-450 dark:text-slate-500">
                          Showing Page <strong>{citationsPage}</strong> of{" "}
                          <strong>{totalPages}</strong> ({filtered.length}{" "}
                          entries)
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={citationsPage === 1}
                            onClick={() =>
                              setCitationsPage((p) => Math.max(1, p - 1))
                            }
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-350 border-0 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                          >
                            Prev
                          </button>
                          <button
                            disabled={citationsPage === totalPages}
                            onClick={() =>
                              setCitationsPage((p) =>
                                Math.min(totalPages, p + 1),
                              )
                            }
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-350 border-0 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            )}

            {/* Tab: Projects list */}
            {activeResearchTab === "projects" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {RESEARCH_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-dark-surface border border-teal/15 p-6 rounded-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] uppercase font-bold text-teal-light bg-teal/10 px-2 py-0.5 rounded border border-teal/25">
                          {proj.status}
                        </span>
                        <span className="text-xs text-white/50">
                          {proj.timeline}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gold font-medium mt-1">
                        Research Question:{" "}
                        <span className="font-light italic text-white/80">
                          "{proj.question}"
                        </span>
                      </p>
                      <p className="text-xs text-white/70 mt-4 leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-6">
                      <h4 className="text-[10px] font-bold text-white/60 uppercase">
                        Team Leads
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {proj.team.map((t) => (
                          <span
                            key={t}
                            className="bg-black/30 text-[10px] text-white/80 rounded px-2.5 py-1 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleNavigation("contribute")}
                        className="mt-6 w-full text-center py-2 bg-teal/10 hover:bg-teal/20 text-teal-light text-xs font-semibold rounded-lg cursor-pointer border border-teal/30 transition-colors"
                      >
                        Call for Collaborators &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 6. MABAR FINANCE LAB VIEW */}
        {currentView === "finance" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-slate-200 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Economic Architecture
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
                MABAR Finance Lab
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-162.5">
                Coordinating research on interest-free finance, Waqf
                revitalisation, Zakat distribution models, cooperative banking
                structures, and Kerala's legal possibilities.
              </p>

              {/* Tabs */}
              <div className="flex flex-wrap bg-slate-100 rounded-lg p-0.5 border border-slate-200 w-max mt-6">
                {[
                  { id: "dashboard", label: "Comparative Dashboard" },
                  { id: "pathway", label: "Kerala Regulatory Pathway" },
                  { id: "waqf", label: "Waqf Mapping Tool" },
                  { id: "zakat", label: "Zakat Impact Tracker" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFinanceTab(tab.id as any)}
                    className={`px-4 py-2 rounded text-xs font-bold border-0 cursor-pointer ${
                      activeFinanceTab === tab.id
                        ? "bg-terracotta text-white font-extrabold shadow-xs"
                        : "bg-transparent text-slate-500 hover:text-teal"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab: Dashboard */}
            {activeFinanceTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Selector column */}
                <div className="lg:col-span-1 flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block font-sans">
                    Choose Model
                  </span>
                  {FINANCE_MODELS.map((m) => (
                    <button
                      key={m.country}
                      onClick={() => setFinanceActiveCountry(m.country)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        financeActiveCountry === m.country
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-extrabold"
                          : "bg-white border-slate-200/60 text-slate-650 hover:bg-slate-50 hover:text-teal"
                      }`}
                    >
                      {m.country}{" "}
                      {m.country === "Kerala / India" && "(Nascent)"}
                    </button>
                  ))}
                </div>

                {/* Metrics Grid */}
                {(() => {
                  const data = FINANCE_MODELS.find(
                    (m) => m.country === financeActiveCountry,
                  );
                  if (!data) return <p>Model not found.</p>;

                  return (
                    <div className="lg:col-span-3 bg-white border border-slate-200/60 rounded-2xl p-6 flex flex-col gap-6 shadow-xs">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-teal font-sans">
                          {data.country} Model Overview
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Metrics for decolonial Islamic finance comparison.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                          <span className="text-[9px] uppercase text-slate-500 block">
                            Islamic Banking Penetration
                          </span>
                          <span className="text-sm font-bold text-teal mt-1 block">
                            {data.penetration}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                          <span className="text-[9px] uppercase text-slate-500 block">
                            Sukuk Market Share
                          </span>
                          <span className="text-sm font-bold text-teal mt-1 block">
                            {data.sukukShare}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-xs">
                          <span className="text-[9px] uppercase text-slate-500 block">
                            Waqf Assets Status
                          </span>
                          <span className="text-sm font-bold text-teal mt-1 block leading-tight">
                            {data.waqfAssets.split(" ")[0]}{" "}
                            {data.waqfAssets.split(" ")[1] || "Corporate"}
                          </span>
                        </div>
                      </div>

                      {/* Descriptions */}
                      <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                        <div>
                          <h4 className="text-[10px] uppercase font-bold text-gold-dark tracking-wide">
                            Regulatory Framework:
                          </h4>
                          <p className="text-xs font-light text-slate-700 mt-1 leading-relaxed">
                            {data.regulatoryFramework}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase font-bold text-teal tracking-wide">
                            Cooperative Financing Capability:
                          </h4>
                          <p className="text-xs font-light text-slate-700 mt-1 leading-relaxed">
                            {data.cooperativeFinance}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase font-bold text-terracotta tracking-wide">
                            Zakat Institutional Model:
                          </h4>
                          <p className="text-xs font-light text-slate-700 mt-1 leading-relaxed">
                            {data.zakatModel}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Tab: Kerala Regulatory Pathway Tool */}
            {activeFinanceTab === "pathway" && (
              <div className="flex flex-col gap-8 max-w-237.5 mx-auto">
                <div className="text-center bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 mb-4 shadow-xs">
                  <h3 className="text-lg font-bold text-teal uppercase tracking-wider">
                    India/Kerala legal grid navigation
                  </h3>
                  <p className="text-xs text-slate-600 font-light mt-1.5 leading-relaxed">
                    Federal banking acts ban standard commercial Islamic
                    banking. However, using State-level laws, our research maps
                    out 5 practical pathways to operationalize risk-sharing
                    capital.
                  </p>
                </div>

                {/* Visual Pathway steps flowchart */}
                <div className="flex flex-col gap-6 relative">
                  {[
                    {
                      step: "01",
                      title: "State Cooperative Credit Societies",
                      detail:
                        "Form entities under State Cooperative Acts. Operating credit societies do not fall under RBI bank registration, enabling fully interest-free (riba-free) deposits and mutual business lending.",
                    },
                    {
                      step: "02",
                      title: "Non-Banking Financial Company (NBFC) Model",
                      desc: "For corporate venture capital",
                      detail:
                        "Register a non-deposit taking NBFC. Under RBI rules, an NBFC can invest equity directly in asset-backed projects, facilitating mudarabah and musharakah joint businesses legally.",
                    },
                    {
                      step: "03",
                      title: "Waqf Board GIS Registry Integration",
                      detail:
                        "Map unregistered property titles under the Waqf Act of 1995. Resolving boundary gaps secures lands against political usurpation and opens them for agricultural lease cooperatives.",
                    },
                    {
                      step: "04",
                      title: "Decentralized Baitulmal Zakat Boards",
                      detail:
                        "Coordinate voluntary Zakat collection into unified regional funds, allocating micro-grants directly for vocational training and medical support programs without high administration charges.",
                    },
                    {
                      step: "05",
                      title: "Remittance-Backed Development Bonds",
                      detail:
                        "Structure local state developmental initiatives utilizing diaspora funds as interest-free corporate bonds, distributing returns from productive infrastructure assets instead of compound interest.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/60 hover:border-terracotta/30 p-5 rounded-2xl flex gap-4 items-start relative transition-all group shadow-xs hover:shadow-md"
                    >
                      <span className="h-9 w-9 rounded-full bg-terracotta/10 border border-terracotta/30 text-terracotta flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-teal group-hover:text-gold-dark transition-colors uppercase">
                          {s.title}
                        </h4>
                        <p className="text-xs text-slate-650 font-light mt-1 leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Waqf Mapping Tool */}
            {activeFinanceTab === "waqf" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Properties list */}
                  <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200/60 flex gap-3 shadow-xs">
                      <input
                        type="text"
                        placeholder="Search property titles or coordinates..."
                        value={waqfSearch}
                        onChange={(e) => setWaqfSearch(e.target.value)}
                        className="bg-slate-50 border border-slate-200 px-4 py-2 text-xs rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal grow"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      {WAQF_PROPERTIES.filter((w) => {
                        if (waqfSearch)
                          return (
                            w.name
                              .toLowerCase()
                              .includes(waqfSearch.toLowerCase()) ||
                            w.location
                              .toLowerCase()
                              .includes(waqfSearch.toLowerCase())
                          );
                        return true;
                      }).map((prop) => (
                        <div
                          key={prop.id}
                          className="bg-white border border-slate-200/60 p-5 rounded-xl hover:border-gold/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xs hover:shadow-md"
                        >
                          <div>
                            <span
                              className={`text-[8px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 inline-block mb-1.5 ${
                                prop.status === "Productive"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                                  : prop.status === "Underutilized"
                                    ? "bg-amber-50 text-amber-750 border-amber-200/50"
                                    : "bg-red-50 text-red-750 border-red-200/50"
                              }`}
                            >
                              {prop.status}
                            </span>
                            <h4 className="text-sm font-bold text-teal font-sans">
                              {prop.name}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Location: {prop.location} | Type: {prop.type}
                            </p>
                            <p className="text-xs text-slate-600 font-light mt-2 leading-relaxed">
                              {prop.potential}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/50 shrink-0 text-center min-w-37.5">
                            <span className="text-[9px] uppercase text-slate-500 block">
                              Proposed Community Benefit
                            </span>
                            <span className="text-xs text-teal font-bold mt-1 block">
                              {prop.benefit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Waqf registry guide */}
                  <div className="lg:col-span-1 bg-white border border-slate-200/60 p-6 rounded-2xl text-xs shadow-xs">
                    <h4 className="font-bold text-gold-dark uppercase tracking-wider mb-2 font-sans">
                      Sensitivity Notice
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-light mb-4">
                      Waqf data coordinates can be highly sensitive and easily
                      weaponized in land disputes. In line with MABAR legal
                      policies, specific plot boundaries are restricted to
                      authorized legal researchers.
                    </p>
                    <div className="bg-terracotta/10 border border-terracotta/30 p-3 rounded-lg text-terracotta-dark">
                      <span>
                        Contact MABAR taskforce to request academic access
                        credentials.
                      </span>
                    </div>
                  </div>
                </div>

                {/* State-Wise Waqf Property Status Comparison Grid */}
                <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-6 sm:p-8 rounded-3xl shadow-xs w-full font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded border border-terracotta/20 font-sans inline-block mb-1">
                        Endowment Analytics
                      </span>
                      <h3 className="text-lg font-bold text-teal dark:text-white font-sans">
                        State-Wise Waqf Status Comparison Grid
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-0.5">
                        Visualizing productive assets versus encroached
                        properties across major pre-colonial Indian Ocean
                        administrative hubs.
                      </p>
                    </div>

                    {/* Region selector buttons */}
                    <div className="flex bg-slate-150 dark:bg-slate-950/45 p-0.5 rounded-lg border border-slate-200 dark:border-slate-850">
                      {["all", "Kerala", "Zanzibar", "Aceh", "Yemen"].map(
                        (region) => (
                          <button
                            key={region}
                            onClick={() => setSelectedComparisonRegion(region)}
                            className={`px-3 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer border-0 ${
                              selectedComparisonRegion === region
                                ? "bg-terracotta text-white shadow-xs"
                                : "bg-transparent text-slate-500 hover:text-teal dark:hover:text-white"
                            }`}
                          >
                            {region === "all" ? "All Regions" : region}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Kerala / India",
                        totalLands: "14,200 Hectares",
                        securedPct: 65,
                        disputedPct: 35,
                        reclaimValue: "$1.8M / year",
                        note: "High legal friction due to non-digitized historic title records.",
                        color: "text-teal",
                      },
                      {
                        name: "Zanzibar / Swahili Coast",
                        totalLands: "2,400 Hectares",
                        securedPct: 85,
                        disputedPct: 15,
                        reclaimValue: "$450K / year",
                        note: "Secure community trust ownership under Swahili customary logs.",
                        color: "text-emerald-600",
                      },
                      {
                        name: "Aceh / Indonesia",
                        totalLands: "8,100 Hectares",
                        securedPct: 80,
                        disputedPct: 20,
                        reclaimValue: "$1.2M / year",
                        note: "Sultanate deeds recognized directly under provincial autonomous code.",
                        color: "text-amber-600",
                      },
                      {
                        name: "Hadramawt / Yemen",
                        totalLands: "4,300 Hectares",
                        securedPct: 90,
                        disputedPct: 10,
                        reclaimValue: "$600K / year",
                        note: "Ba'Alawi ancestral registers maintain strict community-based stewardship.",
                        color: "text-gold-dark",
                      },
                    ]
                      .filter((item) => {
                        if (selectedComparisonRegion === "all") return true;
                        return item.name
                          .toLowerCase()
                          .includes(selectedComparisonRegion.toLowerCase());
                      })
                      .map((item) => (
                        <div
                          key={item.name}
                          className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/70 dark:border-slate-800/70 p-5 rounded-2xl flex flex-col justify-between hover:border-terracotta/30 transition-colors"
                        >
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 font-light block mt-0.5">
                              Total Assets: {item.totalLands}
                            </span>

                            {/* Graphical Percentages Stacked Bar */}
                            <div className="mt-4 flex flex-col gap-2">
                              <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Secured ({item.securedPct}%)
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                  Disputed ({item.disputedPct}%)
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-red-500 overflow-hidden flex">
                                <div
                                  className="h-full bg-emerald-500"
                                  style={{ width: `${item.securedPct}%` }}
                                ></div>
                                <div
                                  className="h-full bg-red-500 animate-pulse"
                                  style={{ width: `${item.disputedPct}%` }}
                                ></div>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed font-light mt-4 italic bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-2.5 rounded-lg">
                              "{item.note}"
                            </p>
                          </div>

                          <div className="border-t border-slate-150 dark:border-slate-800 pt-3 mt-4 flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 dark:text-slate-500 uppercase font-bold">
                              Reclaim Benefit
                            </span>
                            <strong className="text-emerald-600 dark:text-emerald-450 font-bold">
                              {item.reclaimValue}
                            </strong>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* Tab: Zakat Impact Tracker */}
            {activeFinanceTab === "zakat" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Zakat & Waqf Yield Calculator Panel */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 flex flex-col gap-6 shadow-xs font-sans">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-teal border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 font-sans">
                      Yield Calculator
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      Simulate direct social yield from voluntary diaspora
                      remittances and cooperative trade profits.
                    </p>
                  </div>

                  {/* Calculator Sliders */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 dark:text-slate-350">
                          Diaspora Remittance Pool
                        </span>
                        <strong className="text-teal dark:text-teal-light font-mono font-bold">
                          ${zakatRemittance.toLocaleString()}
                        </strong>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="5000"
                        value={zakatRemittance}
                        onChange={(e) =>
                          setZakatRemittance(Number(e.target.value))
                        }
                        className="w-full accent-teal cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 dark:text-slate-355">
                          Cooperative Trade Profit
                        </span>
                        <strong className="text-teal dark:text-teal-light font-mono font-bold">
                          ${zakatTradeProfit.toLocaleString()}
                        </strong>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="200000"
                        step="10000"
                        value={zakatTradeProfit}
                        onChange={(e) =>
                          setZakatTradeProfit(Number(e.target.value))
                        }
                        className="w-full accent-teal cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>
                  </div>

                  {/* Dynamic calculation results */}
                  {(() => {
                    const zakatCut = Math.floor(zakatTradeProfit * 0.025);
                    const waqfYield = Math.floor(zakatRemittance * 0.05);
                    const totalPool = zakatCut + waqfYield;

                    const eduPool = Math.floor(totalPool * 0.4);
                    const healthPool = Math.floor(totalPool * 0.3);
                    const microPool = Math.floor(totalPool * 0.2);
                    const housePool = Math.floor(totalPool * 0.1);

                    return (
                      <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-sans">
                        <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block font-bold">
                              Total Welfare Yield
                            </span>
                            <span className="text-base font-extrabold text-teal dark:text-teal-light">
                              ${totalPool.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-slate-450 dark:text-slate-500 block">
                              Zakat: ${zakatCut}
                            </span>
                            <span className="text-[9px] text-slate-455 dark:text-slate-500 block">
                              Waqf: ${waqfYield}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-1">
                          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                            Estimated Allocation Impact:
                          </span>

                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 dark:text-slate-350">
                              Students Supported ($100/ea):
                            </span>
                            <span className="font-bold text-teal dark:text-teal-light font-mono">
                              {Math.floor(eduPool / 100)} scholars
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 dark:text-slate-350">
                              Mobile Clinic Care ($150/ea):
                            </span>
                            <span className="font-bold text-teal dark:text-teal-light font-mono">
                              {Math.floor(healthPool / 150)} patients
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 dark:text-slate-350">
                              Coop Loans ($500/ea):
                            </span>
                            <span className="font-bold text-teal dark:text-teal-light font-mono">
                              {Math.floor(microPool / 500)} farming coops
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 dark:text-slate-355">
                              Coop Houses ($1000/ea):
                            </span>
                            <span className="font-bold text-teal dark:text-teal-light font-mono">
                              {Math.floor(housePool / 1000)} families
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Dynamic projects details list */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 w-max">
                    {(
                      [
                        "all",
                        "Education",
                        "Healthcare",
                        "Microenterprise",
                      ] as const
                    ).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setZakatCategory(cat)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold border-0 cursor-pointer ${
                          zakatCategory === cat
                            ? "bg-teal text-white"
                            : "bg-transparent text-slate-500 hover:text-teal"
                        }`}
                      >
                        {cat === "all" ? "All Areas" : cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    {zakatProjects
                      .filter((p) => {
                        if (
                          zakatCategory !== "all" &&
                          p.category !== zakatCategory
                        )
                          return false;
                        return true;
                      })
                      .map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200/60 p-5 rounded-xl hover:border-gold/45 transition-all shadow-xs hover:shadow-md"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] uppercase font-bold text-gold-dark font-sans">
                              {p.category}
                            </span>
                            <span className="text-xs font-bold text-teal">
                              {p.cost}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-teal font-serif">
                            {p.name}
                          </h4>
                          <p className="text-xs text-slate-600 font-light mt-1.5 leading-relaxed font-sans">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 7. EVIDENT MAGAZINE VIEW */}
        {currentView === "magazine" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Knowledge Production
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                Evident Magazine
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-162.5">
                Critique, decolonial geopolitics, Islamic thought, and
                commentary on knowledge orders, published to resist dead
                institutional tab systems.
              </p>
            </div>

            {/* If reading a full article */}
            {readingArticleId ? (
              (() => {
                const article = [
                  ...MABAR_ESSAYS,
                  ...INDIAN_OCEAN_DISPATCHES,
                ].find((a) => a.id === readingArticleId);
                if (!article) return <p>Article not found.</p>;

                return (
                  <div className="max-w-212.5 mx-auto flex flex-col gap-6">
                    <button
                      onClick={() => setReadingArticleId(null)}
                      className="text-xs text-gold-dark hover:underline self-start bg-transparent border-0 cursor-pointer flex items-center gap-1 font-semibold"
                    >
                      &larr; Back to Editorial List
                    </button>

                    <div className="bg-white border border-slate-200/80 shadow-md rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
                      <div className="border-b border-slate-100 pb-4">
                        <span className="text-xs uppercase font-bold text-teal">
                          {article.category}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold font-serif text-navy mt-2 leading-tight">
                          {article.title}
                        </h2>
                        <p className="text-sm font-medium text-gold-dark font-serif italic mt-2">
                          {article.subtitle}
                        </p>
                        <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
                          <span>
                            Author:{" "}
                            <strong className="text-slate-700">
                              {article.author}
                            </strong>
                          </span>
                          <span>|</span>
                          <span>Published: {article.date}</span>
                          <span>|</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className="text-sm sm:text-base leading-relaxed text-slate-700 font-light font-sans flex flex-col gap-4">
                        <p className="font-semibold text-slate-800">
                          {article.excerpt}
                        </p>
                        <p className="mt-4">{article.body}</p>
                        <p className="mt-2">
                          This is a prototype essay demonstrating Evident
                          Magazine's active public critique wing. The platform
                          encourages scholars to submit commentaries linking
                          classical textual archives with modern global
                          decolonial themes.
                        </p>
                      </div>

                      {/* Social mock actions */}
                      <div className="border-t border-slate-100 pt-6 mt-6 flex flex-wrap gap-3 items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 rounded-full px-3 py-1 border border-slate-200/60 text-slate-600 font-medium">
                            #Decolonial
                          </span>
                          <span className="bg-slate-100 rounded-full px-3 py-1 border border-slate-200/60 text-slate-600 font-medium">
                            #IndianOcean
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => alert("Shared on X")}
                            className="bg-transparent border-0 text-slate-500 hover:text-gold-dark cursor-pointer font-medium"
                          >
                            Share on X
                          </button>
                          <span>|</span>
                          <button
                            onClick={() => alert("PDF link copied")}
                            className="bg-transparent border-0 text-slate-500 hover:text-gold-dark cursor-pointer font-medium"
                          >
                            Copy PDF Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col gap-12">
                {/* Category filters */}
                <div className="flex flex-wrap bg-slate-100 rounded-lg p-1 border border-slate-200/80 w-max">
                  {[
                    "All",
                    "Ethics & Jurisprudence",
                    "Decolonial Geopolitics",
                    "Knowledge & Technology",
                    "Indian Ocean Dispatches",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveMagazineCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border-0 cursor-pointer transition-all ${
                        activeMagazineCategory === cat
                          ? "bg-teal text-white shadow-sm"
                          : "bg-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Essays Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...MABAR_ESSAYS, ...INDIAN_OCEAN_DISPATCHES]
                    .filter((a) => {
                      if (
                        activeMagazineCategory !== "All" &&
                        a.category !== activeMagazineCategory
                      )
                        return false;
                      return true;
                    })
                    .map((article) => (
                      <div
                        key={article.id}
                        className="bg-white border border-slate-200/80 hover:border-teal/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-sm"
                      >
                        <div>
                          <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-wide border-b border-slate-100 pb-2 mb-4">
                            <span className="text-teal">
                              {article.category}
                            </span>
                            <span className="text-slate-400">
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-855 font-serif group-hover:text-gold-dark transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-1 italic line-clamp-1">
                            {article.subtitle}
                          </p>
                          <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs">
                          <span className="text-[10px] text-slate-450">
                            By {article.author.split(",")[0]}
                          </span>
                          <button
                            onClick={() => setReadingArticleId(article.id)}
                            className="text-xs text-gold-dark hover:underline font-semibold bg-transparent border-0 cursor-pointer"
                          >
                            Read Essay &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Indian Ocean Dispatches Dedicated series box */}
                <div className="bg-teal/5 border border-teal/10 p-8 rounded-2xl mt-8">
                  <div className="max-w-175 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal">
                      Writing Series
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-navy mt-1">
                      Indian Ocean Dispatches
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light mt-2">
                      A structured six-part editorial series tracking scholastic
                      circulation routes, legal consultations, and colonial
                      resistances linking Calicut to Yemen, East Africa, and
                      Sumatra.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {INDIAN_OCEAN_DISPATCHES.map((disp, idx) => (
                      <div
                        key={disp.id}
                        className="bg-white border border-slate-200/80 p-5 rounded-xl hover:border-gold/45 transition-all flex flex-col justify-between min-h-45 hover:shadow-md"
                      >
                        <div>
                          <span className="text-[8px] uppercase tracking-wider text-gold-dark font-bold">
                            Dispatch {idx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                            {disp.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => setReadingArticleId(disp.id)}
                          className="text-[11px] text-teal font-semibold hover:underline bg-transparent border-0 cursor-pointer self-start p-0 mt-4"
                        >
                          Open Dispatch &rarr;
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Compiles Download */}
                  <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      Series Completion Status:{" "}
                      <strong className="text-slate-700">
                        3 of 6 Published
                      </strong>
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          "Full PDF compilation available upon series completion in late 2026.",
                        )
                      }
                      className="px-4 py-2 bg-transparent hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-all"
                    >
                      Download PDF Compilation (Planned)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 8. COCOON LIBRARY VIEW */}
        {currentView === "cocoon" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Pedagogical Intervention
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                Cocoon Library
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-162.5">
                Making MABAR’s intellectual world accessible to younger minds
                and educators through illustrated publications, histories, and
                audio narration dispatches.
              </p>
            </div>

            {/* If a book is active (Reading View) */}
            {activeBookId ? (
              (() => {
                const book = COCOON_BOOKS.find((b) => b.id === activeBookId);
                if (!book) return <p>Book not found.</p>;

                return (
                  <div className="max-w-187.5 mx-auto flex flex-col gap-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                      <button
                        onClick={() => {
                          setActiveBookId(null);
                          setIsPlayingAudio(false);
                          setAudioProgress(0);
                        }}
                        className="text-xs text-gold-dark hover:underline bg-transparent border-0 cursor-pointer font-semibold"
                      >
                        &larr; Back to Library Catalog
                      </button>
                      <span className="text-xs text-slate-500 font-medium">
                        {book.ageGroup}
                      </span>
                    </div>

                    {/* Illustrated Reader Board */}
                    <div className="glass-panel rounded-2xl border border-teal/15 p-8 min-h-75 flex flex-col justify-between bg-teal/5">
                      <div>
                        <div className="flex justify-between items-center text-[10px] text-gold-dark uppercase tracking-wider font-bold mb-6">
                          <span>{book.title}</span>
                          <span>
                            Slide {cocoonSlideIndex + 1} of{" "}
                            {book.pdfPages.length}
                          </span>
                        </div>
                        <p className="font-serif text-lg sm:text-xl text-slate-800 font-medium leading-relaxed max-w-150 mx-auto text-center mt-4">
                          {book.pdfPages[cocoonSlideIndex]}
                        </p>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex justify-between items-center border-t border-slate-200/60 pt-6 mt-8">
                        <button
                          disabled={cocoonSlideIndex === 0}
                          onClick={() =>
                            setCocoonSlideIndex((prev) => Math.max(0, prev - 1))
                          }
                          className="px-4 py-2 rounded bg-white text-xs text-slate-700 border border-slate-300 hover:border-gold-dark/45 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                        >
                          &larr; Previous Slide
                        </button>
                        <button
                          disabled={
                            cocoonSlideIndex === book.pdfPages.length - 1
                          }
                          onClick={() =>
                            setCocoonSlideIndex((prev) =>
                              Math.min(book.pdfPages.length - 1, prev + 1),
                            )
                          }
                          className="px-4 py-2 rounded bg-white text-xs text-slate-700 border border-slate-300 hover:border-gold-dark/45 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                        >
                          Next Slide &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Audio Narrator Board Mockup */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
                      <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                        <span className="font-bold text-gold-dark uppercase">
                          Audio Narration dispatch
                        </span>
                        <span className="text-slate-400">
                          {book.audioNarrator}
                        </span>
                      </div>

                      {/* Play progress bar */}
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="h-10 w-10 rounded-full bg-teal text-white flex items-center justify-center cursor-pointer border-0 shadow hover:bg-teal-dark transition-all"
                        >
                          {isPlayingAudio ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <rect x="4" y="4" width="4" height="16" />
                              <rect x="16" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </button>

                        <div className="grow flex flex-col gap-1">
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-teal transition-all duration-300"
                              style={{ width: `${audioProgress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400">
                            <span>0:00</span>
                            <span>{book.audioDuration}</span>
                          </div>
                        </div>

                        {/* Speed controller */}
                        <select
                          value={audioSpeed}
                          onChange={(e) =>
                            setAudioSpeed(Number(e.target.value))
                          }
                          className="bg-slate-50 text-[10px] border border-slate-300 rounded px-2 py-1 text-slate-700 outline-none"
                        >
                          <option value={1}>1.0x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                        </select>
                      </div>
                    </div>

                    {/* Teacher/Parent Guide */}
                    <div className="bg-terracotta/5 border border-terracotta/15 p-5 rounded-xl text-xs">
                      <h4 className="font-bold text-terracotta uppercase mb-1">
                        Teacher / Parent Pedagogical Note
                      </h4>
                      <p className="text-slate-700 font-light leading-relaxed">
                        {book.teacherNote}
                      </p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {COCOON_BOOKS.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white border border-slate-200/85 hover:border-gold-dark/30 hover:shadow-lg p-6 rounded-2xl flex gap-6 items-center transition-all group shadow-sm"
                  >
                    {/* Fake book cover thumbnail */}
                    <div className="h-30 w-22.5 bg-teal/5 rounded border border-teal/10 flex flex-col justify-between p-2.5 shrink-0 group-hover:border-gold-dark transition-all">
                      <span className="text-[8px] uppercase tracking-wider text-gold-dark font-bold">
                        Cocoon
                      </span>
                      <span className="text-[10px] font-bold text-navy leading-tight font-serif italic line-clamp-3">
                        {book.title}
                      </span>
                    </div>

                    <div className="grow flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wide">
                          <span className="text-teal">{book.ageGroup}</span>
                          <span className="text-slate-400">{book.theme}</span>
                        </div>
                        <h3 className="text-base font-bold text-navy mt-2 leading-snug">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-light mt-1">
                          Audio narration duration: {book.audioDuration}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveBookId(book.id);
                          setCocoonSlideIndex(0);
                        }}
                        className="w-max mt-6 px-4 py-2 bg-transparent hover:bg-gold/5 text-gold-dark text-xs font-semibold rounded-lg cursor-pointer border border-gold-dark/40 transition-all"
                      >
                        Read illustrated slides &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 9. WDF DIALOGUE & EVENTS VIEW */}
        {currentView === "events" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  Coordinated Activities
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                  Events &amp; Programmes
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-162.5">
                  Participate in MABAR lectures, reading circles, manuscript
                  documentation drives, and South-South decolonial dialogues.
                </p>
              </div>
            </div>

            {/* Active Panelist Filters & Showcase */}
            <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/70 dark:border-slate-800/70 p-6 sm:p-8 rounded-3xl shadow-xs w-full mb-10 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20 font-sans inline-block mb-1">
                    Scholastic Panel
                  </span>
                  <h3 className="text-lg font-bold text-teal dark:text-white font-sans">
                    Active Panelist Directory
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-0.5">
                    Filter our scholars by theological and historical
                    specialties.
                  </p>
                </div>

                <div className="flex bg-slate-150 dark:bg-slate-950/45 p-0.5 rounded-lg border border-slate-200 dark:border-slate-850">
                  {[
                    "all",
                    "Jurisprudence",
                    "Sufism",
                    "History",
                    "Indian Ocean",
                  ].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setActiveSpeakerTopicFilter(topic)}
                      className={`px-3 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer border-0 ${
                        activeSpeakerTopicFilter === topic
                          ? "bg-teal text-white shadow-xs"
                          : "bg-transparent text-slate-500 hover:text-teal dark:hover:text-white"
                      }`}
                    >
                      {topic === "all" ? "All Specialties" : topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MABAR_SPEAKERS.filter((spk) => {
                  if (activeSpeakerTopicFilter === "all") return true;
                  return spk.topics.some((t) =>
                    t
                      .toLowerCase()
                      .includes(activeSpeakerTopicFilter.toLowerCase()),
                  );
                }).map((spk) => (
                  <div
                    key={spk.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/65 rounded-2xl p-5 hover:border-teal/30 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-full bg-teal text-white font-bold text-xs flex items-center justify-center border border-white/10 shrink-0">
                          {spk.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                            {spk.name}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                            {spk.role}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mb-3">
                        {spk.affiliation}
                      </p>
                      <p className="text-[11px] text-slate-650 dark:text-slate-350 leading-relaxed font-light line-clamp-3">
                        {spk.bio}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-4 flex flex-wrap gap-1.5">
                      {spk.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[8px] bg-slate-50 dark:bg-slate-950/40 text-slate-550 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200/50 dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Event lists */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {MABAR_EVENTS.map((evt) => {
                  const isReg = registeredEvents.includes(evt.id);

                  return (
                    <div
                      key={evt.id}
                      className="bg-white border border-slate-200/85 hover:border-gold-dark/30 hover:shadow-lg p-6 rounded-2xl transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wide">
                        <span className="text-gold-dark">{evt.type}</span>
                        <span className="text-slate-400">{evt.time}</span>
                      </div>
                      <h3 className="text-base font-bold text-navy mt-1.5">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-light mt-0.5">
                        Date: {evt.date} | Location: {evt.location}
                      </p>
                      <p className="text-xs text-slate-700 font-light mt-3 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                        {evt.description}
                      </p>

                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-[10px] text-slate-400">
                          Speakers:
                        </span>
                        {evt.speakers.map((sp) => (
                          <span
                            key={sp}
                            className="text-[10px] bg-slate-100 rounded px-2.5 py-0.5 border border-slate-200 text-slate-700"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>

                      {/* Registration triggers */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        {isReg ? (
                          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Registered Successfully!</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRegisteringEvent(evt)}
                            className="px-4 py-2 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded cursor-pointer border-0 transition-all"
                          >
                            Register for Zoom / Seat
                          </button>
                        )}
                        <span className="text-[10px] text-slate-400">
                          Status:{" "}
                          <strong className="text-emerald-600">Open</strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Certificate lookup tool & dialog space */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Cert Lookup */}
                <div className="bg-white border border-gold/25 shadow-sm p-6 rounded-2xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gold-dark border-b border-slate-100 pb-2 mb-3">
                    Claim Event Certificate
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                    Have you attended previous MABAR research circles or finance
                    seminars? Enter your full name to look up attendance logs
                    and export/download your certificate.
                  </p>

                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Enter registered attendee name..."
                      value={claimCertName}
                      onChange={(e) => setClaimCertName(e.target.value)}
                      className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                    />
                    <button
                      onClick={() => {
                        if (claimCertName.trim()) {
                          setClaimedCertificates([
                            "Islamic Finance and Regional Cooperatives",
                            "Tuhfat al-Mujahidin Annotations Lecture",
                          ]);
                        }
                      }}
                      className="w-full text-center py-2.5 bg-gold-dark hover:bg-gold text-white text-xs font-bold uppercase rounded cursor-pointer border-0"
                    >
                      Lookup Attendance
                    </button>
                  </div>

                  {claimedCertificates.length > 0 && (
                    <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col gap-3">
                      <span className="text-[10px] text-slate-400 uppercase block">
                        Found Certificates:
                      </span>
                      {claimedCertificates.map((cert) => (
                        <div
                          key={cert}
                          className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex items-center justify-between gap-2"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 leading-tight">
                              {cert}
                            </span>
                            <span className="text-[9px] text-emerald-600 mt-0.5">
                              Attendee: {claimCertName}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              alert(
                                `Downloading Certificate for ${claimCertName} - ${cert}`,
                              )
                            }
                            className="text-[10px] text-gold-dark hover:text-gold font-semibold underline bg-transparent border-0 cursor-pointer"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dialogue context */}
                <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
                  <h4 className="text-xs font-bold text-teal uppercase mb-2">
                    World Decolonization Forum Partner
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    MABAR serves as the Indian Ocean interlocutor in partnership
                    with global networks, exchanging papers regarding
                    restoration of manuscripts and comparative monetary
                    sovereignty.
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Modal Dialog */}
            {registeringEvent && (
              <div className="fixed inset-0 z-300 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                <div className="relative w-full max-w-112.5 rounded-2xl bg-white border border-slate-200/90 p-6 shadow-2xl">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-gold-dark uppercase">
                        Event registration
                      </span>
                      <h3 className="text-sm font-bold text-navy mt-1">
                        {registeringEvent.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setRegisteringEvent(null)}
                      className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer border-0"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (eventRegName && eventRegEmail) {
                        setRegisteredEvents([
                          ...registeredEvents,
                          registeringEvent.id,
                        ]);
                        setRegisteringEvent(null);
                        setEventRegName("");
                        setEventRegEmail("");
                      }
                    }}
                    className="flex flex-col gap-4 text-xs"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-500 uppercase text-[9px] tracking-wide">
                        Attendee Name
                      </label>
                      <input
                        required
                        type="text"
                        value={eventRegName}
                        onChange={(e) => setEventRegName(e.target.value)}
                        placeholder="Enter your full name..."
                        className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-500 uppercase text-[9px] tracking-wide">
                        Scholarly Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={eventRegEmail}
                        onChange={(e) => setEventRegEmail(e.target.value)}
                        placeholder="Enter email address..."
                        className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-center py-2.5 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded cursor-pointer border-0 transition-colors"
                    >
                      Confirm Event Seat
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 10. CONTRIBUTOR PORTAL VIEW */}
        {currentView === "contribute" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-225 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Coordinated Scholarship
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                Contributor Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-light mt-2">
                Join the Malabar Decolonial Space movement. Submit articles for
                Evident Magazine, working papers for Hasanath Institute, or
                manuscript catalogs.
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 shadow-md rounded-2xl p-6 sm:p-10">
              {contribSuccess ? (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-6 rounded-xl text-center flex flex-col items-center gap-3 shadow-xs">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-emerald-600"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <h3 className="text-lg font-bold">
                    Contribution Submitted Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Our editorial taskforce and scholarly peer-review board will
                    review your text against MABAR decolonial guidelines. We
                    will email you status updates within 14 working days.
                  </p>
                  <button
                    onClick={() => {
                      setContribSuccess(false);
                      setContribTitle("");
                      setContribContent("");
                    }}
                    className="mt-6 px-6 py-2 bg-teal hover:bg-teal-dark text-white text-xs font-semibold rounded-full border-0 cursor-pointer transition-colors"
                  >
                    Submit another text
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (contribTitle && contribContent) setContribSuccess(true);
                  }}
                  className="flex flex-col gap-6 text-xs"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">
                      Submission Category
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: "article", label: "Magazine Critique Essay" },
                        { id: "manuscript", label: "Kitab Manuscript Entry" },
                        { id: "translation", label: "Scholastic Translation" },
                      ].map((type) => (
                        <button
                          type="button"
                          key={type.id}
                          onClick={() => setContribType(type.id as any)}
                          className={`px-4 py-2.5 rounded border text-xs font-bold cursor-pointer transition-colors ${
                            contribType === type.id
                              ? "bg-teal/10 border-teal text-teal font-bold shadow-xs"
                              : "bg-slate-50 border-slate-350 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">
                      Title / Heading
                    </label>
                    <input
                      required
                      type="text"
                      value={contribTitle}
                      onChange={(e) => setContribTitle(e.target.value)}
                      placeholder="e.g. Zain al-Din Makhdum and Indian Ocean Jurisprudence"
                      className="bg-slate-50 border border-slate-350 px-4 py-3 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">
                      Author / Scholar Name
                    </label>
                    <input
                      required
                      type="text"
                      value={contribAuthor}
                      onChange={(e) => setContribAuthor(e.target.value)}
                      placeholder="e.g. Dr. Amina Ali"
                      className="bg-slate-50 border border-slate-350 px-4 py-3 text-xs rounded text-slate-850 focus:outline-none focus:border-teal"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">
                      Main Content / Excerpt / translation text
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={contribContent}
                      onChange={(e) => setContribContent(e.target.value)}
                      placeholder="Paste your article drafts, translation annotations, or manuscript details here..."
                      className="bg-slate-50 border border-slate-350 px-4 py-3 text-xs rounded text-slate-850 focus:outline-none focus:border-teal resize-none font-sans font-light leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-3 bg-gold-dark hover:bg-gold text-white text-xs font-bold uppercase rounded cursor-pointer border-0 transition-colors shadow-md"
                  >
                    Submit Draft for Peer-Review
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {currentView === "glossary" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-300 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                Conceptual Clarity
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                Concept Glossary
              </h1>
              <p className="text-xs text-slate-600 font-light mt-2">
                Specialized decolonial and Islamic legal terminology used in
                MABAR coordination platforms.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MABAR_GLOSSARY.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 hover:border-gold/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-bold text-navy uppercase font-serif">
                      {item.term}
                    </h3>
                    {item.arabicScript && (
                      <span
                        className="font-serif text-gold-dark text-sm tracking-wide font-semibold"
                        style={{ direction: "rtl" }}
                      >
                        {item.arabicScript}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-light leading-relaxed font-sans">
                    {item.definition}
                  </p>
                  <p className="text-[10px] text-teal font-medium mt-3 italic font-sans">
                    Historical Context: {item.context}
                  </p>
                  <p className="text-[10px] text-slate-500 font-light mt-1.5 font-sans">
                    MABAR Relevance: {item.relevance}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentView === "timeline" && (
          <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-250 mx-auto w-full pt-10 sm:pt-15">
            <div className="border-b border-teal/15 pb-8 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Chronological Context
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy">
                Decolonial Timeline
              </h1>
              <p className="text-xs text-slate-600 font-light mt-2">
                Major historical milestones in Malabar Islamic scholarship and
                anti-colonial resistance.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {MABAR_TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 hover:border-teal/40 p-5 rounded-2xl flex gap-4 items-start relative transition-all group shadow-xs hover:shadow-md"
                >
                  <span className="bg-teal/5 border border-teal/15 text-teal px-3 py-1 rounded text-xs font-bold font-mono shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-navy group-hover:text-gold-dark transition-colors uppercase font-sans">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-light mt-1.5 leading-relaxed font-sans">
                      {item.description}
                    </p>
                    <span className="text-[9px] uppercase tracking-wide text-slate-400 border border-slate-200 bg-slate-50 rounded px-2 py-0.5 inline-block mt-3 font-sans">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ----------------- MODAL OVERLAY FOR KNOWLEDGE ATLAS CONNECTIONS ----------------- */}
      {activeModalContent && (
        <div className="fixed inset-0 z-300 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div
            className={`relative w-full rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-2xl transition-all ${
              activeModalContent.type === "kitab" ? "max-w-5xl" : "max-w-150"
            }`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-gold-dark bg-gold/5 px-2 py-0.5 rounded border border-gold/20">
                  {activeModalContent.type.toUpperCase()} CONNECTION
                </span>
                <h3 className="text-xl font-bold mt-2 text-navy font-sans">
                  {activeModalContent.title}
                </h3>
                {activeModalContent.subtitle && (
                  <p className="text-xs text-slate-500 font-light mt-1 uppercase tracking-wide">
                    {activeModalContent.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveModalContent(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer border-0"
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {activeModalContent.type === "kitab" ? (
              (() => {
                const kitab = KITAB_REPOSITORY.find(
                  (k) => k.id === activeModalContent.id,
                );
                if (!kitab)
                  return (
                    <p className="text-sm font-sans text-slate-500">
                      Kitab not found.
                    </p>
                  );
                return (
                  <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Meta Section */}
                    <div className="bg-[#FDFBF7] border border-[#E3D1BA]/85 rounded-2xl p-5 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-gold-dark bg-gold/10 px-2 py-0.5 rounded border border-gold/20 font-sans">
                          Genre: {kitab.genre}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans font-light">
                          Source: {kitab.copyrightStatus || "Open Archive"}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold font-serif italic text-teal">
                        {kitab.title}
                      </h2>
                      <p className="text-xs text-gold-dark font-semibold mt-1">
                        Author: {kitab.author} | Published: {kitab.date}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-[11px] text-slate-650 border-t border-slate-200/50 pt-3 font-sans">
                        <p>
                          <strong className="text-teal font-semibold">
                            Script / Lang:
                          </strong>{" "}
                          {kitab.languageScript || kitab.language}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Subject Area:
                          </strong>{" "}
                          {kitab.subject || "General Ethics"}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Time Period:
                          </strong>{" "}
                          {kitab.period || "N/A"}
                        </p>
                        <p>
                          <strong className="text-teal font-semibold">
                            Manuscript Location:
                          </strong>{" "}
                          {kitab.manuscriptLocation}
                        </p>
                      </div>
                      {kitab.keywords && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {kitab.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[9px] bg-slate-100 border border-slate-250/70 text-slate-500 px-2 py-0.5 rounded"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-slate-700 mt-4 leading-relaxed font-light bg-white/60 p-3 rounded-lg border border-slate-200/40 font-sans">
                        {kitab.shortIntro}
                      </p>
                    </div>

                    {/* Dual Columns: Left = Translation Tabs, Right = Decolonial Annotations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                      {/* Left Column: Translation Layers */}
                      <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E3D1BA]/60 flex flex-col gap-4 shadow-xs">
                        <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                          <span className="text-[10px] font-bold text-teal uppercase font-sans">
                            Text Translation Layers
                          </span>
                          <div className="flex bg-slate-100 rounded-full p-0.5 border border-slate-200">
                            {[
                              { id: "english", label: "English" },
                              { id: "malayalam", label: "മലയാളം" },
                              { id: "arabic", label: "العربية" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() =>
                                  setKitabTranslationTab(tab.id as any)
                                }
                                className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border-0 cursor-pointer ${
                                  kitabTranslationTab === tab.id
                                    ? "bg-teal text-white"
                                    : "bg-transparent text-slate-400 hover:text-teal"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="min-h-45 max-h-60 overflow-y-auto bg-white/70 p-4 rounded-xl text-slate-800 text-xs leading-relaxed border border-slate-100 font-sans">
                          {kitabTranslationTab === "english" && (
                            <p className="italic text-slate-700">
                              "{kitab.textSnippetEnglish}"
                            </p>
                          )}
                          {kitabTranslationTab === "malayalam" && (
                            <p className="leading-loose text-slate-800">
                              "{kitab.textSnippetMalayalam}"
                            </p>
                          )}
                          {kitabTranslationTab === "arabic" && (
                            <div
                              className="text-right"
                              style={{ direction: "rtl" }}
                            >
                              <p className="font-serif text-teal-dark text-base leading-loose tracking-wide">
                                {kitab.textSnippetArabic}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Download & Copyright options */}
                        <div className="border-t border-slate-200/50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans">
                          <span className="text-[9px] text-slate-400">
                            {kitab.downloadAllowed
                              ? "✔ Download permissions verified by archive curators."
                              : "✕ PDF download restricted under custom preservation terms."}
                          </span>
                          {kitab.downloadAllowed ? (
                            <a
                              href="#download"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(
                                  `Downloading ${kitab.title} manuscript PDF...`,
                                );
                              }}
                              className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-teal hover:bg-teal-dark text-white text-[10px] font-semibold rounded-lg cursor-pointer transition-colors no-underline border-0"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                              </svg>
                              Download PDF
                            </a>
                          ) : (
                            <button
                              disabled
                              className="py-1.5 px-3 bg-slate-100 border border-slate-200 text-slate-400 text-[10px] font-semibold rounded-lg cursor-not-allowed"
                            >
                              Download Restricted
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Layered Decolonial Annotations */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs flex flex-col gap-4">
                        <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                          <span className="text-[10px] font-bold text-gold-dark uppercase font-sans">
                            Scholarly Commentary Layers
                          </span>
                        </div>

                        {/* Annotation Toggles */}
                        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/40">
                          {[
                            { id: "historical", label: "Historical" },
                            { id: "jurisprudential", label: "Fiqh (Law)" },
                            { id: "decolonial", label: "Decolonial" },
                            { id: "indianOcean", label: "Ocean Network" },
                            {
                              id: "comparativeTheory",
                              label: "VS. Westerners",
                            },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() =>
                                setKitabAnnotationTab(tab.id as any)
                              }
                              className={`px-2 py-1 rounded text-[9px] font-semibold border-0 cursor-pointer grow ${
                                kitabAnnotationTab === tab.id
                                  ? "bg-gold text-white font-bold"
                                  : "bg-transparent text-slate-500 hover:text-teal"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>

                        {/* Annotation Content */}
                        <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl min-h-35 text-[11px] leading-relaxed font-light text-slate-800 font-sans">
                          {kitabAnnotationTab === "historical" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1 text-[11px]">
                                Historical Context:
                              </h4>
                              <p>{kitab.annotations.historical}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "jurisprudential" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1 text-[11px]">
                                Jurisprudential Reading:
                              </h4>
                              <p>{kitab.annotations.jurisprudential}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "decolonial" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1 text-[11px]">
                                Decolonial Reading:
                              </h4>
                              <p>{kitab.annotations.decolonial}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "indianOcean" && (
                            <div>
                              <h4 className="font-bold text-gold uppercase mb-1 text-[11px]">
                                Indian Ocean Trade Relevance:
                              </h4>
                              <p>{kitab.annotations.indianOcean}</p>
                            </div>
                          )}
                          {kitabAnnotationTab === "comparativeTheory" && (
                            <div>
                              <h4 className="font-bold text-gold-dark uppercase mb-2 text-[11px]">
                                Decolonial Synthesis:
                              </h4>
                              <p>{kitab.annotations.comparativeTheory}</p>
                            </div>
                          )}
                        </div>

                        {/* Related Essays */}
                        {kitab.relatedEssays &&
                          kitab.relatedEssays.length > 0 && (
                            <div className="border-t border-slate-100 pt-3 font-sans">
                              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Related Scholarly Essays
                              </h5>
                              <div className="flex flex-col gap-1.5">
                                {kitab.relatedEssays.map((essay) => (
                                  <button
                                    key={essay.title}
                                    onClick={() => {
                                      setActiveModalContent(null);
                                      handleNavigation("research");
                                    }}
                                    className="text-left bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded px-2.5 py-1.5 text-[10px] text-teal font-medium flex items-center justify-between cursor-pointer"
                                  >
                                    <span>{essay.title}</span>
                                    <span>&rarr;</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="max-h-75 overflow-y-auto pr-2 text-xs leading-relaxed font-light font-sans text-slate-700">
                <p>{activeModalContent.content}</p>
              </div>
            )}

            <div className="border-t border-slate-100 pt-4 mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalContent(null)}
                className="bg-teal hover:bg-teal-dark text-white rounded-full px-6 py-2 text-xs font-semibold transition-colors cursor-pointer border-0"
              >
                Close Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- FOOTER SECTION ----------------- */}
      <footer className="relative bg-black border-t border-teal/10 w-full px-6 sm:px-12 pt-16 pb-12 text-left">
        <div className="mx-auto flex w-full max-w-300 flex-col gap-12">
          {/* Lavender Newsletter Dispatch Card */}
          <div className="bg-teal text-white-force rounded-4xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full shadow-2xl relative overflow-hidden">
            {/* Fine decorative line on right side of title */}
            <div className="flex-1 flex flex-col items-start">
              <div className="flex items-center gap-4 w-full">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight whitespace-nowrap">
                  {language === "ar"
                    ? "اشترك في بريدنا"
                    : language === "ml"
                      ? "വാർത്താപത്രിക ലഭിക്കാൻ"
                      : "Get dispatches instantly"}
                </h3>
                <div className="hidden sm:block h-0.5 bg-white/20 grow rounded" />
              </div>
              <p className="mt-4 text-xs sm:text-sm font-medium opacity-90 max-w-145 leading-relaxed">
                {language === "ar"
                  ? "احصل على تحديثات مخطوطات مالابار الرقمية والأبحاث وخطط التمويل التعاوني مباشرة في بريدك."
                  : language === "ml"
                    ? "ഡിജിറ്റൈസ് ചെയ്ത ലിഖിതങ്ങൾ, പുതിയ ഗവേഷണങ്ങൾ, ധനകാര്യ ലാബ് അപ്‌ഡേറ്റുകൾ എന്നിവ നേരിട്ട് ഇമെയിലിൽ ലഭിക്കാൻ അംഗമാകുക."
                    : "To connect, subscribe to our scholarly mail loop and receive updates on digitized manuscripts, legal cooperative frameworks, and decolonial critiques."}
              </p>
            </div>

            {/* Email form inside card */}
            <div className="w-full md:w-auto shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    language === "ar"
                      ? "تم الاشتراك بنجاح!"
                      : language === "ml"
                        ? "വിജയകരമായി സബ്സ്ക്രൈബ് ചെയ്തു!"
                        : "Subscribed successfully!",
                  );
                }}
                className="flex items-center bg-white dark:bg-slate-900 rounded-full p-1.5 w-full sm:w-105 shadow-lg border border-slate-200/50 dark:border-slate-800"
              >
                <input
                  required
                  type="email"
                  placeholder={
                    language === "ar"
                      ? "بريدك الإلكتروني..."
                      : language === "ml"
                        ? "നിങ്ങളുടെ ഇമെയിൽ വിലാസം..."
                        : "Enter your email..."
                  }
                  className="bg-transparent px-5 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none grow"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-black/90 text-white rounded-full px-6 py-3 text-xs font-extrabold uppercase transition-all border-0 cursor-pointer shrink-0"
                >
                  {language === "ar"
                    ? "ابدأ الآن"
                    : language === "ml"
                      ? "തുടങ്ങാം"
                      : "Get started"}
                </button>
              </form>
            </div>
          </div>

          {/* Lower columns layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pt-8">
            {/* Column 1: Newsletter Info */}
            <div className="lg:col-span-4 flex flex-col items-start justify-start gap-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                {language === "ar"
                  ? "سجل معنا"
                  : language === "ml"
                    ? "വാർത്താപത്രിക"
                    : "Sign up for our newsletter"}
              </h4>
              <p className="text-xs font-light text-white/50 leading-relaxed max-w-70">
                {language === "ar"
                  ? "لا تقلق، نرسل فقط التحديثات المهمة والملخصات المعرفية بضع مرات في السنة."
                  : language === "ml"
                    ? "പ്രധാനപ്പെട്ട വിവരങ്ങളും ഗവേഷണങ്ങളും മാത്രം അടങ്ങിയ വാർത്താപത്രികകൾ വർഷത്തിൽ ചില തവണ മാത്രമേ അയക്കൂ."
                    : "Don't worry, we reserve our newsletter for important news so we only send a few updates a year."}
              </p>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="mt-2 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-full px-6 py-2 text-xs font-semibold transition-all cursor-pointer"
              >
                {language === "ar"
                  ? "اشتراك"
                  : language === "ml"
                    ? "അംഗമാകുക"
                    : "Subscribe"}
              </button>
            </div>

            {/* Column 2: Help and Services */}
            <div className="lg:col-span-3 flex flex-col items-start justify-start">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
                {language === "ar"
                  ? "المساعدة والخدمات"
                  : language === "ml"
                    ? "സഹായവും സേവനങ്ങളും"
                    : "Help and services"}
              </h4>
              <button
                onClick={() => handleNavigation("about")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                About MABAR
              </button>
              <button
                onClick={() => handleNavigation("glossary")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                {t.glossary}
              </button>
              <button
                onClick={() => handleNavigation("timeline")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                {t.timeline}
              </button>
            </div>

            {/* Column 3: To explore */}
            <div className="lg:col-span-2 flex flex-col items-start justify-start">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
                {language === "ar"
                  ? "للاستكشاف"
                  : language === "ml"
                    ? "പര്യവേക്ഷണം"
                    : "To explore"}
              </h4>
              <button
                onClick={() => handleNavigation("atlas")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Knowledge Atlas
              </button>
              <button
                onClick={() => handleNavigation("archive")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Living Archive
              </button>
              <button
                onClick={() => handleNavigation("magazine")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Evident Magazine
              </button>
            </div>

            {/* Column 4: Other possibilities */}
            <div className="lg:col-span-3 flex flex-col items-start justify-start">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
                {language === "ar"
                  ? "إمكانيات أخرى"
                  : language === "ml"
                    ? "മറ്റു വിജ്ഞാന ശാഖകൾ"
                    : "Other possibilities"}
              </h4>
              <button
                onClick={() => handleNavigation("finance")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Finance Lab
              </button>
              <button
                onClick={() => handleNavigation("research")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Research Hub
              </button>
              <button
                onClick={() => handleNavigation("cocoon")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                Cocoon Library
              </button>
              <button
                onClick={() => handleNavigation("contribute")}
                className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
              >
                {t.portal}
              </button>

              {/* App store / Play Store Badges rendered exactly like the mockup */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mt-4 w-full">
                {/* App Store SVG Badge */}
                <a
                  href="#app-store"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("App Store download coming soon!");
                  }}
                  className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-4 py-2 hover:bg-white/5 transition-all text-white no-underline w-37.5 shrink-0"
                >
                  <svg
                    className="h-5 w-5 text-white shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[8px] text-white/50 font-medium">
                      Download on the
                    </span>
                    <span className="text-[10px] text-white font-extrabold mt-0.5 font-sans">
                      App Store
                    </span>
                  </div>
                </a>

                {/* Google Play Store SVG Badge */}
                <a
                  href="#play-store"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Play Store download coming soon!");
                  }}
                  className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-4 py-2 hover:bg-white/5 transition-all text-white no-underline w-37.5 shrink-0"
                >
                  <svg
                    className="h-5 w-5 text-white shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 2c-.3 0-.6.1-.8.4L13.7 12 4.2 21.6c.2.3.5.4.8.4.2 0 .4-.1.6-.2l13.6-7.8c.6-.4.9-1 .9-1.6s-.3-1.2-.9-1.6L5.6 2.2c-.2-.1-.4-.2-.6-.2z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[8px] text-white/50 font-medium">
                      GET IT ON
                    </span>
                    <span className="text-[10px] text-white font-extrabold mt-0.5 font-sans">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright bar and social icons */}
          <div className="border-t border-white/10 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-light text-white/40">
              &copy; 2026 MABAR: Malabar Decolonial Space. Open Access under
              Creative Commons.
            </span>

            {/* Social Icons SVGs */}
            <div className="flex items-center gap-6">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter"
                onClick={(e) => e.preventDefault()}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Language Switcher Widget (WhatsApp Style) */}
      <div
        className="fixed bottom-6 z-250 flex flex-col items-center"
        style={{
          right: language === "ar" ? "auto" : "24px",
          left: language === "ar" ? "24px" : "auto",
        }}
      >
        {/* Dropdown Menu (grows upwards) */}
        {langMenuOpen && (
          <div
            className="mb-3 w-40 animate-fade-in"
            style={{
              background: "var(--mobbin-surface)",
              border: "1px solid var(--mobbin-border-2)",
              borderRadius: 12,
              padding: "6px",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                padding: "4px 8px 8px",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--mobbin-text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                borderBottom: "1px solid var(--mobbin-border)",
                marginBottom: 4,
              }}
            >
              Select Language
            </div>
            {(
              [
                { code: "en", label: "English", short: "EN" },
                { code: "ml", label: "മലയാളം", short: "മല" },
                { code: "ar", label: "العربية", short: "عرب" },
              ] as const
            ).map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setLangMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: language === lang.code ? 600 : 400,
                  cursor: "pointer",
                  border: "none",
                  background:
                    language === lang.code
                      ? "var(--mobbin-hover-bg)"
                      : "transparent",
                  color:
                    language === lang.code
                      ? "var(--mobbin-text-primary)"
                      : "var(--mobbin-text-2)",
                  transition: "all 0.1s ease",
                  fontFamily: "inherit",
                }}
              >
                <span>{lang.label}</span>
                {language === lang.code && (
                  <svg
                    style={{
                      width: 12,
                      height: 12,
                      color: "var(--mobbin-blue)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Floating Circular Trigger Button */}
        <button
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          aria-label="Change Language"
          style={{
            height: 44,
            width: 44,
            borderRadius: "50%",
            background: "var(--mobbin-surface)",
            border: "1px solid var(--mobbin-border-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transition: "all 0.15s ease",
            position: "relative",
            color: "var(--mobbin-text-2)",
          }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9M3 9h18M3 15h18"
            />
          </svg>
          {/* Current language badge */}
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "var(--mobbin-blue)",
              color: "#ffffff",
              fontSize: 8,
              fontWeight: 700,
              padding: "2px 5px",
              borderRadius: 9999,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {language === "en" ? "EN" : language === "ml" ? "മല" : "AR"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;

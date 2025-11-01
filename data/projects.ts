import type { Locale } from "@/lib/i18n/settings";

export type ProjectCategory =
  | "apartments"
  | "houses"
  | "lofts"
  | "commercial"
  | "reconstructions";

export type ProjectTranslation = {
  name: string;
  summary: string;
  description: string;
  scope: string[];
};

export type Project = {
  id: string;
  coverImage: string;
  gallery: string[];
  location: string;
  year: number;
  area: number;
  investor: string;
  categories: ProjectCategory[];
  featured?: boolean;
  translations: Record<Locale, ProjectTranslation>;
};

export const projects: Project[] = [
  {
    id: "vinohrady-apartment",
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1600&q=80",
    ],
    location: "Praha 2 – Vinohrady",
    year: 2024,
    area: 128,
    investor: "Soukromý investor",
    categories: ["apartments", "reconstructions"],
    featured: true,
    translations: {
      cs: {
        name: "Byt Vinohrady",
        summary:
          "Kompletní rekonstrukce se zaměřením na otevřený obývací prostor, chytrou elektroinstalaci a na míru navržené truhlářské prvky.",
        description:
          "Historický byt ve Vinohradech jsme přetvořili na vzdušné městské bydlení. Zachovali jsme původní prvky, doplnili je minimalistickými detaily a integrovali moderní technologie včetně řízení osvětlení a topení.",
        scope: [
          "Koordinace stavebních úprav a statického posouzení",
          "Kompletní rozvody elektro, vody a vzduchotechniky",
          "Nábytek na míru z dubové dýhy a lakovaných povrchů",
        ],
      },
      en: {
        name: "Vinohrady Apartment",
        summary:
          "Full renovation focused on an open living space, smart home wiring and bespoke joinery across the flat.",
        description:
          "We transformed a historic Vinohrady apartment into a bright urban residence. Original detailing was restored and paired with minimalist finishes, while integrated technology handles lighting, heating and shading without disturbing the character.",
        scope: [
          "Coordination of structural modifications and engineering surveys",
          "Complete rewiring, plumbing and ventilation upgrades",
          "Custom oak veneer cabinetry and spray-lacquered finishes",
        ],
      },
    },
  },
  {
    id: "letnany-family-house",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    ],
    location: "Praha 9 – Letňany",
    year: 2023,
    area: 186,
    investor: "Rodinný dům",
    categories: ["houses", "reconstructions"],
    featured: true,
    translations: {
      cs: {
        name: "Rodinný dům Letňany",
        summary:
          "Kompletní modernizace interiéru rodinného domu včetně nové kuchyně, wellness zóny a úsporného vytápění.",
        description:
          "Původní členěný interiér jsme spojili do otevřeného prostoru navazujícího na zahradu. Součástí realizace je wellness se saunou, technické zázemí s tepelným čerpadlem a vestavěné úložné prostory.",
        scope: [
          "Návrh dispozic a koordinace s architektem",
          "Dodávka wellness technologie a řízení klimatu",
          "Vestavěná kuchyně a úložné prvky na míru",
        ],
      },
      en: {
        name: "Letňany Family House",
        summary:
          "Comprehensive modernization of a family home with a new kitchen, spa area and energy-efficient heating system.",
        description:
          "We reconnected formerly closed rooms into a continuous living area linked to the garden. The project includes a sauna with relaxation zone, new HVAC with heat pump technology and extensive built-in storage tailored for an active family lifestyle.",
        scope: [
          "Space planning in cooperation with the lead architect",
          "Supply of wellness technology and climate control",
          "Tailor-made kitchen and integrated storage solutions",
        ],
      },
    },
  },
  {
    id: "brno-loft",
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    ],
    location: "Brno – centrum",
    year: 2022,
    area: 94,
    investor: "Developerský projekt",
    categories: ["lofts", "commercial"],
    featured: true,
    translations: {
      cs: {
        name: "Loft v centru Brna",
        summary:
          "Konverze bývalého skladu na loftový byt s otevřenou galerií, betonovou stěrkou a osvětlením na míru.",
        description:
          "V industriálním objektu jsme zachovali surový charakter, doplnili ho o akustické úpravy, podlahové topení a chytré ovládání. Loft slouží jako ukázkový byt pro developerský projekt a je připravený pro klientské změny.",
        scope: [
          "Statické zajištění a nové ocelové schodiště",
          "Akustické podhledy a rozvody chlazení",
          "Systém chytré domácnosti a osvětlení na scénáře",
        ],
      },
      en: {
        name: "Brno City Loft",
        summary:
          "Conversion of a former warehouse into a loft apartment with mezzanine, polished concrete and custom lighting.",
        description:
          "We preserved the industrial feel of the building while adding acoustic comfort, underfloor heating and smart controls. The loft presents the developer's standard and is ready for bespoke client upgrades without additional structural work.",
        scope: [
          "Structural reinforcement with a new steel staircase",
          "Acoustic ceilings combined with integrated cooling",
          "Smart home system with scene-based lighting",
        ],
      },
    },
  },
  {
    id: "smichov-penthouse",
    coverImage:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
    ],
    location: "Praha 5 – Smíchov",
    year: 2024,
    area: 156,
    investor: "Developerský projekt",
    categories: ["apartments", "commercial"],
    translations: {
      cs: {
        name: "Penthouse Smíchov",
        summary:
          "Luxusní penthouse s panoramatickým výhledem, betonovou stěrkou a zakázkovými prvky z ušlechtilých materiálů.",
        description:
          "Ve spolupráci s interiérovým studiem jsme vytvořili elegantní prostor s důrazem na minimalismus. Skleněné stěny, technické textilie a skryté úložné prostory tvoří harmonický celek připravený pro vrcholový management.",
        scope: [
          "Koordinace interiérového designu a realizace prototypů",
          "Instalace chytrých elektro systémů a akustických stropů",
          "Dodávka kamenných a kovových prvků na míru",
        ],
      },
      en: {
        name: "Smíchov Penthouse",
        summary:
          "Luxury penthouse with panoramic views, polished concrete surfaces and bespoke detailing in premium materials.",
        description:
          "In collaboration with an interior studio we delivered a refined minimalist space. Glass partitions, technical textiles and concealed storage create a calm backdrop tailored for an executive lifestyle.",
        scope: [
          "Design coordination and prototype fabrication",
          "Deployment of smart electrical systems and acoustic ceilings",
          "Custom stonework and metal joinery across the apartment",
        ],
      },
    },
  },
  {
    id: "vysocina-cottage",
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    ],
    location: "Vysočina",
    year: 2021,
    area: 132,
    investor: "Soukromý investor",
    categories: ["houses", "reconstructions"],
    translations: {
      cs: {
        name: "Rekreační chata Vysočina",
        summary:
          "Citlivá rekonstrukce horské chaty s novou dispozicí, dřevěnými obklady a úsporným provozem.",
        description:
          "Původní objekt jsme rozšířili o prosklený trakt směrem do lesa. Dům využívá tepelné čerpadlo, řízené větrání a je připravený na celoroční provoz. Interiér kombinuje dubové dřevo, kameninu a textilie na míru.",
        scope: [
          "Stavební úpravy a zateplení dřevostavby",
          "Instalace vytápění s tepelným čerpadlem a rekuperací",
          "Design a výroba truhlářských prvků do každého pokoje",
        ],
      },
      en: {
        name: "Vysočina Retreat Cottage",
        summary:
          "Sensitive refurbishment of a mountain cottage with re-planned layout, timber cladding and energy-efficient systems.",
        description:
          "We extended the envelope with a glazed wing opening into the forest. The house now runs on a heat pump with mechanical ventilation, making it comfortable year-round. Interiors blend oak timber, ceramics and tailored textiles.",
        scope: [
          "Structural upgrades and insulation of the timber frame",
          "Installation of heat-pump heating with heat recovery",
          "Design and fabrication of bespoke joinery for every room",
        ],
      },
    },
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectsForLocale(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    translation: project.translations[locale],
  }));
}

export function getFeaturedProjects(limit = 3) {
  const featuredProjects = projects.filter((project) => project.featured);

  return featuredProjects.slice(0, limit);
}

export function getLatestProject() {
  return projects.reduce((latest, current) =>
    current.year > latest.year ? current : latest
  );
}

export function getProjectCategories(): ProjectCategory[] {
  const categorySet = new Set<ProjectCategory>();

  projects.forEach((project) => {
    project.categories.forEach((category) => {
      categorySet.add(category);
    });
  });

  return Array.from(categorySet);
}

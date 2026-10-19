export type Language = 'pl' | 'en'

export interface Translations {
  topBar: {
    logoText: string
    hero: string
    projects: string
    skills: string
    about: string
    courses: string
    languages: string
    contact: string
  }
  hero: {
    headline: string
    subheadline: string
    description: string
    achievements: Array<{ text: string; details: string }>
    scheduleCall: string
    callMe: string
  }
  projects: {
    title: string
    subtitle: string
    viewLive: string
    viewCode: string
    technologies: string
    achievements: string
    myRole: string
  }
  skills: {
    title: string
    frontend: string
    mobile: string
    backend: string
    testing: string
    ai: string
    payments: string
    design: string
    other: string
  }
  about: {
    title: string
    content: string
  }
  courses: {
    title: string
    list: string[]
  }
  languages: {
    title: string
    list: Array<{
      name: string
      level: string
    }>
  }
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
  }
  footer: {
    copyright: string
  }
  common: {
    language: string
  }
}

export const translations: Record<Language, Translations> = {
  pl: {
    topBar: {
      logoText: 'Norbert Leksa',
      hero: 'Start',
      projects: 'Projekty',
      skills: 'Umiejętności',
      about: 'O mnie',
      courses: 'Kursy',
      languages: 'Języki',
      contact: 'Kontakt',
    },
    hero: {
      headline: 'Ekspert Frontend Developer',
      subheadline: 'Budowanie skalowalnych produktów web i mobile',
      description:
        'Frontend Developer tworzący skalowalne aplikacje webowe w React/Next.js i funkcjonalności mobilne we Flutterze. Dostarczam produkty obsługujące dziesiątki tysięcy użytkowników i osiągam mierzalne rezultaty biznesowe.',
      achievements: [
        {
          text: '4+ lata doświadczenia',
          details:
            'Ponad 4 lata komercyjnego doświadczenia w budowaniu skalowalnych aplikacji webowych w React/TypeScript oraz dowożeniu funkcji end-to-end (architektura → implementacja → optymalizacja).',
        },
        {
          text: '55k+ aktywnych użytkowników',
          details:
            'Kitopay obsługuje 55k+ aktywnych użytkowników i ~200k odsłon miesięcznie; dowiozłem kluczowe flow: menu z QR → checkout, synchronizacja z POS, dzielenie rachunku i napiwki.',
        },
        {
          text: '1M+ USD rocznego zysku',
          details:
            'Wdrożenie Kitopay we wszystkich lokalizacjach stacjonarnych Kitopi; po wprowadzeniu opłaty serwisowej produkt generuje ok. 1 mln USD rocznie.',
        },
        {
          text: '80% szybsze integracje',
          details:
            'Stworzyłem narzędzie w JavaScript, które skróciło integrację marki o ok. 80% (z ~10 min do ~2 min) i usprawniło onboarding.',
        },
      ],
      scheduleCall: 'Umów Rozmowę',
      callMe: 'Zadzwoń',
    },
    projects: {
      title: 'Projekty',
      subtitle: 'Kliknij projekt, aby zobaczyć szczegóły.',
      viewLive: 'Zobacz Live',
      viewCode: 'Zobacz Kod',
      technologies: 'Technologie:',
      achievements: 'Osiągnięcia:',
      myRole: 'Moja rola:',
    },
    skills: {
      title: 'Umiejętności',
      frontend: 'Frontend',
      mobile: 'Mobile',
      backend: 'Backend',
      testing: 'Testowanie',
      ai: 'AI',
      payments: 'Płatności',
      design: 'Design',
      other: 'Inne',
    },
    about: {
      title: 'O mnie',
      content:
        'Jestem Frontend Developerem z 4+ latami doświadczenia komercyjnego w budowaniu skalowalnych aplikacji webowych i dostarczaniu funkcjonalności mobilnych. Mam mocne zaplecze w React/TypeScript (m.in. Next.js, React Query, Redux) oraz w testowaniu i jakości (Playwright, Vitest, Jest, Cypress), dzięki czemu dowożę stabilne funkcje i dbam o przewidywalny rozwój produktu. W codziennej pracy stawiam na wydajność (code splitting, lazy loading, memoizacja), dobrą architekturę frontendu, czytelne UI oraz współpracę z backendem przy integracjach API i systemach produkcyjnych.\n\nPoza stricte UI mam doświadczenie w trudniejszych obszarach produktowych: integracje (w tym płatności), dopinanie przepływów end‑to‑end, rozwiązywanie edge case’ów i optymalizacja procesów w zespole (automatyzacje, narzędzia usprawniające delivery). Jestem inżynierem informatyki (studia kierunkowe) i swobodnie pracuję po angielsku na poziomie C2, także w środowisku międzynarodowym.\n\nStale podnoszę umiejętności: regularnie uczę się z kursów (m.in. Next 13, React Query, UI/UX w Figma) i wdrażam usprawnienia do codziennego workflow, w tym rozsądne wykorzystanie narzędzi AI jako wsparcia w analizie, refaktorach i zwiększaniu jakości kodu.',
    },
    courses: {
      title: 'Kursy',
      list: [
        "Figma UI UX Design Essentials '25",
        "React Query - React Server State Management '24",
        "NEXT 13 Masters '23",
        "EPAM end Webinar '20",
        "Codebrainers Fullstack Bootcamp '19",
      ],
    },
    languages: {
      title: 'Języki',
      list: [
        { name: 'Angielski', level: 'C2' },
        { name: 'Polski', level: 'Native' },
      ],
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Skontaktuj się ze mną',
      email: 'Email',
      phone: 'Telefon',
    },
    footer: {
      copyright: '© {{year}} Norbert Leksa. Wszelkie prawa zastrzeżone.',
    },
    common: {
      language: 'Język',
    },
  },
  en: {
    topBar: {
      logoText: 'Norbert Leksa',
      hero: 'Home',
      projects: 'Projects',
      skills: 'Skills',
      about: 'About',
      courses: 'Courses',
      languages: 'Languages',
      contact: 'Contact',
    },
    hero: {
      headline: 'Expert Frontend Developer',
      subheadline: 'Building scalable web & mobile products',
      description:
        'Frontend Developer building scalable web apps in React/Next.js and mobile features in Flutter. I ship products serving tens of thousands of users and deliver measurable business outcomes',
      achievements: [
        {
          text: '4+ years of experience',
          details:
            '4+ years of commercial experience building scalable web apps in React/TypeScript and shipping end-to-end features (architecture → implementation → optimization).',
        },
        {
          text: '55k+ active users',
          details:
            'Kitopay serves 55k+ active users and ~200k monthly views; I delivered core flows like QR menu → checkout, POS sync, bill splitting, and tipping.',
        },
        {
          text: '1M+ USD yearly profit',
          details:
            'Launched Kitopay across Kitopi physical locations; after introducing a service fee, it contributes ~1M USD in yearly profit.',
        },
        {
          text: '80% faster integrations',
          details:
            'Built JavaScript tooling that cut brand integration time by ~80% (from ~10 min to ~2 min) and improved onboarding efficiency.',
        },
      ],
      scheduleCall: 'Schedule A Call',
      callMe: 'Call Me',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Click on a project to see details.',
      viewLive: 'View Live',
      viewCode: 'View Code',
      technologies: 'Technologies:',
      achievements: 'Achievements:',
      myRole: 'My Role:',
    },
    skills: {
      title: 'Skills',
      frontend: 'Frontend',
      mobile: 'Mobile',
      backend: 'Backend',
      testing: 'Testing',
      ai: 'AI',
      payments: 'Payments',
      design: 'Design',
      other: 'Other',
    },
    about: {
      title: 'About Me',
      content:
        'I’m a Frontend Developer with 4+ years of commercial experience building scalable web applications and delivering mobile features. My core stack is React/TypeScript (including Next.js, React Query, Redux), with a strong focus on quality and testing (Playwright, Vitest, Jest, Cypress). I care about performance and maintainability—clean frontend architecture, reliable UX flows, and practical optimizations (code splitting, lazy loading, memoization).\n\nBeyond UI, I’m comfortable with end-to-end product work: API integrations (including payments), handling edge cases, and improving team delivery through automation and tooling. I hold a Computer Science engineering degree and I work fluently in English at C2 level in international environments.\n\nI’m committed to continuous learning—actively upskilling through courses (e.g., Next 13, React Query, Figma UI/UX) and improving my daily developer workflow, including thoughtful use of AI tools to support analysis, refactoring, and code quality.',
    },
    courses: {
      title: 'Courses',
      list: [
        "Figma UI UX Design Essentials '25",
        "React Query - React Server State Management '24",
        "NEXT 13 Masters '23",
        "EPAM end Webinar '20",
        "Codebrainers Fullstack Bootcamp '19",
      ],
    },
    languages: {
      title: 'Languages',
      list: [
        { name: 'English', level: 'C2' },
        { name: 'Polish', level: 'Native' },
      ],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with me',
      email: 'Email',
      phone: 'Phone',
    },
    footer: {
      copyright: '© {{year}} Norbert Leksa. All rights reserved.',
    },
    common: {
      language: 'Language',
    },
  },
}

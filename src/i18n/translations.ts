export type Language = 'pl' | 'en'

export interface Translations {
  topBar: {
    logoText: string
    hero: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    headline: string
    description: string
    achievements: Array<{ text: string; details: string }>
    scheduleCall: string
    callMe: string
    readMore: string
    readLess: string
  }
  projects: {
    title: string
    subtitle: string
    viewLive: string
    viewCode: string
    technologies: string
    achievements: string
    myRole: string
    close: string
    all: string
    wide: string
    mobile: string
    allScreenshots: string
    backToViewer: string
    screenshot: string
    previousScreenshot: string
    nextScreenshot: string
    gallery: string
    details: string
    otherProjects: string
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
    heading: string
    email: string
    phone: string
    copy: string
    copied: string
  }
  footer: {
    copyright: string
    backToTop: string
  }
  retro: {
    marquee: string
    title: string
    clickMe: string
    underConstruction: string
    visitor: string
    justYou: string
    navigation: string
    aboutMe: string
    aboutText: string
    myProjects: string
    clickProject: string
    skills: string
    guestbook: string
    emailMe: string
    orCall: string
    nowPlaying: string
    bestViewed: string
  }
  common: {
    language: string
    lightMode: string
    darkMode: string
  }
}

// Years since starting as a developer (1 June 2021), so the copy never goes stale
const careerStart = new Date(2021, 5, 1)
const now = new Date()
const years =
  now.getFullYear() -
  careerStart.getFullYear() -
  (now < new Date(now.getFullYear(), careerStart.getMonth(), careerStart.getDate()) ? 1 : 0)
// Polish plural: 2–4 lata (except 12–14), otherwise lat
const yearsPl =
  years % 10 >= 2 && years % 10 <= 4 && (years % 100 < 12 || years % 100 > 14) ? 'lata' : 'lat'

export const translations: Record<Language, Translations> = {
  pl: {
    topBar: {
      logoText: 'Norbert Leksa',
      hero: 'Start',
      projects: 'Projekty',
      skills: 'Umiejętności',
      contact: 'Kontakt',
    },
    hero: {
      headline: 'Senior Software Developer',
      description:
        'Senior Software Developer tworzący skalowalne aplikacje webowe w React/Next.js i funkcjonalności mobilne we Flutterze. Dostarczam produkty obsługujące dziesiątki tysięcy użytkowników i osiągam mierzalne rezultaty biznesowe.',
      achievements: [
        {
          text: `${years}+ ${yearsPl} doświadczenia`,
          details: `Ponad ${years} ${yearsPl} komercyjnego doświadczenia w budowaniu skalowalnych aplikacji webowych w React/TypeScript oraz dowożeniu funkcji end-to-end (architektura → implementacja → optymalizacja).`,
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
      readMore: 'Dowiedz się więcej',
      readLess: 'Zwiń',
    },
    projects: {
      title: 'Projekty',
      subtitle: 'Kliknij projekt, aby zobaczyć szczegóły.',
      viewLive: 'Zobacz Live',
      viewCode: 'Zobacz Kod',
      technologies: 'Technologie',
      achievements: 'Osiągnięcia',
      myRole: 'Moja rola',
      close: 'Zamknij',
      all: 'Wszystkie',
      wide: 'Desktop i tablet',
      mobile: 'Mobile',
      allScreenshots: 'Wszystkie zrzuty',
      backToViewer: 'Wróć do podglądu',
      screenshot: 'Zrzut',
      previousScreenshot: 'Poprzedni zrzut',
      nextScreenshot: 'Następny zrzut',
      gallery: 'Galeria',
      details: 'Szczegóły i zrzuty',
      otherProjects: 'Pozostałe projekty',
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
      content: `Jestem Senior Software Developerem z ${years}+ latami doświadczenia komercyjnego w budowaniu skalowalnych aplikacji webowych i dostarczaniu funkcjonalności mobilnych. Mam mocne zaplecze w React/TypeScript (m.in. Next.js, React Query, Redux) oraz w testowaniu i jakości (Playwright, Vitest, Jest, Cypress), dzięki czemu dowożę stabilne funkcje i dbam o przewidywalny rozwój produktu. W codziennej pracy stawiam na wydajność (code splitting, lazy loading, memoizacja), dobrą architekturę frontendu, czytelne UI oraz współpracę z backendem przy integracjach API i systemach produkcyjnych.\n\nPoza stricte UI mam doświadczenie w trudniejszych obszarach produktowych: integracje (w tym płatności), dopinanie przepływów end‑to‑end, rozwiązywanie edge case’ów i optymalizacja procesów w zespole (automatyzacje, narzędzia usprawniające delivery). Jestem inżynierem informatyki (studia kierunkowe) i swobodnie pracuję po angielsku na poziomie C2, także w środowisku międzynarodowym.\n\nStale podnoszę umiejętności: regularnie uczę się z kursów (m.in. Next 13, React Query, UI/UX w Figma) i wdrażam usprawnienia do codziennego workflow, w tym rozsądne wykorzystanie narzędzi AI jako wsparcia w analizie, refaktorach i zwiększaniu jakości kodu.`,
    },
    courses: {
      title: 'Kursy i certyfikaty',
      list: [
        "Contentful Certified Professional '26",
        "Sanity Certified Developer '26",
        "Figma UI UX Design Essentials '25",
        "React Query - React Server State Management '24",
        "NEXT 13 Masters '23",
        "EPAM Frontend Webinar '20",
        "Codebrainers Fullstack Bootcamp '19",
      ],
    },
    languages: {
      title: 'Języki',
      list: [
        { name: 'Angielski', level: 'C2' },
        { name: 'Polski', level: 'Ojczysty' },
        { name: 'Hiszpański', level: 'B1' },
      ],
    },
    contact: {
      title: 'Kontakt',
      heading: 'Porozmawiajmy.',
      subtitle:
        'Szukam roli Senior Software Developera — tylko zdalnie. Najszybciej odpowiadam na maila.',
      email: 'Email',
      phone: 'Telefon',
      copy: 'Kopiuj',
      copied: 'Skopiowano',
    },
    footer: {
      copyright: '© {{year}} Norbert Leksa. Wszelkie prawa zastrzeżone.',
      backToTop: 'Na górę',
    },
    retro: {
      marquee:
        '*** WITAJ NA STRONIE DOMOWEJ NORBERTA *** DZIĘKI ZA ODWIEDZINY *** WPISZ SIĘ DO KSIĘGI GOŚCI!!! *** TERAZ Z 3 CASE STUDIES ***',
      title: 'Strona domowa Norberta Leksy',
      clickMe: '← kliknij, żeby wrócić!',
      underConstruction: 'STRONA W BUDOWIE',
      visitor: 'Jesteś gościem nr',
      justYou: '(to tylko Ty, cześć!)',
      navigation: 'NAWIGACJA',
      aboutMe: 'O mnie',
      aboutText:
        'Cześć!!! Buduję skalowalne aplikacje webowe w React/Next.js i funkcje mobilne we Flutterze. Z moich rzeczy korzystają dziesiątki tysięcy ludzi. Dzięki, że wpadłeś do mojego kącika sieci!',
      myProjects: 'Moje projekty',
      clickProject: '(kliknij projekt, żeby zobaczyć zrzuty!)',
      skills: 'Umiejętności i certyfikaty',
      guestbook: 'Wpisz się do księgi gości!!',
      emailMe: 'Napisz do mnie!',
      orCall: 'albo zadzwoń:',
      nowPlaying: '♪ TERAZ GRA',
      bestViewed: 'Najlepiej oglądać w Netscape Navigator 4.0 w 800×600',
    },
    common: {
      language: 'Język',
      lightMode: 'Tryb jasny',
      darkMode: 'Tryb ciemny',
    },
  },
  en: {
    topBar: {
      logoText: 'Norbert Leksa',
      hero: 'Home',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      headline: 'Senior Software Developer',
      description:
        'Senior Software Developer building scalable web apps in React/Next.js and mobile features in Flutter. I ship products serving tens of thousands of users and deliver measurable business outcomes',
      achievements: [
        {
          text: `${years}+ years of experience`,
          details: `${years}+ years of commercial experience building scalable web apps in React/TypeScript and shipping end-to-end features (architecture → implementation → optimization).`,
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
      readMore: 'Learn more',
      readLess: 'Show less',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Click on a project to see details.',
      viewLive: 'View Live',
      viewCode: 'View Code',
      technologies: 'Technologies',
      achievements: 'Achievements',
      myRole: 'My role',
      close: 'Close',
      all: 'All',
      wide: 'Desktop & tablet',
      mobile: 'Mobile',
      allScreenshots: 'All screenshots',
      backToViewer: 'Back to viewer',
      screenshot: 'Screenshot',
      previousScreenshot: 'Previous screenshot',
      nextScreenshot: 'Next screenshot',
      gallery: 'Gallery',
      details: 'Details & screenshots',
      otherProjects: 'Other projects',
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
      content: `I’m a Senior Software Developer with ${years}+ years of commercial experience building scalable web applications and delivering mobile features. My core stack is React/TypeScript (including Next.js, React Query, Redux), with a strong focus on quality and testing (Playwright, Vitest, Jest, Cypress). I care about performance and maintainability—clean frontend architecture, reliable UX flows, and practical optimizations (code splitting, lazy loading, memoization).\n\nBeyond UI, I’m comfortable with end-to-end product work: API integrations (including payments), handling edge cases, and improving team delivery through automation and tooling. I hold a Computer Science engineering degree and I work fluently in English at C2 level in international environments.\n\nI’m committed to continuous learning—actively upskilling through courses (e.g., Next 13, React Query, Figma UI/UX) and improving my daily developer workflow, including thoughtful use of AI tools to support analysis, refactoring, and code quality.`,
    },
    courses: {
      title: 'Courses & certificates',
      list: [
        "Contentful Certified Professional '26",
        "Sanity Certified Developer '26",
        "Figma UI UX Design Essentials '25",
        "React Query - React Server State Management '24",
        "NEXT 13 Masters '23",
        "EPAM Frontend Webinar '20",
        "Codebrainers Fullstack Bootcamp '19",
      ],
    },
    languages: {
      title: 'Languages',
      list: [
        { name: 'English', level: 'C2' },
        { name: 'Polish', level: 'Native' },
        { name: 'Spanish', level: 'B1' },
      ],
    },
    contact: {
      title: 'Contact',
      heading: "Let's talk.",
      subtitle:
        'Looking for a Senior Software Developer role — remote only. Email is the fastest way to reach me.',
      email: 'Email',
      phone: 'Phone',
      copy: 'Copy',
      copied: 'Copied',
    },
    footer: {
      copyright: '© {{year}} Norbert Leksa. All rights reserved.',
      backToTop: 'Back to top',
    },
    retro: {
      marquee:
        "*** WELCOME TO NORBERT'S HOMEPAGE *** THANKS FOR STOPPING BY *** SIGN MY GUESTBOOK!!! *** NOW WITH 3 CASE STUDIES ***",
      title: "Norbert Leksa's Homepage",
      clickMe: '← click me to go back!',
      underConstruction: 'UNDER CONSTRUCTION',
      visitor: 'You are visitor no.',
      justYou: "(it's just you, hi!)",
      navigation: 'NAVIGATION',
      aboutMe: 'About me',
      aboutText:
        'Hi!!! I build scalable web apps in React/Next.js and mobile features in Flutter. My stuff is used by tens of thousands of people. Thanks for visiting my corner of the web!',
      myProjects: 'My Projects',
      clickProject: '(click a project to see the screenshots!)',
      skills: 'Skills & Certificates',
      guestbook: 'Sign my Guestbook!!',
      emailMe: 'E-mail me!',
      orCall: 'or call:',
      nowPlaying: '♪ NOW PLAYING',
      bestViewed: 'Best viewed in Netscape Navigator 4.0 at 800×600',
    },
    common: {
      language: 'Language',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
    },
  },
}

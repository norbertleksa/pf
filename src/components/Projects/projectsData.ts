// Base path for images - follows Vite's base (repo name) in production
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

// Smaller WebP copies next to each screenshot: .thumb (240px tall) for strips, .md (max 1400px wide) for cards and grids
export const imageVariant = (src: string, size: 'thumb' | 'md') =>
  src.replace(/\.(jpg|jpeg|png|webp)$/, `.${size}.webp`)

export interface Project {
  id: string
  name: string
  shortDescription: {
    en: string
    pl: string
  }
  description: {
    en: string
    pl: string
  }
  role: {
    en: string
    pl: string
  }
  screenshots?: string[]
  technologies: string[]
  achievements: {
    en: string[]
    pl: string[]
  }
  liveUrl?: string
  liveUrlLabel?: {
    en: string
    pl: string
  }
  githubUrl?: string
  appStoreUrl?: string
  githubHidden?: boolean
  tag?: {
    en: string
    pl: string
  }
  // Featured projects get a case-study layout with headline numbers
  highlight?: {
    tag: { en: string; pl: string }
    // which screenshot to show on the card; `fill` crops a wide shot to the whole frame
    cover: { index: number; fill?: boolean }
    metrics: Array<{ value: string; label: { en: string; pl: string } }>
  }
}

export const projects: Project[] = [
  {
    id: 'kitopay',
    name: 'Kitopay',
    tag: { en: 'Web app · payments', pl: 'Web app · płatności' },
    highlight: {
      tag: { en: 'Web app · payments', pl: 'Web app · płatności' },
      cover: { index: 0, fill: true },
      metrics: [
        { value: '~1M USD', label: { en: 'yearly profit', pl: 'rocznego zysku' } },
        { value: '55k', label: { en: 'active users', pl: 'aktywnych użytkowników' } },
        { value: '200k+', label: { en: 'monthly views', pl: 'wyświetleń miesięcznie' } },
      ],
    },
    shortDescription: {
      en: 'Dine-in payment app with QR code scanning and instant bill payment.',
      pl: 'Aplikacja płatności na miejscu z skanowaniem kodów QR i natychmiastową płatnością rachunku.',
    },
    description: {
      en: 'Dine-in payment app enabling restaurant customers to scan QR codes, view menus, and pay bills instantly. Features bill splitting and tipping for staff. Integrated with restaurant POS systems for real-time synchronization.',
      pl: 'Aplikacja płatności na miejscu umożliwiająca klientom restauracji skanowanie kodów QR, przeglądanie menu i natychmiastową płatność rachunków. Zawiera funkcje dzielenia rachunku i dawania napiwków dla personelu. Zintegrowana z systemami POS restauracji dla synchronizacji w czasie rzeczywistym.',
    },
    role: {
      en: 'Developed the web app enabling QR code scanning and instant bill payment. Implemented bill splitting and tipping features for waiting staff. Integrated the app with restaurant POS systems for real-time synchronization of orders and payments.',
      pl: 'Opracowałem aplikację webową umożliwiającą skanowanie kodów QR i natychmiastową płatność rachunku. Zaimplementowałem funkcje dzielenia rachunku i dawania napiwków dla personelu obsługującego. Zintegrowałem aplikację z systemami POS restauracji dla synchronizacji zamówień i płatności w czasie rzeczywistym.',
    },
    screenshots: [
      `${basePath}/images/projects/kitopipay/tablet1.jpg`,
      `${basePath}/images/projects/kitopipay/tablet2.jpg`,
      `${basePath}/images/projects/kitopipay/tablet3.jpg`,
      `${basePath}/images/projects/kitopipay/tablet4.jpg`,
      `${basePath}/images/projects/kitopipay/main.jpg`,
      `${basePath}/images/projects/kitopipay/menu.jpg`,
      `${basePath}/images/projects/kitopipay/split.jpg`,
      `${basePath}/images/projects/kitopipay/split1.jpg`,
      `${basePath}/images/projects/kitopipay/customTip.jpg`,
      `${basePath}/images/projects/kitopipay/list.jpg`,
    ],
    technologies: [
      'React 18',
      'TypeScript',
      'TanStack React Query',
      'Context API',
      'Vite',
      'Playwright',
      'Vitest',
    ],
    achievements: {
      en: [
        'Successfully launched across all Kitopi physical locations',
        'Processed 200+ transactions during the first weekend',
        'Contributes ~1M USD in yearly profit (1 AED or 1% above 10 AED service fee)',
        'Currently has 200,000+ monthly views and 55,000 active users',
      ],
      pl: [
        'Pomyślnie uruchomiony we wszystkich fizycznych lokalizacjach Kitopi',
        'Przetworzono 200+ transakcji podczas pierwszego weekendu',
        'Przyczynia się do ~1M USD rocznego zysku (1 AED lub 1% powyżej opłaty serwisowej 10 AED)',
        'Obecnie ma 200,000+ miesięcznych wyświetleń i 55,000 aktywnych użytkowników',
      ],
    },
    liveUrl:
      'https://pay.kitopi.com/?outletId=d846085a-d7ef-44e9-9697-f3752f14c525&brandId=242d0854-6203-4226-99cd-562c53240319&tableNumber=1',
    githubUrl: '',
    githubHidden: true,
  },
  {
    id: 'rightbite',
    name: 'RightBite',
    tag: { en: 'Web + mobile · meal plans', pl: 'Web + mobile · plany żywieniowe' },
    highlight: {
      tag: { en: 'Web + mobile · meal plans', pl: 'Web + mobile · plany żywieniowe' },
      cover: { index: 0, fill: true },
      metrics: [
        {
          value: 'Flex',
          label: { en: 'the only such service in the UAE', pl: 'jedyna taka usługa w ZEA' },
        },
        {
          value: '3',
          label: { en: 'apps: store · mobile · admin', pl: 'aplikacje: sklep · mobile · admin' },
        },
      ],
    },
    shortDescription: {
      en: 'Meal plans web app with unique Flex functionality for meal swapping.',
      pl: 'Aplikacja webowa planów żywieniowych z unikalną funkcjonalnością Flex do zamiany posiłków.',
    },
    description: {
      en: 'Meal plans responsive web app with unique Flex functionality - customers can replace meals with alternatives from other diet plans or healthy Kitopi restaurants. Includes admin tools for staff management.',
      pl: 'Responsywna aplikacja webowa planów żywieniowych z unikalną funkcjonalnością Flex - klienci mogą zastąpić posiłki alternatywami z innych planów dietetycznych lub zdrowych restauracji Kitopi. Zawiera narzędzia administracyjne do zarządzania personelem.',
    },
    role: {
      en: 'Built the storefront web app for meal-plan business, allowing customers to order meal plans, schedule consultations with dietitians, edit delivery days, and swap meals. Worked on the RightBite mobile app, introducing On-Demand/Flex functionality. Developed the RightBite Admin app, providing staff with tools to manage customer settings, adjust meal plans, book consultations, and change delivery addresses.',
      pl: 'Zbudowałem aplikację webową sklepu dla biznesu planów żywieniowych, umożliwiającą klientom zamawianie planów żywieniowych, planowanie konsultacji z dietetykami, edycję dni dostawy i zamianę posiłków. Pracowałem nad aplikacją mobilną RightBite, wprowadzając funkcjonalność On-Demand/Flex. Opracowałem aplikację RightBite Admin, zapewniającą personelowi narzędzia do zarządzania ustawieniami klientów, dostosowywania planów żywieniowych, rezerwacji konsultacji i zmiany adresów dostawy.',
    },
    screenshots: [
      `${basePath}/images/projects/rightBite/main.jpg`,
      `${basePath}/images/projects/rightBite/secondary.jpg`,
      `${basePath}/images/projects/rightBite/meals.jpg`,
      `${basePath}/images/projects/rightBite/mobile1.jpg`,
      `${basePath}/images/projects/rightBite/mobile2.jpg`,
      `${basePath}/images/projects/rightBite/mobile3.jpg`,
      `${basePath}/images/projects/rightBite/mobile4.jpg`,
    ],
    technologies: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Flutter',
      'Dart',
      'Bloc',
      'Firebase',
      'Contentful',
      'Vitest',
      'Cypress',
      'MUI',
      'Playwright',
      'Sentry',
    ],
    achievements: {
      en: [
        'Introduced Flex functionality in the RightBite mobile app',
        'Unique service in the UAE, major driver of new customer acquisition',
        'Built comprehensive admin tools for staff management',
        'Integrated with multiple diet plans and healthy restaurants',
      ],
      pl: [
        'Wprowadzono funkcjonalność Flex w aplikacji mobilnej RightBite',
        'Unikalna usługa w ZEA, główny czynnik pozyskiwania nowych klientów',
        'Zbudowano kompleksowe narzędzia administracyjne do zarządzania personelem',
        'Zintegrowano z wieloma planami dietetycznymi i zdrowymi restauracjami',
      ],
    },
    liveUrl: 'https://rightbite.com',
    appStoreUrl: 'https://apps.apple.com/ae/app/right-bite/id1643094159',
    githubHidden: true,
  },
  {
    id: 'kitopi-app',
    name: 'Kitopi App',
    tag: { en: 'Mobile · iOS & Android', pl: 'Mobile · iOS i Android' },
    highlight: {
      tag: { en: 'Mobile · iOS & Android', pl: 'Mobile · iOS i Android' },
      cover: { index: 0 },
      metrics: [
        { value: '200k+', label: { en: 'users', pl: 'użytkowników' } },
        { value: '140k AED', label: { en: 'additional revenue', pl: 'dodatkowego przychodu' } },
        { value: '+5000', label: { en: 'new users', pl: 'nowych użytkowników' } },
      ],
    },
    shortDescription: {
      en: 'Cross-brand food ordering and rewards platform for iOS and Android.',
      pl: 'Platforma zamówień jedzenia i nagród cross-brand dla iOS i Android.',
    },
    description: {
      en: 'Cross-brand food ordering and rewards platform available on iOS and Android. Features optimized split payments, digital menu for multiple restaurant brands, and scan-to-earn loyalty program for dine-in receipts.',
      pl: 'Platforma zamówień jedzenia i nagród cross-brand dostępna na iOS i Android. Zawiera zoptymalizowane płatności podzielone, cyfrowe menu dla wielu marek restauracji i program lojalnościowy scan-to-earn dla rachunków na miejscu.',
    },
    role: {
      en: 'Contributed to the development of the Kitopi mobile app, a cross-brand food ordering and rewards platform. Improved and optimized split payments, enhancing the checkout and bill-splitting experience. Participated in the implementation of the digital menu, enabling customers to seamlessly browse and order from multiple Kitopi restaurant brands. Worked on the scan-to-earn loyalty program for dine-in receipts.',
      pl: 'Współtworzyłem rozwój aplikacji mobilnej Kitopi, platformy zamówień jedzenia i nagród cross-brand. Ulepszyłem i zoptymalizowałem płatności podzielone, poprawiając doświadczenie checkout i dzielenia rachunku. Uczestniczyłem w implementacji cyfrowego menu, umożliwiając klientom płynne przeglądanie i zamawianie z wielu marek restauracji Kitopi. Pracowałem nad programem lojalnościowym scan-to-earn dla rachunków na miejscu.',
    },
    screenshots: [
      `${basePath}/images/projects/kitopiApp/kitopiApp1.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp2.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp3.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp4.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp5.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp6.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp7.jpg`,
      `${basePath}/images/projects/kitopiApp/kitopiApp8.jpg`,
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'Bloc'],
    achievements: {
      en: [
        'Attracted 5000 new users and generated 140,000 AED in additional revenue',
        'Userbase grew and is currently over 200k',
        'Improved and optimized split payments for better checkout experience',
        'Implemented scan-to-earn loyalty program for dine-in receipts',
      ],
      pl: [
        'Przyciągnięto 5000 nowych użytkowników i wygenerowano 140,000 AED dodatkowego przychodu',
        'Baza użytkowników wzrosła i obecnie przekracza 200k',
        'Ulepszono i zoptymalizowano płatności podzielone dla lepszego doświadczenia checkout',
        'Zaimplementowano program lojalnościowy scan-to-earn dla rachunków na miejscu',
      ],
    },
    liveUrl: 'https://www.kitopi.com/rewardsapp',
    liveUrlLabel: {
      en: 'View Presentation',
      pl: 'Zobacz prezentację',
    },
    appStoreUrl: 'https://apps.apple.com/us/app/kitopi/id1615524979',
    githubHidden: true,
  },
  {
    id: 'skosweb',
    name: 'SKOSWeb',
    tag: { en: 'Web app · aggregator', pl: 'Web app · agregator' },
    shortDescription: {
      en: 'Multi-brand meal aggregator with multi-tenant architecture.',
      pl: 'Agregator posiłków multi-brand z architekturą multi-tenant.',
    },
    description: {
      en: 'Multi-brand meal aggregator web app allowing customers to select meals from various brands with single delivery fee. Multi-tenant architecture enabling each tenant to sell products from associated brands. Includes comprehensive CMS for staff management.',
      pl: 'Aplikacja webowa agregatora posiłków multi-brand umożliwiająca klientom wybór posiłków z różnych marek z jedną opłatą za dostawę. Architektura multi-tenant umożliwiająca każdemu najemcy sprzedaż produktów z powiązanych marek. Zawiera kompleksowy CMS do zarządzania personelem.',
    },
    role: {
      en: 'Developed a multi-brand meal aggregator web app, allowing customers to select meals from various brands and pay a single delivery fee across them. Designed the app to support multi-tenant architecture, enabling each tenant to sell its own products and/or products from associated brands. Played a key role in building the SKOSWeb CMS app, where staff can create and configure tenants, manage banners, brands, menus, playlists, tags, categories, cashback values, and more.',
      pl: 'Opracowałem aplikację webową agregatora posiłków multi-brand, umożliwiającą klientom wybór posiłków z różnych marek i płacenie jednej opłaty za dostawę za wszystkie. Zaprojektowałem aplikację do obsługi architektury multi-tenant, umożliwiając każdemu najemcy sprzedaż własnych produktów i/lub produktów z powiązanych marek. Odegrałem kluczową rolę w budowaniu aplikacji SKOSWeb CMS, gdzie personel może tworzyć i konfigurować najemców, zarządzać banerami, markami, menu, playlistami, tagami, kategoriami, wartościami cashback i więcej.',
    },
    screenshots: [`${basePath}/images/projects/skosweb/main.jpg`],
    technologies: ['React', 'Redux', 'Jest', 'Cypress', 'Material-UI'],
    achievements: {
      en: [
        'Built multi-tenant architecture supporting multiple brands',
        'Developed comprehensive CMS for staff management',
        'Integrated systems for consistency across tenant data',
        'Enabled single delivery fee across multiple brands',
      ],
      pl: [
        'Zbudowano architekturę multi-tenant obsługującą wiele marek',
        'Opracowano kompleksowy CMS do zarządzania personelem',
        'Zintegrowano systemy dla spójności danych najemców',
        'Umożliwiono jedną opłatę za dostawę za wiele marek',
      ],
    },
    githubHidden: true,
  },
  {
    id: 'kitopi-rewards',
    name: 'Kitopi Rewards',
    tag: { en: 'Web app · rewards', pl: 'Web app · program nagród' },
    shortDescription: {
      en: 'Landing page for cashback redemption without mobile app.',
      pl: 'Strona docelowa do realizacji cashback bez aplikacji mobilnej.',
    },
    description: {
      en: 'Landing page for customers who wanted to claim their cashback but did not have the Kitopi mobile app. Simple, focused design to encourage app downloads and cashback redemption.',
      pl: 'Strona docelowa dla klientów, którzy chcieli zrealizować swój cashback, ale nie mieli aplikacji mobilnej Kitopi. Prosty, skupiony design zachęcający do pobierania aplikacji i realizacji cashback.',
    },
    role: {
      en: 'Created a landing page displayed to customers who wanted to claim their cashback but did not have the Kitopi mobile app. Designed a simple, focused interface to encourage app downloads and facilitate cashback redemption process.',
      pl: 'Stworzyłem stronę docelową wyświetlaną klientom, którzy chcieli zrealizować swój cashback, ale nie mieli aplikacji mobilnej Kitopi. Zaprojektowałem prosty, skupiony interfejs zachęcający do pobierania aplikacji i ułatwiający proces realizacji cashback.',
    },
    screenshots: [`${basePath}/images/projects/rewards/main.jpg`],
    technologies: ['React', 'TypeScript'],
    achievements: {
      en: [
        'Created focused landing page for cashback redemption',
        'Encouraged app downloads for customers without mobile app',
        'Simple and effective user experience',
        'Integrated with Kitopi rewards system',
      ],
      pl: [
        'Stworzono skupioną stronę docelową do realizacji cashback',
        'Zachęcono do pobierania aplikacji dla klientów bez aplikacji mobilnej',
        'Proste i skuteczne doświadczenie użytkownika',
        'Zintegrowano z systemem nagród Kitopi',
      ],
    },
    liveUrl: 'https://www.kitopirewards.com/',
    githubHidden: true,
  },
  {
    id: 'brand-lp',
    name: 'Brand LP',
    tag: { en: 'Web app · landing page', pl: 'Web app · strona docelowa' },
    shortDescription: {
      en: 'Landing page for brand transition from web to mobile app.',
      pl: 'Strona docelowa dla przejścia marki z web na aplikację mobilną.',
    },
    description: {
      en: 'Landing page designed to redirect customers of a brand transitioning from web platform to mobile app. Serves as an advertisement and smooth transition tool for brand migration.',
      pl: 'Strona docelowa zaprojektowana do przekierowania klientów marki przechodzącej z platformy webowej na aplikację mobilną. Służy jako reklama i narzędzie płynnego przejścia dla migracji marki.',
    },
    role: {
      en: 'Designed a landing page to redirect customers of a brand transitioning from a web platform to a mobile app, essentially serving as an advertisement. Created a smooth transition experience to encourage mobile app adoption during the platform migration.',
      pl: 'Zaprojektowałem stronę docelową do przekierowania klientów marki przechodzącej z platformy webowej na aplikację mobilną, zasadniczo służącą jako reklama. Stworzyłem płynne doświadczenie przejścia zachęcające do przyjęcia aplikacji mobilnej podczas migracji platformy.',
    },
    screenshots: [
      `${basePath}/images/projects/brandLp/main.jpg`,
      `${basePath}/images/projects/brandLp/mobile.jpg`,
    ],
    technologies: ['React', 'TypeScript'],
    achievements: {
      en: [
        'Created transition landing page for brand migration',
        'Smooth redirect from web to mobile app',
        'Effective advertisement for mobile app adoption',
        'Seamless user experience during platform transition',
      ],
      pl: [
        'Stworzono stronę docelową przejścia dla migracji marki',
        'Płynne przekierowanie z web na aplikację mobilną',
        'Skuteczna reklama dla przyjęcia aplikacji mobilnej',
        'Bezproblemowe doświadczenie użytkownika podczas przejścia platformy',
      ],
    },
    liveUrl: 'https://brandlp.kitopiconnect.com/',
    githubHidden: true,
  },
]

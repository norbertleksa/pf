export interface SkillCategory {
  id: string
  name: string
  skills: string[]
}

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'frontend',
    skills: [
      'React',
      'Next.js',
      'React Query',
      'Redux',
      'TypeScript',
      'Vite',
      'JavaScript',
      'MUI',
      'Tailwind',
    ],
  },
  {
    id: 'mobile',
    name: 'mobile',
    skills: ['Flutter', 'Dart', 'Bloc', 'React Native'],
  },
  {
    id: 'backend',
    name: 'backend',
    skills: ['Firebase', 'AWS Lambda', 'REST API', 'Headless CMS'],
  },
  {
    id: 'testing',
    name: 'testing',
    skills: ['Vitest', 'Jest', 'Playwright', 'Cypress'],
  },
  {
    id: 'ai',
    name: 'ai',
    skills: [
      'Claude Code',
      'Antigravity',
      'Cursor',
      'GitHub Copilot',
      'Codex',
      'Gemini CLI',
      'ChatGPT',
      'Perplexity',
      'Kiro',
    ],
  },
  {
    id: 'payments',
    name: 'payments',
    skills: ['Checkout', 'Apple Pay', 'Google Pay', 'MoneyHash'],
  },
  {
    id: 'design',
    name: 'design',
    skills: ['Figma'],
  },
  {
    id: 'other',
    name: 'other',
    skills: ['Git', 'GitLab', 'GitHub', 'CI/CD', 'Sentry', 'Jira', 'Swagger', 'SEO', 'BitBucket'],
  },
]

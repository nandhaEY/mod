export const i18n = {
  defaultLocale: 'el',
  locales: ['el', 'en'],
  titles: {
    'el': 'Ελληνικά',
    'en': 'English',
  },
} as const

export type Locale = (typeof i18n)['locales'][number]

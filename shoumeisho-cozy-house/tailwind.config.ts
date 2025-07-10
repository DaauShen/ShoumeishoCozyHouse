import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#80C6EA',
      },
      fontFamily: {
        jp: ['"Kosugi Maru"', ...defaultTheme.fontFamily.sans],
        vi: ['"M PLUS Rounded 1c"', ...defaultTheme.fontFamily.sans],
        default: ['"Noto Sans Rounded"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

export default config

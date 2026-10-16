/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B2545',
          800: '#0E2B52',
          700: '#13315C',
          600: '#1B427A',
        },
        gold: {
          500: '#FFC20E',
          600: '#E5AC00',
        },
        steel: {
          400: '#7A9CC6',
          300: '#9AB7DA',
          500: '#5F83AF',
        },
        blue: {
          600: '#1F5FAD',
          700: '#174B8B',
          500: '#2A72CD',
          50: '#F0F5FC',
        },
        canvas: '#F5F7FA',
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#E3E8EF',
          light: '#EDF1F6',
          dark: '#CFD7E3',
        },
        primaryText: '#14213D',
        secondaryText: '#5B6B7F',
        success: '#1E9E6A',
        warning: '#E8A317',
        danger: '#D64545',
        info: '#2F80ED',
        dark: {
          bg: '#0A1628',
          surface: '#13233D',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#F0F4F8',
          muted: '#8A99AD',
        },
        module: {
          a: '#1F5FAD', // Clearinghouse & Portal
          b: '#7B4FD6', // GeoAI
          c: '#0E9F8E', // Marketplace
          d: '#E07B24', // Capacity Building
          e: '#2BA6DE', // Digital Twin
          f: '#5DAA3A', // Open Data
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', '"Noto Kufi Arabic"', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'level-1': '0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)',
        'level-2': '0 12px 32px rgba(16, 24, 40, 0.14), 0 2px 6px rgba(16, 24, 40, 0.04)',
        'dark-level-1': '0 2px 8px rgba(0, 0, 0, 0.35)',
        'dark-level-2': '0 16px 40px rgba(0, 0, 0, 0.55)',
      },
    },
  },
  plugins: [],
}

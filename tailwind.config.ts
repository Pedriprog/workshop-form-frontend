import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#5B3F99', hover: '#4A3180', ring: '#5B3F9926' },
        accent: '#F5C518',
        background: '#F5EDDB',
        surface: '#FFFFFF',
        'border-muted': '#D9CEBA',
        'text-primary': '#1A1A1A',
        'text-muted': '#999999',
        error: { DEFAULT: '#CC3300', bg: '#FFF5F5', border: '#FFC5B0' },
        success: { DEFAULT: '#2D7D46', bg: '#F0FFF4', border: '#86EFAC' },
      },
      fontFamily: { sans: ['Nunito', 'sans-serif'] },
      borderRadius: { input: '8px', chip: '12px', card: '16px' },
      boxShadow: { focus: '0 0 0 3px #5B3F9926' },
      maxWidth: { form: '760px' },
    },
  },
  plugins: [],
}

export default config

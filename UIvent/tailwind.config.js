import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'

// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        primary: '#FFD700',
      },
      spacing: {
        screen: '100vh',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

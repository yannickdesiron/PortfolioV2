import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Use class strategy for dark mode
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',   // Adjust paths to your source files
    './src/components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',          // Example CSS variables, adjust if needed
        'background-dark': 'var(--background-dark)',
        foreground: 'var(--foreground)',
        'foreground-dark': 'var(--foreground-dark)',
      }
    }
  }
};

export default config;

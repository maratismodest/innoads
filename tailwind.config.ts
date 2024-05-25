import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './pages-lib/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: {
        DEFAULT: '#1282a6',
      },
      green: '#008489',
      yellow: '#F0BB3C',
      white: '#FFFFFF',
      gray: {
        light: '#F9F8F9',
        DEFAULT: '#f9f8f9',
        dark: '#8191A2',
      },
      black: '#151617',
      red: '#f00',
      inputBorder: 'hsl(0deg 0% 80%)',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-displaymodes')],
};
export default config;

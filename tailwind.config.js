/** @type {import('tailwindcss').Config} */
const config =  {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-[#97D7FB]',
    'bg-[#1C9647]',
    // or a regex that covers uppercase too:
    { pattern: /bg-\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})]/ },
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [],
};

export default config;
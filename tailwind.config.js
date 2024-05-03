/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'cool-purple': 'hsl(277, 91%, 56%)',
        'waterhen-back': 'hsl(216, 25%, 25%)',
        'blue-bottle': 'hsl(215, 27%, 32%)',
        'dark-room': 'hsl(219, 13%, 44%)',
        'angela-bay': 'hsl(216, 47%, 78%)',
        'white-solid': 'hsl(220, 38%, 97%)',
        'envy-love': 'hsl(151, 70%, 50%)',
        'khmer-curry': 'hsl(0, 82%, 63%)',
        'light-orange': '#FFF1E9',
        'light-green': '#E0FDEF',
        'light-blue': '#EBF0FF',
        'light-purple': '#F6E7FF',
      },
    },
  },
  plugins: [],
};

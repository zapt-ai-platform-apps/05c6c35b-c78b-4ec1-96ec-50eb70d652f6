export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#1a4d2e',
        'brand-gold': '#ff9d00',
        'brand-cream': '#f8f5f0',
      },
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
};
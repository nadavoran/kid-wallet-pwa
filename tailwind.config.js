/**** Tailwind config ****/
/** Update content globs if you move files **/
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wallet: {
          primary: '#0ea5e9',
          accent: '#22c55e',
          danger: '#ef4444',
          amber: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.12)',
        bg: '#0e1525',
        fg: '#e6ecff',
        accent: '#2770ff'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};

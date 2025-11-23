/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"SF Pro Display"', 'IBM Plex Sans', 'system-ui', 'sans-serif']
      },
      colors: {
        navy: '#0D1117',
        slate: '#1F2937',
        accent: '#3B82F6',
        surface: '#111827',
        border: '#374151',
        textPrimary: '#FFFFFF',
        textSecondary: '#9CA3AF'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(0, 0, 0, 0.35)',
        panel: '0 10px 40px rgba(0, 0, 0, 0.28)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.12), transparent 28%), radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.06), transparent 25%)'
      }
    }
  },
  plugins: []
};

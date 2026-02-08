/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        // Base colors - Deep black theme
        navy: '#0a0a0a',
        slate: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#0d0d0d'
        },
        // Accent colors - Ben 10 green theme
        accent: {
          DEFAULT: '#00ff41',
          light: '#39ff6e',
          dark: '#00cc34',
          neon: '#00ff41',
          glow: '#00ff4180',
          muted: '#00cc3480'
        },
        // Secondary accent - Matrix green variants
        matrix: {
          DEFAULT: '#00e639',
          light: '#66ff8c',
          dark: '#00b32d'
        },
        // Surface colors
        surface: {
          DEFAULT: '#0f0f0f',
          light: '#1a1a1a',
          dark: '#050505'
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(0, 255, 65, 0.15)',
          light: 'rgba(0, 255, 65, 0.25)',
          glow: 'rgba(0, 255, 65, 0.5)'
        },
        // Text colors
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        textMuted: '#707070'
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'panel': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 40px rgba(0, 255, 65, 0.3)',
        'glow-sm': '0 0 20px rgba(0, 255, 65, 0.2)',
        'glow-lg': '0 0 60px rgba(0, 255, 65, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(0, 255, 65, 0.1)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 255, 65, 0.05)',
        'neon': '0 0 5px #00ff41, 0 0 20px rgba(0, 255, 65, 0.3), 0 0 40px rgba(0, 255, 65, 0.1)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 255, 65, 0.1), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0, 255, 65, 0.08), transparent)',
        'gradient-primary': 'linear-gradient(135deg, #00ff41 0%, #00cc34 50%, #00e639 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 26, 0.8) 100%)',
        'gradient-border': 'linear-gradient(135deg, rgba(0, 255, 65, 0.5), rgba(0, 204, 52, 0.3), rgba(0, 255, 65, 0.5))'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 255, 65, 0.4)' }
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' }
        }
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    }
  },
  plugins: []
};

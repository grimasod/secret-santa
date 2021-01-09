const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    container: {
      center: true
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.warmGray,
      blue: colors.lightBlue,
      green: colors.emerald,
      red: colors.red
    },
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' }
        }
      }
    }
  },
  variants: {
    extend: {
      textDecoration: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled']
    }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'xs': '480px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'purple': {
        100: '#6B81FF',
        200: '#D3DCFF',
        300: '#EBEBFF',
        400: '#F9F8FF',
        500: '#4A60DA'
      }, 
      'cyan': '#00B8FF',
      'black': {
        100: '#000000',
        200: '#777777',
        300: '#3D3C3C'
      },
      'white': '#FFFFFF',
      'red': '#FF3636',
      'green': '#1dc198', 
      'yellow': '#ffca62'
    }
  },
  plugins: [],
}

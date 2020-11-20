const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray
      },
      // colors: {
      //   gray: {
      //     100: '#F4F4F4',
      //     200: '#D8D8D8',
      //     300: '#BCBCBC',
      //     400: '#A0A0A0',
      //     500: '#848484',
      //     600: '#686868',
      //     700: '#4C4C4C',
      //     800: '#303030',
      //     900: '#141414'
      //   },
      //   green: {
      //     100: '#f5fff5',
      //     200: '#d6ffd6',
      //     300: '#b8e5b8',
      //     400: '#99c699',
      //     500: '#7aa77a',
      //     600: '#5c895c',
      //     700: '#3d6a3d',
      //     800: '#1f4c1f',
      //     900: '#002d00'
      //   }
      // },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {}
//   },
//   variants: {
//     extend: {}
//   },
//   plugins: []
// };

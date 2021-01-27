const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './hooks/**/*.{js,ts,jsx,tsx}'],
    preserveHtmlElements: true
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray
      },
      fontFamily: {
        sans: ['Mulish']
        // sans: ['Mulish', ...fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700')
              },
              code: { color: theme('colors.blue.400') }
            },
            code: { color: theme('colors.green.700') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600')
              },
              code: { color: theme('colors.blue.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100')
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.300') },
            code: { color: theme('colors.green.500') },
            pre: { code: { color: theme('colors.gray.100') } },
            thead: {
              color: theme('colors.gray.100')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark'],
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

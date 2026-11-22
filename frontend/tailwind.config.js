/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milk: '#fffdf8',
        cocoa: {
          DEFAULT: '#2a170e',
          soft: '#5a3a28',
          deep: '#1a0d08',
        },
        toffee: {
          DEFAULT: '#c2622b',
          deep: '#a24a1a',
          ink: '#8e3f15',
          light: '#fbf0e8',
        },
        honey: {
          DEFAULT: '#f2be6b',
          soft: '#fbe3b4',
          light: '#fef7ea',
        },
        sky: {
          DEFAULT: '#bfddf5',
          deep: '#2f6e9e',
          light: '#ebf4fc',
        },
        blush: {
          DEFAULT: '#f9cdbf',
          soft: '#fdeee9',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Figtree', 'sans-serif'],
        scrawl: ['"Shantell Sans"', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(42, 23, 14, 0.06)',
        'soft-lg': '0 14px 40px rgba(42, 23, 14, 0.1)',
        'lift': '0 12px 28px -6px rgba(194, 98, 43, 0.16)',
      }
    },
  },
  plugins: [],
}

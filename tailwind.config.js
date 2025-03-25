/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          50: '#1a0e00',
          100: '#331c00',
          200: '#663800',
          300: '#995400',
          400: '#cc7000',
          500: '#ff8c00',
          600: '#ffa333',
          700: '#ffba66',
          800: '#ffd199',
          900: '#ffe8cc',
          950: '#fff4e5',
        },
        background: {
          50: '#001a05',
          100: '#00330a',
          200: '#006614',
          300: '#00991f',
          400: '#00cc29',
          500: '#00ff33',
          600: '#33ff5c',
          700: '#66ff85',
          800: '#99ffad',
          900: '#ccffd6',
          950: '#e5ffeb',
        },
        primary: {
          50: '#101108',
          100: '#212310',
          200: '#424521',
          300: '#636831',
          400: '#838b41',
          500: '#a4ad52',
          600: '#b6be74',
          700: '#c9ce97',
          800: '#dbdeba',
          900: '#edefdc',
          950: '#f6f7ee',
        },
        secondary: {
          50: '#09100f',
          100: '#12211e',
          200: '#24423c',
          300: '#36635b',
          400: '#488479',
          500: '#5ba497',
          600: '#7bb7ac',
          700: '#9cc9c1',
          800: '#bddbd5',
          900: '#deedea',
          950: '#eff6f5',
        },
        accent: {
          50: '#061407',
          100: '#0c270d',
          200: '#184e1b',
          300: '#247528',
          400: '#309c35',
          500: '#3cc343',
          600: '#63cf68',
          700: '#8adb8e',
          800: '#b1e7b4',
          900: '#d8f3d9',
          950: '#ebf9ec',
        },
      },
    },
  },
  plugins: [],
}

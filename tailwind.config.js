module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /(bg|text|border)-(gray|green|yellow|red|blue|indigo)-(100|200|300|400|500|600|700|800|900)/ }
  ],
  plugins: [],
}

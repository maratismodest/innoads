/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './modules/**/*.{js,ts,jsx,tsx}',
        './styles/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            blue: {
                DEFAULT: '#1282a6'
            },
            green: '#008489',
            yellow: '#F0BB3C',
            white: '#FFFFFF',
            gray: {
                light: '#F9F8F9',
                DEFAULT: '#f9f8f9',
                dark: '#8191A2'
            },
            black: '#151617',
            red: '#f00',
            inputBorder: 'hsl(0deg 0% 80%)'
        },
        extend: {},
    },
    plugins: [],
}

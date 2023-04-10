/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./modules/**/*.{js,ts,jsx,tsx}",
        "./styles/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: '#ffffff',
            grey: '#f9f8f9',
            black: '#151617',
            blue: '#1282a6',
            green: '#15b012',
            red: '#f00',
            inputBorder: 'hsl(0deg 0% 80%)'
        },
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100%',
                        div: {
                            marginTop: 4,
                        },
                        h1: {
                            marginTop: 0,
                            marginBottom: 4,
                            fontSize: 20,
                        },
                        h2: {
                            marginTop: 0,
                            marginBottom: 4,
                            fontSize: 18
                        },
                        h3: {
                            marginTop: 0,
                            marginBottom: 4,
                            fontSize: 16
                        },
                        p: {
                            marginTop: 4,
                            marginBottom: 0
                        },
                        'ul > li::marker': {
                            // color: 'var(--tw-prose-bullets)',
                            color: 'black',
                        },
                        a: {
                            color: '#1282a6'
                        },
                        li: {
                            marginTop: 4,
                            marginBottom: 0
                        },
                        'ul > li': {
                            paddingLeft: 0,
                        },
                    }
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')({
        className: 'wysiwyg',
    }),],
}

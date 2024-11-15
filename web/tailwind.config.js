/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line unicorn/no-empty-file
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '380px',
            },
            maxWidth: {
                md2: '420px',
                md3: '458px',
            },
            colors: {
                ens: {
                    light: {
                        blue: {
                            DEFAULT: '#5298FF',
                            50: '#FFFFFF',
                            100: '#F5F9FF',
                            200: '#CCE1FF',
                            300: '#A4C9FF',
                            400: '#7BB0FF',
                            500: '#5298FF',
                            600: '#1A77FF',
                            700: '#005BE1',
                            800: '#0044A9',
                            900: '#002E71',
                            active: '#003685',
                            dim: '#056AFF',
                            primary: '#3889FF',
                            bright: '#569AFF',
                            light: '#D1E4FF',
                            surface: '#EEF5FF',
                        },
                        indigo: {
                            active: '#19175F',
                            dim: '#342FC5',
                            primary: '#5854D6',
                            bright: '#7E7BDF',
                            light: '#C7C5F1',
                            surface: '#E3E2F8',
                        },
                        purple: {
                            active: '#3D1353',
                            dim: '#8A2BBA',
                            primary: '#A343D3',
                            bright: '#B86EDD',
                            light: '#E3C6F1',
                            surface: '#EBD6F5',
                        },
                        pink: {
                            active: '#440E28',
                            dim: '#AE2366',
                            primary: '#D52E7E',
                            bright: '#DE5999',
                            light: '#F4CDE0',
                            surface: '#EBD6F5',
                        },
                        red: {
                            active: '#280A06',
                            dim: '#992515',
                            primary: '#C6301B',
                            bright: '#E34631',
                            light: '#F0C2C2',
                            surface: '#F9E7E7',
                        },
                        orange: {
                            active: '#492C03',
                            dim: '#C37609',
                            primary: '#F3930B',
                            bright: '#F6A93C',
                            light: '#FBE1BC',
                            surface: '#FDF0DD',
                        },
                        yellow: {
                            active: '#423505',
                            dim: '#B9930E',
                            primary: '#E9B911',
                            bright: '#F0C93C',
                            light: '#FFEFAD',
                            surface: '#FFF5CD',
                        },
                        green: {
                            active: '#072C21',
                            dim: '#158463',
                            primary: '#199C75',
                            bright: '#1EB789',
                            green: '#CBE7DC',
                            surface: '#E7F4EF',
                        },
                        grey: {
                            active: '#1E2122',
                            dim: '#595959',
                            primary: '#9B9BA7',
                            bright: '#B6B6BF',
                            light: '#E8E8E8',
                            surface: '#F6F6F6',
                        },
                        text: {
                            primary: '#1E2122',
                            secondary: '#9B9BA7',
                            accent: '#FFFFFF',
                            disabled: '#B6B6BF',
                        },
                        background: {
                            primary: '#FFFFFF',
                            secondary: '#F6F6F6',
                            disabled: '#E8E8E8',
                        },
                        // Additional
                        border: '#E8E8E8',
                    },
                    dark: {
                        blue: {
                            active: '#EEF5FF',
                            dim: '#D1E4FF',
                            primary: '#3889FF',
                            bright: '#056AFF',
                            light: '#0C4597',
                            surface: '#20395F',
                        },
                        indigo: {
                            active: '#E3E2F8',
                            dim: '#C7C5F1',
                            primary: '#6B67E9',
                            bright: '#342FC5',
                            light: '#221E90',
                            surface: '#23216D',
                        },
                        purple: {
                            active: '#EBD6F5',
                            dim: '#E3C6F1',
                            primary: '#A343D3',
                            bright: '#8A2BBA',
                            light: '#5E1683',
                            surface: '#42145A',
                        },
                        pink: {
                            active: '#FAE8F1',
                            dim: '#F4CDE0',
                            primary: '#D52E7E',
                            bright: '#AE2366',
                            light: '#761544',
                            surface: '#5B1135',
                        },
                        red: {
                            active: '#F9E7E7',
                            dim: '#F0C2C2',
                            primary: '#C6301B',
                            bright: '#A72614',
                            light: '#7F1313',
                            surface: '#3F2424',
                        },
                        orange: {
                            active: '#FDF0DD',
                            dim: '#FBE1BC',
                            primary: '#F3930B',
                            bright: '#C37609',
                            light: '#6D4308',
                            surface: '#583503',
                        },
                        yellow: {
                            active: '#FFF5CD',
                            dim: '#FFEFAD',
                            primary: '#E9B911',
                            bright: '#B9930E',
                            light: '#5C4B0C',
                            surface: '#373222',
                        },
                        green: {
                            active: '#E7F4EF',
                            dim: '#CBE7DC',
                            primary: '#199C75',
                            bright: '#158463',
                            green: '#104A38',
                            surface: '#153C31',
                        },
                        grey: {
                            active: '#F6F6F6',
                            dim: '#E8E8E8',
                            primary: '#9B9BA7',
                            bright: '#5D5C62',
                            light: '#424347',
                            surface: '#141416',
                        },
                        text: {
                            primary: '#FFFFFF',
                            secondary: '#9B9BA7',
                            accent: '##FFFFFF',
                            disabled: '#5D5C62',
                        },
                        background: {
                            primary: '#1E2122',
                            secondary: '#141416',
                            disabled: '##424347',
                        },
                        // Additional
                        border: '#42464E',
                    },
                },
            },
        },
    },
    plugins: [],
};
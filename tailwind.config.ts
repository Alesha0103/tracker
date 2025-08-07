/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export const basicColors = {
    primary: "#050515",
};

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {},
        extend: {
            inset: {},
            height: {},
            width: {},
            maxWidth: {},
            minHeight: {},
            maxHeight: {},
            spacing: {},
            colors: {
                ...basicColors,
            },
            keyframes: {},
            animation: {},
            fontSize: {},
            backgroundImage: {},
            borderRadius: {},
            fontFamily: {
                fantasy: ["fantasy"],
            },
        },
    },
};

export default config;

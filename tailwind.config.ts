/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export const basicColors = {
    primary: "#050515",
    secondary: "#08082c",
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
            backgroundImage: {
                "horizontal-blue":
                    "linear-gradient(to right, #07071dff, #030324ff)",
            },
            fontFamily: {
                fantasy: ["fantasy"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;

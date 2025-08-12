/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export const basicColors = {
    primary: "#050515",
    secondary: "#08082c",
    midnight: "#05051E",
    "dark-blue": "#08086d",
    "light-blue": "#0F0FA0",
};

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            maxWidth: {
                container: "1920px",
            },
            colors: {
                ...basicColors,
            },
            backgroundImage: {
                "horizontal-blue":
                    "linear-gradient(to right, #07071dff, #030324ff)",
                "horisontal-hover-blue":
                    "linear-gradient(to right, #08082c, #050515)",
            },
            fontFamily: {
                fantasy: ["fantasy"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;

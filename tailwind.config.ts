/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export const basicColors = {
    primary: "#050515",
    secondary: "#08082c",
    midnight: "#05051E",
    "app-green": "#0d720d",
    "dark-blue": "#08086d",
    "light-blue": "#0F0FA0",
};

const config: Config = {
    darkMode: ["class"],
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
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;

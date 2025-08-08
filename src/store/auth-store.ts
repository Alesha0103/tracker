import { Locale } from "@/enums/auth";
import { setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Authtate {
    user: any;
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useAuthStore = create<Authtate>()(
    persist(
        (set) => ({
            user: null,
            locale: Locale.EN,

            setLocale: (locale: Locale) => {
                set({ locale });
                setCookie("locale", locale);
            },
        }),
        {
            name: "auth",
            partialize: (state) => ({
                locale: state.locale,
            }),
        }
    )
);

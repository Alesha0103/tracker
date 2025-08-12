import { Locale } from "@/enums/auth";
import { User } from "@/types/auth";
import { setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    user: User | null;
    locale: Locale;
    setLocale: (locale: Locale) => void;
    setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            locale: Locale.EN,

            setLocale: (locale: Locale) => {
                set({ locale });
                setCookie("locale", locale);
            },
            setUser: (user: User | null) => {
                set({ user });
            },
        }),
        {
            name: "user",
            partialize: (state) => ({
                user: state.user,
                locale: state.locale,
            }),
        }
    )
);

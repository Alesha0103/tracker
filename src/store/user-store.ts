import { Locale } from "@/enums/auth";
import { FilterUsersFields, User } from "@/types/users";
import { setCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    user: User | null;
    locale: Locale;
    savedUserFilterForm: FilterUsersFields | null;
    setLocale: (locale: Locale) => void;
    setUser: (user: User | null) => void;
    setUserFilterForm: (formData: FilterUsersFields) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            savedUserFilterForm: null,
            locale: Locale.EN,

            setLocale: (locale: Locale) => {
                set({ locale });
                setCookie("locale", locale);
            },
            setUser: (user: User | null) => {
                set({ user });
            },
            setUserFilterForm: (savedUserFilterForm: FilterUsersFields) => {
                set({ savedUserFilterForm });
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

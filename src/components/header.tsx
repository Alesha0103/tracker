"use client";

import Image from "next/image";
import React from "react";

import Logo from "../assets/images/logo.png";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth-store";
import { Locale } from "@/enums/auth";

export const Header = () => {
    const t = useTranslations("general");
    const { setLocale } = useAuthStore();

    return (
        <div className="border-b-2 border-white/10 py-2 px-6">
            <div className="flex gap-x-2 items-center">
                <Image width={25} height={25} src={Logo} alt="logo" priority />
                <span className="text-white font-fantasy">{t("appName")}</span>
            </div>

            <button onClick={() => setLocale(Locale.UA)} className="bg-white">
                Change Locale to UA
            </button>
            <button
                onClick={() => setLocale(Locale.EN)}
                className="bg-white ml-10"
            >
                Change Locale to En
            </button>
        </div>
    );
};

"use client";

import Image from "next/image";
import React, { useCallback, useMemo } from "react";

import Logo from "../assets/images/logo.png";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth-store";
import { Locale } from "@/enums/auth";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { CustomButton } from "./ui/custom-button";
import useModal from "@/hooks/use-modal";

export const Header = () => {
    const router = useRouter();

    const t = useTranslations("general");
    const tButtons = useTranslations("buttons");
    const { user, locale, setLocale } = useAuthStore();

    const { openModal, closeModal, Modal } = useModal();

    const rows = Object.keys(t.raw("locale"));

    const changeLocale = (locale: Locale) => {
        setLocale(locale);
        router.refresh();
    };

    const renderLocaleItem = useMemo(
        () => (item: string) => {
            return (
                <SelectItem
                    key={item}
                    value={item}
                    className="text-slate-300 text-sm text-center cursor-pointer focus:text-white focus:bg-red-500 focus:outline-none focus:ring-0 focus:border-transparent rounded-sm py-1 transition-colors"
                >
                    {t(`locale.${item}`)}
                </SelectItem>
            );
        },
        [locale, changeLocale]
    );

    const onLogoutClick = useCallback(() => {
        openModal(<div className="text-white">AUTH MODAL</div>);
    }, [openModal, closeModal]);

    return (
        <>
            <header className="border-b-2 border-white/10">
                <div className="container mx-auto py-2 px-6 flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <Image
                            width={25}
                            height={25}
                            src={Logo}
                            alt="logo"
                            priority
                        />
                        <span className="text-white font-fantasy">
                            {t("appName")}
                        </span>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <CustomButton
                            text={tButtons("signIn")}
                            onClick={onLogoutClick}
                            isDisabled={!user}
                        />
                        <Select
                            onValueChange={(val) => changeLocale(val as Locale)}
                        >
                            <SelectTrigger className="w-36 h-8 bg-horizontal-blue text-center">
                                <SelectValue
                                    placeholder={t(`language`)}
                                    className="text-center"
                                >
                                    {t(`locale.${locale}`) || t("language")}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {rows.map(renderLocaleItem)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>
            <Modal />
        </>
    );
};

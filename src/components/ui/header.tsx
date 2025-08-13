"use client";

import Image from "next/image";
import React, { useCallback, useMemo } from "react";

import Logo from "../../assets/images/logo.png";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/store/user-store";
import { Locale } from "@/enums/auth";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { SelectItem } from "@radix-ui/react-select";
import useModal from "@/hooks/use-modal";
import { CustomButton } from "./custom-button";
import { LogoutModal } from "./modals/logout-modal";
import { SpanUI } from "./typography";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";

export const Header = () => {
    const router = useRouter();

    const t = useTranslations("general");
    const tButtons = useTranslations("buttons");
    const { user, locale, setLocale } = useUserStore();

    const { openModal, closeModal, Modal } = useModal();

    const rows = Object.keys(t.raw("locale"));

    const changeLocale = useCallback(
        (locale: Locale) => {
            setLocale(locale);
            router.refresh();
        },
        [locale]
    );

    const onLogoutClick = useCallback(async () => {
        openModal(
            <LogoutModal openModal={openModal} closeModal={closeModal} />
        );
    }, [user]);

    const renderLocaleItem = useMemo(
        () => (item: string) => {
            return (
                <SelectItem
                    key={item}
                    value={item}
                    className="text-slate-300 text-sm text-center cursor-pointer focus:text-white focus:bg-dark-blue focus:outline-none focus:ring-0 focus:border-transparent rounded-sm py-1 transition-colors"
                >
                    {t(`locale.${item}`)}
                </SelectItem>
            );
        },
        [locale, changeLocale]
    );

    const renderMobileHeader = useMemo(() => {
        return (
            <div className="container py-3 px-6 block sm:hidden">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="w-full p-0">
                            <div className="flex gap-x-2 items-center">
                                <Image
                                    width={25}
                                    height={25}
                                    src={Logo}
                                    alt="logo"
                                    priority
                                />
                                <SpanUI className="text-xs sm:text-xl text-center text-white font-fantasy">
                                    {t("appName")}
                                </SpanUI>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="flex justify-between items-center gap-x-4 mt-4">
                                {user && (
                                    <CustomButton
                                        text={tButtons("logout")}
                                        onClick={onLogoutClick}
                                        className="w-full sm:w-fit"
                                    />
                                )}
                                <Select
                                    onValueChange={(val) =>
                                        changeLocale(val as Locale)
                                    }
                                >
                                    <SelectTrigger className="w-full h-full sm:w-36 bg-secondary  text-center">
                                        <SelectValue
                                            placeholder={t(`language`)}
                                            className="text-center"
                                        >
                                            {t(`locale.${locale}`) ||
                                                t("language")}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-midnight">
                                        {rows.map(renderLocaleItem)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }, [user, locale, renderLocaleItem, t, tButtons]);

    const renderHeader = useMemo(() => {
        return (
            <div className="container py-3 px-6 hidden sm:flex justify-between items-center space-y-2 sm:space-y-0">
                <div className="flex gap-x-1 sm:gap-x-2 items-center">
                    <Image
                        width={25}
                        height={25}
                        src={Logo}
                        alt="logo"
                        priority
                    />
                    <SpanUI className="text-xs sm:text-xl text-center text-white font-fantasy">
                        {t("appName")}
                    </SpanUI>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user && (
                        <CustomButton
                            text={tButtons("logout")}
                            onClick={onLogoutClick}
                            className="w-full sm:w-fit"
                        />
                    )}
                    <Select
                        onValueChange={(val) => changeLocale(val as Locale)}
                    >
                        <SelectTrigger className="w-full h-full sm:w-36 bg-secondary  text-center">
                            <SelectValue
                                placeholder={t(`language`)}
                                className="text-center"
                            >
                                {t(`locale.${locale}`) || t("language")}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-midnight">
                            {rows.map(renderLocaleItem)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    }, [user, locale, renderLocaleItem, t, tButtons]);

    return (
        <>
            <header className="border-b-2 border-white/10">
                {/* {isMobile ? renderMobileHeader : renderHeader} */}
                {renderMobileHeader}
                {renderHeader}
            </header>
            <Modal />
        </>
    );
};

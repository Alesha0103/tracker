"use client";
import React, { useCallback } from "react";
import { GlobalTitleUI, SpanUI, TextUI } from "./typography";
import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AppRoute } from "@/enums/auth";
import { CustomButton } from "./custom-button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export const HeroSection = () => {
    const pathname = usePathname();
    const router = useRouter();

    const tUser = useTranslations("general.user");
    const { user } = useUserStore();

    const onArrowClick = useCallback(() => {
        pathname === AppRoute.DASHBOARD
            ? router.push(AppRoute.TRACKING)
            : router.push(AppRoute.DASHBOARD);
    }, [router, pathname]);

    return (
        <section className="container flex flex-col pt-16 pb-6 px-4 space-y-2 relative">
            <div>
                <GlobalTitleUI>
                    {tUser.rich("hello", {
                        name: user?.email || "--",
                        gradient: (chunk) => (
                            <SpanUI className="text-blue-500 hidden sm:inline">
                                {chunk}
                            </SpanUI>
                        ),
                    })}
                </GlobalTitleUI>
                <TextUI className="sm:hidden text-blue-500 text-center text-lg font-semibold truncate">
                    {user?.email}
                </TextUI>
            </div>
            <TextUI className="text-center">
                {pathname === AppRoute.DASHBOARD
                    ? tUser("dashboardDescription")
                    : tUser("trackingDescription")}
            </TextUI>

            {user?.isAdmin && pathname === AppRoute.DASHBOARD && (
                <CustomButton
                    text={<ArrowBigLeft />}
                    onClick={onArrowClick}
                    className="rounded-full p-3 absolute top-3 left-5 lg:top-auto lg:left-10"
                />
            )}
            {user?.isAdmin && pathname === AppRoute.TRACKING && (
                <CustomButton
                    text={<ArrowBigRight />}
                    onClick={onArrowClick}
                    className="rounded-full p-3 absolute top-3 right-5 lg:top-auto lg:right-10"
                />
            )}
        </section>
    );
};

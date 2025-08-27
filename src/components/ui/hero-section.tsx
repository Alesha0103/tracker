"use client";
import React, { useCallback } from "react";
import { GlobalTitleUI, SpanUI, TextUI } from "./typography";
import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AppRoute } from "@/enums/auth";
import { CustomButton } from "./custom-button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./tooltip";

export const HeroSection = () => {
    const pathname = usePathname();
    const router = useRouter();

    const t = useTranslations("general");
    const { user } = useUserStore();

    const onArrowClick = useCallback(() => {
        pathname === AppRoute.DASHBOARD
            ? router.push(AppRoute.TRACKING)
            : router.push(AppRoute.DASHBOARD);
    }, [router, pathname]);

    return (
        <section className="container flex flex-col pt-16 pb-6 px-4 space-y-2 relative">
            <div className="relative">
                {user?.isAdmin && pathname === AppRoute.DASHBOARD && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CustomButton
                                text={<ArrowBigLeft />}
                                onClick={onArrowClick}
                                className="rounded-full p-3 absolute -top-10 lg:top-5 left-0"
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                            {t("tracking")}
                        </TooltipContent>
                    </Tooltip>
                )}

                {user?.isAdmin && pathname === AppRoute.TRACKING && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CustomButton
                                text={<ArrowBigRight />}
                                onClick={onArrowClick}
                                className="rounded-full p-3 absolute -top-10 lg:top-5 right-0"
                            />
                        </TooltipTrigger>
                        <TooltipContent side="left" align="center">
                            {t("dashboard")}
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
            <div>
                <GlobalTitleUI>
                    {t.rich("user.hello", {
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
                    ? t("user.dashboardDescription")
                    : t("user.trackingDescription")}
            </TextUI>
        </section>
    );
};

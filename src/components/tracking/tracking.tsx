"use client";

import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import React from "react";
import { EmptyTable } from "../ui/tables/empty-table";
import { GlobalTitleUI, SpanUI, TextUI } from "../ui/typography";

export const Tracking = () => {
    const tUser = useTranslations("general.user");
    const { user } = useUserStore();

    return (
        <section className="container flex flex-col gap-y-16 p-4 sm:p-10">
            <div className="space-y-2">
                <GlobalTitleUI>
                    {tUser.rich("hello", {
                        name: user?.email || "--",
                        gradient: (chunk) => (
                            <SpanUI className="text-blue-500">{chunk}</SpanUI>
                        ),
                    })}
                </GlobalTitleUI>
                <TextUI className="text-center">
                    {tUser("trackingDescription")}
                </TextUI>
            </div>
            <EmptyTable isLoading={false} />
        </section>
    );
};

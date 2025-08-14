"use client";

import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import React from "react";
import { EmptyTable } from "../ui/tables/empty-table";
import { GlobalTitleUI, SpanUI, TextUI } from "../ui/typography";
import { TrackingTable } from "../ui/tables/tracking-table";

export const Tracking = () => {
    const tUser = useTranslations("general.user");
    const { user } = useUserStore();

    return (
        <section className="container flex flex-col gap-y-16 p-4 sm:p-10">
            <div className="space-y-2">
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
                    {tUser("trackingDescription")}
                </TextUI>
            </div>
            {user?.projects ? (
                <TrackingTable projects={user.projects} />
            ) : (
                <EmptyTable isLoading />
            )}
        </section>
    );
};

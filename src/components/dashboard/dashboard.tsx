"use client";

import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import React from "react";
import { EmptyUsersTable } from "../ui/tables/empty-users-table";
import { GlobalTitleUI, SpanUI, TextUI } from "../ui/typography";

export const Dashboard = () => {
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
                                <SpanUI className="text-blue-500 hidden sm:inline">{chunk}</SpanUI>
                            ),
                        })}
                    </GlobalTitleUI>
                    <TextUI className="sm:hidden text-blue-500 text-center text-lg font-semibold truncate">{user?.email}</TextUI>
                </div>
                <TextUI className="text-center">
                    {tUser("dashboardDescription")}
                </TextUI>
            </div>
            <EmptyUsersTable isLoading={false} />
        </section>
    );
};

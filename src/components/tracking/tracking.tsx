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
        <section className="container flex flex-col p-4 sm:p-10">
            {user?.projects ? (
                <TrackingTable projects={user.projects} />
            ) : (
                <EmptyTable isLoading={false} />
            )}
        </section>
    );
};

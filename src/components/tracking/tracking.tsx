"use client";

import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import React from "react";
import { TableSkeleton } from "./table-skeleton";

export const Tracking = () => {
    const tUser = useTranslations("general.user");
    const { user } = useUserStore();

    return (
        <section className="container flex flex-col gap-y-16 p-4 sm:p-10">
            <div className="space-y-2">
                <h1 className="text-white text-center text-3xl">
                    {tUser.rich("hello",{
                        name: user?.email || "--",
                        gradient: (chunk) => <span className="text-blue-500">{chunk}</span>
                    })}
                </h1>
                <h2 className="text-slate-400 text-center">{tUser("trackingDescription")}</h2>
            </div>
            <TableSkeleton isLoading={false}/>
        </section>
    );
};

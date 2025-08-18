"use client";

import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import React from "react";
import { EmptyUsersTable } from "../ui/tables/empty-users-table";
import { GlobalTitleUI, SpanUI, TextUI } from "../ui/typography";
import { useGetUsers } from "@/services/users/query";
import { UsersTable } from "../ui/tables/users-table";

export const Dashboard = () => {
    const tUser = useTranslations("general.user");
    const { user } = useUserStore();

    const { data, isPending } = useGetUsers();

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            {data ? (
                <UsersTable users={data} />
            ) : (
                <EmptyUsersTable isLoading={isPending} />
            )}
        </section>
    );
};

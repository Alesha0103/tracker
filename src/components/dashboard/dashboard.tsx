"use client";

import React from "react";
import { EmptyUsersTable } from "../ui/tables/empty-users-table";
import { useGetUsers } from "@/services/users/query";
import { UsersTable } from "../ui/tables/users-table";
import { HeroSection } from "../ui/hero-section";

export const Dashboard = () => {
    const { data, isPending } = useGetUsers();

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            <HeroSection />
            {data ? (
                <UsersTable users={data} />
            ) : (
                <EmptyUsersTable isLoading={isPending} />
            )}
        </section>
    );
};

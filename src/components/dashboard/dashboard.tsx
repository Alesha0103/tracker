"use client";

import React from "react";
import { EmptyUsersTable } from "../ui/tables/empty-users-table";
import { useGetUsers } from "@/services/users/query";
import { UsersTable } from "../ui/tables/users-table";

export const Dashboard = () => {
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

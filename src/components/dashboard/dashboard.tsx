"use client";

import React, { useCallback, useState } from "react";
import { EmptyUsersTable } from "../ui/tables/empty-users-table";
import { useGetUsers } from "@/services/users/query";
import { UsersTable } from "../ui/tables/users-table";
import { HeroSection } from "../ui/hero-section";
import { useSearchParams } from "next/navigation";
import { UserActivity, UserType } from "@/enums/users";
import { FilterUsersTable } from "../ui/tables/filter-users-table";
import { FilterUsers } from "@/types/users";

export const Dashboard = () => {
    const params = useSearchParams();
    const page = Number(params.get("page")) || 1;

    const [email, setEmail] = useState<string | undefined>();
    const [userTypes, setUserType] = useState<UserType[] | undefined>();
    const [projects, setProjects] = useState<string[] | undefined>();
    const [userActivity, setUserActivity] = useState<
        UserActivity[] | undefined
    >();

    const { data, isPending } = useGetUsers({
        page,
        email,
        userTypes,
        userActivity,
        projects,
    });

    const filterUsers = useCallback((data: FilterUsers) => {
        const { userTypes, userActivity, projects, email, callback } = data;
        setUserType(userTypes);
        setEmail(email);
        setProjects(projects);
        setUserActivity(userActivity);
        callback?.();
    }, []);

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            <HeroSection />
            {!isPending && <FilterUsersTable filterUsers={filterUsers} />}
            {data?.users?.length ? (
                <UsersTable data={data} />
            ) : (
                <EmptyUsersTable isLoading={isPending} />
            )}
        </section>
    );
};

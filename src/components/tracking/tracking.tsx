"use client";

import { useUserStore } from "@/store/user-store";
import React from "react";
import { EmptyTable } from "../ui/tables/empty-table";
import { TrackingTable } from "../ui/tables/tracking-table";

export const Tracking = () => {
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

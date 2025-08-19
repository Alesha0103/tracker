"use client";

import { useUserStore } from "@/store/user-store";
import React from "react";
import { EmptyTable } from "../ui/tables/empty-table";
import { TrackingTable } from "../ui/tables/tracking-table";
import { HeroSection } from "../ui/hero-section";
import { useGetProjects } from "@/services/users/query";

export const Tracking = () => {
    const { data } = useGetProjects();

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            <HeroSection />
            {data?.length ? (
                <TrackingTable projects={data} />
            ) : (
                <EmptyTable isLoading={false} />
            )}
        </section>
    );
};

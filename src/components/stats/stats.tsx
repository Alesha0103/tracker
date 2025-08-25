"use client";

import React, { FC, useCallback } from "react";
import { GlobalTitleUI, TitleUI } from "../ui/typography";
import { useGetUserProject } from "@/services/users/query";
import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { CustomButton } from "../ui/custom-button";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/loader";
import { StatsTable } from "../ui/tables/stats-table";
import { FilterStatsTable } from "../ui/tables/filter-stats-table";

interface Props {
    projectId: string;
}

export const Stats: FC<Props> = ({ projectId }) => {
    const router = useRouter();

    const { user } = useUserStore();
    const { data, isPending } = useGetUserProject({
        userId: user?.id,
        projectId,
    });

    const onArrowClick = useCallback(() => {
        router.back();
    }, [router, projectId]);

    if (isPending) return <Loader />;

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            <div className="pt-16 pb-6 px-4 relative">
                <CustomButton
                    text={<ArrowBigLeft />}
                    onClick={onArrowClick}
                    className="rounded-full p-3 absolute top-3 left-5 lg:top-auto lg:left-10"
                />
                <GlobalTitleUI className="text-center !mt-0">
                    {data?.name}
                </GlobalTitleUI>
            </div>
            <FilterStatsTable project={data} />
            <StatsTable data={data} />
        </section>
    );
};

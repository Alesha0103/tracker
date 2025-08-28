"use client";

import React, { FC, useCallback, useState } from "react";
import { GlobalTitleUI } from "../ui/typography";
import { useGetUserProject } from "@/services/users/query";
import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import { ArrowBigLeft } from "lucide-react";
import { CustomButton } from "../ui/custom-button";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "../ui/loader";
import { StatsTable } from "../ui/tables/stats-table";
import { FilterStatsTable } from "../ui/tables/filter-stats-table";
import { FilterStatsFields } from "@/types/users";
import { AppRoute } from "@/enums/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
    projectId: string;
}

export const Stats: FC<Props> = ({ projectId }) => {
    const router = useRouter();
    const params = useSearchParams();
    const page = Number(params.get("page")) || 1;

    const t = useTranslations("general");

    const { user } = useUserStore();

    const [thisWeek, setThisWeek] = useState<boolean | undefined>();
    const [thisMonth, setThisMonth] = useState<boolean | undefined>();
    const [prevWeek, setPrevWeek] = useState<boolean | undefined>();
    const [prevMonth, setPrevMonth] = useState<boolean | undefined>();
    const [dateFrom, setDateFrom] = useState<string | undefined>();
    const [dateTo, setDateTo] = useState<string | undefined>();

    const { data, isPending } = useGetUserProject({
        userId: user?.id,
        projectId,
        thisWeek,
        thisMonth,
        prevWeek,
        prevMonth,
        dateFrom,
        dateTo,
        page,
    });

    const onArrowClick = useCallback(() => {
        router.push(AppRoute.TRACKING);
    }, [router, projectId]);

    const filterStats = useCallback((stats: FilterStatsFields) => {
        const { thisWeek, thisMonth, prevWeek, prevMonth, dateFrom, dateTo } =
            stats;
        setThisWeek(thisWeek);
        setThisMonth(thisMonth);
        setPrevWeek(prevWeek);
        setPrevMonth(prevMonth);
        setDateFrom(dateFrom);
        setDateTo(dateTo);
    }, []);

    if (isPending) return <Loader />;

    return (
        <section className="container flex flex-col p-4 sm:p-10">
            <div className="pt-16 pb-6 px-4 relative">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CustomButton
                            text={<ArrowBigLeft />}
                            onClick={onArrowClick}
                            className="rounded-full p-3 absolute top-3 left-5 lg:top-auto lg:left-5"
                        />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {t("tracking")}
                    </TooltipContent>
                </Tooltip>
                <GlobalTitleUI className="text-center !mt-0">
                    {data?.name}
                </GlobalTitleUI>
            </div>
            <FilterStatsTable project={data} filterStats={filterStats} />
            <StatsTable project={data} />
        </section>
    );
};

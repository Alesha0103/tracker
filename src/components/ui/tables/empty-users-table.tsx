import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { Loader } from "../loader";
import { TitleUI } from "../typography";

interface Props {
    isLoading?: boolean;
}

export const EmptyUsersTable: FC<Props> = ({ isLoading }) => {
    const tTables = useTranslations("tables");

    if (isLoading) return <Loader />;

    return (
        <div className="h-96 bg-midnight flex items-center justify-center rounded-md relative">
            <TitleUI>{tTables("noUsers")}</TitleUI>
        </div>
    );
};

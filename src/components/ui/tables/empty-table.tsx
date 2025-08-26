import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { Loader } from "../loader";
import { TitleUI } from "../typography";

interface Props {
    isLoading?: boolean;
}

export const EmptyTable: FC<Props> = ({ isLoading }) => {
    const t = useTranslations("tables");

    if (isLoading) return <Loader />;

    return (
        <div className="h-96 w-11/12 mx-auto bg-midnight flex items-center justify-center rounded-md relative">
            <TitleUI>{t("noWorkflow")}</TitleUI>
        </div>
    );
};

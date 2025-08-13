import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { Loader } from "../loader";
import { TitleUI } from "../typography";

interface Props {
    isLoading?: boolean;
}

export const EmptyTable: FC<Props> = ({ isLoading }) => {
    const t = useTranslations("tables");
    return (
        <div className="h-96 w-11/12 mx-auto bg-midnight flex items-center justify-center rounded-md relative">
            {isLoading ? (
                <Loader />
            ) : (
                <TitleUI>
                    {t("noWorkflow")}
                </TitleUI>
            )}
        </div>
    );
};

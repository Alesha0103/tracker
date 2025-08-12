import { useTranslations } from 'next-intl'
import React, { FC } from 'react'
import { Loader } from '../loader';

interface Props {
    isLoading?: boolean;
}

export const TableSkeleton: FC<Props> = ({ isLoading }) => {
    const t = useTranslations("tables");
    return (
        <div className="h-96 w-11/12 mx-auto bg-midnight flex items-center justify-center rounded-md relative">
            {isLoading ? <Loader/> : <h3 className="text-xl text-slate-200 text-center">{t("noWorkflow")}</h3>}
        </div>
    )
}

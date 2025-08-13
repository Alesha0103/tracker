import { useTranslations } from "next-intl";
import React, { FC } from "react";
import { Loader } from "../loader";
import { CustomButton } from "../custom-button";
import { TextUI, TitleUI } from "../typography";

interface Props {
    isLoading?: boolean;
}

export const EmptyUsersTable: FC<Props> = ({ isLoading }) => {
    const tTables = useTranslations("tables");
    const tButtons = useTranslations("buttons");

    return (
        <div className="h-96 w-11/12 mx-auto bg-midnight flex items-center justify-center rounded-md relative">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col">
                    <TitleUI>
                        {tTables("noUsers")}
                    </TitleUI>
                    <TextUI className="text-center mt-2 mb-6">{tTables("addUserDescription")}</TextUI>
                    <CustomButton text={tButtons("addUser")}/>
                </div>
            )}
        </div>
    );
};

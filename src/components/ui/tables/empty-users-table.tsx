import { useTranslations } from "next-intl";
import React, { FC, useCallback } from "react";
import { Loader } from "../loader";
import { CustomButton } from "../custom-button";
import { TextUI, TitleUI } from "../typography";
import useModal from "@/hooks/use-modal";
import { AddUserModal } from "../modals/add-user-modal";

interface Props {
    isLoading?: boolean;
}

export const EmptyUsersTable: FC<Props> = ({ isLoading }) => {
    const tTables = useTranslations("tables");
    const tButtons = useTranslations("buttons");

    const { openModal, closeModal, Modal } = useModal();

    const onAddUserClick = useCallback(() => {
        openModal(
            <AddUserModal openModal={openModal} closeModal={closeModal} />
        );
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className="h-96 w-11/12 mx-auto bg-midnight flex items-center justify-center rounded-md relative">
            <div className="flex flex-col">
                <TitleUI>{tTables("noUsers")}</TitleUI>
                <TextUI className="text-center mt-2 mb-6">
                    {tTables("addUserDescription")}
                </TextUI>
                <CustomButton
                    text={tButtons("addUser")}
                    onClick={onAddUserClick}
                />
            </div>
            <Modal />
        </div>
    );
};

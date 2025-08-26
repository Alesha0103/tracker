"use client";
import useModal from "@/hooks/use-modal";
import React, { FC, useCallback } from "react";
import { AddUserModal } from "../modals/add-user-modal";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";
import { FilterUsers } from "@/types/users";
import { UsersFilterModal } from "../modals/users-filter-modal";

interface Props {
    filterUsers: (data: FilterUsers) => void;
}

export const FilterUsersTable: FC<Props> = ({ filterUsers }) => {
    const tButtons = useTranslations("buttons");

    const { openModal, closeModal, Modal } = useModal();

    const onAddUserClick = useCallback(() => {
        openModal(
            <AddUserModal openModal={openModal} closeModal={closeModal} />
        );
    }, []);

    const onFilterClick = useCallback(() => {
        openModal(
            <UsersFilterModal
                closeModal={closeModal}
                filterUsers={filterUsers}
            />
        );
    }, []);

    return (
        <div className="flex mb-2 justify-between">
            <CustomButton
                text={tButtons("filter")}
                onClick={onFilterClick}
                className="w-28"
            />
            <CustomButton text={tButtons("addUser")} onClick={onAddUserClick} />
            <Modal />
        </div>
    );
};

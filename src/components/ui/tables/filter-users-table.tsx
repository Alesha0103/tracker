"use client";
import useModal from "@/hooks/use-modal";
import React, { useCallback } from "react";
import { AddUserModal } from "../modals/add-user-modal";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";

export const FilterUsersTable = () => {
    const tButtons = useTranslations("buttons");

    const { openModal, closeModal, Modal } = useModal();

    const onAddUserClick = useCallback(() => {
        openModal(
            <AddUserModal openModal={openModal} closeModal={closeModal} />
        );
    }, []);

    return (
        <div className="flex mb-2 justify-between">
            <div className="flex-1"></div>
            <CustomButton text={tButtons("addUser")} onClick={onAddUserClick} />
            <Modal />
        </div>
    );
};

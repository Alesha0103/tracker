"use client";

import { useLogout } from "@/services/auth/mutation";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useCallback } from "react";
import { BaseModal } from "./base-modal";
import { useTranslations } from "next-intl";

interface Props {
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const LogoutModal: FC<Props> = ({ openModal, closeModal }) => {
    const router = useRouter();

    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");

    const { mutateAsync: logout } = useLogout();

    const onLogoutClick = useCallback(async () => {
        try {
            await logout();
            router.refresh();
            closeModal();
        } catch {
            openModal(
                <BaseModal
                    title={tModals("failure.title")}
                    submitButtonText={tButtons("ok")}
                    description={tModals("failure.description")}
                    onSubmit={closeModal}
                    submitButtonClassName="bg-red-500 hover:bg-red-400"
                />
            );
        }
    }, [router]);

    return (
        <BaseModal
            title={tModals("isLogout.title")}
            cancelButtonText={tButtons("no")}
            submitButtonText={tButtons("yes")}
            onCancel={closeModal}
            onSubmit={onLogoutClick}
        />
    );
};

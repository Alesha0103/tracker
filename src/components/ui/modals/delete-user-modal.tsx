"use client";

import React, { FC, ReactNode } from "react";
import { BaseModal } from "./base-modal";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "@/schemas/users";
import { AddUserFields } from "@/types/users";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form";
import { Input } from "../input";
import { CustomButton } from "../custom-button";
import { Switch } from "../switch";
import { DialogContent, DialogTitle } from "../dialog";
import { useAddUser, useDeleteUser } from "@/services/users/mutations";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";

interface Props {
    id: string;
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const DeleteUserModal: FC<Props> = ({ id, openModal, closeModal }) => {
    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: deleteUser } = useDeleteUser();

    const onSubmit = async () => {
        try {
            await deleteUser(id);
            closeModal();
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            const message = error.response?.data?.message;
            openModal(
                <BaseModal
                    title={tModals("error")}
                    submitButtonText={tButtons("ok")}
                    description={
                        tErrors.has(message as string)
                            ? tErrors(message as string)
                            : tModals("errorDescription")
                    }
                    onSubmit={closeModal}
                    submitButtonClassName="bg-red-500 hover:bg-red-400"
                />
            );
        }
    };

    return (
        <BaseModal
            title={tModals("deleteUser.title")}
            cancelButtonClassName={tButtons("no")}
            submitButtonText={tButtons("yes")}
            onSubmit={onSubmit}
            onCancel={closeModal}
        />
    );
};

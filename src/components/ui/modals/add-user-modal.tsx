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
import { useAddUser } from "@/services/users/mutations";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";

interface Props {
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const AddUserModal: FC<Props> = ({ openModal, closeModal }) => {
    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: addUser, isPending } = useAddUser();

    const form = useForm<AddUserFields>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            email: "",
            password: "",
            isAdmin: false,
        },
    });
    const { control, handleSubmit } = form;

    const onSubmit: SubmitHandler<AddUserFields> = async (formData) => {
        try {
            await addUser(formData);
            openModal(
                <BaseModal
                    title={tModals("success.title")}
                    submitButtonText={tButtons("ok")}
                    description={tModals("success.description")}
                    onSubmit={closeModal}
                    titleClassName="uppercase"
                    submitButtonClassName="bg-app-green hover:bg-green-600"
                />
            );
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            const message = error.response?.data?.message;
            openModal(
                <BaseModal
                    title={tModals("failure.title")}
                    submitButtonText={tButtons("ok")}
                    description={
                        tErrors.has(message as string)
                            ? tErrors(message as string)
                            : tModals("failure.description")
                    }
                    onSubmit={closeModal}
                    titleClassName="uppercase"
                    submitButtonClassName="bg-red-500 hover:bg-red-400"
                />
            );
        }
    };

    return (
        <DialogContent className="bg-midnight max-w-md" aria-describedby={""}>
            <DialogTitle className="text-white text-center">
                {tModals("addUser.title")}
            </DialogTitle>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={tForms("emailPlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={tForms(
                                            "passwordPlaceholder"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="isAdmin"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center gap-x-2">
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <label className="text-slate-400 text-sm">
                                            {tForms("isAdmin")}
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-x-10">
                        <CustomButton
                            text={tButtons("cancel")}
                            className="w-full"
                            onClick={closeModal}
                        />
                        <CustomButton
                            type="submit"
                            text={tButtons("submit")}
                            className="w-full"
                            isPending={isPending}
                        />
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
};

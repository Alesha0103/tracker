"use client";

import { EditUserFields, User } from "@/types/users";
import React, { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/schemas/users";
import { Input } from "../input";
import { Switch } from "../switch";
import { CustomButton } from "../custom-button";
import { SpanUI, TextUI } from "../typography";
import { useEditUser } from "@/services/users/mutations";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";
import { BaseModal } from "./base-modal";
import { Button } from "../button";
import { X } from "lucide-react";

interface Props {
    user: User;
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const EditUserModal: FC<Props> = ({ user, openModal, closeModal }) => {
    const tGeneral = useTranslations("general");
    const tTables = useTranslations("tables");
    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: editUser } = useEditUser(user.id);

    const form = useForm<EditUserFields>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            projects: (user.projects || []).filter((p) => p?.trim() !== ""),
            isAdmin: user.isAdmin,
        },
    });
    const { control, watch, handleSubmit } = form;
    const projectsWatch = watch("projects");

    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-ignore
        name: "projects",
    });

    const onSubmit: SubmitHandler<EditUserFields> = async (formData) => {
        try {
            await editUser(formData);
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

    const addMoreInput = useCallback(() => {
        if (fields.length === 5) return;
        append("");
    }, [fields, append]);

    return (
        <DialogContent className="bg-midnight max-w-md" aria-describedby={""}>
            <DialogTitle className="text-white text-center">
                {tModals("editUser.title")}
            </DialogTitle>
            <div className="flex flex-col gap-y-2">
                <TextUI>
                    {tTables("usersTable.email")}
                    {": "}
                    <SpanUI className="text-slate-200">{user.email}</SpanUI>
                </TextUI>
                <TextUI>
                    {tTables("usersTable.hours")}
                    {": "}
                    <SpanUI className="text-slate-200">
                        {user.trackedHours}
                    </SpanUI>
                </TextUI>
                <TextUI>
                    {tTables("usersTable.activated")}
                    {": "}
                    <SpanUI className="text-slate-200">
                        {user.isActivated ? tGeneral("yes") : tGeneral("no")}
                    </SpanUI>
                </TextUI>
                <TextUI>
                    {tTables("usersTable.admin")}
                    {": "}
                    <SpanUI className="text-slate-200">
                        {user.isAdmin ? tGeneral("yes") : tGeneral("no")}
                    </SpanUI>
                </TextUI>
            </div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {fields.map((field, idx) => (
                        <div
                            key={field.id}
                            className="flex gap-x-2 items-center"
                        >
                            <FormField
                                control={control}
                                name={`projects.${idx}`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder={tForms(
                                                    "projectPlaceholder"
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <X
                                className="text-slate-300 hover:cursor-pointer"
                                onClick={() => remove(idx)}
                            />
                        </div>
                    ))}
                    <CustomButton
                        type="button"
                        variant="ghost"
                        className="h-8 text-blue-500 p-0 hover:underline"
                        onClick={addMoreInput}
                        text="Add one more project"
                        isDisabled={projectsWatch.some(
                            (p: string) => !p?.trim()
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
                        />
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
};

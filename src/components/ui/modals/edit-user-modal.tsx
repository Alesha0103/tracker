"use client";

import { EditUserFields, User } from "@/types/users";
import React, { FC, ReactNode, useCallback, useState } from "react";
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
import { X } from "lucide-react";
import { cn } from "@/utils";
import { MAX_PROJECTS_COUNT } from "@/constants";

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

    const defaultProjects =
        user.projects.filter((p) => !p.isDisabled)?.map((p) => p.name) || [];

    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(
        null
    );
    const [defaultCount, setDefaultCount] = useState(defaultProjects.length);

    const { mutateAsync: editUser } = useEditUser(user.id);

    const form = useForm<EditUserFields>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            projects: defaultProjects,
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

    const addMoreInput = useCallback(() => {
        if (fields.length === 5) return;
        append("");
    }, [fields, append]);

    const renderQuestionLabel = useCallback(
        (idx: number) => {
            if (confirmDeleteIndex !== idx) return;

            if (!projectsWatch[idx]?.trim()) {
                remove(idx);
                setConfirmDeleteIndex(null);
                if (idx < defaultCount) {
                    setDefaultCount((prev) => prev - 1);
                }
                return;
            }

            return (
                <div className="flex gap-x-2 mt-2 items-center">
                    <SpanUI className="text-red-500 text-sm">
                        {tForms("wantToDelete")}
                    </SpanUI>
                    <CustomButton
                        variant="ghost"
                        type="button"
                        text={tButtons("yes")}
                        className="text-slate-400 text-sm underline hover:text-white"
                        onClick={() => {
                            remove(idx);
                            setConfirmDeleteIndex(null);
                            if (idx < defaultCount) {
                                setDefaultCount((prev) => prev - 1);
                            }
                        }}
                    />
                    <CustomButton
                        variant="ghost"
                        type="button"
                        text={tButtons("no")}
                        className="text-slate-400 text-sm underline hover:text-white"
                        onClick={() => setConfirmDeleteIndex(null)}
                    />
                </div>
            );
        },
        [confirmDeleteIndex]
    );

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
                        {user.totalHours}
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
                        <div key={field.id}>
                            <div className="flex gap-x-2 items-center">
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
                                                    className={cn(
                                                        idx < defaultCount &&
                                                            "pointer-events-none"
                                                    )}
                                                    disabled={
                                                        idx < defaultCount
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <X
                                    className="text-slate-300 hover:cursor-pointer"
                                    onClick={() => setConfirmDeleteIndex(idx)}
                                />
                            </div>
                            {renderQuestionLabel(idx)}
                        </div>
                    ))}
                    <CustomButton
                        type="button"
                        variant="ghost"
                        className="h-8 text-blue-500 p-0 hover:underline"
                        onClick={addMoreInput}
                        text={tButtons("addProject")}
                        isDisabled={
                            projectsWatch.length === MAX_PROJECTS_COUNT ||
                            projectsWatch.some((p: string) => !p?.trim())
                        }
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

"use client";

import { FilterUsers, FilterUsersFields } from "@/types/users";
import React, { FC, useEffect } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";
import { Input } from "../input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../form";
import { useRouter } from "next/navigation";
import { AppRoute } from "@/enums/auth";
import { Checkbox } from "../checkbox";
import { UserActivity, UserType } from "@/enums/users";
import { useUserStore } from "@/store/user-store";

interface Props {
    filterUsers: (data: FilterUsers) => void;
    closeModal: () => void;
}

export const UsersFilterModal: FC<Props> = ({ filterUsers, closeModal }) => {
    const router = useRouter();

    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");

    const { savedUserFilterForm, setUserFilterForm } = useUserStore();

    const form = useForm<FilterUsersFields>({
        defaultValues: {
            email: savedUserFilterForm?.email ?? "",
            projects: savedUserFilterForm?.projects ?? "",
            isAdmin: savedUserFilterForm?.isAdmin ?? false,
            isUser: savedUserFilterForm?.isUser ?? false,
            userActive: savedUserFilterForm?.userActive ?? false,
            userDisable: savedUserFilterForm?.userDisable ?? false,
            allTypes: savedUserFilterForm?.allTypes ?? true,
            allActivity: savedUserFilterForm?.allActivity ?? true,
        },
    });

    const { control, watch, setValue, handleSubmit } = form;

    const watchIsAdmin = watch("isAdmin");
    const watchIsUser = watch("isUser");
    const watchUserActive = watch("userActive");
    const watchUserDisable = watch("userDisable");

    useEffect(() => {
        if (!watchIsAdmin && !watchIsUser) {
            setValue("allTypes", true);
        }
        if (!watchUserActive && !watchUserDisable) {
            setValue("allActivity", true);
        }
    }, [watchIsAdmin, watchIsUser, watchUserActive, watchUserDisable]);

    const onSubmit: SubmitHandler<FilterUsersFields> = (formData) => {
        setUserFilterForm(formData);

        let userTypes = [];
        let userActivity = [];

        if (formData.isAdmin) {
            userTypes.push(UserType.ADMIN);
        }
        if (formData.isUser) {
            userTypes.push(UserType.USER);
        }
        if (formData.allTypes) {
            userTypes = [UserType.ADMIN, UserType.USER];
        }

        if (formData.userActive) {
            userActivity.push(UserActivity.ACTIVE);
        }
        if (formData.userDisable) {
            userActivity.push(UserActivity.DISABLE);
        }
        if (formData.allActivity) {
            userActivity = [UserActivity.ACTIVE, UserActivity.DISABLE];
        }

        const updatedFormData = {
            email: formData.email.trim() === "" ? undefined : formData.email,
            projects:
                formData.projects.trim() === ""
                    ? undefined
                    : formData.projects.split(",").map((p) => p.trim()),
            userTypes,
            userActivity,
        };
        filterUsers(updatedFormData);
        router.push(AppRoute.DASHBOARD);
        closeModal();
    };

    return (
        <DialogContent className="bg-midnight max-w-md" aria-describedby={""}>
            <DialogTitle className="text-white text-center">
                {tModals("filter.title")}
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
                        name="projects"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={tForms("filter.projects")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex">
                        <div className="space-y-2 basis-1/2">
                            <FormField
                                control={control}
                                name="isAdmin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            setValue(
                                                                "allTypes",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms("filter.admin")}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="isUser"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            setValue(
                                                                "allTypes",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms("filter.user")}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="allTypes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        if (checked) {
                                                            field.onChange(
                                                                true
                                                            );
                                                            setValue(
                                                                "isAdmin",
                                                                false
                                                            );
                                                            setValue(
                                                                "isUser",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms("filter.all")}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2 basis-1/2">
                            <FormField
                                control={control}
                                name="userActive"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            setValue(
                                                                "allActivity",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.userActive"
                                                    )}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="userDisable"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            setValue(
                                                                "allActivity",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.userDisable"
                                                    )}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="allActivity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center gap-x-2">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        if (checked) {
                                                            field.onChange(
                                                                true
                                                            );
                                                            setValue(
                                                                "userActive",
                                                                false
                                                            );
                                                            setValue(
                                                                "userDisable",
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms("filter.all")}
                                                </label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

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

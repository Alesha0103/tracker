"use client";

import React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFields } from "@/types/auth";
import { signInValidationSchema } from "@/schemas/auth";
import { CustomButton } from "../ui/custom-button";
import { useTranslations } from "next-intl";
import { useSignIn } from "@/services/auth/mutation";
import useModal from "@/hooks/use-modal";
import { BaseModal } from "../modals/base-modal";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";

export const SignIn = () => {
    const tButtons = useTranslations("buttons");
    const tErrors = useTranslations("serverErrors");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");

    const { mutateAsync: signIn } = useSignIn();

    const { openModal, closeModal, Modal } = useModal();

    const form = useForm<SignInFields>({
        resolver: zodResolver(signInValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { control, handleSubmit } = form;

    const onSubmit: SubmitHandler<SignInFields> = async (formData) => {
        try {
            await signIn(formData);
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            const message = error.response?.data?.message;
            openModal(
                <BaseModal
                    title={tModals("error")}
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
        <div className="flex items-center justify-center h-full">
            <section>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-11/12 sm:w-96 mx-auto space-y-4 p-6 rounded-md bg-midnight border-2 border-secondary"
                    >
                        <h2 className="text-white text-center text-2xl font-semibold">
                            {tForms("login")}
                        </h2>
                        <FormDescription className="text-sm text-slate-400">
                            {tForms("loginDescription")}
                        </FormDescription>
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={tForms(
                                                "emailPlaceholder"
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
                        {/* <FormField
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
                        /> */}
                        <CustomButton
                            type="submit"
                            text={tButtons("submit")}
                            className="rounded-md w-full"
                        />
                    </form>
                </Form>
            </section>
            <Modal />
        </div>
    );
};

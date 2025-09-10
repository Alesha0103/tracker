"use client";

import React from "react";
import {
    Form,
    FormControl,
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
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { AppRoute } from "@/enums/auth";
import { BaseModal } from "../ui/modals/base-modal";
import { SectionTitleUI, TextUI } from "../ui/typography";

export const SignIn = () => {
    const router = useRouter();
    const params = useSearchParams();

    const isActivatedLink = params.get("activated") === "true";

    const tButtons = useTranslations("buttons");
    const tErrors = useTranslations("serverErrors");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");

    const { mutateAsync: signIn, isPending } = useSignIn();

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
            const user = await signIn(formData);
            user?.isAdmin
                ? router.replace(AppRoute.DASHBOARD)
                : router.replace(AppRoute.TRACKING);
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
        <div className="flex items-center justify-center h-full">
            <section>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-11/12 sm:w-96 mx-auto space-y-4 p-6 rounded-md bg-midnight border-2 border-secondary"
                    >
                        <SectionTitleUI>
                            {tModals("login.title")}
                        </SectionTitleUI>
                        {isActivatedLink ? (
                            <TextUI className="text-sm text-slate-300 bg-app-green rounded-md py-2 px-4">
                                {tModals("login.isActivated")}
                            </TextUI>
                        ) : (
                            <TextUI className="text-sm text-slate-400">
                                {tModals("login.description")}
                            </TextUI>
                        )}
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
                        <CustomButton
                            type="submit"
                            text={tButtons("submit")}
                            className="rounded-md w-full"
                            disabled={isPending}
                        />
                    </form>
                </Form>
            </section>
            <Modal />
        </div>
    );
};

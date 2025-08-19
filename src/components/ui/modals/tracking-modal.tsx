"use client";

import React, { FC, ReactNode } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, TrackingHoursFields } from "@/types/users";
import { trackingSchema } from "@/schemas/users";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form";
import { Input } from "../input";
import { FormDatePicker } from "../date-picker";
import { CustomButton } from "../custom-button";
import { handleHoursChange } from "@/lib/utils";
import { useTrackingHours } from "@/services/users/mutations";
import dayjs from "dayjs";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";
import { BaseModal } from "./base-modal";

interface Props {
    project: Project;
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const TrackingModal: FC<Props> = ({
    project,
    openModal,
    closeModal,
}) => {
    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: trackHours } = useTrackingHours();

    const { user } = useUserStore();

    const form = useForm<TrackingHoursFields>({
        resolver: zodResolver(trackingSchema),
        defaultValues: {
            date: String(new Date()),
            hours: "",
        },
    });
    const { control, handleSubmit } = form;

    const onSubmit: SubmitHandler<TrackingHoursFields> = async (formData) => {
        if (!user) return;

        try {
            await trackHours({
                userId: user.id,
                projectId: project.id,
                date: dayjs(formData.date).format("YYYY-MM-DD"),
                hours: formData.hours,
            });
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
        <DialogContent className="bg-midnight max-w-md" aria-describedby={""}>
            <DialogTitle className="text-white text-center">
                {tModals("timeTracking.title")}
            </DialogTitle>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FormDatePicker
                                        value={
                                            field.value
                                                ? new Date(field.value)
                                                : null
                                        }
                                        onChange={(date) =>
                                            field.onChange(
                                                date ? date.toISOString() : ""
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="hours"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={tForms("hoursPlaceholder")}
                                        {...field}
                                        onChange={(e) =>
                                            handleHoursChange(e, field.onChange)
                                        }
                                        inputMode="decimal"
                                    />
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

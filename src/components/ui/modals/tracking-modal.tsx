"use client";

import React, { FC, ReactNode } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, TrackingHoursFields } from "@/types/users";
import { trackingSchema } from "@/schemas/users";
import { useTrackingHours } from "@/services/users/mutations";
import dayjs from "dayjs";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";
import { BaseModal } from "./base-modal";
import { TrackingForm } from "../tracking-form";

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
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: trackHours } = useTrackingHours();

    const { user } = useUserStore();

    const form = useForm<TrackingHoursFields>({
        resolver: zodResolver(trackingSchema),
        defaultValues: {
            date: String(new Date()),
            hours: "",
            comment: "",
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
                comment: formData.comment,
            });
            closeModal();
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
                {tModals("timeTracking.title")}
            </DialogTitle>
            <TrackingForm
                form={form}
                control={control}
                closeModal={closeModal}
                onSubmit={handleSubmit(onSubmit)}
            />
        </DialogContent>
    );
};

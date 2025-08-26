"use client";

import React, { FC, ReactNode } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, TrackingHoursFields } from "@/types/users";
import { trackingSchema } from "@/schemas/users";
import { useEditStat } from "@/services/users/mutations";
import { useUserStore } from "@/store/user-store";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/types";
import { BaseModal } from "./base-modal";
import { TrackingForm } from "../tracking-form";
import dayjs from "dayjs";

interface Props {
    statId: string;
    project: Project;
    openModal: (element: ReactNode) => void;
    closeModal: () => void;
}

export const EditStatModal: FC<Props> = ({
    statId,
    project,
    openModal,
    closeModal,
}) => {
    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");
    const tErrors = useTranslations("serverErrors");

    const { mutateAsync: editStat } = useEditStat();

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
            await editStat({
                statId,
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
                    title={tModals("error.title")}
                    submitButtonText={tButtons("ok")}
                    description={
                        tErrors.has(message as string)
                            ? tErrors(message as string)
                            : tModals("error.description")
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
                {tModals("editStat.title")}
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

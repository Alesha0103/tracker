"use client";

import { FilterStatsFields } from "@/types/users";
import React, { FC, useCallback } from "react";
import { DialogContent, DialogTitle } from "../dialog";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";
import { Input } from "../input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../form";
import { useRouter } from "next/navigation";
import { Checkbox } from "../checkbox";
import { FormDatePicker } from "../date-picker";

const defaultCheckboxValues = {
    thisWeek: false,
    thisMonth: false,
    prevWeek: false,
    prevMonth: false,
};

type CheckboxKeys = keyof typeof defaultCheckboxValues;

interface Props {
    closeModal: () => void;
}

export const StatsFilterModal: FC<Props> = ({ closeModal }) => {
    const router = useRouter();

    const tButtons = useTranslations("buttons");
    const tModals = useTranslations("modals");
    const tForms = useTranslations("forms");

    const form = useForm<FilterStatsFields>({
        defaultValues: {
            ...defaultCheckboxValues,
            dateFrom: "",
            dateTo: "",
        },
    });

    const { control, watch, setValue, handleSubmit } = form;

    const watchThisWeek = watch("thisWeek");
    const watchThisMonth = watch("thisMonth");
    const watchPrevWeek = watch("prevWeek");
    const watchPrevMonth = watch("prevMonth");

    const isDatePickerDisabled =
        watchThisWeek || watchThisMonth || watchPrevWeek || watchPrevMonth;

    const onCheckboxHandle = useCallback(
        (activeCheckbox: CheckboxKeys) => {
            const keys = Object.keys(defaultCheckboxValues) as CheckboxKeys[];
            keys.forEach((key) => {
                setValue(key, key === activeCheckbox);
            });
        },
        [watchThisWeek, watchThisMonth, watchPrevWeek, watchPrevMonth]
    );

    const onSubmit: SubmitHandler<FilterStatsFields> = (formData) => {
        const checkboxes = (
            Object.keys(defaultCheckboxValues) as CheckboxKeys[]
        ).reduce(
            (acc, key) => {
                if (formData[key]) {
                    acc[key] = true;
                }
                return acc;
            },
            {} as Record<CheckboxKeys, boolean>
        );

        const dto = {
            ...(!isDatePickerDisabled && { dateFrom: formData.dateFrom }),
            ...(!isDatePickerDisabled && { dateTo: formData.dateTo }),
            ...checkboxes,
        };
        console.log("dto", dto);
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
                        name="dateFrom"
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
                                        placeholder={tForms(
                                            "filter.stats.dateFrom"
                                        )}
                                        isDisabled={isDatePickerDisabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="dateTo"
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
                                        placeholder={tForms(
                                            "filter.stats.dateTo"
                                        )}
                                        isDisabled={isDatePickerDisabled}
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
                                name="thisWeek"
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
                                                        if (checked)
                                                            onCheckboxHandle(
                                                                "thisWeek"
                                                            );
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.stats.thisWeek"
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
                                name="prevWeek"
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
                                                        if (checked)
                                                            onCheckboxHandle(
                                                                "prevWeek"
                                                            );
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.stats.prevWeek"
                                                    )}
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
                                name="thisMonth"
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
                                                        if (checked)
                                                            onCheckboxHandle(
                                                                "thisMonth"
                                                            );
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.stats.thisMonth"
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
                                name="prevMonth"
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
                                                        if (checked)
                                                            onCheckboxHandle(
                                                                "prevMonth"
                                                            );
                                                    }}
                                                />
                                                <label className="text-slate-400 text-sm">
                                                    {tForms(
                                                        "filter.stats.prevMonth"
                                                    )}
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

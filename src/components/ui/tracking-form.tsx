import React, { FC } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { FormDatePicker } from "./date-picker";
import { Input } from "./input";
import { CustomButton } from "./custom-button";
import { useTranslations } from "next-intl";
import { handleHoursChange } from "@/utils";

interface Props {
    form: any;
    control: any;
    closeModal: () => void;
    onSubmit: () => void;
}

export const TrackingForm: FC<Props> = ({
    form,
    control,
    onSubmit,
    closeModal,
}) => {
    const tButtons = useTranslations("buttons");
    const tForms = useTranslations("forms");

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
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

                <div className="flex gap-x-4">
                    <FormField
                        control={control}
                        name="hours"
                        render={({ field }) => (
                            <FormItem className="basis-1/5">
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
                    <FormField
                        control={control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem className="basis-4/5">
                                <FormControl>
                                    <Input
                                        placeholder={tForms("comment")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
    );
};

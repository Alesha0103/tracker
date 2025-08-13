import React, { FC } from "react";
import { DialogContent, DialogDescription, DialogTitle } from "../dialog";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
    title?: string;
    description?: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    submitButtonClassName?: string;
    cancelButtonClassName?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export const BaseModal: FC<Props> = ({
    title,
    description,
    submitButtonText,
    cancelButtonText,
    submitButtonClassName,
    cancelButtonClassName,
    onSubmit,
    onCancel,
}) => {
    const tButtons = useTranslations("buttons");
    return (
        <DialogContent className="bg-midnight max-w-md">
            <DialogTitle className="text-white text-center">
                {title}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
                {description}
            </DialogDescription>
            <div className="flex gap-x-10">
                {onCancel && (
                    <CustomButton
                        text={cancelButtonText || tButtons("cancel")}
                        className={cn("w-full", cancelButtonClassName)}
                        onClick={onCancel}
                    />
                )}
                <CustomButton
                    text={submitButtonText || tButtons("submit")}
                    onClick={onSubmit}
                    className={cn("w-full", submitButtonClassName)}
                />
            </div>
        </DialogContent>
    );
};

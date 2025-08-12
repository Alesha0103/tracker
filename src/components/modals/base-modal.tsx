import React, { FC } from "react";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { CustomButton } from "../ui/custom-button";
import { useTranslations } from "next-intl";

interface Props {
    title?: string;
    description?: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    submitButtonClassName?: string;
    cancelButtonClassName?: string;
    onSubmit?: () => void;
}

export const BaseModal: FC<Props> = ({
    title,
    description,
    submitButtonText,
    cancelButtonText,
    submitButtonClassName,
    cancelButtonClassName,
    onSubmit,
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
            {cancelButtonText && (
                <CustomButton
                    text={cancelButtonText || tButtons("cancel")}
                    className={cancelButtonClassName}
                />
            )}
            <CustomButton
                text={submitButtonText || tButtons("ok")}
                onClick={onSubmit}
                className={submitButtonClassName}
            />
        </DialogContent>
    );
};

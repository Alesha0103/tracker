import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
    onClick?: () => void;
    isDisabled?: boolean;
}

export const CustomButton: FC<Props> = ({
    text,
    isDisabled,
    className,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "text-white text-sm rounded-sm px-4 py-2 h-fit bg-secondary",
                isDisabled
                    ? "bg-gray-800 text-slate-500 pointer-event-none"
                    : "hover:bg-dark-blue transition-colors duration-200",
                className
            )}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};

import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface Props {
    text: string;
    className?: string;
    onClick?: () => void;
}

export const CustomButton: FC<Props> = ({ text, className, onClick }) => {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "text-white text-sm rounded-sm px-4 py-2 h-fit bg-secondary hover:bg-red-500 transition-colors duration-200",
                className
            )}
        >
            {text}
        </button>
    );
};

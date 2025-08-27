import { cn } from "@/utils";
import React, { FC, forwardRef, ReactNode } from "react";
import { Loader } from "./loader";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string | ReactNode;
    className?: string;
    isDisabled?: boolean;
    isPending?: boolean;
    variant?: "default" | "ghost";
    onClick?: () => void;
}

export const CustomButton = forwardRef<HTMLButtonElement, Props>(
    (
        {
            text,
            isDisabled,
            isPending,
            className,
            variant = "default",
            type = "button",
            ...props
        },
        ref
    ) => {
        if (variant === "ghost")
            return (
                <button
                    ref={ref}
                    type={type}
                    className={cn(
                        "text-white text-sm bg-transparent focus:outline-none focus:ring-0",
                        className,
                        isDisabled && "text-slate-600 hover:no-underline"
                    )}
                    disabled={isDisabled}
                    {...props}
                >
                    {text}
                </button>
            );

        return (
            <button
                ref={ref}
                type={type}
                className={cn(
                    "text-white text-sm rounded-sm px-4 py-2 h-fit bg-secondary relative",
                    isDisabled || isPending
                        ? "bg-gray-800 text-slate-500 pointer-event-none"
                        : "hover:bg-dark-blue transition-colors duration-200",
                    className
                )}
                disabled={isDisabled}
                {...props}
            >
                {text}
                {isPending && (
                    <Loader
                        size={20}
                        borderSize={2}
                        className="right-7 translate-x-full"
                    />
                )}
            </button>
        );
    }
);

CustomButton.displayName = "CustomButton";

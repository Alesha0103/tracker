import * as React from "react";

import { cn } from "@/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border-2 text-slate-300 text-sm placeholder:text-slate-500 placeholder:text-xs border-transparent bg-secondary px-3 py-2 e focus:outline-none focus:ring-0 focus:border-dark-blue hover:border-dark-blue disabled:cursor-default disabled:opacity-50 disabled:hover:border-transparent disabled:focus:border-transparent",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

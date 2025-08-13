import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    className?: string;
}

export const GlobalTitleUI: FC<Props> = ({ className, children }) => {
    return <h1 className={cn("text-white text-center text-2xl sm:text-3xl font-semibold", className)}>{children}</h1>
}

export const SectionTitleUI: FC<Props> = ({ className, children }) => {
    return <h2 className={cn("text-white text-center text-xl sm:text-2xl font-semibold", className)}>{children}</h2>
}

export const TitleUI: FC<Props> = ({ className, children }) => {
    return <h3 className={cn("text-base sm:text-xl text-slate-200 text-center", className)}>{children}</h3>
}

export const SpanUI: FC<Props> = ({ className, children }) => {
    return <span className={cn("text-slate-400", className)}>{children}</span>
}

export const TextUI: FC<Props> = ({ className, children }) => {
    return <p className={cn("text-slate-400 text-xs sm:text-sm", className)}>{children}</p>
}
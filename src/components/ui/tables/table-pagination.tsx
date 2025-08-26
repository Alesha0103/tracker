"use client";

import { INDEX_OFFSET } from "@/constants";
import { cn } from "@/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useCallback } from "react";

interface Props {
    pages: number;
    currentPage: number;
}

export const TablePagination: FC<Props> = ({ pages, currentPage }) => {
    const router = useRouter();
    const pathname = usePathname();

    const onItemClick = useCallback(
        (item: number) => () => {
            if (item === currentPage) return;
            router.push(pathname + `?page=${item}`);
        },
        [pages, currentPage]
    );

    const onArrowClick = useCallback(
        (direction: "left" | "right") => () => {
            const delta = direction === "left" ? -INDEX_OFFSET : INDEX_OFFSET;
            const nextPage = currentPage + delta;

            if (nextPage >= INDEX_OFFSET && nextPage <= pages) {
                router.push(`${pathname}?page=${nextPage}`);
            }
        },
        [pages, currentPage, pathname]
    );

    return (
        <ul className="text-white text-sm justify-center items-center flex gap-x-2 mt-4">
            <li>
                <ChevronLeft
                    className={cn(
                        "hover:cursor-pointer",
                        currentPage === INDEX_OFFSET &&
                            "pointer-event-none text-slate-500 hover:cursor-default"
                    )}
                    onClick={onArrowClick("left")}
                />
            </li>
            {Array.from({ length: pages }).map((_, idx) => (
                <li
                    key={idx + INDEX_OFFSET}
                    className={cn(
                        "bg-midnight hover:bg-secondary hover:cursor-pointer px-2 py-1 rounded-md",
                        idx + INDEX_OFFSET === currentPage &&
                            "pointer-event-none, bg-secondary"
                    )}
                    onClick={onItemClick(idx + INDEX_OFFSET)}
                >
                    {idx + INDEX_OFFSET}
                </li>
            ))}
            <li>
                <ChevronRight
                    className={cn(
                        "hover:cursor-pointer",
                        currentPage === pages &&
                            "pointer-event-none text-slate-500 hover:cursor-default"
                    )}
                    onClick={onArrowClick("right")}
                />
            </li>
        </ul>
    );
};

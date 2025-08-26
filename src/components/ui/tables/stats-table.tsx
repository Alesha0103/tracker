"use client";

import React, { FC, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import { useTranslations } from "next-intl";
import { Project, StatsItem } from "@/types/users";
import { Pencil } from "lucide-react";
import { TitleUI } from "../typography";
import { MIN_PAGES } from "@/constants";
import { TablePagination } from "./table-pagination";
import useModal from "@/hooks/use-modal";
import { EditStatModal } from "../modals/edit-stat-modal";

interface Props {
    project?: Project;
}

export const StatsTable: FC<Props> = ({ project }) => {
    const tTables = useTranslations("tables");

    const stats = project?.stats;

    const { openModal, closeModal, Modal } = useModal();

    const onEditClick = useCallback(
        (stat: StatsItem) => () => {
            project &&
                openModal(
                    <EditStatModal
                        stat={stat}
                        project={project}
                        openModal={openModal}
                        closeModal={closeModal}
                    />
                );
        },
        [project]
    );

    return (
        <>
            <Table className="bg-midnight border-2 border-secondary rounded-md">
                <TableHeader>
                    <TableRow className="!border-b-2 border-slate-700">
                        <TableHead className="text-white">
                            {tTables("statsTable.date")}
                        </TableHead>
                        <TableHead className="text-white">
                            {tTables("statsTable.comment")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("statsTable.hours")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("statsTable.action")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stats?.items?.length ? (
                        stats.items.map((stat, idx) => (
                            <TableRow
                                key={stat.date + idx}
                                className="border-b-2 border-secondary"
                            >
                                <TableCell className="font-medium text-slate-400">
                                    {stat.date}
                                </TableCell>
                                <TableCell className="font-medium text-slate-400">
                                    {stat.comment || "--"}
                                </TableCell>
                                <TableCell className="font-medium text-slate-400 text-center">
                                    {stat.hours}
                                </TableCell>
                                <TableCell className="flex gap-x-3 justify-center">
                                    <Pencil
                                        className="text-slate-400 hover:cursor-pointer hover:text-white"
                                        onClick={onEditClick(stat)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-36">
                                <TitleUI>
                                    {tTables("statsTable.noStats")}
                                </TitleUI>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {stats?.pages && stats.pages > MIN_PAGES && (
                <TablePagination
                    pages={stats.pages}
                    currentPage={Number(stats.currentPage || 1)}
                />
            )}
            <Modal />
        </>
    );
};

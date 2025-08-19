import { useTranslations } from "next-intl";
import React, { FC, useCallback } from "react";
import useModal from "@/hooks/use-modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import { Project } from "@/types/users";
import { Pencil, SquareMousePointer } from "lucide-react";
import { TrackingModal } from "../modals/tracking-modal";

interface Props {
    projects: Project[];
}

export const TrackingTable: FC<Props> = ({ projects }) => {
    const tTables = useTranslations("tables");

    const { openModal, closeModal, Modal } = useModal();

    const onTrackingClick = useCallback(
        (project: Project) => () => {
            openModal(
                <TrackingModal
                    project={project}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            );
        },
        [projects]
    );

    return (
        <>
            <Table className="bg-midnight border-2 border-secondary rounded-md">
                <TableHeader>
                    <TableRow className="!border-b-2 border-slate-700">
                        <TableHead className="text-white">
                            {tTables("trackingTable.name")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("trackingTable.createdAt")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("trackingTable.updatedAt")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("trackingTable.hours")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("trackingTable.action")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow
                            key={project.name}
                            className="border-b-2 border-secondary"
                        >
                            <TableCell className="font-medium text-slate-400">
                                {project.name}
                            </TableCell>
                            <TableCell className="font-medium text-slate-400 text-center">
                                {project.createdAt}
                            </TableCell>
                            <TableCell className="font-medium text-slate-400 text-center">
                                {project.updatedAt}
                            </TableCell>
                            <TableCell className="font-medium text-slate-400 text-center">
                                {project.hours || 0}
                            </TableCell>
                            <TableCell className="flex gap-x-3 justify-center">
                                <Pencil
                                    className="text-slate-400 hover:cursor-pointer hover:text-white"
                                    // onClick={onEditClick(user)}
                                />
                                <SquareMousePointer
                                    className="text-slate-400 hover:cursor-pointer hover:text-white"
                                    onClick={onTrackingClick(project)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal />
        </>
    );
};

"use client";

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
import { Project, User, UsersResponse } from "@/types/users";
import { CheckCircle2, Pencil, Trash2, XCircle } from "lucide-react";
import { EditUserModal } from "../modals/edit-user-modal";
import { Button } from "../button";
import { FilterUsersTable } from "./filter-users-table";
import { DeleteUserModal } from "../modals/delete-user-modal";
import { TablePagination } from "./table-pagination";
import { useSearchParams } from "next/navigation";

interface Props {
    data: UsersResponse;
}

export const UsersTable: FC<Props> = ({ data: { users, pages } }) => {
    const params = useSearchParams();
    const currentPage = params.get("page");
    const tTables = useTranslations("tables");

    const { openModal, closeModal, Modal } = useModal();

    const onEditClick = useCallback(
        (user: User) => () => {
            openModal(
                <EditUserModal
                    user={user}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            );
        },
        [users]
    );

    const onDeleteClick = useCallback(
        (id: string) => () => {
            openModal(
                <DeleteUserModal
                    id={id}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            );
        },
        [users]
    );

    const getProjectsList = (projects: Project[]): string => {
        const projectList = projects
            ?.filter((p) => !p.isDisabled)
            ?.map((p) => p.name)
            .join(", ");
        return !!projectList ? projectList : "--";
    };

    return (
        <>
            <FilterUsersTable />
            <Table className="bg-midnight border-2 border-secondary rounded-md">
                <TableHeader>
                    <TableRow className="!border-b-2 border-slate-700">
                        <TableHead className="text-white">
                            {tTables("usersTable.email")}
                        </TableHead>
                        <TableHead className="text-white">
                            {tTables("usersTable.projects")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("usersTable.admin")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("usersTable.activated")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("usersTable.hours")}
                        </TableHead>
                        <TableHead className="text-white text-center">
                            {tTables("usersTable.action")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.email}
                            className="border-b-2 border-secondary"
                        >
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    className="p-0 h-fit font-medium text-slate-400 hover:cursor-pointer hover:underline"
                                    onClick={onEditClick(user)}
                                >
                                    {user.email}
                                </Button>
                            </TableCell>
                            <TableCell className="font-medium text-slate-400">
                                {getProjectsList(user.projects)}
                            </TableCell>
                            <TableCell>
                                {user.isAdmin ? (
                                    <CheckCircle2
                                        className="text-green-500  mx-auto"
                                        size={20}
                                    />
                                ) : (
                                    <XCircle
                                        className="text-red-500  mx-auto"
                                        size={20}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                {user.isActivated ? (
                                    <CheckCircle2
                                        className="text-green-500 text-center mx-auto"
                                        size={20}
                                    />
                                ) : (
                                    <XCircle
                                        className="text-red-500  mx-auto"
                                        size={20}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="text-center text-slate-400">
                                {user.totalHours}
                            </TableCell>
                            <TableCell className="flex gap-x-3 justify-center">
                                <Pencil
                                    className="text-slate-400 hover:cursor-pointer hover:text-white"
                                    onClick={onEditClick(user)}
                                />
                                <Trash2
                                    className="text-slate-400 hover:cursor-pointer hover:text-white"
                                    onClick={onDeleteClick(user.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                pages={pages}
                currentPage={Number(currentPage || 1)}
            />
            <Modal />
        </>
    );
};

import { useTranslations } from "next-intl";
import React, { FC, useCallback } from "react";
import { Loader } from "../loader";
import { CustomButton } from "../custom-button";
import { TextUI, TitleUI } from "../typography";
import useModal from "@/hooks/use-modal";
import { AddUserModal } from "../modals/add-user-modal";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../table";
import { User } from "@/types/users";
import { CheckCircle2, SquareMousePointer, XCircle } from "lucide-react";

interface Props {
    users: User[];
    isLoading?: boolean;
}

export const UsersTable: FC<Props> = ({ users, isLoading }) => {
    const tTables = useTranslations("tables");
    const tButtons = useTranslations("buttons");

    const { openModal, closeModal, Modal } = useModal();

    return (
        <Table className="bg-midnight border-2 border-secondary rounded-md">
            <TableHeader>
                <TableRow className="!border-b-2 border-slate-700">
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Project</TableHead>
                    <TableHead className="text-white text-center">
                        Admin
                    </TableHead>
                    <TableHead className="text-white text-center">
                        Activated
                    </TableHead>
                    <TableHead className="text-white text-center">
                        Tracked Hours
                    </TableHead>
                    <TableHead className="text-white text-center">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.email}
                        className="border-b-2 border-secondary"
                    >
                        <TableCell className="font-medium text-slate-400 hover:cursor-pointer hover:underline">
                            {user.email}
                        </TableCell>
                        <TableCell className="font-medium text-slate-400">
                            {user.project || "--"}
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
                            {user.trackedHours}
                        </TableCell>
                        <TableCell>
                            <SquareMousePointer className="text-slate-400 mx-auto hover:cursor-pointer hover:text-white" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

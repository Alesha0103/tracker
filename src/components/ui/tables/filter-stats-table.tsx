"use client";
import useModal from "@/hooks/use-modal";
import React, { FC, useCallback } from "react";
import { AddUserModal } from "../modals/add-user-modal";
import { CustomButton } from "../custom-button";
import { useTranslations } from "next-intl";
import { FilterUsers, Project } from "@/types/users";
import { UsersFilterModal } from "../modals/users-filter-modal";
import { TrackingModal } from "../modals/tracking-modal";
import { StatsFilterModal } from "../modals/stats-filter-modal";

interface Props {
    project?: Project;
    filterStats?: (data: FilterUsers) => void;
}

export const FilterStatsTable: FC<Props> = ({ project, filterStats }) => {
    const tButtons = useTranslations("buttons");

    const { openModal, closeModal, Modal } = useModal();

    const onTrackingClick = useCallback(() => {
        project &&
            openModal(
                <TrackingModal
                    project={project}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            );
    }, [project]);

    const onFilterClick = useCallback(() => {
        openModal(<StatsFilterModal closeModal={closeModal} />);
    }, []);

    return (
        <div className="flex mb-2 justify-between">
            <CustomButton
                text={tButtons("filter")}
                onClick={onFilterClick}
                className="w-28"
            />
            <CustomButton
                text={tButtons("tracking")}
                onClick={onTrackingClick}
            />
            <Modal />
        </div>
    );
};

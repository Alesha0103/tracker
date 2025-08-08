"use client";

import { Dialog } from "@/components/ui/dialog";
import { FC, ReactNode, useCallback, useState } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    const openModal = useCallback((content: ReactNode) => {
        setModalContent(content);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalContent(null);
    }, []);

    const Modal: FC = useCallback(() => {
        if (!isOpen || !modalContent) return null;

        return (
            <Dialog open={isOpen} onOpenChange={closeModal}>
                {modalContent}
            </Dialog>
        );
    }, [isOpen, modalContent, closeModal]);

    return { openModal, closeModal, Modal };
};

export default useModal;

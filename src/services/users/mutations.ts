import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addUser,
    deleteUser,
    editStat,
    editUser,
    trackingHours,
} from "./endpoints";
import { EditStatDto, EditUserDto } from "@/types/users";
import { useUserStore } from "@/store/user-store";

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },
        mutationKey: ["add-user"],
        retry: false,
    });
};

export const useEditUser = (id: string) => {
    const queryClient = useQueryClient();
    const { user, setUser } = useUserStore();

    return useMutation({
        mutationFn: (dto: EditUserDto) => editUser(id, dto),
        onSuccess: (data) => {
            if (user?.id === data.id) {
                setUser(data);
            }
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },
        mutationKey: ["edit-user"],
        retry: false,
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },
        mutationKey: ["delete-user"],
        retry: false,
    });
};

export const useTrackingHours = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: trackingHours,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
            queryClient.invalidateQueries({ queryKey: ["get-projects"] });
            queryClient.invalidateQueries({ queryKey: ["user-project"] });
        },
        mutationKey: ["tracking"],
        retry: false,
    });
};

export const useEditStat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: EditStatDto) => editStat(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-projects"] });
            queryClient.invalidateQueries({ queryKey: ["user-project"] });
        },
        mutationKey: ["edit-stat"],
        retry: false,
    });
};

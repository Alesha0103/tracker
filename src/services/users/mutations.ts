import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, deleteUser, editUser } from "./endpoints";
import { EditUserDto } from "@/types/users";
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
    const { setUser } = useUserStore();

    return useMutation({
        mutationFn: (dto: EditUserDto) => editUser(id, dto),
        onSuccess: (data) => {
            setUser(data);
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

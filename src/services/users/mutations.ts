import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, editUsers } from "./endpoints";
import { EditUserDto } from "@/types/users";

export const useAddUser = () => {
    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {},
        mutationKey: ["add-user"],
        retry: false,
    });
};

export const useEditUser = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: EditUserDto) => editUsers(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },
        mutationKey: ["edit-user"],
        retry: false,
    });
};

import { useMutation } from "@tanstack/react-query";
import { addUser } from "./endpoints";

export const useAddUser = () => {
    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {},
        mutationKey: ["add-user"],
        retry: false,
    });
};
